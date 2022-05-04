import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User, Comment } from '.'

@ObjectType()
@Entity()
export class CommentUpvote extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => Comment)
  @ManyToOne(() => Comment, (comment) => comment.comment_upvote_ids)
  @JoinColumn({ name: 'comment_id' })
  comment_id: Comment

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user_id: User

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date
}
