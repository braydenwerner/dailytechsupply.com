import { Dispatch, SetStateAction, useContext } from 'react'
import { useRouter } from 'next/router'
import { Formik, Field } from 'formik'
import {
  useLoginMutation,
  useUpdateUserMutation,
} from '../../../generated/graphql'
import { CircularProgress } from '@mui/material'

import { auth } from '../../../config/config'
import { ProviderSignIn } from '../../modules'
import { CustomTextField } from '../../elements'
import { TokenContext } from '../../../providers'
import { ForgotPasswordText } from './SignIn.styled'
import * as Styled from '../../../styles/shared.styled'

interface FormSubmitData {
  email: string
  password: string
}

type ErrorResponse = { code: string; error: string; field: string }

interface SignInProps {
  onStart?: () => void
  onSuccess?: () => void
  toggleToSignUp: () => void
}

export const SignIn: React.FC<SignInProps> = ({
  onStart,
  onSuccess,
  toggleToSignUp,
}) => {
  const [login] = useLoginMutation()
  const [updateUser] = useUpdateUserMutation()

  const { setTokenAttached } = useContext(TokenContext)

  const router = useRouter()

  const signInUser = async (
    data: FormSubmitData
  ): Promise<ErrorResponse | null> => {
    let user
    try {
      user = await auth.signInWithEmailAndPassword(data.email, data.password)
    } catch (err: any) {
      return {
        code: err.code,
        error: err.message,
        field: 'Sign In User',
      }
    }

    if (user.user?.uid) {
      const response = await login({ variables: { uid: user.user.uid } })

      if (response.data?.login.token) {
        localStorage.setItem('token', response.data.login.token)
        setTokenAttached(true)
      }

      await updateUser({
        variables: {
          input: {
            last_logged_in: new Date(),
          },
        },
      })
    }

    return null
  }

  return (
    <>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (data, { setSubmitting, setFieldError }) => {
          setSubmitting(true)

          if (onStart) onStart()

          const errorResponse: ErrorResponse | null = await signInUser(data)

          if (!errorResponse && onSuccess) onSuccess()

          if (errorResponse?.code === 'auth/user-not-found') {
            setFieldError('email', 'Invalid email')
          } else if (errorResponse?.code === 'auth/wrong-password') {
            setFieldError('password', 'Invalid password')
          } else if (errorResponse?.code === 'auth/too-many-requests') {
            setFieldError(
              'password',
              'Too many failed log in attempts, plase try again later.'
            )
          }

          setSubmitting(false)
        }}
        validate={(values) => {
          const errors: Record<string, string> = {}

          if (values.email.length === 0)
            errors.email = 'Please enter your email'
          if (values.password.length === 0)
            errors.password = 'Please enter your password'

          const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
          if (!re.test(values.email) && values.email.length !== 0)
            errors.email = 'Invalid email formatting'

          return errors
        }}
      >
        {({ values, isSubmitting, handleSubmit }) => (
          <Styled.LoginForm onSubmit={handleSubmit}>
            <Field
              name="email"
              placeholder="Email"
              component={CustomTextField}
              required={true}
              autoFocus
            />
            <Field
              name="password"
              placeholder="Password"
              type="password"
              component={CustomTextField}
              required={true}
            />
            <a
              href="/forgot-password"
              style={{ alignSelf: 'start', textAlign: 'start' }}
            >
              <ForgotPasswordText>Forgot your password?</ForgotPasswordText>
            </a>
            <Styled.LoginSubmit
              type="submit"
              disabled={isSubmitting || !values.email || !values.password}
            >
              {isSubmitting ? (
                <CircularProgress size={28} color="inherit" />
              ) : (
                <div>Log In</div>
              )}
            </Styled.LoginSubmit>
          </Styled.LoginForm>
        )}
      </Formik>
      <ProviderSignIn onStart={onStart} onSuccess={onSuccess} />
      <Styled.SignInModalFooter>
        Don't have an account?{' '}
        <Styled.SignInModalFooterSpan onClick={toggleToSignUp}>
          Sign Up
        </Styled.SignInModalFooterSpan>
      </Styled.SignInModalFooter>
    </>
  )
}
