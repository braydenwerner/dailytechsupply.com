import { FiChevronDown, FiChevronRight } from 'react-icons/fi'
import { BiLike, BiMessage, BiTrashAlt } from 'react-icons/bi'
import styled from 'styled-components'

export const CommentsWrapper = styled.div`
  display: flex;
  max-width: 100%;
  justify-content: center;
`

export const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const LoginOrSignUpContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  border: 1px solid rgb(0 0 0 / 8%);
  font-weight: 700;
  color: rgb(72, 72, 72);
  padding: 25px 20px 25px 20px;
`

export const LoginButtonContainer = styled.div`
  display: flex;
  align-items: center;
`

export const LoginButton = styled.div`
  padding: 8px 13px 8px 13px;
  border: 1px solid black;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;

  :hover {
    background-color: rgba(221, 221, 221, 0.2);
  }
`

export const SignUpButton = styled.div`
  padding: 8px 13px 8px 13px;
  color: white;
  margin-right: 10px;
  font-weight: 700;
  border-radius: 5px;
  background-color: rgb(0, 132, 137);
  border: none;
  outline: none;
  cursor: pointer;

  :hover {
    background-color: rgb(0, 142, 147);
  }
`

export const CommentSelectContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 35px;
`

export const SelectTitle = styled.div`
  font-size: 1rem;
`

export const CommentSelect = styled.select`
  font-size: 1rem;
  border: none;
  outline: none;
  margin-left: 5px;
  cursor: pointer;
`

export const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 30px;
  position: relative;
  right: 35px;
`

export const NameText = styled.div`
  margin-right: 8px;

  :hover {
    text-decoration: underline;
  }
`

export const ProfilePictureWrapper = styled.div`
  height: 30px;
  width: 30px;
  z-index: 1;
  margin-right: 8px;
  overflow: hidden;
  cursor: pointer;
`

interface ProfilePictureProps {
  url: string
}

export const ProfilePicture = styled.img<ProfilePictureProps>`
  display: inline-block;
  width: 30px;
  height: 30px;
  background: ${(props) => props.url && `url(${props.url})`};
  background-position: 50% 50%;
  background-size: cover;
  border-radius: 50%;
  user-select: none;
`

export const ProfileSvgWrapper = styled.div`
  height: 30px;
  width: 30px;
  z-index: 1;
  margin-right: 8px;
  overflow: hidden;
  color: rgb(113, 113, 113);
  cursor: pointer;
`

export const PersonSvg = styled.svg`
  display: block;
  height: 100%;
  width: 100%;
  fill: currentcolor;
`

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  border-left: 1px solid rgb(0 0 0 / 8%);
  word-wrap: break-word;
`

export const HideRepliesContainer = styled.div`
  display: flex;
  cursor: pointer;
  position: relative;
  right: 5px;
`

export const HideRepliesIcon = styled(FiChevronDown)``

export const UnhideRepliesIcon = styled(FiChevronRight)``

export const CommentText = styled.div`
  font-size: 1rem;
  margin: 15px 0px 15px 0px;
`

export const CommentOptionsContainer = styled.div`
  display: flex;
  align-items: center;
`

export const HeaderSubcontainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 5px 0px 5px;
  cursor: pointer;
  padding: 5px;
  user-select: none;

  :hover {
    background-color: rgba(221, 221, 221, 0.2);
  }
`

export const UpvoteIcon = styled(BiLike)``

export const NumberUpvotesText = styled.div`
  font-size: 1rem;
  font-weight: 700;
  margin-right: 10px;
`

export const DeleteIcon = styled(BiTrashAlt)`
  margin-right: 5px;
`

export const DeleteComment = styled.div`
  font-size: 1rem;
`

export const ReplyCommentIcon = styled(BiMessage)`
  margin-right: 5px;
`

export const ReplyComment = styled.div`
  font-size: 1rem;
`

export const ReplyFormContainer = styled.div`
  position: relative;
  padding-left: 10px;
  border-left: 1px solid rgb(0 0 0 / 8%);
  margin: 30px 0px 0px 45px;
`
