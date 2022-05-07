import { createContext, useState, useEffect, useMemo } from 'react'
import { useGetUserLazyQuery } from '../generated/graphql'

import { auth, User } from '../config/config'
import { UserData } from '../types'

export const TokenContext = createContext({
  user: null as User,
  isMounted: false,
  tokenAttached: false,
  loading: false,
  userData: null as UserData,
  setTokenAttached: (isAttached: boolean) => {
    return
  },
})

export const TokenProvider: React.FC = ({ children }) => {
  const [getUser, { data, loading }] = useGetUserLazyQuery()
  const userData = data && data.getUser

  const [isMounted, setIsMounted] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [tokenAttached, setTokenAttached] = useState(false)

  useEffect(() => {
    if (tokenAttached) getUser()
  }, [tokenAttached])

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      setTokenAttached(true)
    }
    setIsMounted(true)
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
      isMounted,
      tokenAttached,
      loading,
      userData,
      setTokenAttached,
    }),
    [user, isMounted, tokenAttached, loading, userData, setTokenAttached]
  )

  return (
    <TokenContext.Provider value={signedInValue}>
      {children}
    </TokenContext.Provider>
  )
}
