import { MutableRefObject, useEffect, useState } from 'react'
import { Alert, Slide, Snackbar } from '@mui/material'

import {
  auth,
  emailAuthProvider,
  facebookAuthProvider,
  googleAuthProvider,
  microsoftAuthProvider,
} from '../../../config/config'
import {
  useDeleteUserMutation,
  User,
  useUpdateUserMutation,
} from '../../../generated/graphql'
import { SingleInputForm, SpringModal } from '../../elements'
import { createDateString } from '../../../utils/utils'
import { useRouter } from 'next/router'
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
  const [updateEmailLoading, setUpdateEmailLoading] = useState(false)

  const [updatePasswordOpen, setUpdatePasswordOpen] = useState(false)
  const [updatePasswordErrors, setUpdatePasswordErrors] = useState<
    string | undefined
  >()

  const [connectPasswordOpen, setConnectPasswordOpen] = useState(false)
  const [connectPasswordError, setConnectPasswordError] = useState<
    string | undefined
  >()

  const [requiresLoginOpen, setRequiresLoginOpen] = useState(false)
  const [deactivateAccountOpen, setDeactivateAccountOpen] = useState(false)

  const [updateUser] = useUpdateUserMutation()
  const [deleteUser] = useDeleteUserMutation()

  const router = useRouter()

  useEffect(() => {
    fetchSignInMethods()
  }, [auth.currentUser])

  const handleFirebaseError = async (err: any) => {
    console.error(err)
    if (err.code === 'auth/requires-recent-login') {
      setDeactivateAccountOpen(false)
      setRequiresLoginOpen(true)
    } else if (err.code === 'auth/provider-already-linked')
      setErrorMessage(
        'Your account is already linked with a username and a password.'
      )
    else if (err.code === 'auth/user-token-expired')
      setErrorMessage(
        'Your user credentials are no longer valid. Please log in again.'
      )
    else if (err.code === 'auth/invalid-credential')
      setErrorMessage('Could not link your account due to invalid credentials.')
    else if (err.code === 'auth/credential-already-in-use')
      setErrorMessage(
        'This credential is already associated with another account.'
      )
    else if (err.code === 'auth/no-such-provider')
      setErrorMessage('Your account was not linked to that provider.')
  }

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
    setErrorMessage(undefined)

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
      handleFirebaseError(err)
    }
  }

  const updateEmail = async (
    inputRef: MutableRefObject<HTMLInputElement | null>
  ) => {
    setUpdateEmailLoading(true)
    setErrorMessage(undefined)

    const email = inputRef.current?.value
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (!email || !re.test(email)) {
      setUpdateEmailErrors('Invalid email formatting')
      setUpdateEmailLoading(false)
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
      handleFirebaseError(err)
    }
    setUpdateEmailLoading(false)
  }

  const updatePassword = async (
    inputRef: MutableRefObject<HTMLInputElement | null>
  ) => {
    setErrorMessage(undefined)

    const password = inputRef.current?.value
    if (!password || password.length < 8) {
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
      handleFirebaseError(err)
    }
  }

  const linkProvider = async (provider: firebase.auth.AuthProvider) => {
    setErrorMessage(undefined)

    try {
      await auth.currentUser?.linkWithPopup(provider)
      fetchSignInMethods()
    } catch (err: any) {
      handleFirebaseError(err)
    }
  }

  const unlinkProvider = async (provider: firebase.auth.AuthProvider) => {
    setErrorMessage(undefined)

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
      handleFirebaseError(err)
    }
  }

  const deactivateAccount = async () => {
    setErrorMessage(undefined)

    try {
      if (auth.currentUser) {
        await auth.currentUser.delete()

        await deleteUser()

        localStorage.removeItem('token')
        await router.push('/')
        window.location.reload()
      }
    } catch (err) {
      handleFirebaseError(err)
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
              <Styled.AccountLabelContainer>
                <Styled.ProviderText>Email</Styled.ProviderText>
                {auth.currentUser && (
                  <Styled.ProviderLabel>
                    {auth.currentUser.email}
                  </Styled.ProviderLabel>
                )}
              </Styled.AccountLabelContainer>
              <Styled.LinkButtonContainer>
                {!updateEmailOpen ? (
                  <Styled.LinkButton onClick={() => setUpdateEmailOpen(true)}>
                    Update
                  </Styled.LinkButton>
                ) : (
                  <Styled.LinkButton
                    onClick={() => {
                      setUpdateEmailErrors(undefined)
                      setUpdateEmailOpen(false)
                    }}
                    open={true}
                  >
                    Cancel
                  </Styled.LinkButton>
                )}
              </Styled.LinkButtonContainer>
            </Styled.AccountSettingsOption>
            {updateEmailOpen && (
              <SingleInputForm
                onSubmit={updateEmail}
                inputTitle="New email"
                formError={updateEmailErrors}
                submitTitle="Update email"
                loading={updateEmailLoading}
              />
            )}
            <Styled.DividerLine />
            <Styled.AccountSettingsOption>
              <Styled.AccountLabelContainer>
                <Styled.ProviderText>Password</Styled.ProviderText>
                {user.last_updated_password && (
                  <Styled.ProviderLabel>
                    Last updated on{' '}
                    {createDateString(user.last_updated_password)}
                  </Styled.ProviderLabel>
                )}
              </Styled.AccountLabelContainer>
              <Styled.LinkButtonContainer>
                {!updatePasswordOpen ? (
                  <Styled.LinkButton
                    onClick={() => setUpdatePasswordOpen(true)}
                  >
                    Update
                  </Styled.LinkButton>
                ) : (
                  <Styled.LinkButton
                    onClick={() => {
                      setUpdatePasswordErrors(undefined)
                      setUpdatePasswordOpen(false)
                    }}
                    open={true}
                  >
                    Cancel
                  </Styled.LinkButton>
                )}
              </Styled.LinkButtonContainer>
            </Styled.AccountSettingsOption>
            {updatePasswordOpen && (
              <SingleInputForm
                onSubmit={updatePassword}
                inputType="password"
                inputTitle="New password"
                formError={updatePasswordErrors}
                submitTitle="Update password"
              />
            )}
          </Styled.LoginSettingsContainer>
          <Styled.AccountSettingSubtitle>
            Social Accounts
          </Styled.AccountSettingSubtitle>
          {signInMethods &&
            signInMethods.map((method, i) => (
              <div key={i}>
                <Styled.AccountSettingsOption>
                  <Styled.AccountLabelContainer>
                    <Styled.ProviderText>{method.title}</Styled.ProviderText>
                    <Styled.ProviderLabel
                      color={method.linked ? '' : '#767676'}
                    >
                      {method.linked ? 'Connected' : 'Not Connected'}
                    </Styled.ProviderLabel>
                  </Styled.AccountLabelContainer>
                  {!connectPasswordOpen ||
                  method.provider !== emailAuthProvider ? (
                    <Styled.LinkButtonContainer>
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
                    </Styled.LinkButtonContainer>
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
                      inputTitle="New password"
                      formError={connectPasswordError}
                      submitTitle="Update password"
                    />
                  )}
                <Styled.DividerLine style={{ marginTop: '25px' }} />
              </div>
            ))}
          <Styled.LoginSettingsContainer>
            <Styled.AccountSettingSubtitle>
              Account
            </Styled.AccountSettingSubtitle>
            <Styled.AccountSettingsOption>
              <Styled.ProviderLabel>
                Deactivate your account
              </Styled.ProviderLabel>
              <Styled.DeactivateAccountButton
                onClick={() => setDeactivateAccountOpen(true)}
              >
                Deactivate
              </Styled.DeactivateAccountButton>
              {deactivateAccountOpen && (
                <SpringModal
                  onClose={() => setDeactivateAccountOpen(false)}
                  width={568}
                  height={250}
                  title="Deactivate Account"
                  titleSize="1.5rem"
                  headerHeight={70}
                >
                  <Styled.SettingsModalContainer>
                    <Styled.SettingsModalHeader>
                      Are you sure you want to permanently delete your account?
                      This action cannot be undone.
                    </Styled.SettingsModalHeader>
                    <Styled.SettingsModalButtonContainer>
                      <Styled.SettingsModalCancelButton
                        onClick={() => setDeactivateAccountOpen(false)}
                      >
                        Cancel
                      </Styled.SettingsModalCancelButton>
                      <Styled.SettingsModalContinueButton
                        onClick={deactivateAccount}
                        color="#D95767"
                      >
                        Deactivate
                      </Styled.SettingsModalContinueButton>
                    </Styled.SettingsModalButtonContainer>
                  </Styled.SettingsModalContainer>
                </SpringModal>
              )}
            </Styled.AccountSettingsOption>
            <Styled.DividerLine />
          </Styled.LoginSettingsContainer>
        </Styled.AccountSettingsContainer>
      </Styled.AccountSettingsWrapper>
      {requiresLoginOpen && (
        <SpringModal
          onClose={() => setRequiresLoginOpen(false)}
          width={568}
          height={250}
          title="Please Sign Out"
          titleSize="1.5rem"
          headerHeight={70}
        >
          <Styled.SettingsModalContainer>
            <Styled.SettingsModalHeader>
              This operation is sensitive and requires you to log in again.
              Press continue to sign out.
            </Styled.SettingsModalHeader>
            <Styled.SettingsModalButtonContainer>
              <Styled.SettingsModalCancelButton
                onClick={() => setRequiresLoginOpen(false)}
              >
                Cancel
              </Styled.SettingsModalCancelButton>
              <Styled.SettingsModalContinueButton
                onClick={async () => {
                  localStorage.removeItem('token')
                  await auth.signOut()
                  window.location.reload()
                }}
                color="rgb(0, 132, 137)"
              >
                Continue
              </Styled.SettingsModalContinueButton>
            </Styled.SettingsModalButtonContainer>
          </Styled.SettingsModalContainer>
        </SpringModal>
      )}
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
