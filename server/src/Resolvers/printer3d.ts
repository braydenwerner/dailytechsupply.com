import { Resolver, Query, Arg } from 'type-graphql'

import { Printer3d } from '../Entities'

@Resolver()
export class Printer3dResolver {
  @Query(() => Printer3d, { nullable: true })
  async get3dPrinter(@Arg('id') id: number) {
    const data = await Printer3d.findOne({
      where: { item_id: id },
      relations: ['item_id'],
    })

    return data
  }

  @Query(() => [Printer3d], { nullable: true })
  async get3dPrinters(
    @Arg('pageSize') pageSize: number,
    @Arg('pageNumber') pageNumber: number
  ) {
    const data = await Printer3d.find({
      order: {
        created_at: 'DESC',
      },
      relations: ['item_id'],
      skip: pageSize * (pageNumber - 1),
      take: pageSize,
    })

    return data
  }

  @Query(() => [Printer3d], { nullable: true })
  async getAll3dPrinters() {
    const data = await Printer3d.find({
      order: {
        created_at: 'DESC',
      },
      relations: ['item_id'],
    })

    return data
  }
}
