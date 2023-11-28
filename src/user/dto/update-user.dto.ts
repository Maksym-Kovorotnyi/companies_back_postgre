import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsAlphanumeric,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  Matches,
  MinLength,
} from 'class-validator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsAlphanumeric()
  @MinLength(3, { message: 'Firstname must have atleast 3 characters.' })
  firstname: string;

  @IsAlphanumeric()
  @MinLength(3, { message: 'Lastname must have atleast 3 characters.' })
  lastname: string;

  @IsAlphanumeric()
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  nickname: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber('UA')
  phone: string;

  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  password: string;
}
