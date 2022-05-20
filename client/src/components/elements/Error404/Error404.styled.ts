import styled from 'styled-components'

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 750px;
`

export const TitleContainer = styled.div`
  justify-self: flex-start;
`

export const TitleText = styled.div`
  font-size: 8.5rem;
  font-weight: 700;
  color: rgb(72, 72, 72);
  margin-top: 75px;
`

export const SubtitleText = styled.div`
  font-size: 2rem;
  color: rgb(72, 72, 72);
  margin-top: 35px;
`

export const BackToHome = styled.div`
  color: #008489;
  font-size: 1.8rem;
  margin-top: 55px;

  :hover {
    text-decoration: underline;
  }
`
