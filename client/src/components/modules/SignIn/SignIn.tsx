import { useState, useContext } from 'react'
import { Formik, Form, Field } from 'formik'
import { Snackbar } from '@material-ui/core'

import {
  useCreateUserMutation,
  useUpdateUserMutation,
  useLoginMutation,
} from '../../../generated/graphql'
import { auth } from '../../../config/config'
import { SignedInContext } from '../../../providers'
import { CustomTextField } from '../../elements/index'
import { Alert } from '@material-ui/lab'

interface FormSubmitData {
  firstName: string
  lastName: string
  email: string
  password: string
}

type errorResponse = { error: string }

export const SignIn: React.FC = () => {
  const [email, setEmail] = useState('')
  const [snackbarOpen, setSnackBarOpen] = useState(false)
  const [errorSnackbarOpen, setErrorSnackBarOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState()

  const { updateTokenAttached } = useContext(SignedInContext)

  const [login] = useLoginMutation()
  const [createUser] = useCreateUserMutation()
  const [updateUser] = useUpdateUserMutation()

  const createNewUser = async (data: FormSubmitData) => {
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
                lastLoggedIn: new Date(),
              },
            },
          })
          if (response.data?.createUser.token) {
            //  save the jwt token in localstorage
            localStorage.setItem('token', response.data.createUser.token)
            updateTokenAttached(true)
          }
        } else {
          console.error('User object does not exist, cannot create user')
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  //  create a user and send a verification email
  const handleSubmit = async (
    data: FormSubmitData
  ): Promise<errorResponse | null> => {
    let response = null

    // attempt to log in the user
    await auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(async (user) => {
        if (user.user?.uid) {
          const response = await login({ variables: { uid: user.user.uid } })
          //  save the jwt token in localstorage
          if (response.data?.login.token) {
            localStorage.setItem('token', response.data.login.token)
            updateTokenAttached(true)
          }
        }
      })
      .then(() => {
        updateUser({
          variables: {
            input: {
              first_name: data.firstName,
              last_name: data.lastName,
              lastLoggedIn: new Date(),
            },
          },
        })
      })
      .catch((error) => {
        //   if the accout does not exist, create it, this is so scuffed
        if (error.code === 'auth/user-not-found') {
          createNewUser(data)
        } else {
          response = { error: error.message }
        }
      })

    return response
  }

  const handleResetPassword = (email: string) => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmail(email)
        setSnackBarOpen(true)
      })
      .catch((error) => {
        setErrorSnackBarOpen(true)
        setErrorMessage(error.message)
      })
  }

  return (
    <>
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
          if (
            data.firstName.length === 0 ||
            data.email.length === 0 ||
            data.password.length === 0
          )
            return

          setSubmitting(true)

          const res: errorResponse | null = await handleSubmit(data)

          //  if there is an error such as email already exists, display it
          if (res?.error) {
            setFieldError('password', res.error)
            setSubmitting(false)
          }
        }}
        validate={(values) => {
          const errors: Record<string, string> = {}

          if (values.firstName.length <= 0) {
            errors.name = 'Please enter your first name'
          } else if (values.email.length === 0) {
            errors.name = 'Please enter an email'
          } else if (values.password.length === 0) {
            errors.password = 'Please enter a password'
          }

          if (values.firstName.length > 36 && values.firstName.length !== 0) {
            errors.firstName =
              'Your first name exceeds the maximum length 40 characters'
          }

          const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
          if (!re.test(values.email) && values.email.length !== 0) {
            errors.email = 'Invalid email formatting'
          }

          if (values.password.length < 8 && values.password.length !== 0) {
            errors.password = 'Passwords must be at least 8 characters long'
          }

          return errors
        }}
      >
        {({ values, errors }) => (
          <Form>
            <Field name="firstName" component={CustomTextField} />
            <Field name="lastName" component={CustomTextField} />
            <Field name="email" component={CustomTextField} />
            <Field
              name="password"
              type="password"
              component={CustomTextField}
            />
            <div
              onClick={() => {
                if (values.email.length > 0) {
                  handleResetPassword(values.email)
                }
              }}
            >
              Forgot Password?
            </div>
          </Form>
        )}
      </Formik>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackBarOpen(false)}
      >
        <Alert severity="success">
          An email has been sent to {email} to reset your password
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={4000}
        onClose={() => setErrorSnackBarOpen(false)}
      >
        <Alert severity="warning">{errorMessage}</Alert>
      </Snackbar>
    </>
  )
}
