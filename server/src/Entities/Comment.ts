import { Field, InputType, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from '.'

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user_id!: User

  @Field(() => Comment, { nullable: true })
  @ManyToOne(() => Comment, (comment) => comment.id, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent_id!: Comment

  @Field()
  @Column()
  item_uuid!: string

  @Field()
  @Column('text')
  text: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  rating: number

  @Field({ defaultValue: false })
  @Column({ default: false })
  is_deleted: boolean

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date
}
