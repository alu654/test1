import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../users/user.dto';
import { User } from '../users/user.entity.';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,

  ) {}
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    const user = await this.userService.createUser(createUserDto.email, createUserDto.password);
    return { id: user.id, email: user.email };
  }

 @Get()
    async  getAllUser(): Promise<User[]>{
        return this.userService.getAllUser();
    }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<any> {
    const user = await this.userService.findUserById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Get('')
  async getUser(@Param('id') id: number): Promise<any> {
    const user = await this.userService.findUserById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Get('by-email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
