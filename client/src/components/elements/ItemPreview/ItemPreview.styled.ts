import {} from 'react-icons/'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 15px 0px 15px;
  width: 300px;
  height: 400px;
  padding: 15px 15px 15px 15px;
  border: 1px solid rgb(0 0 0 / 20%);
  border-radius: 15px;

  :hover {
    border: 1px solid rgb(0 0 0 / 50%);
  }
`

export const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
`

export const SoldBy = styled.div`
  font-size: 1rem;
  margin: 10px 0px 5px 0px;
`

export const Image = styled.img`
  width: 200px;
  height: 200px;
  align-self: center;
`

export const Price = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  margin: 5px 0px 5px 0px;
`

export const BottomContainer = styled.div`
  display: flex;
  margin-top: auto;
  justify-content: space-between;
`

export const ItemLinkButton = styled.button`
  font-size: 1rem;
  color: white;
  font-weight: 700;
  padding: 8px 9px 8px 9px;
  border-radius: 5px;
  background-color: rgb(0, 132, 137);
  border: none;
  outline: none;
  cursor: pointer;

  :hover {
    background-color: rgb(0, 142, 147);
  }
`

export const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; ;
`

export const NumRecommends = styled.div`
  font-size: 1rem;
  font-weight: 700;
  margin: 0px 15px 0px 10px;
`

export const RecommendIcon = styled(AiOutlineHeart)``

export const RecommendIconFill = styled(AiFillHeart)`
  fill: red;
`
