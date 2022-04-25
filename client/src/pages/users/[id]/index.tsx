import Head from 'next/head'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useContext } from 'react'
import {
  GetUserByIdDocument,
  GetUserIdsDocument,
  User,
} from '../../../generated/graphql'

import { client } from '../../../utils/createApolloClient'
import { Navbar, Profile } from '../../../components/modules'
import { TokenContext } from '../../../providers'

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

  return { props: { user: res.data.getUserById }, revalidate: 60 }
}

interface UserProfileProps {
  user: User
}

const UserProfilePage: NextPage<UserProfileProps> = ({ user }) => {
  const { userData } = useContext(TokenContext)

  const isOwner = userData?.uid === user.uid
  return (
    <>
      <Head>
        <title>{user.display_name}'s Profile - DailyTechSupply</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar small />
      <Profile user={isOwner ? userData : user} isOwner={isOwner} />
    </>
  )
}

export default UserProfilePage
