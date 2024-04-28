import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class PatientDto {
  @ApiProperty({ example: 1, description: 'ID' })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 'test@mail.ru', description: 'Почта' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+79001112233', description: 'Телефон' })
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({ example: 'Name', description: 'Имя' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'LastName', description: 'Фамилия' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: '2000-04-13', description: 'Дата рождения' })
  @IsDateString()
  @IsNotEmpty()
  birthday: Date;

  @ApiProperty({ example: 'patient', description: 'Роль' })
  role: string = 'patient';

  @ApiProperty({ example: '2000-04-13', description: 'Дата создания' })
  created_at: Date;
}
