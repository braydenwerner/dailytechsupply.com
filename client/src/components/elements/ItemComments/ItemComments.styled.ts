import { BiLike } from 'react-icons/bi'
import styled from 'styled-components'

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
  right: 13px;
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

export const CommentText = styled.div`
  font-size: 1rem;
  margin: 10px 0px 10px 0px;
`

export const CommentOptionsContainer = styled.div`
  display: flex;
  align-items: center;
`

export const UpvoteIcon = styled(BiLike)`
  cursor: pointer;
  margin-right: 5px;
`

export const NumberUpvotesText = styled.div`
  font-weight: 700;
  margin-right: 10px;
`
