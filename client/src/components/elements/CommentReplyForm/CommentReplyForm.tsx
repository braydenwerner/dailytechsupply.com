import { useRef } from 'react'
import { useCreateCommentMutation } from '../../../generated/graphql'

import * as Styled from './CommentReplyForm.styled'

interface CommentReplyForm {
  itemUUID: string
  parentId: number | undefined
  onSubmit?: () => void
  hideCancel?: boolean
}

export const CommentReplyForm: React.FC<CommentReplyForm> = ({
  itemUUID,
  parentId,
  onSubmit,
  hideCancel,
}) => {
  const textRef = useRef<HTMLTextAreaElement>(null)

  const [createCommentMutation] = useCreateCommentMutation()

  const handleSubmit = async (
    text: string | undefined,
    parentId: number | undefined
  ) => {
    if (itemUUID && text && text.length < 200) {
      await createCommentMutation({
        variables: {
          input: { item_uuid: itemUUID, text, parent_id: parentId },
        },
        refetchQueries: ['getComments'],
      })
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
      <Styled.TextArea ref={textRef} placeholder="What are your thoughts?" />
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
