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
import { PomodoroService } from './pomodoro.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { PomodoroRoundDto, PomodoroSessionDto } from './dto/pomodoro.dto'

@Controller('user/timer')
export class PomodoroController {
	constructor(private readonly pomodoroService: PomodoroService) {}

	@Get('today')
	@Auth()
	async getTodaySession(@CurrentUser('id') userId: string) {
		return this.pomodoroService.getTodaySession(userId)
	}

	@HttpCode(200)
	@Auth()
	@Post()
	async create(@CurrentUser('id') userId: string) {
		return this.pomodoroService.create(userId)
	}

	@HttpCode(200)
	@Auth()
	@UsePipes(new ValidationPipe())
	@Put('round/:id')
	async updateRound(@Param('id') id: string, @Body() dto: PomodoroRoundDto) {
		return this.pomodoroService.updateRound(dto, id)
	}

	@HttpCode(200)
	@Auth()
	@UsePipes(new ValidationPipe())
	@Put(':id')
	async update(
		@Body() dto: PomodoroSessionDto,
		@Param('id') id: string,
		@CurrentUser('id') userId: string
	) {
		return this.pomodoroService.update(dto, id, userId)
	}

	@Auth()
	@Delete(':id')
	async deleteSession(
		@Param('id') id: string,
		@CurrentUser('id') userId: string
	) {
		return this.pomodoroService.deleteSession(userId, id)
	}
}
