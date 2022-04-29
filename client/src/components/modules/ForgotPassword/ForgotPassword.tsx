import { MutableRefObject, useState } from 'react'

import { auth, dev } from '../../../config/config'
import { SingleInputForm } from '../../elements'
import * as Styled from './ForgotPassword.styled'

export const ForgotPassword: React.FC = () => {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [email, setEmail] = useState<string | undefined>()

  const handleResetPassword = async (
    inputRef: MutableRefObject<HTMLInputElement | null>
  ) => {
    setError(undefined)
    setLoading(true)

    const email = inputRef.current?.value
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (!email || !re.test(email)) {
      setError('Invalid email formatting')
      setLoading(false)
      return
    }
    setEmail(email)

    try {
      await auth.sendPasswordResetEmail(email, {
        url: dev ? 'http://localhost:3000' : 'https://dailytechsupply.com',
        handleCodeInApp: false,
      })
      setSuccess(true)
    } catch (err: any) {
      console.error(err)

      if (err.code === 'auth/user-not-found')
        setError(
          'There is no account corresponding to this email. The account may have been deleted.'
        )
    }

    setLoading(false)
  }

  return (
    <Styled.ForgotPasswordWrapper>
      <Styled.ForgotPasswordContainer>
        {!success ? (
          <>
            <Styled.ForgotPasswordTitle>
              Reset Password
            </Styled.ForgotPasswordTitle>
            <SingleInputForm
              onSubmit={handleResetPassword}
              inputTitle="Email"
              formError={error}
              submitTitle="Reset password"
              loading={loading}
            />
          </>
        ) : (
          <>
            <Styled.ForgotPasswordTitle>Success!</Styled.ForgotPasswordTitle>
            <Styled.ForgotPasswordText>
              A confirmation email has been sent to {email}. It will have a link
              to reset your password.
            </Styled.ForgotPasswordText>
          </>
        )}
      </Styled.ForgotPasswordContainer>
    </Styled.ForgotPasswordWrapper>
  )
}
