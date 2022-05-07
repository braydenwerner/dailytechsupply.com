import { Item, Maybe, User } from './generated/graphql'

export type ItemProperties = {
  [x: string]: string | number | boolean | Item | null | undefined
}

export type UserData =
  | Maybe<
      {
        __typename?: 'User' | undefined
      } & Pick<
        User,
        | 'id'
        | 'uid'
        | 'display_name'
        | 'email'
        | 'about'
        | 'profile_picture_url'
        | 'last_updated_password'
        | 'created_at'
      >
    >
  | undefined
