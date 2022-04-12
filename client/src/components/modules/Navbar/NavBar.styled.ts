import styled from 'styled-components'

export const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 80px;
  width: 100%;
  top: 0px;
  left: 0px;
  background-color: white;
  box-shadow: rgb(0 0 0 / 8%) 1px 1px 1px;
`

export const LogoContainer = styled.div`
  width: 560px;
  background-color: orange;
`

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 464px;
  background-color: yellow;
`

export const PaddingDiv = styled.div`
  width: 95px;
`

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: right;
  justify-self: center;
  align-items: center;
  width: 560px;
  height: 30px;
`

export const SvgContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 5px 5px 12px;
  height: 30px;
  border-radius: 21px;
  border: 1px solid rgb(221, 221, 221);
  transition: 0.2s ease-out;

  &:hover {
    box-shadow: 4px 4px 4px rgb(0 0 0 / 8%);
  }
`

export const MenuSvg = styled.svg`
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
  color: rgb(113, 113, 113);
`

export const PersonSvg = styled.svg`
  display: block;
  height: 100%;
  width: 100%;
  fill: currentcolor;
`

export const Menu = styled.div`
  position: absolute;
  top: 70px;
  width: 150px;
  border-radius: 10px;
  border: 1px solid rgb(221, 221, 221);
`

export const MenuButton = styled.div`
  font-size: 1rem;
  padding: 15px 0px 15px 10px;
  cursor: pointer;
`

export const SpaceDiv = styled.div`
  height: 100px;
`
