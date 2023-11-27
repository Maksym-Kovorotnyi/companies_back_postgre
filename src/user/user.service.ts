/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { GetUserDto } from './dto/get-user.dto';
import * as jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';

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
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    user.password = hashedPassword;
    user.companies = [];
    user.token = '';
    return this.userRepository.save(user);
  }

  async signIn(getUserDto: GetUserDto): Promise<User> {
    const { email, password } = getUserDto;
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw new UnauthorizedException(`Email or password are wrong`);
    }
    const token = jwt.sign({ userId: user.id }, nanoid(), { expiresIn: '1d' });

    user.token = token;
    this.userRepository.save(user);

    return this.userRepository.save(user);
  }

  async logout(id: number) {
    const userCheck = await this.userRepository.findOneBy({ id });
    if (!userCheck) {
      throw new NotFoundException(`User not found`);
    }
    userCheck.token = '';
    this.userRepository.save(userCheck);
    return { message: 'Logout success' };
  }

  async currentUser(id: number) {
    const userCheck = await this.userRepository.findOneBy({ id });
    if (!userCheck) {
      throw new NotFoundException(`User not found`);
    }
    if (!userCheck.token) {
      return;
    }
    return this.userRepository.save(userCheck);
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
