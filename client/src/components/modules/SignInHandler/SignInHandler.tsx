import { useState } from 'react'
import { SignIn, SignUp } from '..'

export const SignInHandler: React.FC = () => {
  const [mode, setMode] = useState('SignIn')

  if (mode === 'SignIn') {
    return (
      <>
        <SignIn />
        <div onClick={() => setMode('SignUp')}>Don't have an account</div>
      </>
    )
  } else {
    return (
      <>
        <SignUp />
        <div onClick={() => setMode('SignIn')}>Already have an account?</div>
      </>
    )
  }
}
