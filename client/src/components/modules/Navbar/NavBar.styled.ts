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
  border-bottom: 1px solid rgb(0 0 0 / 8%);
`

export const PaddingDiv = styled.div`
  width: 95px;
`

interface LogoContainerProps {
  width?: number
  small?: boolean
}

export const LogoContainer = styled.div<LogoContainerProps>`
  width: ${(props) => {
    console.log('logo container width ' + props.width)
    if (props.width) return props.width + 'px'
    if (props.small) return '400px'
    return '560px'
  }};
  cursor: pointer;
`

export const Logo = styled.div``

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 464px;
`

interface ProfileContainerProps {
  width?: number
  small?: boolean
}

export const ProfileContainer = styled.div<ProfileContainerProps>`
  display: flex;
  justify-content: right;
  justify-self: center;
  align-items: center;
  width: ${(props) => {
    if (props.width) return props.width + 'px'
    if (props.small) return '400px'
    return '560px'
  }};
  height: 30px;
`

interface SvgContainerProps {
  menuOpen: boolean
}

export const SvgContainer = styled.div<SvgContainerProps>`
  display: flex;
  align-items: center;
  padding: 5px 5px 5px 12px;
  height: 42px;
  border-radius: 21px;
  border: 1px solid rgb(221, 221, 221);
  transition: 0.2s ease-out;
  cursor: pointer;
  box-shadow: ${(props) => props.menuOpen && '0px 4px 4px rgb(0 0 0 / 8%)'};

  &:hover {
    box-shadow: 0px 4px 4px rgb(0 0 0 / 8%);
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

export const ProfileSvgWrapper = styled.div`
  height: 30px;
  width: 30px;
  z-index: 1;
  margin-left: 12px;
  overflow: hidden;
  color: rgb(113, 113, 113);
`

export const ProfilePictureWrapper = styled.div`
  height: 30px;
  width: 30px;
  z-index: 1;
  margin-left: 12px;
  overflow: hidden;
`

interface ProfilePictureProps {
  url: string
}

export const ProfilePicture = styled.img<ProfilePictureProps>`
  display: inline-block;
  width: 30px;
  height: 30px;
  background: ${(props) => props.url && `url(${props.url})`};
  background-position: 50% 50%;
  background-size: cover;
  border-radius: 50%;
  user-select: none;
`

export const PersonSvg = styled.svg`
  display: block;
  height: 100%;
  width: 100%;
  fill: currentcolor;
`

interface MenuProps {
  left: number
}

export const Menu = styled.div<MenuProps>`
  position: fixed;
  z-index: 2;
  left: ${(props) => props.left - 250}px;
  width: 250px;
  top: 75px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 0px 5px rgb(221, 221, 221);
  user-select: none;
`

interface MenuButtonProps {
  fontWeight?: number
}

export const MenuButton = styled.div<MenuButtonProps>`
  font-size: 0.9rem;
  padding: 15px 0px 15px 10px;
  cursor: pointer;
  font-weight: ${(props) => props.fontWeight};

  :hover {
    background-color: rgba(221, 221, 221, 0.2);
  }
`

export const SpaceDiv = styled.div`
  height: 100px;
`
