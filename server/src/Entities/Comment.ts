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

import { User, CommentUpvote } from '.'

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user_id: User

  @Field(() => Comment, { nullable: true })
  @ManyToOne(() => Comment, (comment) => comment.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'parent_id' })
  parent_id: Comment

  @Field(() => [CommentUpvote])
  @OneToMany(() => CommentUpvote, (commentUpvote) => commentUpvote.comment_id)
  comment_upvote_ids: CommentUpvote[]

  @Field()
  @Column()
  item_uuid!: string

  @Field()
  @Column('text')
  text: string

  @Field({ defaultValue: false })
  @Column({ default: false })
  is_deleted: boolean

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date
}
