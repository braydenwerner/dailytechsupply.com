import { Field, Float, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm'

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
  @Generated('uuid')
  uuid: string

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true, type: 'float' })
  x_axis: number

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true, type: 'float' })
  y_axis: number

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true, type: 'float' })
  z_axis: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  auto_leveling: boolean

  @Field({ nullable: true })
  @Column({ nullable: true })
  resume_printing: boolean

  @Field({ nullable: true })
  @Column({ nullable: true })
  removeable_build_surface: boolean

  @Field({ nullable: true })
  @Column({ nullable: true })
  material: string

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true, type: 'float' })
  weight: number

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true, type: 'float' })
  voltage: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  wattage: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  compatible_material: string

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date
}
