import { Resolver, Query, Arg, ObjectType, Field } from 'type-graphql'
import { getManager } from 'typeorm'

import { FieldError } from './FieldError'
import { Item, Printer3d } from '../Entities'

@ObjectType()
class PrinterResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => Item)
  generalProps: Item

  @Field(() => Printer3d)
  specificProps: Printer3d
}

@Resolver()
export class Printer3dResolver {
  //  Should do a table join here, but typeGraphQL does not like joining
  //  types ex: Item & Printed3d as the return value for this
  @Query(() => PrinterResponse, { nullable: true })
  async getItem(@Arg('id') id: number) {
    const generalProps = (
      await getManager()
        .query(`SELECT * FROM item WHERE id=${id};`)
        .catch((err) => {
          return { errors: [{ field: 'getItem', message: err }] }
        })
    )[0]

    const specificProps = (
      await getManager()
        .query(`SELECT * FROM printer3d WHERE id=${id};`)
        .catch((err) => {
          return { errors: [{ field: 'getItem', message: err }] }
        })
    )[0]

    return { generalProps, specificProps }
  }
}
