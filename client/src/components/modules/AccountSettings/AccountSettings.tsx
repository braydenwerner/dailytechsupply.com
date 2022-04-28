import { useEffect, useState } from 'react'
import { auth } from '../../../config/config'
import { User } from '../../../generated/graphql'

import * as Styled from './AccountSettings.styled'

interface AccountSettingsProps {
  user: User
}
export const AccountSettings: React.FC<AccountSettingsProps> = ({ user }) => {
  const [signInMethods, setSignInMethods] = useState<string[]>([])

  useEffect(() => {
    const fetchSignInMethods = async () => {
      if (auth.currentUser?.email) {
        const res = await auth.fetchSignInMethodsForEmail(
          auth.currentUser.email
        )
        setSignInMethods(res)
      }
    }
    fetchSignInMethods()
  }, [])

  return (
    <Styled.AccountSettingsWrapper>
      <Styled.AccountSettingsContainer>
        <Styled.AccountSettingsTitle>
          Account Settings
        </Styled.AccountSettingsTitle>
        <Styled.AccountSettingSubtitle>
          Social Accounts
        </Styled.AccountSettingSubtitle>
      </Styled.AccountSettingsContainer>
    </Styled.AccountSettingsWrapper>
  )
}
