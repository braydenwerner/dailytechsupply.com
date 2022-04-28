import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'

import { MyContext } from '../types'
import { getUserId } from '../utils'
import { User, Review } from '../Entities'

@Resolver()
export class ReviewResolver {
  @Query(() => [Review])
  getReviews(@Arg('item_uuid') item_uuid: string) {
    return Review.find({
      where: { item_uuid },
      relations: ['user_id'],
    })
  }

  @Mutation(() => Boolean)
  async createReview(
    @Ctx() ctx: MyContext,
    @Arg('text') text: string,
    @Arg('item_uuid') item_uuid: string
  ) {
    const uid = getUserId(ctx)

    const user = await User.findOne({ uid })
    if (!user) return false

    const review = await Review.insert({
      item_uuid,
      user_id: user,
      text,
    })
    if (!review) return false

    return true
  }
}
