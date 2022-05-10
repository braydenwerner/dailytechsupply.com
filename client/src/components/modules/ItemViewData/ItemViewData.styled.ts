import { BiLike } from 'react-icons/bi'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const Container = styled.div`
  display: flex;
  width: 100%;
  margin: 25px 0px 50px 0px;
  border-bottom: 1px solid rgb(0 0 0 / 8%);
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
  margin-top: 15px;
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

export const RecommendContainer = styled.div`
  display: flex;
  margin-top: auto;
  align-items: center;
`

export const RecommendIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  :hover {
    background-color: red;
  }
`

interface RecommendIconProps {
  recommended: boolean
}

export const RecommendIcon = styled(BiLike)<RecommendIconProps>`
  color: black;
`

export const RecommendNumber = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  margin-left: 25px;
`
