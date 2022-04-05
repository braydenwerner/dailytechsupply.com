import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type GetPrinter3dInput = {
  minPrice?: Maybe<Scalars['Float']>;
  maxPrice?: Maybe<Scalars['Float']>;
  minRating?: Maybe<Scalars['Float']>;
  manufacturer?: Maybe<Scalars['String']>;
  minX?: Maybe<Scalars['Float']>;
  maxX?: Maybe<Scalars['Float']>;
  minY?: Maybe<Scalars['Float']>;
  maxY?: Maybe<Scalars['Float']>;
  minZ?: Maybe<Scalars['Float']>;
  maxZ?: Maybe<Scalars['Float']>;
  autoLeveling?: Maybe<Scalars['Boolean']>;
  resumePrinting?: Maybe<Scalars['Boolean']>;
  removeableBuildSurface?: Maybe<Scalars['Boolean']>;
  material?: Maybe<Scalars['String']>;
  minWeight?: Maybe<Scalars['Float']>;
  maxWeight?: Maybe<Scalars['Float']>;
  minVoltage?: Maybe<Scalars['Float']>;
  maxVoltage?: Maybe<Scalars['Float']>;
  minWattage?: Maybe<Scalars['Float']>;
  maxWattage?: Maybe<Scalars['Float']>;
  compatibleMaterial?: Maybe<Scalars['String']>;
  pageSize: Scalars['Float'];
  pageNumber: Scalars['Float'];
};

