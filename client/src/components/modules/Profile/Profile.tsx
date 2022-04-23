import { CircularProgress } from '@mui/material'
import { Field, Formik } from 'formik'
import { useState } from 'react'
import { User } from '../../../generated/graphql'

import * as Styled from './Profile.styled'

interface ProfileProps {
  user: User
  isOwner: boolean
}

export const Profile: React.FC<ProfileProps> = ({ user, isOwner }) => {
  const [editorOpen, setEditorOpen] = useState(false)

  return (
    <Styled.ProfileWrapper>
      <Styled.ProfileContainer>
        <Styled.ProfilePictureContainer>picture</Styled.ProfilePictureContainer>
        <Styled.SpaceContainer />
        <Styled.InfoContainer>
          <Styled.Name>{user.display_name}</Styled.Name>
          <Styled.JoinedDate>
            Member since{' '}
            {new Date(parseInt(user.created_at)).toLocaleDateString('en-US')}
          </Styled.JoinedDate>
          {isOwner && (
            <Styled.EditProfileButton
              onClick={() => setEditorOpen((oldEditorOpen) => !oldEditorOpen)}
            >
              Edit Profile
            </Styled.EditProfileButton>
          )}
          {editorOpen && (
            <Formik
              validateOnChange={false}
              validateOnBlur={false}
              initialValues={{
                firstName: '',
                about: '',
              }}
              onSubmit={async (data, { setSubmitting, setFieldError }) => {
                setSubmitting(true)

                setSubmitting(false)
              }}
              validate={(values) => {
                const errors: Record<string, string> = {}

                return errors
              }}
            >
              {({ values, isSubmitting, handleSubmit }) => (
                <Styled.EditProfileForm onSubmit={handleSubmit}>
                  <Styled.EditorFieldTitle>First Name</Styled.EditorFieldTitle>
                  <Field name="firstName" />
                  <Styled.EditorFieldTitle>About</Styled.EditorFieldTitle>
                  <Field name="about" />
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <CircularProgress size={28} />
                    ) : (
                      <div>Submit</div>
                    )}
                  </button>
                </Styled.EditProfileForm>
              )}
            </Formik>
          )}
        </Styled.InfoContainer>
      </Styled.ProfileContainer>
    </Styled.ProfileWrapper>
  )
}
