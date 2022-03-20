import { Resolver, Query } from 'type-graphql'
// import { Query, Resolver, ObjectType, Field, Ctx } from 'type-graphql'

import { UserAccount } from '../Entities'
// import { MyContext } from 'src/types'
// import { FieldError } from './FieldError'

// @ObjectType()
// class UserResponse {
//   @Field(() => [FieldError], { nullable: true })
//   errors?: FieldError[]

//   @Field(() => UserAccount, { nullable: true })
//   user?: UserAccount

//   @Field(() => String, { nullable: true })
//   token?: string
// }

@Resolver()
export class UserResolver {
  @Query(() => UserAccount, { nullable: true }) getUser() {
    return null
  }
}
