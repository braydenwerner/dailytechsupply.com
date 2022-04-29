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
  width?: number
  height?: number
  titleSize?: string
  headerHeight?: number
}

export const SpringModal: React.FC<SpringModalProps> = ({
  title,
  onClose,
  children,
  width,
  height,
  headerHeight,
  titleSize,
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

  const ModalStyle = {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: width ? width : 578,
    height: height ? height : 720,
    bgcolor: 'background.paper',
    borderRadius: '13px',
  }

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
          <Box sx={ModalStyle}>
            <Styled.ModalContainer width={width}>
              <Styled.ModalHeader headerHeight={headerHeight}>
                {title && (
                  <Styled.ModalTitle titleSize={titleSize}>
                    {title}
                  </Styled.ModalTitle>
                )}
                <Styled.CloseModalIconContainer>
                  <AiOutlineClose onClick={handleClose} size={18} />
                </Styled.CloseModalIconContainer>
              </Styled.ModalHeader>
              {children}
            </Styled.ModalContainer>
          </Box>
        </Fade>
      </Modal>,
      modalPortal
    )
  )
}
