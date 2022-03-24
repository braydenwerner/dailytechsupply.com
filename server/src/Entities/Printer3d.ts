import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, JoinColumn, OneToOne } from 'typeorm'

import { Item } from './index'

@ObjectType()
@Entity()
export class Printer3d extends BaseEntity {
  @Field()
  @OneToOne(() => Item, (item) => item.id, { primary: true })
  @JoinColumn({ name: 'id' })
  item_id!: Item

  @Field()
  @Column()
  x_axis: number

  @Field()
  @Column()
  y_axis: number

  @Field()
  @Column()
  z_axis: number

  @Field()
  @Column()
  auto_leveling: boolean

  @Field()
  @Column()
  resume_printing: boolean

  @Field()
  @Column()
  removeable_build_surface: boolean
}
