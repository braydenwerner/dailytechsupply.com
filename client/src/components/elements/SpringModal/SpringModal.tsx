import { forwardRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useSpring, animated } from 'react-spring'
import Backdrop from '@mui/material/Backdrop'
import Modal from '@mui/material/Modal'
import { Box } from '@mui/material'

import { ModalStyle } from './SpringModal.styled'

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
  onClose?: () => void
  children: JSX.Element
}

export const SpringModal: React.FC<SpringModalProps> = ({
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
          <Box sx={ModalStyle}>{children}</Box>
        </Fade>
      </Modal>,
      modalPortal
    )
  )
}
