import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'
import { UserService } from './user.service'

describe('Users controller', () => {
  let controller: UserController

  const mockUsers = [
    {
      id: 1,
      name: '',
      email: 'example@example.com',
      monthlySalary: 1000,
      monthlyExpenses: 1000,
      createdAt: '2022-11-28T08:00:00'
    }
  ]

  const mockUserService = {
    getUser: jest.fn().mockImplementation(({ id }) => {
      return {
        id: 1,
        name: '',
        email: 'example@example.com',
        monthlySalary: 1000,
        monthlyExpenses: 1000,
        createdAt: '2022-11-28T08:00:00'
      }
    }),
    listUsers: jest.fn().mockImplementation(() => {
      return [
        {
          id: 1,
          name: '',
          email: 'example@example.com',
          monthlySalary: 1000,
          monthlyExpenses: 1000,
          createdAt: '2022-11-28T08:00:00'
        }
      ]
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService]
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile()

    controller = module.get<UserController>(UserController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('receive an user', async () => {
    expect(await controller.getUser({ id: 1 })).toEqual(mockUsers.find((user) => user.id === 1))

    expect(mockUserService.getUser).toHaveBeenCalled()
  })

  it('lists users', async () => {
    expect(await controller.listUsers({ limit: 100, offset: 0})).toEqual(mockUsers)
  })
})