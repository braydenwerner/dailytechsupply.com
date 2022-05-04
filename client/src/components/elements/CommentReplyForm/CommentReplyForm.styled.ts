import styled from 'styled-components'

export const Form = styled.form`
  width: 700px;
`

export const TextArea = styled.textarea`
  width: 700px;
  height: 130px;
  max-height: 130px;
  border: none;
  overflow: auto;
  outline: none;
  resize: none;
  background-color: rgba(221, 221, 221, 0.2);
  font-size: 1rem;
  padding: 10px;
  border-radius: 10px;
  font-family: inherit;
`

export const SubmitContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`

export const SubmitButton = styled.button`
  color: white;
  font-weight: 700;
  font-size: 1rem;
  width: 130px;
  height: 37px;
  border-radius: 5px;
  margin-top: 15px;
  background-color: rgb(0, 132, 137);
  border: none;
  outline: none;
  cursor: pointer;
`
