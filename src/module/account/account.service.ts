import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AccountEntity } from 'src/entities/account.entity'
import { UserEntity } from 'src/entities/user.entity'
import { Repository } from 'typeorm'
import { encrypt } from 'src/utils/cryptography'
import crypto = require('crypto')


@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>, 
    @InjectRepository(AccountEntity) private accountRepository: Repository<AccountEntity>
  ) {}

  async createAccount(email: string, password: string) {
    const account = await this.accountRepository.findOne({ where: { email } })

    if (account) {
      throw new HttpException({
        statusCode: HttpStatus.CONFLICT,
        error: 'Account already exists.',
        code: 'ER_DUP_ACC',
      }, HttpStatus.CONFLICT)
    }

    const user = await this.userRepository.findOne({ where: { email } })

    if (!user) {
      throw new HttpException({
        statusCode: HttpStatus.CONFLICT,
        error: 'User does not exist.',
        code: 'ER_MISSING_USER',
      }, HttpStatus.CONFLICT)
    }

    const salt = crypto.randomBytes(32).toString('hex')
    const hash = crypto.createHash('sha256').update(salt + password).digest('hex')

    await this.accountRepository.insert({ email, password: hash, salt, user })
  }

  async login(email: string, password: string) {
    const user = await this.accountRepository.findOne({ where: { email }, relations: ['user'] })

    if (!user) {
      throw new HttpException({
        statusCode: HttpStatus.UNAUTHORIZED,
        error: 'Unauthorized',
        code: 'ER_UNAUTHORIZED',
      }, HttpStatus.UNAUTHORIZED)
    }

    const { password: hash, salt } = user

    if (crypto.createHash('sha256').update(salt + password).digest('hex') !== hash) {
      throw new HttpException({
        statusCode: HttpStatus.UNAUTHORIZED,
        error: 'Unauthorized',
        code: 'ER_UNAUTHORIZED',
      }, HttpStatus.UNAUTHORIZED)
    }

    const tokenData = {
      id: user.user.id,
      tokenCreatedAt: new Date().getTime(),
      tokenValidTill: new Date().getTime() + Number(process.env.TOKEN_VALID_MS),
    }

    const crypted = encrypt(tokenData)

    return { token: crypted }
  }

  getSelf(id: number) {
    return this.userRepository.findOne({ where: { id } })
  }
}

