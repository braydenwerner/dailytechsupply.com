import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { SignUp } from '../components/modules'
import { TokenContext } from '../providers'

const SignUpPage: NextPage = () => {
  const [loggingIn, setLoggingIn] = useState(false)

  const { isMounted, tokenAttached, userData } = useContext(TokenContext)

  const router = useRouter()

  //  if the user is already logged in, redirect to homepage
  useEffect(() => {
    if (userData && !loggingIn) router.push('/')
  }, [userData])

  return (
    <>
      <Head>
        <title>SignUp - DailyTechSupply</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isMounted && !tokenAttached && (
        <>
          <SignUp
            onStart={() => setLoggingIn(true)}
            onSuccess={() => {
              if ('redirect_url' in router.query) {
                router.push(`/${router.query.redirect_url}`)
              } else {
                router.push('/')
              }
            }}
          />
          <div
            onClick={() => {
              if ('redirect_url' in router.query) {
                router.push(`/login?redirect_url=${router.query.redirect_url}`)
              } else {
                router.push('/login')
              }
            }}
          >
            Login
          </div>
        </>
      )}
    </>
  )
}

export default SignUpPage
