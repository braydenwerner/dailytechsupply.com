import { Field, InputType } from 'type-graphql'

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  display_name?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  about: string

  @Field({ nullable: true })
  profile_picture_url: string

  @Field({ nullable: true })
  reputation: number

  @Field({ nullable: true })
  last_logged_in?: Date
}
