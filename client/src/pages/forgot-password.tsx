import Head from 'next/head'
import { useState } from 'react'
import { NextPage } from 'next'

import { auth } from '../config/config'

const ForgotPasswordPage: NextPage = () => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const handleResetPassword = (email: string) => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {})
      .catch((error) => {})
  }
  return (
    <>
      <Head>
        <title>Forgot Password - DailyTechSupply</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div>Reset your password</div>
      </div>
    </>
  )
}

export default ForgotPasswordPage
