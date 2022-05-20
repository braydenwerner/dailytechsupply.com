import { Field } from 'formik'
import { BiLike } from 'react-icons/bi'
import styled, { css, keyframes } from 'styled-components'

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

interface ProfilePictureProps {
  url: string
}

export const ProfilePicture = styled.img<ProfilePictureProps>`
  display: inline-block;
  width: 155px;
  height: 155px;
  background: ${(props) => props.url && `url(${props.url})`};
  background-position: 50% 50%;
  background-size: cover;
  border-radius: 50%;
`

export const PersonSvgWrapper = styled.div`
  margin-top: 5px;
  height: 155px;
  width: 155px;
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
  margin: 5px 0px 10px 0px;
  font-size: 2rem;
  font-weight: 700;
  color: rgb(72, 72, 72);
`

export const JoinedDate = styled.div`
  font-size: 0.8rem;
  margin: 3px 0px 10px 0px;
`

export const EditProfileForm = styled.form``

interface EditProfileButton {
  open?: boolean
}

export const EditProfileButton = styled.div<EditProfileButton>`
  margin: 10px 0px 10px 0px;
  color: #008489;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  user-select: none;
  text-decoration: ${(props) => props.open && 'underline'};

  :hover {
    text-decoration: underline;
  }
`

export const AboutHeader = styled.div`
  margin-top: 40px;
  font-size: 1.5rem;
  margin: 50px 0px 25px 0px;
  font-weight: 700;
  color: rgb(72, 72, 72);
`

export const AboutContainer = styled.div`
  font-size: 1rem;
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
  user-select: none;
  color: #008489;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
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
  background-color: rgb(0, 132, 137);
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

export const NumUpvotesContainer = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid rgb(0 0 0 / 8%);
  margin-top: 30px;
  padding-top: 30px;
`

export const NumUpvotesIcon = styled(BiLike)`
  margin-right: 8px;
`

export const NumUpvotesText = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
`
