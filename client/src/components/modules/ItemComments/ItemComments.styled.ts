import { FiChevronDown, FiChevronRight } from 'react-icons/fi'
import { BiLike, BiMessage, BiTrashAlt } from 'react-icons/bi'
import styled from 'styled-components'

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

export const CommentsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

export const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
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
  left: 45px;
  padding-left: 10px;
  border-left: 1px solid rgb(0 0 0 / 8%);
  margin-top: 30px;
`
