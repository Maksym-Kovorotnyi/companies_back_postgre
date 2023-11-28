import { IsNotEmpty, IsString, IsNumber, MinLength } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  serviceOfActivity: string;

  @IsNotEmpty()
  @IsNumber()
  numberOfEmployees: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  description: string;

  @IsNotEmpty()
  @IsString()
  type: string;
}
