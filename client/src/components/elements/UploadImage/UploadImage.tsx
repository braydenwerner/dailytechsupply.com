import { useContext, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Alert, CircularProgress, Snackbar } from '@mui/material'

import { useUploadProfilePictureMutation } from '../../../generated/graphql'
import { TokenContext } from '../../../providers'

export const UploadImage: React.FC = () => {
  const [snackbarOpen, setSnackBarOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const [uploadProfilePicture, { loading }] = useUploadProfilePictureMutation()

  const { userData } = useContext(TokenContext)

  const onDrop = async (image: File[]) => {
    console.log(image[0])
    if (userData) await uploadProfilePicture({ variables: { image: image[0] } })
  }

  const { getRootProps, getInputProps, fileRejections, open } = useDropzone({
    noClick: true,
    onDrop,
    maxFiles: 1,
    maxSize: 1048576 * 5, //  5 MB
    accept: 'image/jpeg, image/png',
  })

  useEffect(() => {
    if (fileRejections.length > 0 && fileRejections[0].errors[0].message) {
      setSnackBarOpen(true)
      setErrorMessage(fileRejections[0].errors[0].message)
    }
  }, [fileRejections])

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <button type="button" onClick={open}>
          Upload a photo
        </button>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => {
          setSnackBarOpen(false)
          setErrorMessage('')
        }}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </>
  )
}
