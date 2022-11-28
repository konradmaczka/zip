import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserEntity } from '../../entities/user.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDTO } from './dto/user.dto'

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

  async createUser(dto: CreateUserDTO) {
    const userExists = await this.userRepository.findOne({ where: { email: dto.email } })
    
    const moneyLeft = dto.monthlySalary - dto.monthlyExpenses
    if (moneyLeft < 0) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Bad Request',
        code: 'ER_BAD_REQUEST',
      }, HttpStatus.BAD_REQUEST)
    }

    if (userExists) {
      throw new HttpException({
        statusCode: HttpStatus.CONFLICT,
        error: 'Conflict',
        code: 'ER_DUP_ACC',
      }, HttpStatus.CONFLICT)
    }

    await this.userRepository.insert(dto)
  }

  listUsers(limit: number, offset: number) {
    return this.userRepository.find({ take: limit, skip: offset })
  }

  getUser(id: number) {
    return this.userRepository.findOne({ where: { id }})
  }
}
