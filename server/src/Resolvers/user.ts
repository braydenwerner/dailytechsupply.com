import {
  Query,
  Mutation,
  Resolver,
  Arg,
  ObjectType,
  Field,
  Ctx,
} from 'type-graphql'

import { __prod__ } from '../constants/constants'
import { MyContext } from '../types'
import { FieldError } from './FieldError'
import { User } from '../Entities/index'
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

  @Mutation(() => UserResponse)
  async login(@Arg('uid') uid: string) {
    const user = await User.findOne({ uid })

    if (!user) {
      return { errors: [{ field: 'login', message: 'Could not find user' }] }
    }

    return { user, token: createToken(uid) }
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
}
