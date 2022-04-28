import { FormEvent, useEffect, useRef, useState } from 'react'
import { Alert, Slide, Snackbar } from '@mui/material'
import {
  auth,
  emailAuthProvider,
  facebookAuthProvider,
  googleAuthProvider,
  microsoftAuthProvider,
  twitterAuthProvider,
} from '../../../config/config'
import { User } from '../../../generated/graphql'
import firebase from 'firebase'

import * as Styled from './AccountSettings.styled'

interface AccountSettingsProps {
  user: User
}

type SignInMethods = {
  title: string
  linked: boolean
  provider: firebase.auth.AuthProvider
}

export const AccountSettings: React.FC<AccountSettingsProps> = ({ user }) => {
  const [signInMethods, setSignInMethods] = useState<
    SignInMethods[] | undefined
  >()
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [enterPasswordOpen, setEnterPasswordOpen] = useState(false)
  const [passwordError, setPasswordError] = useState<string | undefined>()

  const passwordInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    fetchSignInMethods()
  }, [])

  const fetchSignInMethods = async () => {
    if (auth.currentUser?.email) {
      const res = await auth.fetchSignInMethodsForEmail(auth.currentUser.email)
      setSignInMethods([
        {
          title: 'Email and password',
          linked: res.indexOf('password') >= 0,
          provider: emailAuthProvider,
        },
        {
          title: 'Google',
          linked: res.indexOf('google.com') >= 0,
          provider: googleAuthProvider,
        },
        {
          title: 'Facebook',
          linked: res.indexOf('facebook.com') >= 0,
          provider: facebookAuthProvider,
        },
        {
          title: 'Twitter',
          linked: res.indexOf('twitter.com') >= 0,
          provider: twitterAuthProvider,
        },
        {
          title: 'Microsoft',
          linked: res.indexOf('microsoft.com') >= 0,
          provider: microsoftAuthProvider,
        },
      ])
    }
  }

  const linkUsernameAndPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!auth.currentUser?.email) return

    const password = passwordInputRef.current?.value
    if (password && password.length < 8) {
      setPasswordError('Passwords must be at least 8 characters long.')
      return
    }

    const credential = firebase.auth.EmailAuthProvider.credential(
      auth.currentUser.email,
      'password'
    )

    try {
      await auth.currentUser?.linkWithCredential(credential)
    } catch (err: any) {
      if (err.code === 'auth/requires-recent-login')
        setErrorMessage(
          'This operation is sensitive and requires a recent login. Please log in again.'
        )
      else if (err.code === 'auth/provider-already-linked')
        setErrorMessage(
          'Your account is already linked with a username and a password.'
        )
      else if (err.code === 'auth/user-token-expired')
        setErrorMessage(
          'Your user credentials are no longer valid. Please log in again.'
        )
      console.error(err)
    }
    fetchSignInMethods()
  }

  const linkProvider = async (provider: firebase.auth.AuthProvider) => {
    try {
      await auth.currentUser?.linkWithPopup(provider)
    } catch (err: any) {
      console.log(err)
      if (err.code === 'auth/invalid-credential')
        setErrorMessage('Could not link account due to invalid credentials.')
      else if (err.code === 'auth/credential-already-in-use')
        setErrorMessage(
          'This credential is already associated with another account.'
        )
    }
    fetchSignInMethods()
  }

  const unlinkProvider = async (provider: firebase.auth.AuthProvider) => {
    try {
      let numProviders = 0
      for (const method of signInMethods!) {
        if (method.linked) numProviders++
      }
      if (numProviders <= 1) {
        setErrorMessage('You must have at least one sign in method available.')
        return
      }
      await auth.currentUser?.unlink(provider.providerId)
    } catch (err: any) {
      console.log(err)
      if (err.code === 'auth/no-such-provider')
        setErrorMessage('Your account was not linked to that provider.')
    }
    fetchSignInMethods()
  }

  return (
    <>
      <Styled.AccountSettingsWrapper>
        <Styled.AccountSettingsContainer>
          <Styled.AccountSettingsTitle>
            Account Settings
          </Styled.AccountSettingsTitle>
          <Styled.AccountSettingSubtitle>
            Social Accounts
          </Styled.AccountSettingSubtitle>
          <Styled.SocialAccountContainer>
            {signInMethods &&
              signInMethods.map((method, i) => (
                <div key={i}>
                  <Styled.SocialAccountTitle>
                    {method.title}
                  </Styled.SocialAccountTitle>
                  <Styled.LinkButton
                    onClick={() => {
                      if (method.provider === emailAuthProvider) {
                        if (method.linked) unlinkProvider(method.provider)
                        else setEnterPasswordOpen(true)
                      } else {
                        if (method.linked) unlinkProvider(method.provider)
                        else linkProvider(method.provider)
                      }
                    }}
                  >
                    {method.linked ? 'Disconnect' : 'Connect'}
                  </Styled.LinkButton>
                  {method.provider === emailAuthProvider && enterPasswordOpen && (
                    <form onSubmit={linkUsernameAndPassword}>
                      <input
                        type="password"
                        placeholder="Enter a password"
                        ref={passwordInputRef}
                      />
                      {passwordError && <div>{passwordError}</div>}
                      <button
                        onClick={() => {
                          setEnterPasswordOpen(false)
                          setPasswordError(undefined)
                        }}
                      >
                        Cancel
                      </button>
                      <button type="submit">Submit</button>
                    </form>
                  )}
                </div>
              ))}
          </Styled.SocialAccountContainer>
        </Styled.AccountSettingsContainer>
      </Styled.AccountSettingsWrapper>
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
      </Snackbar>
    </>
  )
}
