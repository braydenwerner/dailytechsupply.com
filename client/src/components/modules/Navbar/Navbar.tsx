import { createPortal } from 'react-dom'
import { useContext, useEffect, useState, useRef } from 'react'
import { useGetUserLazyQuery } from '../../../generated/graphql'
import * as Styled from './NavBar.styled'

import { auth } from '../../../config/config'
import { TokenContext } from '../../../providers'
import { SignIn, SignUp } from '../../../components/modules'
import { SpringModal } from '../../elements'

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpenMode, setModalOpenMode] = useState<string | null>(null)
  const [modalPortal, setModalPortal] = useState<HTMLElement | null>(null)
  const [svgContainerOffsetLeft, setSvgContainerOffsetLeft] = useState(0)

  const [fetchingUser, setFetchingUser] = useState(true)

  const [getUser, { data, loading }] = useGetUserLazyQuery()
  const userData = data && data.getUser

  const { tokenAttached } = useContext(TokenContext)

  const svgContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (tokenAttached) getUser()
    setFetchingUser(false)
  }, [tokenAttached])

  useEffect(() => {
    setModalPortal(document.getElementById('modal-portal'))
  }, [])

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
  }, [svgContainerRef])

  console.log('MenuOpen: ' + menuOpen)

  return (
    <>
      <Styled.NavContainer>
        <Styled.PaddingDiv />
        <Styled.LogoContainer>
          <div>Daily Tech Supply</div>
        </Styled.LogoContainer>
        <Styled.SearchContainer>
          <input placeholder="Search"></input>
        </Styled.SearchContainer>
        <Styled.ProfileContainer
          onClick={() => {
            if (!loading && !fetchingUser) setMenuOpen(true)
          }}
        >
          <Styled.SvgContainer ref={svgContainerRef}>
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
            <Styled.PersonSvgWrapper>
              <Styled.PersonSvg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
              >
                <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
              </Styled.PersonSvg>
            </Styled.PersonSvgWrapper>
          </Styled.SvgContainer>
        </Styled.ProfileContainer>
        <Styled.PaddingDiv />
      </Styled.NavContainer>

      {/* Modals */}
      {menuOpen &&
        (userData ? (
          <Styled.Menu left={svgContainerOffsetLeft} width={250}>
            <button
              onClick={async () => {
                await auth.signOut().catch((err) => {
                  console.log(err)
                })
                localStorage.removeItem('token')
                window.location.reload()
              }}
            >
              Sign Out
            </button>
          </Styled.Menu>
        ) : (
          <Styled.Menu left={svgContainerOffsetLeft} width={250}>
            <Styled.MenuButton
              onClick={() => {
                console.log('Setting menu open to false')
                setMenuOpen(false)
                setModalOpenMode('SignIn')
              }}
            >
              Log In
            </Styled.MenuButton>
            <Styled.MenuButton
              onClick={() => {
                console.log('Setting menu open to false')
                setMenuOpen(false)
                setModalOpenMode('SignUp')
              }}
            >
              Sign Up
            </Styled.MenuButton>
          </Styled.Menu>
        ))}
      {modalOpenMode === 'SignIn' && (
        <SpringModal onClose={() => setModalOpenMode(null)}>
          <SignIn closeModal={() => setModalOpenMode(null)} />
        </SpringModal>
      )}
      {modalOpenMode === 'SignUp' && (
        <SpringModal onClose={() => setModalOpenMode(null)}>
          <SignUp closeModal={() => setModalOpenMode(null)} />
        </SpringModal>
      )}
      <Styled.SpaceDiv />
    </>
  )
}
