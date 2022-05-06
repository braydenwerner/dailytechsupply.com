import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

export type Comment = {
  __typename?: 'Comment'
  id: Scalars['Float']
  user_id: User
  parent_id?: Maybe<Comment>
  comment_upvote_ids: Array<CommentUpvote>
  item_uuid: Scalars['String']
  text: Scalars['String']
  is_deleted?: Maybe<Scalars['Boolean']>
  created_at: Scalars['String']
}

export type CommentUpvote = {
  __typename?: 'CommentUpvote'
  id: Scalars['Float']
  comment_id: Comment
  user_id: User
  created_at: Scalars['String']
}

export type CreateCommentInput = {
  item_uuid: Scalars['String']
  parent_id?: Maybe<Scalars['Float']>
  text: Scalars['String']
}

export type CreateUserInput = {
  uid: Scalars['String']
  display_name: Scalars['String']
  email?: Maybe<Scalars['String']>
  last_logged_in?: Maybe<Scalars['DateTime']>
}

export type FieldError = {
  __typename?: 'FieldError'
  field: Scalars['String']
  message: Scalars['String']
}

export type GetPrinter3dInput = {
  minPrice?: Maybe<Scalars['Float']>
  maxPrice?: Maybe<Scalars['Float']>
  minRating?: Maybe<Scalars['Float']>
  manufacturer?: Maybe<Scalars['String']>
  minX?: Maybe<Scalars['Float']>
  maxX?: Maybe<Scalars['Float']>
  minY?: Maybe<Scalars['Float']>
  maxY?: Maybe<Scalars['Float']>
  minZ?: Maybe<Scalars['Float']>
  maxZ?: Maybe<Scalars['Float']>
  autoLeveling?: Maybe<Scalars['Boolean']>
  resumePrinting?: Maybe<Scalars['Boolean']>
  removeableBuildSurface?: Maybe<Scalars['Boolean']>
  material?: Maybe<Scalars['String']>
  minWeight?: Maybe<Scalars['Float']>
  maxWeight?: Maybe<Scalars['Float']>
  minVoltage?: Maybe<Scalars['Float']>
  maxVoltage?: Maybe<Scalars['Float']>
  minWattage?: Maybe<Scalars['Float']>
  maxWattage?: Maybe<Scalars['Float']>
  compatibleMaterial?: Maybe<Scalars['String']>
  pageSize: Scalars['Float']
  pageNumber: Scalars['Float']
}

export type Item = {
  __typename?: 'Item'
  id: Scalars['Float']
  title: Scalars['String']
  description?: Maybe<Scalars['String']>
  price: Scalars['Float']
  rating: Scalars['Float']
  manufacturer?: Maybe<Scalars['String']>
  sold_by: Scalars['String']
  url: Scalars['String']
  image_url: Scalars['String']
  is_affiliate?: Maybe<Scalars['Boolean']>
}

export type Mutation = {
  __typename?: 'Mutation'
  createUser: UserResponse
  updateUser: Scalars['Boolean']
  deleteUser: Scalars['Boolean']
  login: UserResponse
  uploadProfilePicture: Scalars['Boolean']
  deleteProfilePicture?: Maybe<Scalars['Boolean']>
  createComment: Scalars['Boolean']
  deleteComment: Scalars['Boolean']
  createCommentUpvote: Scalars['Boolean']
  deleteCommentUpvote: Scalars['Boolean']
  createItemRecommend: Scalars['Boolean']
  deleteItemRecommend: Scalars['Boolean']
}

export type MutationCreateUserArgs = {
  input: CreateUserInput
}

export type MutationUpdateUserArgs = {
  input: UpdateUserInput
}

export type MutationLoginArgs = {
  uid: Scalars['String']
}

export type MutationUploadProfilePictureArgs = {
  image: Array<Scalars['Upload']>
}

export type MutationCreateCommentArgs = {
  input: CreateCommentInput
}

export type MutationDeleteCommentArgs = {
  comment_id: Scalars['Float']
}

export type MutationCreateCommentUpvoteArgs = {
  comment_id: Scalars['Float']
}

