import { useRef, FormEvent, useEffect, useState } from 'react'
import {
  GetCommentsQuery,
  useCreateCommentMutation,
  useGetCommentsLazyQuery,
} from '../../../generated/graphql'
import { generateCommentsGraph } from '../../../utils/utils'
import { CommentReplyForm } from '../CommentReplyForm/CommentReplyForm'

import * as Styled from './ItemComments.styled'

interface ItemCommentsProps {
  itemUUID: string
  signedIn: boolean
}

export const ItemComments: React.FC<ItemCommentsProps> = ({
  itemUUID,
  signedIn,
}) => {
  const [openReplies, setOpenReplies] = useState<number[]>([])

  const [getComments, { data }] = useGetCommentsLazyQuery({
    variables: { item_uuid: itemUUID },
  })
  const commentsData = data && data.getComments

  useEffect(() => {
    getComments()
  }, [])

  const textRef = useRef<HTMLTextAreaElement>(null)

  const generateCommentStructure = () => {
    if (!data) return null

    const comments = []
    const adjList = generateCommentsGraph(data)
    if (adjList && adjList.get(undefined)) {
      for (const id of adjList.get(undefined)!)
        comments.push(
          <div key={id}>{generateCommentJSX(adjList, id, data)}</div>
        )
    }

    return comments
  }

  const generateCommentJSX = (
    adjList: Map<number | undefined, number[]>,
    id: number,
    data: GetCommentsQuery
  ) => {
    const comment = data.getComments.filter((comment) => comment.id === id)[0]
    if (!comment) return

    return (
      <div style={{ marginTop: '30px' }}>
        <div>{comment.user_id.display_name}</div>
        <div>{comment.text}</div>
        <div
          onClick={() => {
            setOpenReplies((oldOpenReplies) => {
              if (oldOpenReplies.includes(id))
                return oldOpenReplies.filter((num) => num !== id)

              return [...oldOpenReplies, id]
            })
          }}
        >
          reply
        </div>
        {openReplies.includes(id) && (
          <CommentReplyForm itemUUID={itemUUID} parentId={id} />
        )}
        <div style={{ position: 'relative', left: '30px' }}>
          {adjList.get(id)?.map((childId) => (
            <div key={childId}>
              {generateCommentJSX(adjList, childId, data)}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Styled.CommentsWrapper>
      <Styled.CommentsContainer>
        <div>
          {signedIn ? (
            <CommentReplyForm itemUUID={itemUUID} parentId={undefined} />
          ) : (
            "You are not signed in so you can't make a comment"
          )}
        </div>
        {commentsData && generateCommentStructure()}
      </Styled.CommentsContainer>
    </Styled.CommentsWrapper>
  )
}
