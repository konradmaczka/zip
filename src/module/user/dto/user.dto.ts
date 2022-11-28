import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator'

export class CreateUserDTO {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsNumber()
  monthlySalary: number

  @ApiProperty()
  @IsNumber()
  monthlyExpenses: number
}

export class ListUsersDTO {
  @ApiProperty({ 
    description: 'Max number of returned user entities. Default 100.', 
    required: false, 
    type: 'number' 
  })
  @IsNumberString()
  @IsOptional()
  limit: number

  @ApiProperty({ 
    description: 'Offset of user entities. Default 0.', 
    required: false, 
    type: 'number' 
  })
  @IsNumberString()
  @IsOptional()
  offset: number
}

export class GetUserDTO {
  @ApiProperty()
  @IsNumberString()
  id: number
}