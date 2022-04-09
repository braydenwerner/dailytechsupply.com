import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Comment } from './Comment'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.id, { primary: true })
  @JoinColumn({ name: 'id' })
  comment_ids!: Comment[]

  @Field()
  @Column({ unique: true })
  uid: string

  @Field()
  @Column()
  first_name: string

  @Field()
  @Column()
  last_name: string

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
