import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
`

export const TextArea = styled.textarea`
  width: 100%;
  height: 130px;
  max-height: 130px;
  border: none;
  overflow: auto;
  outline: none;
  resize: none;
  background-color: rgba(221, 221, 221, 0.2);
  font-size: 1rem;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-family: inherit;
`

export const SubmitContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(221, 221, 221, 0.3);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 10px 0px 10px 0px;
`

export const CancelButton = styled.div`
  user-select: none;
  color: #008489;
  font-weight: 700;
  font-size: 1rem;
  margin-left: 10px;

  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`

export const SubmitButton = styled.button`
  color: white;
  margin-right: 10px;
  font-weight: 700;
  font-size: 1rem;
  width: 120px;
  height: 37px;
  border-radius: 5px;
  background-color: rgb(0, 132, 137);
  border: none;
  outline: none;
  cursor: pointer;
`
