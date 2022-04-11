import { useRef, FormEvent, useEffect } from 'react'
import {
  useCreateCommentMutation,
  useGetCommentsLazyQuery,
} from '../../../generated/graphql'

interface ItemCommentsProps {
  itemUUID: string
  signedIn: boolean
}

export const ItemComments: React.FC<ItemCommentsProps> = ({
  itemUUID,
  signedIn,
}) => {
  const [getComments, { data }] = useGetCommentsLazyQuery({
    variables: { item_uuid: itemUUID },
  })
  const commentsData = data && data.getComments

  const [createCommentMutation] = useCreateCommentMutation()

  useEffect(() => {
    getComments()
  }, [])

  const textRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (
      itemUUID &&
      textRef &&
      textRef.current &&
      textRef.current.value.length < 50
    ) {
      const res = await createCommentMutation({
        variables: { item_uuid: itemUUID, text: textRef.current.value },
      })
      await getComments()

      textRef.current.value = ''
    }
  }

  return (
    <>
      <div>
        {signedIn ? (
          <div>
            <form onSubmit={handleSubmit}>
              <textarea ref={textRef} placeholder="Enter Comment"></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        ) : (
          "You are not signed in so you can't make a comment"
        )}
      </div>
      <div>
        {commentsData &&
          commentsData.map((comment, i) => (
            <div key={i}>
              <div>{comment.user_id.first_name}</div>
              <div>{comment.user_id.last_name}</div>
              <div>{comment.text}</div>
            </div>
          ))}
      </div>
    </>
  )
}
