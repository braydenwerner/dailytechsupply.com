import { Form } from 'formik'
import styled from 'styled-components'

export const LoginForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

export const LoginSubmit = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
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
  border-radius: 8px;

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

export const SignInModalFooter = styled.div`
  position: fixed;
  font-size: 1rem;
  bottom: 20px;
`

export const SignInModalFooterSpan = styled.span`
  font-size: 1rem;
  cursor: pointer;
  color: #0095f6;

  :hover {
    text-decoration: underline;
  }
`

export const SignInPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 720px;
  width: 578px;
  background-color: white;
  border-radius: 13px;
  border: 1px solid #b0b0b0;
`

export const SignInPageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  width: 100%;
  border-bottom: 1px solid rgb(0 0 0 / 8%);
`

export const SignInPageTitle = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
  margin-left: 35px;
`
