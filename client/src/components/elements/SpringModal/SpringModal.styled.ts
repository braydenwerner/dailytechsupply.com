import styled from 'styled-components'

export const ModalStyle = {
  display: 'flex',
  justifyContent: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 568,
  height: 650,
  bgcolor: 'background.paper',
  borderRadius: '13px',
}

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 568px;
`

export const SignInHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  width: 100%;
  border-bottom: 1px solid rgb(0 0 0 / 8%);
`

export const SignInTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  margin-left: 35px;
`

export const CloseModalIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 28px;
  width: 28px;
  margin-right: 35px;
  border-radius: 50px;
  cursor: pointer;

  :hover {
    background-color: rgb(0 0 0 / 5%);
  }
`