export type MutationDeleteCommentUpvoteArgs = {
  comment_id: Scalars['Float']
}

export type MutationCreateItemRecommendArgs = {
  item_id: Scalars['Float']
}

export type MutationDeleteItemRecommendArgs = {
  item_id: Scalars['Float']
}

export type Printer3d = {
  __typename?: 'Printer3d'
  item_id: Item
  uuid: Scalars['String']
  x_axis?: Maybe<Scalars['Float']>
  y_axis?: Maybe<Scalars['Float']>
  z_axis?: Maybe<Scalars['Float']>
  auto_leveling?: Maybe<Scalars['Boolean']>
  resume_printing?: Maybe<Scalars['Boolean']>
  removeable_build_surface?: Maybe<Scalars['Boolean']>
  material?: Maybe<Scalars['String']>
  weight?: Maybe<Scalars['Float']>
  voltage?: Maybe<Scalars['Float']>
  wattage?: Maybe<Scalars['Float']>
  compatible_material?: Maybe<Scalars['String']>
  created_at: Scalars['String']
  updated_at: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  getUser?: Maybe<User>
  getUserById?: Maybe<User>
  getUsers?: Maybe<Array<User>>
  get3dPrinterByUUID?: Maybe<Printer3d>
  get3dPrinters?: Maybe<Array<Printer3d>>
  getComments: Array<Comment>
}

export type QueryGetUserByIdArgs = {
  uid: Scalars['String']
}

export type QueryGet3dPrinterByUuidArgs = {
  uuid: Scalars['String']
}

export type QueryGet3dPrintersArgs = {
  input?: Maybe<GetPrinter3dInput>
}

export type QueryGetCommentsArgs = {
  item_uuid: Scalars['String']
}

export type UpdateUserInput = {
  display_name?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  about?: Maybe<Scalars['String']>
  profile_picture_url?: Maybe<Scalars['String']>
  reputation?: Maybe<Scalars['Float']>
  last_logged_in?: Maybe<Scalars['DateTime']>
  last_updated_password?: Maybe<Scalars['DateTime']>
}

export type User = {
  __typename?: 'User'
  id: Scalars['Float']
  uid: Scalars['String']
  display_name: Scalars['String']
  email?: Maybe<Scalars['String']>
  about?: Maybe<Scalars['String']>
  profile_picture_url?: Maybe<Scalars['String']>
  reputation?: Maybe<Scalars['Float']>
  last_logged_in?: Maybe<Scalars['String']>
  last_updated_password?: Maybe<Scalars['String']>
  created_at: Scalars['String']
  updated_at: Scalars['String']
}

export type UserResponse = {
  __typename?: 'UserResponse'
  errors?: Maybe<Array<FieldError>>
  user?: Maybe<User>
  token?: Maybe<Scalars['String']>
}

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput
}>

export type CreateCommentMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'createComment'
>

export type CreateCommentUpvoteMutationVariables = Exact<{
  comment_id: Scalars['Float']
}>

export type CreateCommentUpvoteMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'createCommentUpvote'
>

export type CreateItemRecommendMutationVariables = Exact<{
  item_id: Scalars['Float']
}>

export type CreateItemRecommendMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'createItemRecommend'
>

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput
}>

export type CreateUserMutation = { __typename?: 'Mutation' } & {
  createUser: { __typename?: 'UserResponse' } & Pick<UserResponse, 'token'> & {
      errors?: Maybe<
        Array<
          { __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>
        >
      >
    }
}

export type DeleteCommentMutationVariables = Exact<{
  comment_id: Scalars['Float']
}>

export type DeleteCommentMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'deleteComment'
>

export type DeleteCommentUpvoteMutationVariables = Exact<{
  comment_id: Scalars['Float']
}>

export type DeleteCommentUpvoteMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'deleteCommentUpvote'
>

export type DeleteItemRecommendMutationVariables = Exact<{
  item_id: Scalars['Float']
}>

export type DeleteItemRecommendMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'deleteItemRecommend'
>

export type DeleteUserMutationVariables = Exact<{ [key: string]: never }>

export type DeleteUserMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'deleteUser'
>

export type LoginMutationVariables = Exact<{
  uid: Scalars['String']
}>

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'UserResponse' } & Pick<UserResponse, 'token'> & {
      errors?: Maybe<
        Array<{ __typename?: 'FieldError' } & Pick<FieldError, 'message'>>
      >
    }
}

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput
}>

