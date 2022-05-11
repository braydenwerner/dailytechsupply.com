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
      relations: [
        'user_id',
        'parent_id',
        'parent_id.user_id',
        'comment_upvote_ids',
        'comment_upvote_ids.user_id',
      ],
    })
  }

  @Query(() => [Comment])
  async getCommentsByUser(@Ctx() ctx: MyContext) {
    const uid = getUserId(ctx)

    const user = await User.findOne({ uid })
    if (!user) return false

    return Comment.find({
      where: { user_id: user },
      relations: [
        'user_id',
        'parent_id',
        'parent_id.user_id',
        'comment_upvote_ids',
        'comment_upvote_ids.user_id',
      ],
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

  @Mutation(() => Boolean)
  async deleteComment(
    @Ctx() ctx: MyContext,
    @Arg('comment_id') comment_id: number
  ) {
    const uid = getUserId(ctx)

    const user = await User.findOne({ uid })
    if (!user) return false

    const comment = await Comment.findOne({ id: comment_id, user_id: user })
    if (!comment) return false

    await Comment.update(
      { id: comment_id, user_id: user },
      { is_deleted: true }
    )

    return true
  }
}
