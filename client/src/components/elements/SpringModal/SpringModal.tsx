import { forwardRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useSpring, animated } from 'react-spring'
import Backdrop from '@mui/material/Backdrop'
import Modal from '@mui/material/Modal'
import { Box } from '@mui/material'

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

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

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
          <Box sx={style}>{children}</Box>
        </Fade>
      </Modal>,
      modalPortal
    )
  )
}
