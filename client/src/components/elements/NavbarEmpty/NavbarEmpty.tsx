import * as Styled from '../../modules/Navbar/NavBar.styled'

export const NavbarEmpty: React.FC = () => {
  return (
    <>
      <Styled.NavContainer>
        <Styled.PaddingDiv />
        <Styled.LogoContainer>
          <a href="/">
            <Styled.LogoContainer>
              <Styled.Logo>Daily Tech Supply</Styled.Logo>
            </Styled.LogoContainer>
          </a>
        </Styled.LogoContainer>
        <Styled.SearchContainer />
        <Styled.ProfileContainer />
        <Styled.PaddingDiv />
      </Styled.NavContainer>
      <Styled.SpaceDiv />
    </>
  )
}
