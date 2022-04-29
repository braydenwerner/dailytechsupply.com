import { useContext, useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import * as Styled from './NavBar.styled'

import { auth } from '../../../config/config'
import { TokenContext } from '../../../providers'
import { SignIn, SignUp } from '../../../components/modules'
import { SpringModal } from '../../elements'

interface NavbarProps {
  small?: boolean
}

export const Navbar: React.FC<NavbarProps> = ({ small }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpenMode, setModalOpenMode] = useState<string | null>(null)
  const [svgContainerOffsetLeft, setSvgContainerOffsetLeft] = useState(0)

  const { userData } = useContext(TokenContext)

  const svgContainerRef = useRef<HTMLDivElement>(null)
  const menuContainerRef = useRef<HTMLDivElement>(null)

  const router = useRouter()

  useEffect(() => {
    const updateDimensions = () => {
      if (svgContainerRef.current) {
        setSvgContainerOffsetLeft(
          svgContainerRef.current.offsetLeft +
            svgContainerRef.current.clientWidth
        )
      }
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    window.addEventListener('click', menuHandleClick)

    return () => window.removeEventListener('click', menuHandleClick)
  }, [])

  //  will close the menu if the user clicks outside of it
  const menuHandleClick = (e: MouseEvent) => {
    //  this function is called inside an event listener, so state will not
    //  be the most updated, need to use this trick to get the most updated state
    let updatedMenuOpen = false
    setMenuOpen((oldMenuOpen) => {
      updatedMenuOpen = oldMenuOpen
      return oldMenuOpen
    })
    if (
      updatedMenuOpen &&
      menuContainerRef.current &&
      svgContainerRef.current
    ) {
      const menuDimensions = menuContainerRef.current.getBoundingClientRect()
      const svgDimensions = svgContainerRef.current.getBoundingClientRect()
      if (
        !(
          e.clientX >= menuDimensions.left &&
          e.clientX <= menuDimensions.right &&
          e.clientY <= menuDimensions.bottom &&
          e.clientY >= menuDimensions.top
        ) &&
        !(
          e.clientX >= svgDimensions.left &&
          e.clientX <= svgDimensions.right &&
          e.clientY <= svgDimensions.bottom &&
          e.clientY >= svgDimensions.top
        )
      ) {
        setMenuOpen(false)
      }
    }
  }

  return (
    <>
      <Styled.NavContainer>
        <Styled.PaddingDiv />
        <a href="/">
          <Styled.LogoContainer small={small}>
            <Styled.Logo>Daily Tech Supply</Styled.Logo>
          </Styled.LogoContainer>
        </a>
        <Styled.SearchContainer />
        <Styled.ProfileContainer
          small={small}
          onClick={() => setMenuOpen((oldMenuOpen) => !oldMenuOpen)}
        >
          <Styled.SvgContainer ref={svgContainerRef} menuOpen={menuOpen}>
            <Styled.MenuSvg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
            >
              <g fill="none" fillRule="nonzero">
                <path d="m2 16h28"></path>
                <path d="m2 24h28"></path>
                <path d="m2 8h28"></path>
              </g>
            </Styled.MenuSvg>
            {userData && userData.profile_picture_url ? (
              <Styled.ProfilePictureWrapper>
                <Styled.ProfilePicture url={userData.profile_picture_url} />
              </Styled.ProfilePictureWrapper>
            ) : (
              <Styled.ProfileSvgWrapper>
                <Styled.PersonSvg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
                </Styled.PersonSvg>
              </Styled.ProfileSvgWrapper>
            )}
          </Styled.SvgContainer>
        </Styled.ProfileContainer>
        <Styled.PaddingDiv />
      </Styled.NavContainer>

      {/* Modals */}
      {menuOpen &&
        (userData ? (
          <Styled.Menu ref={menuContainerRef} left={svgContainerOffsetLeft}>
            <a href={`/users/${userData.uid}`}>
              <Styled.MenuButton>Profile</Styled.MenuButton>
            </a>
            <a href="/account-settings">
              <Styled.MenuButton>Account Settings</Styled.MenuButton>
            </a>
            <Styled.MenuButton
              onClick={async () => {
                await auth.signOut().catch((err) => {
                  console.log(err)
                })
                localStorage.removeItem('token')
                window.location.reload()
              }}
            >
              Sign Out
            </Styled.MenuButton>
          </Styled.Menu>
        ) : (
          <Styled.Menu ref={menuContainerRef} left={svgContainerOffsetLeft}>
            <Styled.MenuButton
              fontWeight={600}
              onClick={() => {
                setMenuOpen(false)
                setModalOpenMode('SignUp')
              }}
            >
              Sign Up
            </Styled.MenuButton>
            <Styled.MenuButton
              fontWeight={400}
              onClick={() => {
                setMenuOpen(false)
                setModalOpenMode('SignIn')
              }}
            >
              Log In
            </Styled.MenuButton>
          </Styled.Menu>
        ))}
      {modalOpenMode && (
        <SpringModal
          title={modalOpenMode === 'SignIn' ? 'Log In' : 'Sign Up'}
          onClose={() => setModalOpenMode(null)}
          width={568}
        >
          {modalOpenMode === 'SignIn' ? (
            <SignIn
              onSuccess={() => setModalOpenMode(null)}
              toggleToSignUp={() => setModalOpenMode('SignUp')}
            />
          ) : (
            <SignUp
              onSuccess={() => setModalOpenMode(null)}
              toggleToSignIn={() => setModalOpenMode('SignIn')}
            />
          )}
        </SpringModal>
      )}
      <Styled.SpaceDiv />
    </>
  )
}
