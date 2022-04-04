import { Resolver, Query, Arg } from 'type-graphql'
import { createQueryBuilder } from 'typeorm'

import { Printer3d } from '../Entities'
import { GetPrinter3dInput } from './GetPrinter3dInput'

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
  async get3dPrinters(@Arg('input') q: GetPrinter3dInput) {
    const query = await createQueryBuilder('Printer3d')

    //  3d Printer queries
    if (q.minX && q.maxX)
      query.where('Printer3d.x_axis >= :minX AND Printer3d.x_axis <= :maxX', {
        minX: q.minX,
        maxX: q.maxX,
      })
    if (q.minY && q.maxY)
      query.andWhere(
        'Printer3d.y_axis >= :minY AND Printer3d.y_axis <= :maxY',
        {
          minY: q.minY,
          maxY: q.maxY,
        }
      )
    if (q.minZ && q.maxZ)
      query.andWhere(
        'Printer3d.z_axis >= :minZ AND Printer3d.z_axis <= :maxZ',
        {
          minZ: q.minZ,
          maxZ: q.maxZ,
        }
      )
    if (q.autoLeveling)
      query.andWhere('Printer3d.auto_leveling = :autoLeveling', {
        autoLeveling: q.autoLeveling,
      })
    if (q.resumePrinting)
      query.andWhere('Printer3d.resume_printing = :resumePrinting', {
        resumePrinting: q.resumePrinting,
      })
    if (q.removeableBuildSurface)
      query.andWhere(
        'Printer3d.removeable_build_surface = :removeableBuildSurface',
        {
          removeableBuildSurface: q.removeableBuildSurface,
        }
      )
    if (q.material)
      query.andWhere('Printer3d.material = :material', {
        material: q.material,
      })
    if (q.minWeight && q.maxWeight)
      query.andWhere(
        'Printer3d.weight >= :minWeight AND Printer3d.weight <= :maxWeight',
        {
          minWeight: q.minWeight,
          maxWeight: q.maxWeight,
        }
      )
    if (q.minVoltage && q.maxVoltage)
      query.andWhere(
        'Printer3d.voltage >= :minVoltage AND Printer3d.voltage <= :maxVoltage',
        {
          minVoltage: q.minVoltage,
          maxVoltage: q.maxVoltage,
        }
      )
    if (q.minWattage && q.maxWattage)
      query.andWhere(
        'Printer3d.wattage >= :minWattage AND Printer3d.wattage <= :maxWattage',
        {
          minWattage: q.minWattage,
          maxWattage: q.maxWattage,
        }
      )
    if (q.compatibleMaterial)
      query.andWhere('Printer3d.compatible_material = :compatibleMaterial', {
        compatibleMaterial: q.compatibleMaterial,
      })

    query.innerJoinAndSelect('Printer3d.item_id', 'Item')

    //  Item queries
    if (q.minPrice && q.maxPrice)
      query.andWhere('Item.price >= :minPrice AND Item.price <= :maxPrice', {
        minPrice: q.minPrice,
        maxPrice: q.maxPrice,
      })
    if (q.minRating)
      query.andWhere('Item.rating >= :minRating', { minRating: q.minRating })
    if (q.manufacturer)
      query.andWhere('Item.manufacturer = :manufacturer', {
        manufacturer: q.manufacturer,
      })

    query.orderBy('Printer3d.created_at', 'DESC')
    query.skip(q.pageSize * (q.pageNumber - 1))
    query.take(q.pageSize)

    const data = query.getMany()

    return data
  }
}
