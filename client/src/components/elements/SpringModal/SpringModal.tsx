import { forwardRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useSpring, animated } from 'react-spring'
import { Box, Modal, Backdrop } from '@mui/material'
import { AiOutlineClose } from 'react-icons/ai'

import * as Styled from './SpringModal.styled'

interface FadeProps {
  children?: React.ReactElement
  in: boolean
  onEnter?: () => {}
  onExited?: () => {}
}

const Fade = forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter()
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited()
      }
    },
  })

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  )
})

interface SpringModalProps {
  title?: string
  onClose?: () => void
  children: JSX.Element
}

export const SpringModal: React.FC<SpringModalProps> = ({
  title,
  onClose,
  children,
}) => {
  const [open, setOpen] = useState(true)
  const [modalPortal, setModalPortal] = useState<HTMLElement | null>(null)

  const handleClose = () => {
    if (onClose) onClose()
    setOpen(false)
  }

  useEffect(() => {
    setModalPortal(document.getElementById('modal-portal'))
  }, [])

  return (
    modalPortal &&
    createPortal(
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={Styled.ModalStyle}>
            <Styled.SignInContainer>
              {title && (
                <Styled.SignInHeader>
                  <Styled.SignInTitle>{title}</Styled.SignInTitle>
                  <Styled.CloseModalIconContainer>
                    <AiOutlineClose onClick={handleClose} size={18} />
                  </Styled.CloseModalIconContainer>
                </Styled.SignInHeader>
              )}
              {children}
            </Styled.SignInContainer>
          </Box>
        </Fade>
      </Modal>,
      modalPortal
    )
  )
}
