import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'

import { MyContext } from '../types'
import { getUserId } from '../utils'
import { User, Comment } from '../Entities'

@Resolver()
export class CommentResolver {
  @Query(() => [Comment])
  getComments(@Arg('item_uuid') item_uuid: string) {
    return Comment.find({
      where: { item_uuid },
      relations: ['user_id'],
    })
  }

  @Mutation(() => Boolean)
  async createComment(
    @Ctx() ctx: MyContext,
    @Arg('text') text: string,
    @Arg('item_uuid') item_uuid: string
  ) {
    const uid = getUserId(ctx)

    const user = await User.findOne({ uid })
    if (!user) return false

    const comment = await Comment.insert({
      item_uuid,
      user_id: user,
      text,
    })
    if (!comment) return false

    return true
  }
}
