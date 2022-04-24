import { Field } from 'formik'
import styled, { css, keyframes } from 'styled-components'

export const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

export const ProfileContainer = styled.div`
  display: flex;
  width: 950px;
`

export const ProfilePictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35%;
  height: 600px;
  margin-top: 15px;
  border-radius: 10px;
`

export const PersonSvgWrapper = styled.div`
  margin-top: 25px;
  height: 125px;
  width: 125px;
  overflow: hidden;
  color: rgb(113, 113, 113);
`

export const PersonSvg = styled.svg`
  display: block;
  height: 100%;
  width: 100%;
  fill: currentcolor;
`

export const SpaceContainer = styled.div`
  width: 5%;
`

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin-top: 15px;
`

export const Name = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin: 5px 0px 10px 0px;
`

export const JoinedDate = styled.div`
  font-size: 0.8rem;
  margin: 3px 0px 10px 0px;
`

export const EditProfileForm = styled.form``

export const EditProfileButton = styled.div`
  font-size: 0.8rem;
  text-decoration: underline;
  cursor: pointer;
  margin: 10px 0px 10px 0px;
`

export const AboutHeader = styled.div`
  font-weight: 400;
  margin-top: 40px;
  font-size: 1.5rem;
`

export const AboutContainer = styled.div`
  font-size: 1rem;
  margin-top: 20px;
`

export const EditorFieldTitle = styled.div`
  font-size: 1rem;
  margin: 45px 0px 10px 0px;
`

export const EditorField = styled(Field)`
  width: 100%;
  font-size: 1rem;
  border-radius: 5px;
  height: 40px;
  padding: 10px;
`

export const EditorTextArea = styled(Field)`
  resize: vertical;
  width: 100%;
  font-size: 1rem;
  padding: 10px;
  border-radius: 10px;
  height: 130px;
  font-family: inherit;
`

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: 50px;
`

export const CancelButton = styled.div`
  font-weight: 700;
  margin-top: 10px;
  text-decoration: underline;
  cursor: pointer;
`

interface SaveButtonProps {
  animateIn: boolean
}

export const SaveButton = styled.button<SaveButtonProps>`
  color: white;
  font-size: 1rem;
  font-weight: 700;
  margin-top: 15px;
  padding: 12px 15px 12px 15px;
  border-radius: 5px;
  border: none;
  outline: none;
  background-color: black;
  cursor: pointer;
  animation-fill-mode: forwards;
  animation-duration: 0.2s;

  ${(props) =>
    props.animateIn &&
    css`
      animation-name: ${ButtonAnimation};
    `}
`

const ButtonAnimation = keyframes`
  50% {
    transform: scale(0.96);
  }
  100% {
    transform: scale(1);
  }
`
