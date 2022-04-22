import styled from 'styled-components'

export const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  width: 500px;
  height: 40px;
  background-color: white;
  border-radius: 8px;
  margin: 10px 0px 10px 0px;
  outline: none;
  border: none;
  cursor: pointer;
  border: 1px solid black;

  :hover {
    background-color: rgba(221, 221, 221, 0.2);
  }
`

export const SVGContainer = styled.div`
  position: relative;
  left: 20px;
  display: flex;
  width: 33%;
`

export const ButtonTitle = styled.div`
  width: 100%;
  font-size: 1rem;
`

export const PaddingDiv = styled.div`
  width: 33%;
`
