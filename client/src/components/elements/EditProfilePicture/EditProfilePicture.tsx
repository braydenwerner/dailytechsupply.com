import { useContext, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Alert, CircularProgress, Slide, Snackbar } from '@mui/material'

import { useUploadProfilePictureMutation } from '../../../generated/graphql'
import { TokenContext } from '../../../providers'
import * as Styled from './EditProfilePicture.styled'

export const EditProfilePicture: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  const [uploadProfilePicture, profilePictureData] =
    useUploadProfilePictureMutation()
  const profilePictureLoading = profilePictureData.loading

  const { userData } = useContext(TokenContext)

  const onDrop = async (image: File[]) => {
    if (userData)
      await uploadProfilePicture({
        variables: { image: image[0] },
        refetchQueries: ['getUser'],
      })
  }

  const { fileRejections, open } = useDropzone({
    noClick: true,
    onDrop,
    maxFiles: 1,
    maxSize: 1048576 * 5, //  5 MB
    accept: 'image/jpeg, image/png',
  })

  useEffect(() => {
    if (fileRejections.length > 0 && fileRejections[0].errors[0].message) {
      setErrorMessage(fileRejections[0].errors[0].message)
    }
  }, [fileRejections])

  return (
    <>
      <Styled.EditProfilePictureButtonContainer onClick={open}>
        <Styled.EditProfilePictureButton size={20} />
      </Styled.EditProfilePictureButtonContainer>
      <Snackbar
        open={!!errorMessage}
        TransitionComponent={(props) => <Slide {...props} direction="up" />}
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          left: 0,
        }}
      >
        <Alert severity="error" onClose={() => setErrorMessage(undefined)}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  )
}
