import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	Max,
	Min,
	MinLength
} from 'class-validator'

export class PomodoroSettingsDto {
	@IsOptional()
	@IsNotEmpty()
	@Min(1)
	workInterval?: number

	@IsOptional()
	@IsNotEmpty()
	@Min(1)
	breakInterval?: number

	@IsOptional()
	@IsNotEmpty()
	@Min(1)
	@Max(10)
	intervalsCount?: number
}

export class UserDto extends PomodoroSettingsDto {
	@IsEmail()
	@IsOptional()
	email: string

	@IsString()
	@IsOptional()
	name?: string

	@MinLength(6, {
		message: 'Password must be at least 6 characters'
	})
	@IsString()
	@IsOptional()
	password: string
}
