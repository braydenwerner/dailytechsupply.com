import Head from 'next/head'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import {
  GetUserByIdDocument,
  GetUserIdsDocument,
  User,
} from '../../../generated/graphql'

import { client } from '../../../utils/createApolloClient'
import { Navbar } from '../../../components/modules'

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await client.query({
    query: GetUserIdsDocument,
  })

  const data: User[] = res.data?.getUsers
  let uids: string[] = []
  if (data) uids = data.map((user) => user.uid)

  const paths = uids.map((uid) => {
    return {
      params: { id: uid },
    }
  })

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params

  if (!params?.id) return { notFound: true }

  const res = await client.query({
    query: GetUserByIdDocument,
    variables: { uid: params.id },
  })

  if (!res.data?.getUserById) return { notFound: true }

  return { props: { user: res.data.getUserById } }
}

interface UserProfileProps {
  user: User
}

const UserProfilePage: NextPage<UserProfileProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>{user.first_name}'s Profile - DailyTechSupply</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div>
        <div>Hey, {user.first_name}</div>
        <div>{user.email}</div>
      </div>
    </>
  )
}

export default UserProfilePage
