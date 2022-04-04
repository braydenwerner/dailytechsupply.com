import { Field, Float, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
@Entity()
export class Item extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  title: string

  @Field({ nullable: true })
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
}
