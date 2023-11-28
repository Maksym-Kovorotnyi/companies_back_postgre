import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { JwtAuthGuard } from 'src/passport/jwt.guard';

@Controller('companies')
@UseGuards(JwtAuthGuard)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post('create')
  createCompany(@Body() createCompanyDto: CreateCompanyDto, @Req() req) {
    const id = req.user.sub;
    return this.companiesService.createCompany(createCompanyDto, id);
  }

  @Get()
  findAll(@Req() req) {
    const id = req.user.sub;
    return this.companiesService.findAll(+id);
  }

  @Get(':name')
  findOne(@Param('name') name: string, @Req() req) {
    const id = req.user.sub;
    console.log(req);
    return this.companiesService.findOne(name, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(+id);
  }
}
