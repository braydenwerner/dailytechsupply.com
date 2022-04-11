import styled from 'styled-components'

export const NavContainer = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  height: 80px;
  width: 100%;
  top: 0px;
  left: 0px;
  background-color: white;
  box-shadow: rgb(0 0 0 / 8%) 0px 1px 1px;
`

export const ProfileContainer = styled.div`
  display: flex;
  justify-self: flex-end;
  position: relative;
  align-items: center;
  width: 200px;
  height: 30px;
  background-color: blue;
`

export const MenuSvg = styled.svg`
  display: block;
  fill: none;
  height: 16px;
  width: 16px;
  stroke: currentcolor;
  stroke-width: 3;
  overflow: visible;
`

export const PersonSvgWrapper = styled.div`
  height: 30px;
  width: 30px;
  z-index: 1;
  margin-left: 12px;
  overflow: hidden;
`

export const PersonSvg = styled.svg`
  display: block;
  height: 100%;
  width: 100%;
  fill: currentcolor;
`

export const SpaceDiv = styled.div`
  height: 100px;
`
