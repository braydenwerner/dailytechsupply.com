import { useState, useContext } from 'react'
import { auth, googleAuthProvider } from '../../../config/config'
import {
  useCreateUserMutation,
  useLoginMutation,
  useUpdateUserMutation,
} from '../../../generated/graphql'
import { TokenContext } from '../../../providers'

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

  const signInWithGoogle = () => {
    if (onStart) onStart()

    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        if (!result.user?.uid) return

        if (result.additionalUserInfo?.isNewUser) {
          const response = await createUser({
            variables: {
              input: {
                uid: result.user.uid,
                email: result.user.email,
                first_name: result.user.displayName,
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
      })
  }

  return (
    <>
      <div>Or</div>
      <button onClick={signInWithGoogle}>Continue with Google</button>
      {errorMessage && <div>{errorMessage}</div>}
    </>
  )
}
