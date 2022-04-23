import { ReactChild, useState } from 'react'

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
  const [animateIn, setAnimateIn] = useState(false)

  return (
    <Styled.ButtonContainer
      onClick={() => {
        setAnimateIn(true)
        setTimeout(() => setAnimateIn(false), 200)
        onClick()
      }}
      animateIn={animateIn}
    >
      <Styled.SVGContainer>{svg}</Styled.SVGContainer>
      <Styled.ButtonTitle>{title}</Styled.ButtonTitle>
      <Styled.PaddingDiv />
    </Styled.ButtonContainer>
  )
}
