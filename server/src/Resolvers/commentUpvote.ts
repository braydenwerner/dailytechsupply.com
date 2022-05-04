import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'

import { MyContext } from '../types'
import { getUserId } from '../utils'
import { User, Comment, CommentUpvote } from '../Entities'

@Resolver()
export class CommentUpvoteResolver {
  @Mutation(() => Boolean)
  async createCommentUpvote(
    @Ctx() ctx: MyContext,
    @Arg('comment_id') comment_id: number
  ) {
    const uid = getUserId(ctx)

    const user = await User.findOne({ uid })
    if (!user) return false

    const comment = await Comment.findOne({ id: comment_id })
    if (!comment) return false

    const upvote = await CommentUpvote.create({
      comment_id: comment,
      user_id: user,
    }).save()
    if (!upvote) return false

    return true
  }

  @Mutation(() => Boolean)
  async deleteCommentUpvote(
    @Ctx() ctx: MyContext,
    @Arg('comment_id') comment_id: number
  ) {
    const uid = getUserId(ctx)

    const user = await User.findOne({ uid })
    if (!user) return false

    const comment = await Comment.findOne({ id: comment_id })
    if (!comment) return false

    const res = await CommentUpvote.delete({
      comment_id: comment,
      user_id: user,
    })
    if (!res) return false

    return true
  }
}
