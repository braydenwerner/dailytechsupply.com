import {
  Query,
  Mutation,
  Resolver,
  Arg,
  ObjectType,
  Field,
  Ctx,
} from 'type-graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { v4 as uuid } from 'uuid'

import { bucket } from '..'
import { __prod__ } from '../constants/constants'
import { MyContext } from '../types'
import { FieldError } from './FieldError'
import {
  User,
  Comment,
  Notification,
  CommentUpvote,
  ItemRecommend,
} from '../Entities/index'
import { UpdateUserInput } from './UpdateUserInput'
import { CreateUserInput } from './CreateUserInput'
import { createToken, getUserId } from '../utils'

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => User, { nullable: true })
  user?: User

  @Field(() => String, { nullable: true })
  token?: string
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  getUser(@Ctx() ctx: MyContext) {
    const uid = getUserId(ctx)

    return User.findOne({ uid })
  }

  @Query(() => User, { nullable: true })
  getUserById(@Arg('uid') uid: string) {
    return User.findOne({ uid })
  }

  @Query(() => [User], { nullable: true })
  getUsers() {
    return User.find()
  }

  @Mutation(() => UserResponse)
  async createUser(
    @Arg('input') input: CreateUserInput
  ): Promise<UserResponse> {
    let user: User

    try {
      user = await User.create({ ...input }).save()
    } catch (err) {
      return { errors: [{ field: 'createUser', message: err }] }
    }

    return { user, token: createToken(input.uid) }
  }

  @Mutation(() => Boolean)
  updateUser(@Ctx() ctx: MyContext, @Arg('input') input: UpdateUserInput) {
    const uid = getUserId(ctx)

    User.update(
      { uid },
      {
        ...input,
      }
    )

    return true
  }

  @Mutation(() => Boolean)
  async deleteUser(@Ctx() ctx: MyContext) {
    const uid = getUserId(ctx)

    const user = await User.findOne({ uid })
    if (!user) return false

    if (user?.profile_picture_url)
      await bucket
        .file(
          user.profile_picture_url.split(
            `https://storage.googleapis.com/${process.env.BUCKET}/`
          )[1]
        )
        .delete()

    await Comment.update(
      { user_id: user },
      { is_deleted: true, user_id: undefined }
    )
    await CommentUpvote.update({ user_id: user }, { user_id: undefined })
    await ItemRecommend.update({ user_id: user }, { user_id: undefined })

    await Notification.delete({ user_id: user })
    await User.delete({ uid })

    return true
  }

  @Mutation(() => UserResponse)
  async login(@Arg('uid') uid: string) {
    const user = await User.findOne({ uid })

    if (!user) {
      return { errors: [{ field: 'login', message: 'Could not find user' }] }
    }

    return { user, token: createToken(uid) }
  }

  @Mutation(() => Boolean)
  async uploadProfilePicture(
    @Ctx() ctx: MyContext,
    @Arg('image', () => [GraphQLUpload]) file: FileUpload[]
  ) {
    const uid = getUserId(ctx)

    let id = uuid()
    const { createReadStream, mimetype } = await file[0]
    if (mimetype === 'image/png') id += '.png'
    else if (mimetype === 'image/jpeg') id += '.jpeg'
    else {
      console.error('Invalid image type')
      return false
    }

    //  try to delete the current user's profile image, then add the new image
    try {
      const user = await User.findOne({ uid })

      if (user?.profile_picture_url)
        await bucket
          .file(
            user.profile_picture_url.split(
              `https://storage.googleapis.com/${process.env.BUCKET}/`
            )[1]
          )
          .delete()

      await new Promise((res) =>
        createReadStream()
          .pipe(
            bucket.file(id).createWriteStream({
              resumable: false,
              gzip: true,
            })
          )
          .on('finish', res)
      )

      User.update(
        { uid },
        {
          profile_picture_url: `https://storage.googleapis.com/${process.env.BUCKET}/${id}`,
        }
      )

      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  async deleteProfilePicture(@Ctx() ctx: MyContext) {
    const uid = getUserId(ctx)

    const user = await User.findOne({ uid })

    if (!user?.profile_picture_url) return false

    try {
      await bucket
        .file(
          user.profile_picture_url.split(
            `https://storage.googleapis.com/${process.env.BUCKET}/`
          )[1]
        )
        .delete()

      User.update(
        { uid },
        {
          profile_picture_url: undefined,
        }
      )
      return true
    } catch (err) {
      return false
    }
  }
}
