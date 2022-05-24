import styled from 'styled-components'

export const Container = styled.div`
  width: 1580px;
  margin-bottom: 15px;
`

export const Title = styled.div`
  font-size: 2rem;
  font-weight: 700;
  background-color: rgb (72, 72, 72);
  margin-bottom: 30px;
`

export const RelatedItemsContainer = styled.div`
  display: flex;
`

export const RelatedItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  height: 250px;
  margin-right: 50px;
  padding: 15px 15px 15px 15px;
  border: 1px solid rgb(0 0 0 / 20%);
  border-radius: 15px;

  :hover {
    border: 1px solid rgb(0 0 0 / 50%);
  }
`
