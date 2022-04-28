import { createPortal } from 'react-dom'
import { useState, useContext, useEffect } from 'react'
import { Alert, Slide, Snackbar } from '@mui/material'
import {
  useCreateUserMutation,
  useLoginMutation,
  useUpdateUserMutation,
} from '../../../generated/graphql'

import {
  auth,
  facebookAuthProvider,
  googleAuthProvider,
  microsoftAuthProvider,
  twitterAuthProvider,
} from '../../../config/config'
import { TokenContext } from '../../../providers'
import { ProviderSignInButton } from '../../elements/ProviderSignInButton/ProviderSignInButton'
import * as Styled from './ProviderSignIn.styled'

interface ProviderSignInProps {
  onStart?: () => void
  onSuccess?: () => void
}

export const ProviderSignIn: React.FC<ProviderSignInProps> = ({
  onStart,
  onSuccess,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )
  const [modalPortal, setModalPortal] = useState<HTMLElement | null>(null)

  const [login] = useLoginMutation()
  const [updateUser] = useUpdateUserMutation()
  const [createUser] = useCreateUserMutation()

  const { setTokenAttached } = useContext(TokenContext)

  useEffect(() => {
    setModalPortal(document.getElementById('modal-portal'))
  }, [])

  const signInWithProvider = async (
    provider: firebase.default.auth.AuthProvider
  ) => {
    if (onStart) onStart()

    let result = null
    try {
      result = await auth.signInWithPopup(provider)
    } catch (err: any) {
      if (err.code == 'auth/account-exists-with-different-credential') {
        setErrorMessage(
          `An account already exists with this e-mail address. Please sign in to that account first, then connect your ${err.credential.providerId} account.`
        )
      }
    }
    if (!result) return

    const user = result.user
    if (!user?.uid) return

    if (result.additionalUserInfo?.isNewUser) {
      const display_name = user.displayName
        ? user.displayName
        : user.email?.split('@')[0]

      if (!display_name) return
      const response = await createUser({
        variables: {
          input: {
            uid: user.uid,
            email: user.email,
            display_name,
            last_logged_in: new Date(),
          },
        },
      })

      if (response.data?.createUser.token) {
        localStorage.setItem('token', response.data.createUser.token)
        setTokenAttached(true)
      }
    } else {
      const response = await login({ variables: { uid: user.uid } })

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
    if (onSuccess) onSuccess()
  }

  return (
    <Styled.ProviderSignInContainer>
      <Styled.DividerContainer>
        <Styled.DividerLine />
        <Styled.DivderText>or</Styled.DivderText>
        <Styled.DividerLine />
      </Styled.DividerContainer>
      <ProviderSignInButton
        onClick={() => signInWithProvider(googleAuthProvider)}
        title="Continue with Google"
        svg={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="26px"
            height="26px"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </svg>
        }
      />
      <ProviderSignInButton
        onClick={() => signInWithProvider(facebookAuthProvider)}
        title="Continue with Facebook"
        svg={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="26px"
            height="26px"
          >
            <linearGradient
              id="Ld6sqrtcxMyckEl6xeDdMa"
              x1="9.993"
              x2="40.615"
              y1="9.993"
              y2="40.615"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#2aa4f4" />
              <stop offset="1" stopColor="#007ad9" />
            </linearGradient>
            <path
              fill="url(#Ld6sqrtcxMyckEl6xeDdMa)"
              d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
            />
            <path
              fill="#fff"
              d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
            />
          </svg>
        }
      />
      <ProviderSignInButton
        onClick={() => signInWithProvider(microsoftAuthProvider)}
        title="Continue with Microsoft"
        svg={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="26px"
            height="26px"
          >
            <path
              fill="#ff5722"
              d="M6 6H22V22H6z"
              transform="rotate(-180 14 14)"
            />
            <path
              fill="#4caf50"
              d="M26 6H42V22H26z"
              transform="rotate(-180 34 14)"
            />
            <path
              fill="#ffc107"
              d="M26 26H42V42H26z"
              transform="rotate(-180 34 34)"
            />
            <path
              fill="#03a9f4"
              d="M6 26H22V42H6z"
              transform="rotate(-180 14 34)"
            />
          </svg>
        }
      />
      {modalPortal &&
        createPortal(
          <Snackbar
            open={!!errorMessage}
            TransitionComponent={(props) => <Slide {...props} direction="up" />}
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              left: 0,
            }}
          >
            <Alert severity="error" onClose={() => setErrorMessage(undefined)}>
              {errorMessage}
            </Alert>
          </Snackbar>,
          modalPortal
        )}
    </Styled.ProviderSignInContainer>
  )
}
