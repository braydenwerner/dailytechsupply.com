import Head from 'next/head'
import { NextPage } from 'next'

const ForgotPasswordPage: NextPage = () => {
  // const handleResetPassword = (email: string) => {
  //   auth
  //     .sendPasswordResetEmail(email)
  //     .then(() => {
  //       setEmail(email)
  //       setSuccessSnackBarOpen(true)
  //     })
  //     .catch((error) => {
  //       setErrorSnackBarOpen(true)
  //       setErrorMessage(error.message)
  //     })
  // }
  return (
    <>
      <Head>
        <title>Forgot Password - DailyTechSupply</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div> wow you forgot your password</div>
    </>
  )
}

export default ForgotPasswordPage
