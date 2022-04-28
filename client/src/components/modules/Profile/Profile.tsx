import { useState } from 'react'
import { Formik } from 'formik'
import { User, useUpdateUserMutation } from '../../../generated/graphql'

import { EditProfilePicture } from '../../elements'
import * as Styled from './Profile.styled'

interface ProfileProps {
  user: Pick<
    User,
    | 'about'
    | 'email'
    | 'uid'
    | 'display_name'
    | 'profile_picture_url'
    | 'updated_at'
    | 'created_at'
  >
  isOwner: boolean
}

export const Profile: React.FC<ProfileProps> = ({ user, isOwner }) => {
  const [editorOpen, setEditorOpen] = useState(false)
  const [animateIn, setAnimateIn] = useState(false)

  const [updateUser] = useUpdateUserMutation()

  return (
    <Styled.ProfileWrapper>
      <Styled.ProfileContainer>
        <Styled.ProfilePictureContainer>
          <>
            {user.profile_picture_url ? (
              <Styled.ProfilePicture url={user.profile_picture_url} />
            ) : (
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
            )}
            {isOwner && <EditProfilePicture />}
          </>
        </Styled.ProfilePictureContainer>
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
          {!editorOpen ? (
            <>
              <Styled.AboutHeader>About</Styled.AboutHeader>
              <Styled.AboutContainer>{user.about}</Styled.AboutContainer>
            </>
          ) : (
            <Formik
              validateOnChange={false}
              validateOnBlur={false}
              initialValues={{
                name: user.display_name,
                about: user.about ? user.about : '',
              }}
              onSubmit={async (data, { setSubmitting, setFieldError }) => {
                setSubmitting(true)

                await updateUser({
                  variables: {
                    input: {
                      display_name:
                        data.name.length !== 0 ? data.name : user.display_name,
                      about: data.about,
                    },
                  },
                  refetchQueries: ['getUser'],
                })

                setSubmitting(false)
                setEditorOpen(false)
              }}
              validate={(values) => {
                const errors: Record<string, string> = {}

                if (values.name.length > 50)
                  errors.name = 'Your name exceeds the maximum length of 50.'
                if (values.about && values.about.length > 500)
                  errors.about = 'Your name exceeds the maximum length of 50.'

                return errors
              }}
            >
              {({ isSubmitting, handleSubmit }) => (
                <Styled.EditProfileForm onSubmit={handleSubmit}>
                  <Styled.EditorFieldTitle>Name</Styled.EditorFieldTitle>
                  <Styled.EditorField name="name" maxLength={50} />
                  <Styled.EditorFieldTitle>About</Styled.EditorFieldTitle>
                  <Styled.EditorTextArea
                    name="about"
                    maxLength={500}
                    component="textarea"
                  />
                  <Styled.ButtonContainer>
                    <Styled.CancelButton onClick={() => setEditorOpen(false)}>
                      Cancel
                    </Styled.CancelButton>
                    <Styled.SaveButton
                      type="submit"
                      disabled={isSubmitting}
                      animateIn={animateIn}
                      onClick={() => {
                        setAnimateIn(true)
                        setTimeout(() => setAnimateIn(false), 200)
                      }}
                    >
                      <div>Save</div>
                    </Styled.SaveButton>
                  </Styled.ButtonContainer>
                </Styled.EditProfileForm>
              )}
            </Formik>
          )}
        </Styled.InfoContainer>
      </Styled.ProfileContainer>
    </Styled.ProfileWrapper>
  )
}
