import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../guards/jsw.guard'

export const Auth = () => UseGuards(JwtAuthGuard)