export type UpdateUserMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'updateUser'
>

export type UploadProfilePictureMutationVariables = Exact<{
  image: Array<Scalars['Upload']> | Scalars['Upload']
}>

export type UploadProfilePictureMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'uploadProfilePicture'
>

export type Get3dPrinterByIdQueryVariables = Exact<{
  uuid: Scalars['String']
}>

export type Get3dPrinterByIdQuery = { __typename?: 'Query' } & {
  get3dPrinterByUUID?: Maybe<
    { __typename?: 'Printer3d' } & Pick<
      Printer3d,
      | 'uuid'
      | 'x_axis'
      | 'y_axis'
      | 'z_axis'
      | 'auto_leveling'
      | 'resume_printing'
      | 'removeable_build_surface'
      | 'material'
      | 'weight'
      | 'voltage'
      | 'wattage'
      | 'compatible_material'
    > & {
        item_id: { __typename?: 'Item' } & Pick<
          Item,
          | 'id'
          | 'title'
          | 'description'
          | 'price'
          | 'rating'
          | 'manufacturer'
          | 'sold_by'
          | 'url'
          | 'image_url'
          | 'is_affiliate'
        >
      }
  >
}

export type Get3dPrinterIdsQueryVariables = Exact<{
  input?: Maybe<GetPrinter3dInput>
}>

export type Get3dPrinterIdsQuery = { __typename?: 'Query' } & {
  get3dPrinters?: Maybe<
    Array<{ __typename?: 'Printer3d' } & Pick<Printer3d, 'uuid'>>
  >
}

export type Get3dPrintersQueryVariables = Exact<{
  input?: Maybe<GetPrinter3dInput>
}>

export type Get3dPrintersQuery = { __typename?: 'Query' } & {
  get3dPrinters?: Maybe<
    Array<
      { __typename?: 'Printer3d' } & Pick<
        Printer3d,
        | 'uuid'
        | 'x_axis'
        | 'y_axis'
        | 'z_axis'
        | 'auto_leveling'
        | 'resume_printing'
        | 'removeable_build_surface'
        | 'material'
        | 'weight'
        | 'voltage'
        | 'wattage'
        | 'compatible_material'
      > & {
          item_id: { __typename?: 'Item' } & Pick<
            Item,
            | 'id'
            | 'title'
            | 'description'
            | 'price'
            | 'rating'
            | 'manufacturer'
            | 'sold_by'
            | 'url'
            | 'image_url'
            | 'is_affiliate'
          >
        }
    >
  >
}

export type GetCommentsQueryVariables = Exact<{
  item_uuid: Scalars['String']
}>

export type GetCommentsQuery = { __typename?: 'Query' } & {
  getComments: Array<
    { __typename?: 'Comment' } & Pick<
      Comment,
      'id' | 'text' | 'is_deleted' | 'created_at'
    > & {
        user_id: { __typename?: 'User' } & Pick<
          User,
          'id' | 'uid' | 'display_name' | 'profile_picture_url'
        >
        parent_id?: Maybe<{ __typename?: 'Comment' } & Pick<Comment, 'id'>>
        comment_upvote_ids: Array<
          { __typename?: 'CommentUpvote' } & {
            user_id: { __typename?: 'User' } & Pick<User, 'id'>
          }
        >
      }
  >
}

export type GetUserQueryVariables = Exact<{ [key: string]: never }>

export type GetUserQuery = { __typename?: 'Query' } & {
  getUser?: Maybe<
    { __typename?: 'User' } & Pick<
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
}

export type GetUserByIdQueryVariables = Exact<{
  uid: Scalars['String']
}>

export type GetUserByIdQuery = { __typename?: 'Query' } & {
  getUserById?: Maybe<
    { __typename?: 'User' } & Pick<
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
}

export type GetUserIdsQueryVariables = Exact<{ [key: string]: never }>

