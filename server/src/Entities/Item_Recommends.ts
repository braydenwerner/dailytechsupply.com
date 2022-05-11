import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User, Item } from '.'

@ObjectType()
@Entity()
export class ItemRecommend extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  item_id: number

  @Field(() => Item)
  @ManyToOne(() => Item, (item) => item.id)
  @JoinColumn({ name: 'item_id' })
  item: Item

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user_id: User

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date
}
