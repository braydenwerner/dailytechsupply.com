import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { NavbarEmpty } from '../components/elements'
import { SignIn } from '../components/modules'
import { TokenContext } from '../providers'
import {
  SignInPageContainer,
  SignInPageHeader,
  SignInPageTitle,
} from '../styles/shared.styled'

const LoginPage: NextPage = () => {
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
        <title>Login - DailyTechSupply</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarEmpty />
      {isMounted && !tokenAttached && (
        <SignInPageContainer>
          <SignInPageHeader>
            <SignInPageTitle>Log In</SignInPageTitle>
          </SignInPageHeader>
          <SignIn
            onStart={() => setLoggingIn(true)}
            onSuccess={() => {
              if ('redirect_url' in router.query) {
                router.push(`/${router.query.redirect_url}`)
              } else {
                router.push('/')
              }
            }}
            toggleToSignUp={() => {
              if ('redirect_url' in router.query) {
                router.push(`/signup?redirect_url=${router.query.redirect_url}`)
              } else {
                router.push('/signup')
              }
            }}
          />
        </SignInPageContainer>
      )}
    </>
  )
}

export default LoginPage
