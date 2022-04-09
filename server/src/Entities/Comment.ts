import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comment_ids, { primary: true })
  @JoinColumn({ name: 'id' })
  user_id!: User

  @Field()
  @Column('text')
  text: string
}
