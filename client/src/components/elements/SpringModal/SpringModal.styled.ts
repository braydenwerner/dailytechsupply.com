import styled from 'styled-components'

interface ModalContainerProps {
  width?: number
}

export const ModalContainer = styled.div<ModalContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: ${(props) => (props.width ? props.width - 10 : 568)}px;
`

interface ModalHeaderProps {
  headerHeight?: number
}

export const ModalHeader = styled.div<ModalHeaderProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${(props) => (props.headerHeight ? props.headerHeight : 70)}px;
  width: 100%;
  border-bottom: 1px solid rgb(0 0 0 / 8%);
`

interface ModalTitleProps {
  titleSize?: string
}

export const ModalTitle = styled.div<ModalTitleProps>`
  font-size: ${(props) => (props.titleSize ? props.titleSize : '1.7rem')};
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
