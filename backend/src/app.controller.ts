import { Controller, Get, Inject } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller('/api')
export class AppController 
{
  constructor(@Inject(PrismaService) private readonly prismaService: PrismaService) 
  {}

  @Get()
  async getStatus() 
  {
    const usersCount = await this.prismaService.prisma.user.count();

    return {
      service: 'backend',
      status: 'ok',
      usersCount,
    };
  }
}

export default AppController;