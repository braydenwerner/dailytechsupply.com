import { useContext } from 'react'
import { Formik, Field } from 'formik'
import { useCreateUserMutation } from '../../../generated/graphql'

import { auth } from '../../../config/config'
import { CustomTextField } from '../../elements/index'
import { TokenContext } from '../../../providers'
import * as Styled from '../../../styles/shared.styled'

interface FormSubmitData {
  firstName: string
  lastName: string
  email: string
  password: string
}

type ErrorResponse = { code: string; error: string; field: string }

interface SignUpProps {
  onStart?: () => void
  onSuccess?: () => void
}

export const SignUp: React.FC<SignUpProps> = ({ onStart, onSuccess }) => {
  const [createUser] = useCreateUserMutation()

  const { setTokenAttached } = useContext(TokenContext)

  const createNewUser = async (
    data: FormSubmitData
  ): Promise<ErrorResponse | null> => {
    let errorResponse = null

    await auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(async (user) => {
        if (user?.user) {
          const response = await createUser({
            variables: {
              input: {
                uid: user.user.uid,
                email: data.email,
                first_name: data.firstName,
                last_name: data.lastName,
                last_logged_in: new Date(),
              },
            },
          })

          if (response.data?.createUser.token) {
            localStorage.setItem('token', response.data.createUser.token)
            setTokenAttached(true)
          }
        } else {
          console.error('User object does not exist, cannot create user')
          errorResponse = {
            code: 'auth/cannot-create-account',
            error: 'Cannot create account',
            field: 'Create User',
          }
        }
      })
      .catch((err) => {
        console.error(err)
        errorResponse = {
          code: err.code,
          error: err.message,
          field: 'Create User',
        }
      })

    return errorResponse
  }

  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        firstName: '',
        lastName: '',
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

        if (values.firstName.length > 36 && values.firstName.length !== 0)
          errors.firstName =
            'Your first name exceeds the maximum length 40 characters'

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
            name="lastName"
            placeholder="Last name"
            component={CustomTextField}
            required={false}
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
            Sign In
          </Styled.LoginSubmit>
        </Styled.LoginForm>
      )}
    </Formik>
  )
}
