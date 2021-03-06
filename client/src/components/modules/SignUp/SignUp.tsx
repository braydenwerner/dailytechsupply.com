import { Dispatch, SetStateAction, useContext } from 'react'
import { Formik, Field } from 'formik'
import { useCreateUserMutation } from '../../../generated/graphql'
import { CircularProgress } from '@mui/material'

import { auth } from '../../../config/config'
import { ProviderSignIn } from '../../modules'
import { CustomTextField } from '../../elements/index'
import { TokenContext } from '../../../providers'
import * as Styled from '../../../styles/shared.styled'

interface FormSubmitData {
  firstName: string
  email: string
  password: string
}

type ErrorResponse = { code: string; error: string; field: string }

interface SignUpProps {
  onStart?: () => void
  onSuccess?: () => void
  toggleToSignIn: () => void
}

export const SignUp: React.FC<SignUpProps> = ({
  onStart,
  onSuccess,
  toggleToSignIn,
}) => {
  const [createUser] = useCreateUserMutation()

  const { setTokenAttached } = useContext(TokenContext)

  const createNewUser = async (
    data: FormSubmitData
  ): Promise<ErrorResponse | null> => {
    let user
    try {
      user = await auth.createUserWithEmailAndPassword(
        data.email,
        data.password
      )
    } catch (err: any) {
      return {
        code: err.code,
        error: err.message,
        field: 'Create User',
      }
    }

    if (user?.user) {
      const response = await createUser({
        variables: {
          input: {
            uid: user.user.uid,
            email: data.email,
            display_name: data.firstName,
            last_logged_in: new Date(),
          },
        },
      })

      if (response.data?.createUser.token) {
        localStorage.setItem('token', response.data.createUser.token)
        setTokenAttached(true)
      }
    } else {
      return {
        code: 'auth/cannot-create-account',
        error: 'Cannot create account',
        field: 'Create User',
      }
    }

    return null
  }

  return (
    <>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          firstName: '',
          email: '',
          password: '',
        }}
        onSubmit={async (data, { setSubmitting, setFieldError }) => {
          setSubmitting(true)

          if (onStart) onStart()

          const errorResponse: ErrorResponse | null = await createNewUser(data)

          if (!errorResponse && onSuccess) onSuccess()

          if (errorResponse?.code === 'auth/email-already-in-use') {
            setFieldError(
              'email',
              'Sorry, the email you have entered is already in use.'
            )
          } else if (errorResponse?.code === 'auth/cannot-create-account') {
            setFieldError(
              'email',
              'Sorry, we cannot create your account at this time. Please try again later.'
            )
          }

          setSubmitting(false)
        }}
        validate={(values) => {
          const errors: Record<string, string> = {}

          if (values.email.length === 0) errors.email = 'Please enter an email'
          if (values.firstName.length === 0)
            errors.firstName = 'Please enter your first name'
          if (values.password.length === 0)
            errors.password = 'Please enter a password'

          if (values.firstName.length > 50 && values.firstName.length !== 0)
            errors.firstName =
              'Your name exceeds the maximum length 50 characters'

          const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
          if (!re.test(values.email) && values.email.length !== 0)
            errors.email = 'Invalid email formatting'

          if (values.password.length < 8 && values.password.length !== 0)
            errors.password = 'Passwords must be at least 8 characters long'

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
              name="firstName"
              placeholder="First name"
              component={CustomTextField}
              required={true}
            />
            <Field
              name="password"
              placeholder="Password"
              type="password"
              component={CustomTextField}
              required={true}
            />
            <Styled.LoginSubmit
              type="submit"
              disabled={
                isSubmitting ||
                !values.firstName ||
                !values.email ||
                !values.password
              }
            >
              {isSubmitting ? (
                <CircularProgress size={28} color="inherit" />
              ) : (
                <div>Sign Up</div>
              )}
            </Styled.LoginSubmit>
          </Styled.LoginForm>
        )}
      </Formik>
      <ProviderSignIn onStart={onStart} onSuccess={onSuccess} />
      <Styled.SignInModalFooter>
        Already have an account?{' '}
        <Styled.SignInModalFooterSpan onClick={toggleToSignIn}>
          Log In
        </Styled.SignInModalFooterSpan>
      </Styled.SignInModalFooter>
    </>
  )
}
