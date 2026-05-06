import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService 
{
	constructor(private readonly prisma: PrismaService) 
	{}

	async findAll() {
		return this.prisma.prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
	}

	async findOne(id: string) 
    {
		const user = await this.prisma.prisma.user.findUnique({ where: { id } });
		if 
            (!user) throw new NotFoundException('Usuário não encontrado');
		return user;
	}

	private getSaltRounds(): number 
    {
		const env = process.env.BCRYPT_SALT_ROUNDS;
		let rounds = 10;
		if (env) 
        {
			const parsed = parseInt(env, 10);
			if 
                (!isNaN(parsed)) rounds = parsed;
		}
		return Math.min(Math.max(4, rounds), 15);
	}

	async create(data: { email: string; name?: string; password?: string }) 
    {
		const createData: any = { email: data.email, name: data.name };
		if (data.password) 
            {
			const rounds = this.getSaltRounds();
			createData.password = await bcrypt.hash(data.password, rounds);
		}

		return this.prisma.prisma.user.create({ data: createData });
	}

	async update(id: string, dto: { name?: string; email?: string; password?: string }) 
    {
		const updateData: any = { ...(dto as any) };
		if (dto.password) 
        {
			const rounds = this.getSaltRounds();
			updateData.password = await bcrypt.hash(dto.password, rounds);
		}

		return this.prisma.prisma.user.update({ where: { id }, data: updateData });
	}

	async remove(id: string) 
    {
		const user = await this.prisma.prisma.user.findUnique({ where: { id } });
		if (!user) throw new NotFoundException('Usuário não encontrado');
		return this.prisma.prisma.user.delete({ where: { id } });
	}
}