export type GetUserIdsQuery = { __typename?: 'Query' } & {
  getUsers?: Maybe<Array<{ __typename?: 'User' } & Pick<User, 'uid'>>>
}

export const CreateCommentDocument = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(input: $input)
  }
`
export type CreateCommentMutationFn = Apollo.MutationFunction<
  CreateCommentMutation,
  CreateCommentMutationVariables
>

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(CreateCommentDocument, options)
}
export type CreateCommentMutationHookResult = ReturnType<
  typeof useCreateCommentMutation
>
export type CreateCommentMutationResult =
  Apollo.MutationResult<CreateCommentMutation>
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
  CreateCommentMutation,
  CreateCommentMutationVariables
>
export const CreateCommentUpvoteDocument = gql`
  mutation createCommentUpvote($comment_id: Float!) {
    createCommentUpvote(comment_id: $comment_id)
  }
`
export type CreateCommentUpvoteMutationFn = Apollo.MutationFunction<
  CreateCommentUpvoteMutation,
  CreateCommentUpvoteMutationVariables
>

/**
 * __useCreateCommentUpvoteMutation__
 *
 * To run a mutation, you first call `useCreateCommentUpvoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentUpvoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentUpvoteMutation, { data, loading, error }] = useCreateCommentUpvoteMutation({
 *   variables: {
 *      comment_id: // value for 'comment_id'
 *   },
 * });
 */
export function useCreateCommentUpvoteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCommentUpvoteMutation,
    CreateCommentUpvoteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateCommentUpvoteMutation,
    CreateCommentUpvoteMutationVariables
  >(CreateCommentUpvoteDocument, options)
}
export type CreateCommentUpvoteMutationHookResult = ReturnType<
  typeof useCreateCommentUpvoteMutation
>
export type CreateCommentUpvoteMutationResult =
  Apollo.MutationResult<CreateCommentUpvoteMutation>
export type CreateCommentUpvoteMutationOptions = Apollo.BaseMutationOptions<
  CreateCommentUpvoteMutation,
  CreateCommentUpvoteMutationVariables
>
export const CreateItemRecommendDocument = gql`
  mutation createItemRecommend($item_id: Float!) {
    createItemRecommend(item_id: $item_id)
  }
`
export type CreateItemRecommendMutationFn = Apollo.MutationFunction<
  CreateItemRecommendMutation,
  CreateItemRecommendMutationVariables
>

/**
 * __useCreateItemRecommendMutation__
 *
 * To run a mutation, you first call `useCreateItemRecommendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateItemRecommendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createItemRecommendMutation, { data, loading, error }] = useCreateItemRecommendMutation({
 *   variables: {
 *      item_id: // value for 'item_id'
 *   },
 * });
 */
export function useCreateItemRecommendMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateItemRecommendMutation,
    CreateItemRecommendMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateItemRecommendMutation,
    CreateItemRecommendMutationVariables
  >(CreateItemRecommendDocument, options)
}
export type CreateItemRecommendMutationHookResult = ReturnType<
  typeof useCreateItemRecommendMutation
>
export type CreateItemRecommendMutationResult =
  Apollo.MutationResult<CreateItemRecommendMutation>
export type CreateItemRecommendMutationOptions = Apollo.BaseMutationOptions<
  CreateItemRecommendMutation,
  CreateItemRecommendMutationVariables
>
export const CreateUserDocument = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      token
      errors {
        field
        message
      }
    }
  }
`
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options
  )
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>
export const DeleteCommentDocument = gql`
  mutation deleteComment($comment_id: Float!) {
    deleteComment(comment_id: $comment_id)
  }
`
export type DeleteCommentMutationFn = Apollo.MutationFunction<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      comment_id: // value for 'comment_id'
 *   },
 * });
 */
export function useDeleteCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >(DeleteCommentDocument, options)
}
export type DeleteCommentMutationHookResult = ReturnType<
  typeof useDeleteCommentMutation
>
export type DeleteCommentMutationResult =
  Apollo.MutationResult<DeleteCommentMutation>
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>
export const DeleteCommentUpvoteDocument = gql`
  mutation deleteCommentUpvote($comment_id: Float!) {
    deleteCommentUpvote(comment_id: $comment_id)
  }
