import styled from 'styled-components'

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

export const SettingsModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
`

export const SettingsModalHeader = styled.div`
  font-size: 1.1rem;
  padding-top: 25px;
  padding-left: 20px;
  padding-right: 20px;
`

export const SettingsModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  top: 45px;
`

export const SettingsModalCancelButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 43px;
  border-radius: 5px;
  margin-top: 25px;
  background-color: rgba(221, 221, 221);
  border: none;
  outline: none;
  cursor: pointer;
  color: black;
  font-weight: 700;
  font-size: 1rem;
  margin: 0px 5px 15px 15px;
`

interface RequireLoginContinueButton {
  color: string
}

export const SettingsModalContinueButton = styled.div<RequireLoginContinueButton>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 43px;
  border-radius: 5px;
  margin-top: 25px;
  background-color: ${(props) => props.color};
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0px 15px 15px 5px;
  font-size: 1rem;
  color: white;
  font-weight: 700;
`
