import { MutableRefObject, useEffect, useState } from 'react'
import { Alert, Slide, Snackbar } from '@mui/material'
import {
  auth,
  emailAuthProvider,
  facebookAuthProvider,
  googleAuthProvider,
  microsoftAuthProvider,
  twitterAuthProvider,
} from '../../../config/config'
import { User, useUpdateUserMutation } from '../../../generated/graphql'
import { SingleInputForm } from '../../elements'
import firebase from 'firebase/app'

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

  const [updateEmailOpen, setUpdateEmailOpen] = useState(false)
  const [updateEmailErrors, setUpdateEmailErrors] = useState<
    string | undefined
  >()

  const [updatePasswordOpen, setUpdatePasswordOpen] = useState(false)
  const [updatePasswordErrors, setUpdatePasswordErrors] = useState<
    string | undefined
  >()

  const [connectPasswordOpen, setConnectPasswordOpen] = useState(false)
  const [connectPasswordError, setConnectPasswordError] = useState<
    string | undefined
  >()

  const [updateUser] = useUpdateUserMutation()

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
          title: 'Microsoft',
          linked: res.indexOf('microsoft.com') >= 0,
          provider: microsoftAuthProvider,
        },
      ])
    }
  }

  const linkUsernameAndPassword = async (
    inputRef: MutableRefObject<HTMLInputElement | null>
  ) => {
    if (!auth.currentUser?.email) return

    const password = inputRef.current?.value
    if (!password) return

    if (password.length < 8) {
      setConnectPasswordError('Passwords must be at least 8 characters long')
      return
    }

    const credential = firebase.auth.EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    )

    try {
      await auth.currentUser?.linkWithCredential(credential)
      setConnectPasswordOpen(false)
      fetchSignInMethods()
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
  }

  const updateEmail = async (
    inputRef: MutableRefObject<HTMLInputElement | null>
  ) => {
    const email = inputRef.current?.value
    if (!email) return

    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (!re.test(email)) {
      setUpdateEmailErrors('Invalid email formatting')
      return
    }

    try {
      await auth.currentUser?.updateEmail(email)

      await updateUser({
        variables: { input: { email } },
        refetchQueries: ['getUser'],
      })

      setUpdateEmailOpen(false)
    } catch (err: any) {
      console.error(err)
      if (err?.code === 'auth/requires-recent-login')
        setErrorMessage(
          'This operation is sensitive and requires a recent login. Please log in again.'
        )
    }
  }

  const updatePassword = async (
    inputRef: MutableRefObject<HTMLInputElement | null>
  ) => {
    const password = inputRef.current?.value
    if (!password) return

    if (password.length < 8) {
      setUpdatePasswordErrors('Passwords must be at least 8 characters long')
      return
    }

    try {
      await auth.currentUser?.updatePassword(password)

      await updateUser({
        variables: {
          input: {
            last_updated_password: new Date(),
          },
        },
        refetchQueries: ['getUser'],
      })

      setUpdatePasswordOpen(false)
      fetchSignInMethods()
    } catch (err: any) {
      console.error(err)
    }
  }

  const linkProvider = async (provider: firebase.auth.AuthProvider) => {
    try {
      await auth.currentUser?.linkWithPopup(provider)
      fetchSignInMethods()
    } catch (err: any) {
      console.log(err)
      if (err.code === 'auth/invalid-credential')
        setErrorMessage('Could not link account due to invalid credentials.')
      else if (err.code === 'auth/credential-already-in-use')
        setErrorMessage(
          'This credential is already associated with another account.'
        )
    }
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
      fetchSignInMethods()
    } catch (err: any) {
      console.error(err)
      if (err.code === 'auth/no-such-provider')
        setErrorMessage('Your account was not linked to that provider.')
    }
  }

  return (
    <>
      <Styled.AccountSettingsWrapper>
        <Styled.AccountSettingsContainer>
          <Styled.AccountSettingsTitle>
            Account Settings
          </Styled.AccountSettingsTitle>
          <Styled.LoginSettingsContainer>
            <Styled.AccountSettingSubtitle>Login</Styled.AccountSettingSubtitle>
            <Styled.AccountSettingsOption>
              <Styled.ProviderText>Email</Styled.ProviderText>
              {auth.currentUser && <div>{auth.currentUser.email}</div>}
              {!updateEmailOpen ? (
                <Styled.LinkButton onClick={() => setUpdateEmailOpen(true)}>
                  Update
                </Styled.LinkButton>
              ) : (
                <Styled.LinkButton onClick={() => setUpdateEmailOpen(false)}>
                  Cancel
                </Styled.LinkButton>
              )}
            </Styled.AccountSettingsOption>
            {updateEmailOpen && (
              <SingleInputForm
                onSubmit={updateEmail}
                inputPlaceholder="Enter an email"
                formError={updateEmailErrors}
              />
            )}
            <Styled.AccountSettingsOption>
              <Styled.ProviderText>Password</Styled.ProviderText>
              {auth.currentUser && <div>{user.last_updated_password}</div>}
              {!updatePasswordOpen ? (
                <Styled.LinkButton onClick={() => setUpdatePasswordOpen(true)}>
                  Update
                </Styled.LinkButton>
              ) : (
                <Styled.LinkButton onClick={() => setUpdatePasswordOpen(false)}>
                  Cancel
                </Styled.LinkButton>
              )}
            </Styled.AccountSettingsOption>
            {updatePasswordOpen && (
              <SingleInputForm
                onSubmit={updatePassword}
                inputPlaceholder="Enter a password"
                formError={updatePasswordErrors}
              />
            )}
          </Styled.LoginSettingsContainer>
          <Styled.AccountSettingSubtitle>
            Social Accounts
          </Styled.AccountSettingSubtitle>
          {signInMethods &&
            signInMethods.map((method, i) => (
              <div key={i}>
                <Styled.AccountSettingsOption key={i}>
                  <Styled.ProviderText>{method.title}</Styled.ProviderText>
                  {!connectPasswordOpen ||
                  method.provider !== emailAuthProvider ? (
                    <Styled.LinkButton
                      onClick={() => {
                        if (method.provider === emailAuthProvider) {
                          if (method.linked) unlinkProvider(method.provider)
                          else setConnectPasswordOpen(true)
                        } else {
                          if (method.linked) unlinkProvider(method.provider)
                          else linkProvider(method.provider)
                        }
                      }}
                    >
                      {method.linked ? 'Disconnect' : 'Connect'}
                    </Styled.LinkButton>
                  ) : (
                    <Styled.LinkButton
                      onClick={() => {
                        setConnectPasswordError(undefined)
                        setConnectPasswordOpen(false)
                      }}
                    >
                      Cancel
                    </Styled.LinkButton>
                  )}
                </Styled.AccountSettingsOption>
                {method.provider === emailAuthProvider &&
                  connectPasswordOpen && (
                    <SingleInputForm
                      onSubmit={linkUsernameAndPassword}
                      inputType="password"
                      inputPlaceholder="Enter a password"
                      formError={connectPasswordError}
                    />
                  )}
              </div>
            ))}
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
