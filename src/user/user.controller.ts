import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../passport/jwt.guard';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }

  @Post('signin')
  signIn(@Body() getUserDto: GetUserDto) {
    return this.userService.signIn(getUserDto);
  }

  @Get('logout/:id')
  @UseGuards(JwtAuthGuard)
  logout(@Param('id') id: string) {
    return this.userService.logout(+id);
  }

  @Get('profile/:id')
  @UseGuards(JwtAuthGuard)
  currentUser(@Param('id') id: string) {
    return this.userService.currentUser(+id);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
