import { useContext, useEffect, useState } from 'react'
import { useGetUserLazyQuery, User } from '../../../generated/graphql'

import { auth } from '../../../config/config'
import { TokenContext } from '../../../providers'
import { SignInHandler } from '../../../components/modules'

export const Navbar: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [fetchingUser, setFetchingUser] = useState(true)

  const [getUser, { data, loading }] = useGetUserLazyQuery()
  const userData = data && data.getUser

  const { tokenAttached } = useContext(TokenContext)

  useEffect(() => {
    if (tokenAttached) getUser()
    setFetchingUser(false)
  }, [tokenAttached])

  return (
    <div>
      {(loading || fetchingUser) && <div>Loading...</div>}
      {userData && <div>Hey, {userData.first_name}</div>}
      {!userData && !loading && !fetchingUser && (
        <div onClick={() => setModalOpen((oldModalOpen) => !oldModalOpen)}>
          Sign in
        </div>
      )}
      {userData && (
        <button
          onClick={async () => {
            await auth.signOut().catch((err) => {
              console.log(err)
            })
            localStorage.removeItem('token')
            window.location.reload()
          }}
        >
          Sign Out
        </button>
      )}
      {modalOpen && (
        <div>
          <SignInHandler closeModal={() => setModalOpen(false)} />
        </div>
      )}
    </div>
  )
}
