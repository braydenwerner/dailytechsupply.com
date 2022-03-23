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
  @Column()
  title: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string

  @Field()
  @Column()
  price: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  rating: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  manufacturer: string

  @Field()
  @Column()
  sold_by: string

  @Field()
  @Column()
  URL: string

  @Field()
  @Column()
  image_URL: string

  @Field({ defaultValue: false })
  @Column({ default: false })
  isAffiliate: boolean

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date
}
