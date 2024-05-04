import { IsDateString, IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEnum } from '../../common/enums/user-role.enum';


export class CreatePatientDto {
  @ApiProperty({ example: 'test@mail.ru', description: 'Почта' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'testPass123', description: 'Пароль' })
  @IsNotEmpty()
  password: string;

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

  role: string = UserRoleEnum.Patient;
}
