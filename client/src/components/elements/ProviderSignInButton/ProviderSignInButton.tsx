import { ReactChild } from 'react'

import * as Styled from './ProviderSignInButton.styled'

interface ProviderSignInButtonProps {
  onClick: () => void
  title: string
  svg?: ReactChild
}

export const ProviderSignInButton: React.FC<ProviderSignInButtonProps> = ({
  onClick,
  svg,
  title,
}) => {
  return (
    <Styled.ButtonContainer onClick={onClick}>
      <Styled.SVGContainer>{svg}</Styled.SVGContainer>
      <Styled.ButtonTitle>{title}</Styled.ButtonTitle>
      <Styled.PaddingDiv />
    </Styled.ButtonContainer>
  )
}
