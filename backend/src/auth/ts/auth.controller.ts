import { Body, Controller, Post, Put, Param, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { LoginUpdateDto } from "../dto/login_update.dto";

@Controller('auth')
export class AuthController 
{
  constructor(private readonly authService: AuthService) 
  {}

  @Post('login')
  async login(@Body() dto: LoginDto) 
  {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) 
      return { error: 'Credenciais inválidas' };

    return this.authService.login(user);
  }

  @Post('register')
  async registro(@Body() dto: LoginDto) 
  {
    return this.authService.register(dto.email, dto.password, dto.name);
  }

  @Put('update/:id')
  async atualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: LoginUpdateDto) 
  {
    return this.authService.atualizar(id, dto); // método faltando aqui antes
  }
}