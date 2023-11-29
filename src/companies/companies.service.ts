import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createCompany(
    createCompanyDto: CreateCompanyDto,
    id: number,
  ): Promise<Company> {
    const user = await this.userRepository.findOneBy({ id });
    const existingCompany = await this.companyRepository.findOne({
      where: { name: createCompanyDto.name },
    });
    if (existingCompany) {
      throw new ConflictException('This company already registered');
    }
    const company = this.companyRepository.create({
      ...createCompanyDto,
      user,
    });

    return this.companyRepository.save(company);
  }

  async findAll(id: number): Promise<Company[]> {
    return this.companyRepository.find({ where: { user: { id } } });
  }

  async findOne(name: string, id: number): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { name: ILike(`%${name}%`), user: { id } },
    });
    if (!company) {
      throw new NotFoundException(`Company with name '${name}' not found`);
    }

    return company;
  }

  async updateCompany(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
    userId: number,
  ): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    Object.keys(updateCompanyDto).forEach((key) => {
      company[key] = updateCompanyDto[key];
    });
    return this.companyRepository.save(company);
  }

  async remove(id: number, userId: number) {
    const company = await this.companyRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!company) {
      throw new NotFoundException(`Company not found`);
    }
    return this.companyRepository.delete(id);
  }
}
