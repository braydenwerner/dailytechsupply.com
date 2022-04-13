import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateUserInput {
  @Field()
  uid: string

  @Field({ nullable: true })
  first_name?: string

  @Field({ nullable: true })
  last_name?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  last_logged_in?: Date
}
