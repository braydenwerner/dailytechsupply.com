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
  async get3dPrinters(@Arg('data') d: GetPrinter3dInput) {
    const query = await createQueryBuilder('Printer3d')

    //  3d Printer queries
    if (d.minX && d.maxX)
      query.where('Printer3d.x_axis >= :minX AND Printer3d.x_axis <= :maxX', {
        minX: d.minX,
        maxX: d.maxX,
      })
    if (d.minY && d.maxY)
      query.andWhere(
        'Printer3d.y_axis >= :minY AND Printer3d.y_axis <= :maxY',
        {
          minY: d.minY,
          maxY: d.maxY,
        }
      )
    if (d.minZ && d.maxZ)
      query.andWhere(
        'Printer3d.z_axis >= :minZ AND Printer3d.z_axis <= :maxZ',
        {
          minZ: d.minZ,
          maxZ: d.maxZ,
        }
      )
    if (d.autoLeveling)
      query.andWhere('Printer3d.auto_leveling = :autoLeveling', {
        autoLeveling: d.autoLeveling,
      })
    if (d.resumePrinting)
      query.andWhere('Printer3d.resume_printing = :resumePrinting', {
        resumePrinting: d.resumePrinting,
      })
    if (d.removeableBuildSurface)
      query.andWhere(
        'Printer3d.removeable_build_surface = :removeableBuildSurface',
        {
          removeableBuildSurface: d.removeableBuildSurface,
        }
      )
    if (d.material)
      query.andWhere('Printer3d.material = :material', {
        removeableBuildSurface: d.removeableBuildSurface,
      })
    if (d.minWeight && d.maxWeight)
      query.andWhere(
        'Printer3d.weight >= :minWeight AND Printer3d.weight <= :maxWeight',
        {
          minWeight: d.minWeight,
          maxWeight: d.maxWeight,
        }
      )
    if (d.minVoltage && d.maxVoltage)
      query.andWhere(
        'Printer3d.voltage >= :minVoltage AND Printer3d.voltage <= :maxVoltage',
        {
          minVoltage: d.minVoltage,
          maxVoltage: d.maxVoltage,
        }
      )
    if (d.minWattage && d.maxWattage)
      query.andWhere(
        'Printer3d.wattage >= :minWattage AND Printer3d.wattage <= :maxWattage',
        {
          minWattage: d.minWattage,
          maxWattage: d.maxWattage,
        }
      )
    if (d.compatibleMaterial)
      query.andWhere('Printer3d.compatible_material = :compatibleMaterial', {
        compatibleMaterial: d.compatibleMaterial,
      })

    query.innerJoinAndSelect('Printer3d.item_id', 'Item')

    //  Item queries
    if (d.minPrice && d.maxPrice)
      query.andWhere('Item.price >= :minPrice AND Item.price <= :maxPrice', {
        minPrice: d.minPrice,
        maxPrice: d.maxPrice,
      })
    if (d.minRating)
      query.andWhere('Item.rating >= :minRating', { minRating: d.minRating })
    if (d.manufacturer)
      query.andWhere('Item.manufacturer = :manufacturer', {
        manufacturer: d.manufacturer,
      })

    query.orderBy('Printer3d.created_at', 'DESC')
    console.log('skipping: ' + d.pageSize * (d.pageNumber - 1))
    query.skip(d.pageSize * (d.pageNumber - 1))
    query.take(d.pageSize)

    const data = query.getMany()

    return data
  }
}