`
export type DeleteCommentUpvoteMutationFn = Apollo.MutationFunction<
  DeleteCommentUpvoteMutation,
  DeleteCommentUpvoteMutationVariables
>

/**
 * __useDeleteCommentUpvoteMutation__
 *
 * To run a mutation, you first call `useDeleteCommentUpvoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentUpvoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentUpvoteMutation, { data, loading, error }] = useDeleteCommentUpvoteMutation({
 *   variables: {
 *      comment_id: // value for 'comment_id'
 *   },
 * });
 */
export function useDeleteCommentUpvoteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCommentUpvoteMutation,
    DeleteCommentUpvoteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteCommentUpvoteMutation,
    DeleteCommentUpvoteMutationVariables
  >(DeleteCommentUpvoteDocument, options)
}
export type DeleteCommentUpvoteMutationHookResult = ReturnType<
  typeof useDeleteCommentUpvoteMutation
>
export type DeleteCommentUpvoteMutationResult =
  Apollo.MutationResult<DeleteCommentUpvoteMutation>
export type DeleteCommentUpvoteMutationOptions = Apollo.BaseMutationOptions<
  DeleteCommentUpvoteMutation,
  DeleteCommentUpvoteMutationVariables
>
export const DeleteItemRecommendDocument = gql`
  mutation deleteItemRecommend($item_id: Float!) {
    deleteItemRecommend(item_id: $item_id)
  }
`
export type DeleteItemRecommendMutationFn = Apollo.MutationFunction<
  DeleteItemRecommendMutation,
  DeleteItemRecommendMutationVariables
>

/**
 * __useDeleteItemRecommendMutation__
 *
 * To run a mutation, you first call `useDeleteItemRecommendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteItemRecommendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteItemRecommendMutation, { data, loading, error }] = useDeleteItemRecommendMutation({
 *   variables: {
 *      item_id: // value for 'item_id'
 *   },
 * });
 */
export function useDeleteItemRecommendMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteItemRecommendMutation,
    DeleteItemRecommendMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteItemRecommendMutation,
    DeleteItemRecommendMutationVariables
  >(DeleteItemRecommendDocument, options)
}
export type DeleteItemRecommendMutationHookResult = ReturnType<
  typeof useDeleteItemRecommendMutation
>
export type DeleteItemRecommendMutationResult =
  Apollo.MutationResult<DeleteItemRecommendMutation>
export type DeleteItemRecommendMutationOptions = Apollo.BaseMutationOptions<
  DeleteItemRecommendMutation,
  DeleteItemRecommendMutationVariables
>
export const DeleteUserDocument = gql`
  mutation deleteUser {
    deleteUser
  }
`
export type DeleteUserMutationFn = Apollo.MutationFunction<
  DeleteUserMutation,
  DeleteUserMutationVariables
>

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(
    DeleteUserDocument,
    options
  )
}
export type DeleteUserMutationHookResult = ReturnType<
  typeof useDeleteUserMutation
>
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserMutation,
  DeleteUserMutationVariables
>
export const LoginDocument = gql`
  mutation login($uid: String!) {
    login(uid: $uid) {
      token
      errors {
        message
      }
    }
  }
`
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      uid: // value for 'uid'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>
export const UpdateUserDocument = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input)
  }
`
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options
  )
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>
export const UploadProfilePictureDocument = gql`
  mutation uploadProfilePicture($image: [Upload!]!) {
    uploadProfilePicture(image: $image)
  }
