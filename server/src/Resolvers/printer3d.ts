import { Resolver, Query, Arg } from 'type-graphql'
import { Any, Between } from 'typeorm'

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
    const data = await Printer3d.find({
      order: {
        created_at: 'DESC',
      },
      where: {
        x_axis: d.minX && d.maxX ? Between(d.minX, d.maxX) : Any,
        y_axis: d.minY && d.maxY ? Between(d.minY, d.maxY) : Any,
        z_axis: d.minZ && d.maxZ ? Between(d.minZ, d.maxZ) : Any,
        auto_leveling: d.autoLeveling ? d.autoLeveling : Any,
        resume_printing: d.resumePrinting ? d.resumePrinting : Any,
        removeable_build_surface: d.removeableBuildSurface
          ? d.removeableBuildSurface
          : Any,
        material: d.material ? d.material : Any,
        weight:
          d.minWeight && d.maxWeight ? Between(d.minWeight, d.maxWeight) : Any,
        voltage:
          d.minVoltage && d.maxVoltage
            ? Between(d.minVoltage, d.maxVoltage)
            : Any,
        wattage:
          d.minWattage && d.maxWattage
            ? Between(d.minWattage, d.maxWattage)
            : Any,
        compatible_material: d.compatibleMaterial ? d.compatibleMaterial : Any,
      },
      relations: ['item_id'],
      skip: d.pageSize * (d.pageNumber - 1),
      take: d.pageSize,
    })

    return data
  }
}
