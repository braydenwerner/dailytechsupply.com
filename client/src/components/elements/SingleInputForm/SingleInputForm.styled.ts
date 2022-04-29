import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export const Title = styled.div`
  font-size: 1rem;
  color: #767676;
  margin-top: 15px;
`

export const Input = styled.input`
  font-size: 1.3rem;
  height: 45px;
  outline: none;
  border: 1px solid rgb(0 0 0 / 8%);
  border-radius: 5px;
  margin-top: 10px;

  :focus {
    border: 1px solid #008489;
  }
`

export const Error = styled.div``

export const Submit = styled.button`
  width: 160px;
  height: 40px;
  border-radius: 5px;
  margin-top: 25px;
  background-color: rgb(0, 132, 137);
  border: none;
  outline: none;
  cursor: pointer;
`

export const SubmitText = styled.div`
  font-size: 1rem;
  color: white;
  font-weight: 700;
`
