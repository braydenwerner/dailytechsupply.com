import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql'
import { getManager } from 'typeorm'

import { MyContext } from '../types'
import { getUserId } from '../utils'
import { User, Notification } from '../Entities'

@ObjectType()
class NotificationResponse {
  @Field(() => [Notification])
  notifications: Notification[]

  @Field()
  gotLastNotification: boolean
}

@Resolver()
export class NotificationResolver {
  @Query(() => NotificationResponse)
  async getNotifications(
    @Ctx() ctx: MyContext,
    @Arg('num_notifications') num_notifications: number
  ) {
    const uid = getUserId(ctx)

    const user = await User.findOne({ uid })
    if (!user) return false

    const totalNotifications = await getManager().query(
      'SELECT COUNT(*) FROM notification WHERE user_id=$1',
      [user.id]
    )

    const notifications = await Notification.find({
      where: { user_id: user },
      order: { created_at: 'DESC' },
      take: num_notifications,
    })

    return {
      notifications,
      gotLastNotification: num_notifications >= totalNotifications[0].count,
    }
  }

  @Mutation(() => Boolean)
  async createNotification(
    @Arg('user_id') userId: number,
    @Arg('title') title: string,
    @Arg('text') text: string,
    @Arg('item_link') item_link: string
  ) {
    const user = await User.findOne({ id: userId })
    if (!user) return false

    const notification = await Notification.insert({
      user_id: user,
      title,
      text,
      item_link,
    })
    if (!notification) return false

    return true
  }

  @Mutation(() => Boolean)
  async setRead(@Ctx() ctx: MyContext) {
    const uid = getUserId(ctx)

    const user = await User.findOne({ uid })
    if (!user) return false

    await Notification.update({ user_id: user }, { is_read: true })

    return true
  }
}
