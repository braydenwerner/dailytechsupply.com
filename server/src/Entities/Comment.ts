import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { User } from '.'

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.id, { primary: true })
  @JoinColumn({ name: 'user_id' })
  user_id!: User

  @Field()
  @Column()
  item_uuid!: string

  @Field()
  @Column('text')
  text: string
}
