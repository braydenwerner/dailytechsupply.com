import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateCommentInput {
  @Field()
  item_uuid: string

  @Field({ nullable: true })
  parent_id: number

  @Field()
  text: string
}
