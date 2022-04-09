import { Arg, Mutation, Query, Resolver } from 'type-graphql'

import { MyContext } from '../types'
import { getUserId } from '../utils'
import { User, Comment } from '../Entities'

@Resolver()
export class CommentResolver {
  @Query(() => [Comment])
  async getComments(@Arg('item_uuid') item_uuid: string) {
    return Comment.find({ where: { item_uuid }, relations: ['user_id'] })
  }

  @Mutation(() => Boolean)
  async createComment(
    ctx: MyContext,
    @Arg('text') text: string,
    @Arg('item_uuid') item_uuid: string
  ) {
    const id = getUserId(ctx)

    const user = await User.findOne(id)
    if (!user) return false

    const comment = await Comment.create({
      item_uuid,
      user_id: user,
      text,
    }).save()
    if (!comment) return false

    return true
  }
}
