import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@ObjectType()
@Entity()
export class UserAccount extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column({ unique: true })
  uid: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  email: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  country: string

  @Field(() => String, { nullable: true })
  @CreateDateColumn()
  lastLoggedIn: Date

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
