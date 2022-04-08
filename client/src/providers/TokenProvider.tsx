import { createContext, useState, useEffect, useMemo } from 'react'

import { auth, User } from '../config/config'
import useLocalStorage from '../hooks/useLocalStorage'

export const TokenContext = createContext({
  user: null as User,
  tokenAttached: false,
  setTokenAttached: (isAttached: boolean) => {
    return
  },
})

export const TokenProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [tokenAttached, setTokenAttached] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('token')) setTokenAttached(true)
  }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUser(user)
      else setUser(null)
    })

    return () => unsubscribe()
  }, [])

  const signedInValue = useMemo(
    () => ({
      user,
      tokenAttached,
      setTokenAttached,
    }),
    [user, tokenAttached, setTokenAttached]
  )

  return (
    <TokenContext.Provider value={signedInValue}>
      {children}
    </TokenContext.Provider>
  )
}
