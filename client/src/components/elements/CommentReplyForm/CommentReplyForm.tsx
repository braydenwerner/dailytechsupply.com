import { useRef } from 'react'
import { useCreateCommentMutation } from '../../../generated/graphql'

import * as Styled from './CommentReplyForm.styled'

interface CommentReplyForm {
  itemUUID: string
  parentId: number | undefined
}

export const CommentReplyForm: React.FC<CommentReplyForm> = ({
  itemUUID,
  parentId,
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
  }

  return (
    <Styled.Form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(textRef.current?.value, parentId)
      }}
    >
      <Styled.TextArea ref={textRef} placeholder="What are your thoughts?" />
      <Styled.SubmitContainer>
        <Styled.SubmitButton type="submit">Submit</Styled.SubmitButton>
      </Styled.SubmitContainer>
    </Styled.Form>
  )
}
