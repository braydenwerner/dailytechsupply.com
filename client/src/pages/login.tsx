import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { SignIn } from '../components/modules'
import { useGetUserLazyQuery } from '../generated/graphql'
import { TokenContext } from '../providers'

const LoginPage: NextPage = () => {
  const [getUser, { data, loading }] = useGetUserLazyQuery()
  const userData = data && data.getUser

  const [fetchingUser, setFetchingUser] = useState(true)
  const [loggingIn, setLoggingIn] = useState(false)

  const { tokenAttached } = useContext(TokenContext)

  const router = useRouter()

  //  if the user is already logged in, redirect to homepage
  useEffect(() => {
    if (userData && !loggingIn) router.push('/')
  }, [data])

  useEffect(() => {
    if (tokenAttached) getUser()
    setFetchingUser(false)
  }, [tokenAttached])

  return (
    <>
      <Head>
        <title>Login - DailyTechSupply</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!userData && !fetchingUser && !loading && (
        <>
          <SignIn
            onStart={() => setLoggingIn(true)}
            onSuccess={() => {
              if ('redirect_url' in router.query) {
                router.push(`/${router.query.redirect_url}`)
              } else {
                router.push('/')
              }
            }}
          />
          <div onClick={() => router.push('/signup')}>Sign Up</div>
        </>
      )}
    </>
  )
}

export default LoginPage
