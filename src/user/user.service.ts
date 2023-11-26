/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const user: User = new User();
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.companies = [];
    return this.userRepository.save(user);
  }

  async signIn(id: number) {
    const userCheck = await this.userRepository.findOneBy({ id });
    if (!userCheck) {
      throw new NotFoundException(`User not found`);
    }
    return userCheck;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    user.email = updateUserDto.email || user.email;
    user.username = updateUserDto.username || user.username;
    user.password = updateUserDto.password || user.password;
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const userCheck = await this.userRepository.findOneBy({ id });
    if (!userCheck) {
      throw new NotFoundException(`User not found`);
    }
    return this.userRepository.delete(id);
  }
}
