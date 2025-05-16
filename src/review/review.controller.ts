import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  NotFoundException,
} from "@nestjs/common";
import { ReviewService } from "./review.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { ReviewResponseDto } from "./dto/response-review.dot";

@Controller("reviews")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @Post()
  create(@Body() data: CreateReviewDto) {
    return this.reviewService.create(data);
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.reviewService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() data: UpdateReviewDto) {
    return this.reviewService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.reviewService.remove(id);
  }

  @Post(":businessId/reply")
  async respondToReviews(
    @Param("businessId") businessId: string,
  ): Promise<ReviewResponseDto> {
    if (!businessId) {
      throw new NotFoundException("Location ID not found for business");
    }

    try {
      return await this.reviewService.respondToReviews(businessId);
    } catch (error) {
      throw new NotFoundException("Internal server error: " + error.message);
    }
  }
}
