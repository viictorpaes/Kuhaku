import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUpdateDto } from '../dto/login_update.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService 
{
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  private getSaltRounds(): number 
  {
    const env = process.env.BCRYPT_SALT_ROUNDS;
    let rounds = 10;
    if (env) 
    {
      const parsed = parseInt(env, 10);
      if (!isNaN(parsed)) 
        rounds = parsed;
    }
    return Math.min(Math.max(4, rounds), 15);
  }

  async validateUser(email: string, password: string) 
  {
    const user = await this.prisma.prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) return null;

    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;

    const { password: _p, ...rest } = (user as any);
    return rest;
  }

  async validarUsuario(email: string, password: string) 
  {
    return this.validateUser(email, password);
  }

  async login(user: any) 
  {
    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(email: string, password: string, name?: string) 
  {
    const existing = await this.prisma.prisma.user.findUnique({ where: { email } });
    if (existing) 
      throw new UnauthorizedException('Usuário já existe');

    const rounds = this.getSaltRounds();
    const hash = await bcrypt.hash(password, rounds);

    const created = await this.prisma.prisma.user.create({ data: { email, name, password: hash } });
    const { password: _p, ...rest } = (created as any);
    return rest;
  }

  async registro(email: string, password: string, name?: string) 
  {
    return this.register(email, password, name);
  }

  async atualizar(id: number, dto: LoginUpdateDto) 
  {
    const usuario = await this.prisma.prisma.user.findUnique({ where: { id } });
    if (!usuario) 
      throw new UnauthorizedException('Usuário não encontrado');

    const dados: any = {};

    if (dto.name)
      dados.name = dto.name;

    if (dto.email) 
    {
      const existente = await this.prisma.prisma.user.findUnique({ where: { email: dto.email } });
      if (existente && existente.id !== id) 
        throw new UnauthorizedException('E-mail já em uso');

      dados.email = dto.email;
    }

    if (dto.password) 
    {
      const rounds = this.getSaltRounds();
      dados.password = await bcrypt.hash(dto.password, rounds);
    }

    const atualizado = await this.prisma.prisma.user.update({ where: { id }, data: dados });
    const { password: _p, ...rest } = (atualizado as any);
    return rest;
  }
}