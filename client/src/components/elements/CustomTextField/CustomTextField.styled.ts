import { TextField } from '@mui/material'
import styled from 'styled-components'

interface CssTextFieldProps {
  error: boolean
}
export const CssTextField = styled(TextField)<CssTextFieldProps>`
  width: 100%;
  background-color: white;

  & input {
    height: 20px;
    background-color: ${(props) =>
      props.error ? 'rgba(255, 0, 0, 0.1)' : 'white'};
  }
`
