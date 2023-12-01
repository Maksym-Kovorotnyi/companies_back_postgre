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

  @Get('search/:name')
  findOne(@Param('name') name: string, @Req() req) {
    const id = req.user.sub;
    return this.companiesService.findOne(name, id);
  }

  @Get('detail/:id')
  getDetailInfo(@Param('id') id: string, @Req() req) {
    const userId = req.user.sub;
    return this.companiesService.getDetailInfo(+id, userId);
  }

  @Patch('update/:id')
  updateCompany(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Req() req,
  ) {
    const userId = req.user.sub;
    return this.companiesService.updateCompany(+id, updateCompanyDto, userId);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string, @Req() req) {
    const userId = req.user.sub;
    return this.companiesService.remove(+id, userId);
  }
}
