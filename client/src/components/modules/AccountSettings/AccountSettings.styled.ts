import styled from 'styled-components'

export const AccountSettingsWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

export const LoginSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const AccountSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 750px;
`

export const AccountSettingsTitle = styled.div`
  margin-top: 15px;
  font-size: 2rem;
  font-weight: 700;
  color: rgb(72, 72, 72);
`

export const AccountSettingSubtitle = styled.div`
  font-size: 1.5rem;
  margin: 50px 0px 25px 0px;
  font-weight: 700;
  color: rgb(72, 72, 72);
`

export const AccountSettingsOption = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 15px 0px 15px 0px;
`

export const AccountLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const ProviderText = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: rgb(72, 72, 72);
  margin-bottom: 15px;
`

interface ProviderLabelProps {
  color?: string
}

export const ProviderLabel = styled.div<ProviderLabelProps>`
  font-size: 1rem;
  color: ${(props) => (props.color ? props.color : '#484848 ')};
`

export const DividerLine = styled.div`
  height: 1px;
  margin: 15px 0px 15px 0px;
  background-color: rgb(0 0 0 / 8%);
  width: 100%;
`

interface LinkButtonProps {
  open?: boolean
}

export const LinkButtonContainer = styled.div``

export const LinkButton = styled.div<LinkButtonProps>`
  user-select: none;
  color: #008489;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: ${(props) => props.open && 'underline'};

  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`

export const DeactivateAccountButton = styled.div`
  font-size: 1rem;
  color: #d93900;
  user-select: none;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`
