import { useRef, FormEvent, useEffect } from 'react'
import {
  useCreateReviewMutation,
  useGetReviewsLazyQuery,
} from '../../../generated/graphql'

interface ItemCommentsProps {
  itemUUID: string
  signedIn: boolean
}

export const ItemReviews: React.FC<ItemCommentsProps> = ({
  itemUUID,
  signedIn,
}) => {
  const [getReviews, { data }] = useGetReviewsLazyQuery({
    variables: { item_uuid: itemUUID },
  })
  const reviewsData = data && data.getReviews

  const [createCommentMutation] = useCreateReviewMutation()

  useEffect(() => {
    getReviews()
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
      await getReviews()

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
        {reviewsData &&
          reviewsData.map((review, i) => (
            <div key={i}>
              <div>{review.user_id.display_name}</div>
              <div>{review.text}</div>
            </div>
          ))}
      </div>
    </>
  )
}
