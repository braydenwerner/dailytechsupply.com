import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'

import { MyContext } from '../types'
import { getUserId } from '../utils'
import { User, Comment } from '../Entities'
import { CreateCommentInput } from './CreateCommentInput'

@Resolver()
export class CommentResolver {
  @Query(() => [Comment])
  getComments(@Arg('item_uuid') item_uuid: string) {
    return Comment.find({
      where: { item_uuid },
      relations: ['user_id', 'parent_id'],
    })
  }

  @Mutation(() => Boolean)
  async createComment(
    @Ctx() ctx: MyContext,
    @Arg('input') input: CreateCommentInput
  ) {
    const uid = getUserId(ctx)

    const user = await User.findOne({ uid })
    if (!user) return false

    const parent = await Comment.findOne({ id: input.parent_id })

    const comment = await Comment.insert({
      user_id: user,
      item_uuid: input.item_uuid,
      parent_id: parent,
      text: input.text,
    })
    if (!comment) return false

    return true
  }
}
