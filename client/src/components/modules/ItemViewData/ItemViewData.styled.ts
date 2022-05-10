import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BsArrowLeft } from 'react-icons/bs'
import styled, { keyframes } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Container = styled.div`
  display: flex;
  width: 100%;
  margin: 15px 0px 50px 0px;
  border-bottom: 1px solid rgb(0 0 0 / 8%);
`

export const BackButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`

export const BackArrow = styled(BsArrowLeft)`
  margin-right: 5px;
`

export const BackButtonText = styled.div`
  font-size: 1.2rem;
  cursor: pointer;
`

export const ImageContainer = styled.div``

export const Image = styled.img`
  width: 400px;
  border-radius: 15px;
  padding: 7px 8px 5px 8px;
  cursor: pointer;
`

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 564px;
  padding: 10px 0px 20px 15px;
  height: 420px;
`

export const Title = styled.div`
  margin-top: 15px;
  font-size: 1.7rem;
  font-weight: 700;
  color: rgb(72, 72, 72);
`

export const Description = styled.div`
  font-size: 1.2rem;
  margin-top: 10px;
`

export const Manufacturer = styled.div`
  font-size: 1rem;
  margin-top: 8px;
`

export const Price = styled.div`
  font-size: 1.5rem;
  margin-top: 15px;
  font-weight: 700;
`

export const ItemLinkButton = styled.button`
  font-size: 1.1rem;
  color: white;
  font-weight: 700;
  margin-top: 25px;
  padding: 11px 10px 11px 10px;
  border-radius: 5px;
  background-color: rgb(0, 132, 137);
  border: none;
  outline: none;
  cursor: pointer;

  :hover {
    background-color: rgb(0, 142, 147);
  }
`

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 25px;
`

export const Tag = styled.div`
  display: flex;
  align-items: center;
`

export const TagText = styled.div`
  font-size: 0.9rem;
  border-radius: 15px;
  background-color: rgba(221, 221, 221, 0.4);
  margin: 5px 10px 5px 0px;
  padding: 8px;
`

export const RecommendContainer = styled.div`
  display: flex;
  margin-top: auto;
  align-items: center;
  margin-top: 15px;
`

export const RecommendIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  width: 50px;
  height: 50px;
  cursor: pointer;

  :hover {
    background-color: rgba(221, 221, 221, 0.2);
  }
`

export const RecommendIcon = styled(AiOutlineHeart)``

const likeAnimation = keyframes`
  0% {
    transform: scale(.8);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
  `

export const RecommendIconFill = styled(AiFillHeart)`
  fill: red;
  animation-name: ${likeAnimation};
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
`

export const RecommendNumber = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  margin-left: 25px;
`
