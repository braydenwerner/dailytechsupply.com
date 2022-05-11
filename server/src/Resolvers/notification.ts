import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'

import { MyContext } from '../types'
import { getUserId } from '../utils'
import { User, Notification } from '../Entities'

@Resolver()
export class NotificationResolver {
  @Query(() => [Notification])
  async getNotifications(@Ctx() ctx: MyContext) {
    const uid = getUserId(ctx)

    const user = await User.findOne({ uid })
    if (!user) return false

    return Notification.find({ user_id: user })
  }

  @Mutation(() => Boolean)
  async createNotification(
    @Arg('user_id') userId: number,
    @Arg('text') text: string
  ) {
    const user = await User.findOne({ id: userId })
    if (!user) return false

    const notification = await Notification.insert({
      user_id: user,
      text,
    })
    if (!notification) return false

    return true
  }

  @Mutation(() => Boolean)
  async updateNotification(
    @Ctx() ctx: MyContext,
    @Arg('is_read') is_read: boolean
  ) {
    const uid = getUserId(ctx)

    const user = await User.findOne({ uid })
    if (!user) return false

    await Notification.update({ user_id: user }, { is_read })

    return true
  }
}
