import styled from 'styled-components'

export const TextInput = styled.input.attrs(({ type }) => ({
  type: type,
}))`
  width: 200px;
  height: 40px;
  font-size: 3.5rem;
  text-align: center;
  outline: none;
  border: none;
  background-color: red;
  border-bottom: 5px solid white;
  margin: 10px 10px 10px 10px;
`
