import { useEffect } from 'react'
import { auth } from '../../../config/config'
import { User } from '../../../generated/graphql'

import * as Styled from './AccountSettings.styled'

interface AccountSettingsProps {
  user: User
}
export const AccountSettings: React.FC<AccountSettingsProps> = ({ user }) => {
  useEffect(() => {
    const fetchSignInMethods = async () => {
      console.log(auth.currentUser)
      if (auth.currentUser?.email) {
        const methods = await auth.fetchSignInMethodsForEmail(
          auth.currentUser.email
        )
        console.log(methods)
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
