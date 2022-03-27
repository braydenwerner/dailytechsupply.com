import { Field, Float, ObjectType } from 'type-graphql'
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
export class Item extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  title: string

  @Field()
  @Column({ nullable: true })
  description: string

  @Field(() => Float)
  @Column({ type: 'float' })
  price: number

  @Field(() => Float)
  @Column({ nullable: true, type: 'float' })
  rating: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  manufacturer: string

  @Field()
  @Column()
  sold_by: string

  @Field()
  @Column()
  url: string

  @Field()
  @Column()
  image_url: string

  @Field({ defaultValue: false })
  @Column({ default: false })
  is_affiliate: boolean

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date
}
