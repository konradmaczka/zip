import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm'
import { AccountEntity } from './account.entity'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'varchar', nullable: false })
  name: string

  @Column({ type: 'varchar', nullable: false })
  @Index({ unique: true })
  email: string

  @Column({ type: 'decimal', nullable: false })
  monthlySalary: number

  @Column({ type: 'decimal', nullable: false })
  monthlyExpenses: number

  @CreateDateColumn()
  createdAt: Date
}
