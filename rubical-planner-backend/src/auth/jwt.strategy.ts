import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { UserService } from '../user/user.service'
import { ConfigService } from '@nestjs/config'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private configService: ConfigService,
		private userService: UserService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: configService.get('JWT_SECRET')
		})
	}
	async validate({ id }: { id: string }) {
		return this.userService.getById(id)
	}
}
