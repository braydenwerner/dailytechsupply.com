import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'

import { MyContext } from '../types'
import { getUserId } from '../utils'
import { User, Item, ItemRecommend } from '../Entities'

@Resolver()
export class ItemRecommendResolver {
  @Query(() => [ItemRecommend])
  getItemRecommends(@Ctx() ctx: MyContext, @Arg('item_id') item_id: number) {
    return ItemRecommend.find({
      where: { item_id },
      relations: ['user_id'],
    })
  }

  @Mutation(() => Boolean)
  async createItemRecommend(
    @Ctx() ctx: MyContext,
    @Arg('item_id') item_id: number
  ) {
    const uid = getUserId(ctx)

    const user = await User.findOne({ uid })
    if (!user) return false

    const item = await Item.findOne({ id: item_id })
    if (!item) return false

    const recommend = await ItemRecommend.create({
      item_id,
      item,
      user_id: user,
    }).save()
    if (!recommend) return false

    return true
  }

  @Mutation(() => Boolean)
  async deleteItemRecommend(
    @Ctx() ctx: MyContext,
    @Arg('item_id') item_id: number
  ) {
    const uid = getUserId(ctx)

    const user = await User.findOne({ uid })
    if (!user) return false

    const item = await Item.findOne({ id: item_id })
    if (!item) return false

    const res = await ItemRecommend.delete({
      item_id,
      item: item,
      user_id: user,
    })
    if (!res) return false

    return true
  }
}
