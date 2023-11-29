import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @IsOptional()
  @IsString({ message: 'Name should be a string' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Address should be a string' })
  address?: string;

  @IsOptional()
  @IsString({ message: 'Service of activity should be a string' })
  serviceOfActivity?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Number of employees should be a number' })
  numberOfEmployees?: number;

  @IsOptional()
  @IsString({ message: 'Description should be a string' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'Type should be a string' })
  type?: string;
}
