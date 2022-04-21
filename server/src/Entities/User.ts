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
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column({ unique: true })
  uid: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  first_name: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  last_name: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  display_name: string

  @Field()
  @Column()
  email: string

  @Field(() => String, { nullable: true })
  @CreateDateColumn()
  last_logged_in: Date

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date
}
