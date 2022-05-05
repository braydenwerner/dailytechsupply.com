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

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  border-left: 3px solid blue;
`

export const CommentBody = styled.div`
  display: flex;
  flex-direction: column;
`

export const ImageNameTimeContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 30px;
  right: 13px;
`

export const ProfilePictureWrapper = styled.div`
  height: 30px;
  width: 30px;
  z-index: 1;
  overflow: hidden;
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
  overflow: hidden;
  color: rgb(113, 113, 113);
`

export const PersonSvg = styled.svg`
  display: block;
  height: 100%;
  width: 100%;
  fill: currentcolor;
`
