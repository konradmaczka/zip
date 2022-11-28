import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrmConf } from './config'

import { AccountModule } from './module/account/account.module'
import { UserModule } from './module/user/user.module'

@Module({
  imports: [TypeOrmModule.forRoot(OrmConf), UserModule, AccountModule],
})
export class AppModule {}