`
export type UploadProfilePictureMutationFn = Apollo.MutationFunction<
  UploadProfilePictureMutation,
  UploadProfilePictureMutationVariables
>

/**
 * __useUploadProfilePictureMutation__
 *
 * To run a mutation, you first call `useUploadProfilePictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadProfilePictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadProfilePictureMutation, { data, loading, error }] = useUploadProfilePictureMutation({
 *   variables: {
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUploadProfilePictureMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UploadProfilePictureMutation,
    UploadProfilePictureMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UploadProfilePictureMutation,
    UploadProfilePictureMutationVariables
  >(UploadProfilePictureDocument, options)
}
export type UploadProfilePictureMutationHookResult = ReturnType<
  typeof useUploadProfilePictureMutation
>
export type UploadProfilePictureMutationResult =
  Apollo.MutationResult<UploadProfilePictureMutation>
export type UploadProfilePictureMutationOptions = Apollo.BaseMutationOptions<
  UploadProfilePictureMutation,
  UploadProfilePictureMutationVariables
>
export const Get3dPrinterByIdDocument = gql`
  query get3dPrinterById($uuid: String!) {
    get3dPrinterByUUID(uuid: $uuid) {
      item_id {
        id
        title
        description
        price
        rating
        manufacturer
        sold_by
        url
        image_url
        is_affiliate
      }
      uuid
      x_axis
      y_axis
      z_axis
      auto_leveling
      resume_printing
      removeable_build_surface
      material
      weight
      voltage
      wattage
      compatible_material
    }
  }
`

/**
 * __useGet3dPrinterByIdQuery__
 *
 * To run a query within a React component, call `useGet3dPrinterByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet3dPrinterByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet3dPrinterByIdQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useGet3dPrinterByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    Get3dPrinterByIdQuery,
    Get3dPrinterByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<Get3dPrinterByIdQuery, Get3dPrinterByIdQueryVariables>(
    Get3dPrinterByIdDocument,
    options
  )
}
export function useGet3dPrinterByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Get3dPrinterByIdQuery,
    Get3dPrinterByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    Get3dPrinterByIdQuery,
    Get3dPrinterByIdQueryVariables
  >(Get3dPrinterByIdDocument, options)
}
export type Get3dPrinterByIdQueryHookResult = ReturnType<
  typeof useGet3dPrinterByIdQuery
>
export type Get3dPrinterByIdLazyQueryHookResult = ReturnType<
  typeof useGet3dPrinterByIdLazyQuery
>
export type Get3dPrinterByIdQueryResult = Apollo.QueryResult<
  Get3dPrinterByIdQuery,
  Get3dPrinterByIdQueryVariables
>
export const Get3dPrinterIdsDocument = gql`
  query get3dPrinterIds($input: GetPrinter3dInput) {
    get3dPrinters(input: $input) {
      uuid
    }
  }
`

/**
 * __useGet3dPrinterIdsQuery__
 *
 * To run a query within a React component, call `useGet3dPrinterIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet3dPrinterIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet3dPrinterIdsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGet3dPrinterIdsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Get3dPrinterIdsQuery,
    Get3dPrinterIdsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<Get3dPrinterIdsQuery, Get3dPrinterIdsQueryVariables>(
    Get3dPrinterIdsDocument,
    options
  )
}
export function useGet3dPrinterIdsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Get3dPrinterIdsQuery,
    Get3dPrinterIdsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    Get3dPrinterIdsQuery,
    Get3dPrinterIdsQueryVariables
  >(Get3dPrinterIdsDocument, options)
}
export type Get3dPrinterIdsQueryHookResult = ReturnType<
  typeof useGet3dPrinterIdsQuery
>
export type Get3dPrinterIdsLazyQueryHookResult = ReturnType<
  typeof useGet3dPrinterIdsLazyQuery
>
export type Get3dPrinterIdsQueryResult = Apollo.QueryResult<
  Get3dPrinterIdsQuery,
  Get3dPrinterIdsQueryVariables
>
export const Get3dPrintersDocument = gql`
  query get3dPrinters($input: GetPrinter3dInput) {
    get3dPrinters(input: $input) {
      item_id {
        id
        title
        description
        price
        rating
        manufacturer
        sold_by
        url
        image_url
        is_affiliate
      }
      uuid
      x_axis
      y_axis
      z_axis
      auto_leveling
      resume_printing
      removeable_build_surface
      material
      weight
      voltage
      wattage
      compatible_material
    }
  }
`

/**
 * __useGet3dPrintersQuery__
 *
 * To run a query within a React component, call `useGet3dPrintersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet3dPrintersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet3dPrintersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGet3dPrintersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Get3dPrintersQuery,
    Get3dPrintersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<Get3dPrintersQuery, Get3dPrintersQueryVariables>(
    Get3dPrintersDocument,
    options
  )
}
export function useGet3dPrintersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Get3dPrintersQuery,
    Get3dPrintersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<Get3dPrintersQuery, Get3dPrintersQueryVariables>(
    Get3dPrintersDocument,
    options
  )
}
export type Get3dPrintersQueryHookResult = ReturnType<
  typeof useGet3dPrintersQuery
>
export type Get3dPrintersLazyQueryHookResult = ReturnType<
  typeof useGet3dPrintersLazyQuery
>
export type Get3dPrintersQueryResult = Apollo.QueryResult<
  Get3dPrintersQuery,
  Get3dPrintersQueryVariables
>
export const GetCommentsDocument = gql`
  query getComments($item_uuid: String!) {
    getComments(item_uuid: $item_uuid) {
      user_id {
        id
        uid
        display_name
        profile_picture_url
      }
      parent_id {
        id
      }
      comment_upvote_ids {
        user_id {
          id
        }
      }
      id
      text
      is_deleted
      created_at
    }
  }
`

/**
 * __useGetCommentsQuery__
 *
 * To run a query within a React component, call `useGetCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsQuery({
 *   variables: {
 *      item_uuid: // value for 'item_uuid'
 *   },
 * });
 */
export function useGetCommentsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCommentsQuery,
    GetCommentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCommentsQuery, GetCommentsQueryVariables>(
    GetCommentsDocument,
    options
  )
}
export function useGetCommentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCommentsQuery,
    GetCommentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCommentsQuery, GetCommentsQueryVariables>(
    GetCommentsDocument,
    options
  )
}
export type GetCommentsQueryHookResult = ReturnType<typeof useGetCommentsQuery>
export type GetCommentsLazyQueryHookResult = ReturnType<
  typeof useGetCommentsLazyQuery
