import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 1580px;
`

export const ItemTitle = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: rgb(72, 72, 72);
`

export const SortContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1580px;
  margin: 10px 0px 30px 0px;
`

export const ItemSelectContainer = styled.div`
  display: flex;
  align-items: center;
`

export const ItemSelect = styled.select`
  font-size: 1rem;
  border: none;
  outline: none;
  margin-left: 5px;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 21px;
  padding: 8px 10px 8px 10px;
  cursor: pointer;
`
