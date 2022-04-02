import { Field, InputType } from 'type-graphql'

@InputType()
export class GetPrinter3dInput {
  @Field({ nullable: true })
  minPrice: number

  @Field({ nullable: true })
  maxPrice: number

  @Field({ nullable: true })
  minRating: number

  @Field({ nullable: true })
  manufacturer: string

  @Field({ nullable: true })
  minX: number

  @Field({ nullable: true })
  maxX: number

  @Field({ nullable: true })
  minY: number

  @Field({ nullable: true })
  maxY: number

  @Field({ nullable: true })
  minZ: number

  @Field({ nullable: true })
  maxZ: number

  @Field({ nullable: true })
  autoLeveling: boolean

  @Field({ nullable: true })
  resumePrinting: boolean

  @Field({ nullable: true })
  removeableBuildSurface: boolean

  @Field({ nullable: true })
  material: string

  @Field({ nullable: true })
  minWeight: number

  @Field({ nullable: true })
  maxWeight: number

  @Field({ nullable: true })
  minVoltage: number

  @Field({ nullable: true })
  maxVoltage: number

  @Field({ nullable: true })
  minWattage: number

  @Field({ nullable: true })
  maxWattage: number

  @Field({ nullable: true })
  compatibleMaterial: string

  @Field()
  pageSize: number

  @Field()
  pageNumber: number
}
