import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('email')
  async getUserIdByEmail(@Query('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    const user = await this.userService.findIdByEmail(email);
    return user ?? { userId: null };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() data: { email: string; password: string }) {
    return this.userService.login(data.email, data.password);
  }

  @Get(':userId/token')
  async getOauthToken(@Param('userId') userId: string) {
    return this.userService.getToken(userId);
  }

  @Patch(':userId/password')
  async changePassword(
    @Param('userId') userId: string,
    @Body() dto: { currentPassword: string; newPassword: string },
  ) {
    return this.userService.changePassword(userId, dto);
  }
}
