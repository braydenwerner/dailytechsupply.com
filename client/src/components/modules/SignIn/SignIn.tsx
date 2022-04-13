import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form, Field } from 'formik'
import {
  useLoginMutation,
  useUpdateUserMutation,
} from '../../../generated/graphql'

import { auth } from '../../../config/config'
import { CustomTextField } from '../../elements'
import { TokenContext } from '../../../providers'

interface FormSubmitData {
  email: string
  password: string
}

type ErrorResponse = { code: string; error: string; field: string }

interface SignInProps {
  closeModal?: () => void
}

export const SignIn: React.FC<SignInProps> = ({ closeModal }) => {
  const [login] = useLoginMutation()
  const [updateUser] = useUpdateUserMutation()

  const { setTokenAttached } = useContext(TokenContext)

  const router = useRouter()

  const signInUser = async (
    data: FormSubmitData
  ): Promise<ErrorResponse | null> => {
    let errorResponse = null

    await auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(async (user) => {
        if (user.user?.uid) {
          const response = await login({ variables: { uid: user.user.uid } })

          if (response.data?.login.token) {
            localStorage.setItem('token', response.data.login.token)
            setTokenAttached(true)
          }
        }
      })
      .then(() => {
        updateUser({
          variables: {
            input: {
              lastLoggedIn: new Date(),
            },
          },
        })
      })
      .catch((err) => {
        console.log(err)
        errorResponse = {
          code: err.code,
          error: err.message,
          field: 'Sign In User',
        }
      })

    return errorResponse
  }

  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={async (data, { setSubmitting, setFieldError }) => {
        setSubmitting(true)

        const errorResponse: ErrorResponse | null = await signInUser(data)

        if (!errorResponse && closeModal) closeModal()

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

        if (values.email.length === 0) errors.email = 'Please enter your email'
        if (values.password.length === 0)
          errors.password = 'Please enter your password'

        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if (!re.test(values.email) && values.email.length !== 0)
          errors.email = 'Invalid email formatting'

        return errors
      }}
    >
      {({ values, errors, isSubmitting, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Field
            name="email"
            placeholder="Email"
            component={CustomTextField}
            mandatory={true}
          />
          {errors.email}
          <Field
            name="password"
            placeholder="Password"
            type="password"
            component={CustomTextField}
            mandatory={true}
          />
          {errors.password}
          <button
            type="submit"
            disabled={isSubmitting || !values.email || !values.password}
          >
            Sign In
          </button>
          <div onClick={() => router.push('/forgot-password')}>
            Forgot Password?
          </div>
        </Form>
      )}
    </Formik>
  )
}
