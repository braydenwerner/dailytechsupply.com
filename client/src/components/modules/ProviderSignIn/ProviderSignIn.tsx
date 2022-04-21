import { useState, useContext } from 'react'
import {
  auth,
  facebookAuthProvider,
  googleAuthProvider,
  microsoftAuthProvider,
  twitterAuthProvider,
} from '../../../config/config'
import {
  useCreateUserMutation,
  useLoginMutation,
  useUpdateUserMutation,
} from '../../../generated/graphql'
import { TokenContext } from '../../../providers'
import { ProviderSignInButton } from '../../elements/ProviderSignInButton/ProviderSignInButton'

interface ProviderSignInProps {
  onStart?: () => void
  onSuccess?: () => void
}

export const ProviderSignIn: React.FC<ProviderSignInProps> = ({
  onStart,
  onSuccess,
}) => {
  const [errorMessage, setErrorMessage] = useState('')

  const [login] = useLoginMutation()
  const [updateUser] = useUpdateUserMutation()
  const [createUser] = useCreateUserMutation()

  const { setTokenAttached } = useContext(TokenContext)

  const signInWithProvider = (provider: firebase.default.auth.AuthProvider) => {
    if (onStart) onStart()

    auth
      .signInWithPopup(provider)
      .then(async (result) => {
        if (!result.user?.uid) return

        if (result.additionalUserInfo?.isNewUser) {
          const response = await createUser({
            variables: {
              input: {
                uid: result.user.uid,
                email: result.user.email,
                display_name: result.user.displayName,
                last_logged_in: new Date(),
              },
            },
          })

          if (response.data?.createUser.token) {
            localStorage.setItem('token', response.data.createUser.token)
            setTokenAttached(true)
          }
        } else {
          const response = await login({ variables: { uid: result.user.uid } })

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
      })
      .catch((error) => {
        console.error(error)

        if (error.code === 'auth/account-exists-with-different-credential')
          setErrorMessage(
            'An account already exists that is associated with a different login provider. Try logging in with another method.'
          )
      })
  }

  return (
    <>
      <div>Or</div>
      <ProviderSignInButton
        onClick={() => signInWithProvider(googleAuthProvider)}
        title="Continue with Google"
        imagePath=""
      />
      <ProviderSignInButton
        onClick={() => signInWithProvider(facebookAuthProvider)}
        title="Continue with Facebook"
        imagePath=""
      />
      <ProviderSignInButton
        onClick={() => signInWithProvider(twitterAuthProvider)}
        title="Continue with Twitter"
        imagePath=""
      />
      <ProviderSignInButton
        onClick={() => signInWithProvider(microsoftAuthProvider)}
        title="Continue with Microsoft"
        imagePath=""
      />
      {errorMessage && <div>{errorMessage}</div>}
    </>
  )
}
