import React, { useState, useContext } from 'react'
import { Formik, Form, Field } from 'formik'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import {
  useLoginMutation,
  useUpdateUserMutation,
} from '../../../generated/graphql'

import { auth } from '../../../config/config'
import { SignedInContext } from '../../../providers'
import { CustomTextField } from '../../elements'

interface FormSubmitData {
  email: string
  password: string
}

type ErrorResponse = { error: string; field: string }

export const SignIn: React.FC = () => {
  const [login] = useLoginMutation()
  const [updateUser] = useUpdateUserMutation()

  const { updateTokenAttached } = useContext(SignedInContext)

  const [successSnackbarOpen, setSuccessSnackBarOpen] = useState(false)
  const [errorSnackbarOpen, setErrorSnackBarOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const signInUser = async (
    data: FormSubmitData
  ): Promise<ErrorResponse | null> => {
    let response = null

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
              lastLoggedIn: new Date(),
            },
          },
        })
      })
      .catch((error) => {
        response = { error: error.message, field: 'Sign In User' }
      })

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

          const response: ErrorResponse | null = await signInUser(data)

          //  if there is an error such as email already exists, display it
          if (response?.error) {
            setSubmitting(false)
            setErrorSnackBarOpen(true)
            setErrorMessage('Sign in failed')
          }
        }}
        validate={(values) => {
          const errors: Record<string, string> = {}

          if (values.email.length === 0) errors.email = 'Please enter an email'
          if (values.password.length === 0)
            errors.password = 'Please enter a password'

          const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
          if (!re.test(values.email) && values.email.length !== 0)
            errors.email = 'Invalid email formatting'

          if (values.password.length < 8 && values.password.length !== 0)
            errors.password = 'Passwords must be at least 8 characters long'

          return errors
        }}
      >
        {({ values, errors, isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
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
          </Form>
        )}
      </Formik>
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSuccessSnackBarOpen(false)}
      >
        <Alert severity="success">Your account has been created!</Alert>
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
