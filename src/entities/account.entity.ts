import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm'
import { UserEntity } from './user.entity'

@Entity('account')
export class AccountEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'varchar', nullable: false })
  @Index({ unique: true })
  email: string

  @Column({ type: 'varchar', nullable: false })
  password: string

  @Column({ type: 'varchar', nullable: false })
  salt: string

  @CreateDateColumn()
  createdAt: Date

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity
}
