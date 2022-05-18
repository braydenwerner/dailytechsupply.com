import { useRef } from 'react'
import {
  useCreateCommentMutation,
  useCreateNotificationMutation,
} from '../../../generated/graphql'

import { UserData } from '../../../types'
import * as Styled from './CommentReplyForm.styled'

interface CommentReplyForm {
  userData: UserData
  parent: any
  itemUUID: string
  parentId: number | undefined
  onSubmit?: () => void
  hideCancel?: boolean
}

export const CommentReplyForm: React.FC<CommentReplyForm> = ({
  userData,
  parent,
  itemUUID,
  parentId,
  onSubmit,
  hideCancel,
}) => {
  const textRef = useRef<HTMLTextAreaElement>(null)

  const [createComment] = useCreateCommentMutation()
  const [createNotification] = useCreateNotificationMutation()

  const handleSubmit = async (
    text: string | undefined,
    parentId: number | undefined
  ) => {
    if (itemUUID && text && text.length <= 2000) {
      await createComment({
        variables: {
          input: { item_uuid: itemUUID, text, parent_id: parentId },
        },
        refetchQueries: ['getComments'],
      })

      if (parent && window) {
        await createNotification({
          variables: {
            user_id: parent.user_id.id,
            title: `${userData?.display_name} replied to your comment.`,
            text,
            item_link: window.location.href,
          },
        })
      }
    }

    if (onSubmit) onSubmit()
  }

  return (
    <Styled.Form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(textRef.current?.value, parentId)
        if (textRef.current) textRef.current.value = ''
      }}
    >
      <Styled.TextArea
        ref={textRef}
        placeholder="What are your thoughts?"
        maxLength={2000}
      />
      <Styled.SubmitContainer>
        {!hideCancel ? (
          <Styled.CancelButton onClick={onSubmit}>Cancel</Styled.CancelButton>
        ) : (
          <Styled.CancelButton />
        )}
        <Styled.SubmitButton type="submit">Submit</Styled.SubmitButton>
      </Styled.SubmitContainer>
    </Styled.Form>
  )
}