export type Item = {
  __typename?: 'Item';
  id: Scalars['Float'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  rating: Scalars['Float'];
  manufacturer?: Maybe<Scalars['String']>;
  sold_by: Scalars['String'];
  url: Scalars['String'];
  image_url: Scalars['String'];
  is_affiliate?: Maybe<Scalars['Boolean']>;
};

export type Printer3d = {
  __typename?: 'Printer3d';
  item_id: Item;
  uuid: Scalars['String'];
  x_axis?: Maybe<Scalars['Float']>;
  y_axis?: Maybe<Scalars['Float']>;
  z_axis?: Maybe<Scalars['Float']>;
  auto_leveling?: Maybe<Scalars['Boolean']>;
  resume_printing?: Maybe<Scalars['Boolean']>;
  removeable_build_surface?: Maybe<Scalars['Boolean']>;
  material?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Float']>;
  voltage?: Maybe<Scalars['Float']>;
  wattage?: Maybe<Scalars['Float']>;
  compatible_material?: Maybe<Scalars['String']>;
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getUser?: Maybe<User>;
  get3dPrinterByUUID?: Maybe<Printer3d>;
  get3dPrinters?: Maybe<Array<Printer3d>>;
};


export type QueryGet3dPrinterByUuidArgs = {
  uuid: Scalars['String'];
};


export type QueryGet3dPrintersArgs = {
  input?: Maybe<GetPrinter3dInput>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  uid: Scalars['String'];
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  last_logged_in?: Maybe<Scalars['String']>;
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type Get3dPrinterByUuidQueryVariables = Exact<{
  uuid: Scalars['String'];
}>;


export type Get3dPrinterByUuidQuery = (
  { __typename?: 'Query' }
  & { get3dPrinterByUUID?: Maybe<(
    { __typename?: 'Printer3d' }
    & Pick<Printer3d, 'x_axis' | 'y_axis' | 'z_axis' | 'auto_leveling' | 'resume_printing' | 'removeable_build_surface' | 'material' | 'weight' | 'voltage' | 'wattage' | 'compatible_material'>
    & { item_id: (
      { __typename?: 'Item' }
      & Pick<Item, 'title' | 'description' | 'price' | 'rating' | 'manufacturer' | 'sold_by' | 'url' | 'image_url' | 'is_affiliate'>
    ) }
  )> }
);

export type Get3dPrinterIdsQueryVariables = Exact<{
  input?: Maybe<GetPrinter3dInput>;
}>;


export type Get3dPrinterIdsQuery = (
  { __typename?: 'Query' }
  & { get3dPrinters?: Maybe<Array<(
    { __typename?: 'Printer3d' }
    & Pick<Printer3d, 'uuid'>
  )>> }
);

export type Get3dPrintersQueryVariables = Exact<{
  input?: Maybe<GetPrinter3dInput>;
}>;


export type Get3dPrintersQuery = (
  { __typename?: 'Query' }
  & { get3dPrinters?: Maybe<Array<(
    { __typename?: 'Printer3d' }
    & Pick<Printer3d, 'uuid' | 'x_axis' | 'y_axis' | 'z_axis' | 'auto_leveling' | 'resume_printing' | 'removeable_build_surface' | 'material' | 'weight' | 'voltage' | 'wattage' | 'compatible_material'>
    & { item_id: (
      { __typename?: 'Item' }
      & Pick<Item, 'title' | 'description' | 'price' | 'rating' | 'manufacturer' | 'sold_by' | 'url' | 'image_url' | 'is_affiliate'>
    ) }
  )>> }
);


export const Get3dPrinterByUuidDocument = gql`
    query get3dPrinterByUUID($uuid: String!) {
  get3dPrinterByUUID(uuid: $uuid) {
    item_id {
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
    `;

/**
 * __useGet3dPrinterByUuidQuery__
 *
 * To run a query within a React component, call `useGet3dPrinterByUuidQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet3dPrinterByUuidQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet3dPrinterByUuidQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useGet3dPrinterByUuidQuery(baseOptions: Apollo.QueryHookOptions<Get3dPrinterByUuidQuery, Get3dPrinterByUuidQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Get3dPrinterByUuidQuery, Get3dPrinterByUuidQueryVariables>(Get3dPrinterByUuidDocument, options);
      }
export function useGet3dPrinterByUuidLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get3dPrinterByUuidQuery, Get3dPrinterByUuidQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Get3dPrinterByUuidQuery, Get3dPrinterByUuidQueryVariables>(Get3dPrinterByUuidDocument, options);
        }
export type Get3dPrinterByUuidQueryHookResult = ReturnType<typeof useGet3dPrinterByUuidQuery>;
export type Get3dPrinterByUuidLazyQueryHookResult = ReturnType<typeof useGet3dPrinterByUuidLazyQuery>;
export type Get3dPrinterByUuidQueryResult = Apollo.QueryResult<Get3dPrinterByUuidQuery, Get3dPrinterByUuidQueryVariables>;
export const Get3dPrinterIdsDocument = gql`
    query get3dPrinterIds($input: GetPrinter3dInput) {
  get3dPrinters(input: $input) {
    uuid
  }
}
    `;

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
export function useGet3dPrinterIdsQuery(baseOptions?: Apollo.QueryHookOptions<Get3dPrinterIdsQuery, Get3dPrinterIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Get3dPrinterIdsQuery, Get3dPrinterIdsQueryVariables>(Get3dPrinterIdsDocument, options);
      }
export function useGet3dPrinterIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get3dPrinterIdsQuery, Get3dPrinterIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Get3dPrinterIdsQuery, Get3dPrinterIdsQueryVariables>(Get3dPrinterIdsDocument, options);
        }
export type Get3dPrinterIdsQueryHookResult = ReturnType<typeof useGet3dPrinterIdsQuery>;
export type Get3dPrinterIdsLazyQueryHookResult = ReturnType<typeof useGet3dPrinterIdsLazyQuery>;
export type Get3dPrinterIdsQueryResult = Apollo.QueryResult<Get3dPrinterIdsQuery, Get3dPrinterIdsQueryVariables>;
export const Get3dPrintersDocument = gql`
    query get3dPrinters($input: GetPrinter3dInput) {
  get3dPrinters(input: $input) {
    item_id {
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
    `;

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
export function useGet3dPrintersQuery(baseOptions?: Apollo.QueryHookOptions<Get3dPrintersQuery, Get3dPrintersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Get3dPrintersQuery, Get3dPrintersQueryVariables>(Get3dPrintersDocument, options);
      }
export function useGet3dPrintersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get3dPrintersQuery, Get3dPrintersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Get3dPrintersQuery, Get3dPrintersQueryVariables>(Get3dPrintersDocument, options);
        }
export type Get3dPrintersQueryHookResult = ReturnType<typeof useGet3dPrintersQuery>;
export type Get3dPrintersLazyQueryHookResult = ReturnType<typeof useGet3dPrintersLazyQuery>;
export type Get3dPrintersQueryResult = Apollo.QueryResult<Get3dPrintersQuery, Get3dPrintersQueryVariables>;