import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { User } from '.'

@ObjectType()
@Entity()
export class Notification extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user_id: User

  @Field()
  @Column()
  title: string

  @Field()
  @Column('text')
  text: string

  @Field()
  @Column()
  item_link: string

  @Field({ defaultValue: false })
  @Column({ default: false })
  is_read: boolean

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date
}
