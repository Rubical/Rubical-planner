import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { TimeBlockService } from './time-block.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { TimeBlockDto } from './dto/time-block.dto'

@Controller('user/time-blocks')
export class TimeBlockController {
	constructor(private readonly timeBlockService: TimeBlockService) {}

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: string) {
		return this.timeBlockService.getAll(userId)
	}

	@Auth()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Post()
	async create(@Body() dto: TimeBlockDto, @CurrentUser('id') userId: string) {
		return this.timeBlockService.create(dto, userId)
	}

	@Auth()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Put('update-order')
	async updateOrder(
		@Body() dto: TimeBlockDto,
		@Param('id') id: string,
		@CurrentUser() userId: string
	) {
		return this.timeBlockService.updateOrder(dto, id, userId)
	}

	@Delete(':id')
	@Auth()
	@HttpCode(200)
	async delete(@Param('id') id: string, @CurrentUser('id') userId: string) {
		return this.timeBlockService.delete(id, userId)
	}
}
