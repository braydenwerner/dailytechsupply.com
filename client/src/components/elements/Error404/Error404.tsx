import * as Styled from './Error404.styled'

export const Error404: React.FC = ({}) => {
  return (
    <Styled.Wrapper>
      <Styled.ErrorContainer>
        <Styled.TitleContainer>
          <Styled.TitleText>Oops!</Styled.TitleText>
          <Styled.SubtitleText>
            We can't seem to find the page you're looking for.
          </Styled.SubtitleText>
          <a href="/">
            <Styled.BackToHome>Back to home</Styled.BackToHome>
          </a>
        </Styled.TitleContainer>
      </Styled.ErrorContainer>
    </Styled.Wrapper>
  )
}
