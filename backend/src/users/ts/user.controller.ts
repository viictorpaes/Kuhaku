import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/user_dto';
import { UpdateUserDto } from '../dto/user_update.dto';

@Controller('users')
export class UserController 
{
	constructor(private readonly userService: UserService) 
    {}

	@Get()
	async list() 
    {
		return this.userService.findAll();
	}

	@Get(':id')
	async get(@Param('id') id: string) 
    {
		return this.userService.findOne(id);
	}

	@Post()
	async create(@Body() dto: CreateUserDto) 
    {
		return this.userService.create(dto as any);
	}

	@Put(':id')
	async update(@Param('id') id: string, @Body() dto: UpdateUserDto) 
    {
		return this.userService.update(id, dto as any);
	}

	@Delete(':id')
	async remove(@Param('id') id: string) 
    {
		return this.userService.remove(id);
	}
}