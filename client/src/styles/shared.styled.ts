import { Form } from 'formik'
import styled from 'styled-components'

export const LoginForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

export const LoginSubmit = styled.button`
  width: 500px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  margin: 20px;
  height: 45px;
  text-align: center;
  border: none;
  background-size: 300% 100%;
  border-radius: 10px;

  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;

  background-image: linear-gradient(
    to right,
    #25aae1,
    #4481eb,
    #04befe,
    #3f86ed
  );
  box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);

  :hover {
    background-position: 100% 0;
    -o-transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }
`