>
export type GetCommentsQueryResult = Apollo.QueryResult<
  GetCommentsQuery,
  GetCommentsQueryVariables
>
export const GetUserDocument = gql`
  query getUser {
    getUser {
      id
      uid
      display_name
      email
      about
      profile_picture_url
      last_updated_password
      created_at
    }
  }
`

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  )
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  )
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>
export type GetUserQueryResult = Apollo.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>
export const GetUserByIdDocument = gql`
  query getUserById($uid: String!) {
    getUserById(uid: $uid) {
      id
      uid
      display_name
      email
      about
      profile_picture_url
      last_updated_password
      created_at
    }
  }
`

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      uid: // value for 'uid'
 *   },
 * });
 */
export function useGetUserByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetUserByIdQuery,
    GetUserByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(
    GetUserByIdDocument,
    options
  )
}
export function useGetUserByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserByIdQuery,
    GetUserByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(
    GetUserByIdDocument,
    options
  )
}
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>
export type GetUserByIdLazyQueryHookResult = ReturnType<
  typeof useGetUserByIdLazyQuery
>
export type GetUserByIdQueryResult = Apollo.QueryResult<
  GetUserByIdQuery,
  GetUserByIdQueryVariables
>
export const GetUserIdsDocument = gql`
  query getUserIds {
    getUsers {
      uid
    }
  }
`

/**
 * __useGetUserIdsQuery__
 *
 * To run a query within a React component, call `useGetUserIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserIdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserIdsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetUserIdsQuery,
    GetUserIdsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUserIdsQuery, GetUserIdsQueryVariables>(
    GetUserIdsDocument,
    options
  )
}
export function useGetUserIdsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserIdsQuery,
    GetUserIdsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUserIdsQuery, GetUserIdsQueryVariables>(
    GetUserIdsDocument,
    options
  )
}
export type GetUserIdsQueryHookResult = ReturnType<typeof useGetUserIdsQuery>
export type GetUserIdsLazyQueryHookResult = ReturnType<
  typeof useGetUserIdsLazyQuery
>
export type GetUserIdsQueryResult = Apollo.QueryResult<
  GetUserIdsQuery,
  GetUserIdsQueryVariables
>
