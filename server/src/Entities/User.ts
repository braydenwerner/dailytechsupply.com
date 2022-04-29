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

  @Field()
  @Column()
  display_name: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  email: string

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  about: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  profile_picture_url: string

  @Field({ defaultValue: 0 })
  @Column({ default: 0 })
  reputation: number

  @Field(() => String, { nullable: true })
  @CreateDateColumn({ nullable: true })
  last_logged_in: Date

  @Field(() => String, { nullable: true })
  @CreateDateColumn({ nullable: true })
  last_updated_password: Date

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date
}
