import { useRef } from 'react'
import { useCreateCommentMutation } from '../../../generated/graphql'

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
    if (itemUUID && text && text.length < 50) {
      await createCommentMutation({
        variables: {
          input: { item_uuid: itemUUID, text, parent_id: parentId },
        },
        refetchQueries: ['getComments'],
      })
    }
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(textRef.current?.value, parentId)
        }}
      >
        <textarea ref={textRef} placeholder="Enter Comment"></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
