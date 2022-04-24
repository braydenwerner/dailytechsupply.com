import styled, { css, keyframes } from 'styled-components'

interface ButtonContainerProps {
  animateIn: boolean
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  display: flex;
  align-items: center;
  width: 500px;
  height: 43px;
  background-color: white;
  border-radius: 8px;
  margin: 10px 0px 10px 0px;
  outline: none;
  border: none;
  cursor: pointer;
  border: 1px solid black;
  animation-fill-mode: forwards;
  animation-duration: 0.2s;

  ${(props) =>
    props.animateIn &&
    css`
      animation-name: ${ButtonContainerAnimation};
    `}

  :hover {
    background-color: rgba(221, 221, 221, 0.2);
  }
`

const ButtonContainerAnimation = keyframes`
  50% {
    transform: scale(0.96);
  }
  100% {
    transform: scale(1)
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
  font-size: 0.9rem;
`

export const PaddingDiv = styled.div`
  width: 33%;
`
