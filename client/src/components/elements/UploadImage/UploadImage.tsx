import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Alert, CircularProgress, Snackbar } from '@mui/material'

import { auth } from '../../../config/config'
import * as Styled from './UploadImage.styled'

export const UploadImage: React.FC = () => {
  const [snackbarOpen, setSnackBarOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const onDrop = async (files: File[]) => {
    if (auth.currentUser?.uid) {
      // const response = await uploadImage({ variables: { files } })
      // const errors = response.data.uploadImages.errors
      // if (errors && errors[0].message) {
      //   setSnackBarOpen(true)
      //   setErrorMessage(errors[0].message)
      // }
    }
  }

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
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

  const fileUploadText = () => {
    // if (!imageLoading) {
    //   if (isDragActive) {
    //     return <p style={{ userSelect: 'none' }}>Drop files here ...</p>
    //   } else {
    //     return (
    //       <p style={{ userSelect: 'none' }}>
    //         Drag files here or click to select files
    //       </p>
    //     )
    //   }
    // } else {
    //   return <CircularProgress />
    // }
  }

  return (
    <>
      <Styled.DropContainer {...getRootProps()}>
        <input {...getInputProps()} />
        {fileUploadText()}
      </Styled.DropContainer>
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
