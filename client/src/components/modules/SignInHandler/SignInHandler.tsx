import { Dispatch, SetStateAction, useState } from 'react'
import { SignIn, SignUp } from '..'

interface SignInHandlerProps {
  closeModal: () => void
}

export const SignInHandler: React.FC<SignInHandlerProps> = ({ closeModal }) => {
  const [mode, setMode] = useState('SignIn')

  if (mode === 'SignIn') {
    return (
      <>
        <SignIn closeModal={closeModal} />
        <div onClick={() => setMode('SignUp')}>Don't have an account</div>
      </>
    )
  } else {
    return (
      <>
        <SignUp closeModal={closeModal} />
        <div onClick={() => setMode('SignIn')}>Already have an account?</div>
      </>
    )
  }
}
