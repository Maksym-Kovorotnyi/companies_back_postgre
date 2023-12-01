import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
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

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() req) {
    const userId = req.user.sub;
    return this.userService.logout(userId);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  currentUser(@Req() req) {
    const userId = req.user.sub;
    return this.userService.currentUser(userId);
  }
}
