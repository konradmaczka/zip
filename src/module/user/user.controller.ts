import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDTO, GetUserDTO, ListUsersDTO } from './dto/user.dto'
import { UserService } from './user.service'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async createUser(@Body() dto: CreateUserDTO) {
    return this.userService.createUser(dto)
  }

  @Get('/')
  async listUsers(@Query() { limit = 100, offset = 0 }: ListUsersDTO) {
    return this.userService.listUsers(limit, offset)
  }

  @Get('/:id')
  async getUser(@Param() { id }: GetUserDTO) {
    return this.userService.getUser(id)
  }
}
