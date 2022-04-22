import * as Styled from './ProviderSignInButton.styled'

interface ProviderSignInButtonProps {
  onClick: () => void
  title: string
  imagePath?: string
}

export const ProviderSignInButton: React.FC<ProviderSignInButtonProps> = ({
  imagePath,
  title,
}) => {
  return (
    <Styled.ButtonContainer>
      <img></img>
      <Styled.ButtonTitle>{title}</Styled.ButtonTitle>
      <Styled.PaddingDiv />
    </Styled.ButtonContainer>
  )
}
