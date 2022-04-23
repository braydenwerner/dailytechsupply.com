import { useRouter } from 'next/router'

import * as Styled from '../../modules/Navbar/NavBar.styled'

export const NavbarEmpty: React.FC = () => {
  const router = useRouter()

  return (
    <>
      <Styled.NavContainer>
        <Styled.PaddingDiv />
        <Styled.LogoContainer>
          <div onClick={() => router.push('/')}>Daily Tech Supply</div>
        </Styled.LogoContainer>
        <Styled.SearchContainer />
        <Styled.ProfileContainer />
        <Styled.PaddingDiv />
      </Styled.NavContainer>
      <Styled.SpaceDiv />
    </>
  )
}
