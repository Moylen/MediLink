import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


enum UserRole {
  Patient = 'patient',
  Doctor = 'doctor'
}

export class LoginDto {
  @ApiProperty({ example: 'test@mail.ru', description: 'Почта' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'testPass123', description: 'Пароль' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: ['patient', 'doctor'], description: 'Роль' })
  @IsEnum(UserRole)
  role: UserRole;
}
