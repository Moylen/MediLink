import { IsDateString, IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UpdatePatientDto {
  @ApiProperty({ example: 'test@mail.ru', description: 'Почта' })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ example: '+79001112233', description: 'Телефон' })
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({ example: 'Name', description: 'Имя' })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({ example: 'LastName', description: 'Фамилия' })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({ example: '2000-04-13', description: 'Дата рождения' })
  @IsDateString()
  @IsOptional()
  birthday: Date;
}
