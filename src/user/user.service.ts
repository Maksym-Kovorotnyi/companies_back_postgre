import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { GetUserDto } from './dto/login-user.dto';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const { SECRET_KEY } = process.env;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: [
        { email: createUserDto.email },
        { nickname: createUserDto.nickname },
      ],
    });

    if (existingUser) {
      throw new ConflictException(
        'User with this email or nickname already exists',
      );
    }
    const user: User = new User();
    user.firstname = createUserDto.firstname;
    user.lastname = createUserDto.lastname;
    user.nickname = createUserDto.nickname;
    user.email = createUserDto.email;
    user.phone = createUserDto.phone;
    user.description = createUserDto.description;
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    user.password = hashedPassword;
    user.token = '';
    return this.userRepository.save(user);
  }

  async signIn(getUserDto: GetUserDto): Promise<User> {
    const { email, password } = getUserDto;
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new NotFoundException(`User not found, please register`);
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw new UnauthorizedException(`Email or password are wrong`);
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
    user.token = token;
    return this.userRepository.save(user);
  }

  async logout(userId: number) {
    const userCheck = await this.userRepository.findOneBy({ id: userId });
    if (!userCheck) {
      throw new NotFoundException(`User not found`);
    }
    userCheck.token = '';
    this.userRepository.save(userCheck);
    return { message: 'Logout success' };
  }

  async currentUser(userId: number) {
    const userCheck = await this.userRepository.findOneBy({ id: userId });
    if (!userCheck) {
      throw new NotFoundException(`User not found IIIII`);
    }
    return this.userRepository.save(userCheck);
  }
}
