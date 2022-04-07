import styled from 'styled-components'

export const TextInput = styled.input.attrs(({ type }) => ({
  type: type,
}))`
  width: 200px;
  height: 40px;
  margin: 10px 10px 10px 10px;
`
