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

export type Item = {
  __typename?: 'Item';
  id: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
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
  x_axis?: Maybe<Scalars['Float']>;
  y_axis?: Maybe<Scalars['Float']>;
  z_axis?: Maybe<Scalars['Float']>;
  auto_leveling?: Maybe<Scalars['Boolean']>;
  resume_printing?: Maybe<Scalars['Boolean']>;
  removeable_build_surface?: Maybe<Scalars['Boolean']>;
  material?: Maybe<Scalars['String']>;
  weight: Scalars['Float'];
  voltage: Scalars['Float'];
  wattage?: Maybe<Scalars['Float']>;
  compatible_material?: Maybe<Scalars['String']>;
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getUser?: Maybe<User>;
  get3dPrinter?: Maybe<Printer3d>;
  get3dPrinters?: Maybe<Array<Printer3d>>;
  getAll3dPrinters?: Maybe<Array<Printer3d>>;
};


export type QueryGet3dPrinterArgs = {
  id: Scalars['Float'];
};


export type QueryGet3dPrintersArgs = {
  pageNumber: Scalars['Float'];
  pageSize: Scalars['Float'];
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

export type GetAll3dPrintersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAll3dPrintersQuery = (
  { __typename?: 'Query' }
  & { getAll3dPrinters?: Maybe<Array<(
    { __typename?: 'Printer3d' }
    & Pick<Printer3d, 'x_axis' | 'y_axis' | 'z_axis' | 'auto_leveling' | 'resume_printing' | 'removeable_build_surface' | 'material' | 'weight' | 'voltage' | 'wattage' | 'compatible_material' | 'created_at' | 'updated_at'>
    & { item_id: (
      { __typename?: 'Item' }
      & Pick<Item, 'title' | 'description' | 'price' | 'rating' | 'manufacturer' | 'sold_by' | 'url' | 'image_url' | 'is_affiliate'>
    ) }
  )>> }
);


export const GetAll3dPrintersDocument = gql`
    query getAll3dPrinters {
  getAll3dPrinters {
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
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetAll3dPrintersQuery__
 *
 * To run a query within a React component, call `useGetAll3dPrintersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAll3dPrintersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAll3dPrintersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAll3dPrintersQuery(baseOptions?: Apollo.QueryHookOptions<GetAll3dPrintersQuery, GetAll3dPrintersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAll3dPrintersQuery, GetAll3dPrintersQueryVariables>(GetAll3dPrintersDocument, options);
      }
export function useGetAll3dPrintersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAll3dPrintersQuery, GetAll3dPrintersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAll3dPrintersQuery, GetAll3dPrintersQueryVariables>(GetAll3dPrintersDocument, options);
        }
export type GetAll3dPrintersQueryHookResult = ReturnType<typeof useGetAll3dPrintersQuery>;
export type GetAll3dPrintersLazyQueryHookResult = ReturnType<typeof useGetAll3dPrintersLazyQuery>;
export type GetAll3dPrintersQueryResult = Apollo.QueryResult<GetAll3dPrintersQuery, GetAll3dPrintersQueryVariables>;