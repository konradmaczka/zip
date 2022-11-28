import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/guards/AuthGuard'
import { AccountService } from './account.service'
import { CreateAccountDTO, LoginDTO } from './dto/account.dto'

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/')
  createAccount(@Body() { email, password }: CreateAccountDTO) {
    return this.accountService.createAccount(email, password)
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() { email, password }: LoginDTO) {
    return this.accountService.login(email, password)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/me')
  getSelf(@Request() { user: { id } }) {
    return this.accountService.getSelf(id)
  }
}