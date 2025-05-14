import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateReviewDto) {
    return this.prisma.review.create({ data });
  }

  async findAll() {
    return this.prisma.review.findMany();
  }

  async findOne(id: string) {
    const review = await this.prisma.review.findUnique({ where: { id } });
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  async update(id: string, data: UpdateReviewDto) {
    try {
      return await this.prisma.review.update({
        where: { id },
        data,
      });
    } catch (err) {
      throw new BadRequestException('Unable to update review');
    }
  }

  async remove(id: string) {
    return this.prisma.review.delete({ where: { id } });
  }
}
