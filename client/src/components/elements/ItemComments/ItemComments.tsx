import { useEffect, useState } from 'react'
import {
  GetCommentsQuery,
  useCreateCommentUpvoteMutation,
  useDeleteCommentMutation,
  useDeleteCommentUpvoteMutation,
  useGetCommentsQuery,
} from '../../../generated/graphql'
import { generateCommentsGraph } from '../../../utils/utils'
import { CommentReplyForm } from '../CommentReplyForm/CommentReplyForm'

import * as Styled from './ItemComments.styled'

interface ItemCommentsProps {
  itemUUID: string
  userData: any
}

export const ItemComments: React.FC<ItemCommentsProps> = ({
  itemUUID,
  userData,
}) => {
  const [openReplies, setOpenReplies] = useState<number[]>([])
  const [likedComments, setLikedComments] = useState<number[]>()

  const commentsQuery = useGetCommentsQuery({
    variables: { item_uuid: itemUUID },
  })
  const commentsData = commentsQuery.data?.getComments

  const [createCommentUpvote] = useCreateCommentUpvoteMutation()
  const [deleteCommentUpvote] = useDeleteCommentUpvoteMutation()
  const [deleteComment] = useDeleteCommentMutation()

  useEffect(() => {
    if (commentsData && userData) {
      const tempLikedComments = []

      for (const comment of commentsData) {
        for (const commentUpvote of comment.comment_upvote_ids) {
          if (commentUpvote.user_id.id === userData.id)
            tempLikedComments.push(comment.id)
        }
      }
      setLikedComments(tempLikedComments)
    }
  }, [commentsData, userData])

  const generateCommentStructure = () => {
    if (!commentsQuery.data) return null

    const comments = []
    const adjList = generateCommentsGraph(commentsQuery.data)
    if (adjList && adjList.get(undefined) && commentsData) {
      for (const id of adjList.get(undefined)?.sort((id1, id2) => {
        const c1 = commentsData.filter((comment) => comment.id === id1)[0]
        const c2 = commentsData.filter((comment) => comment.id === id2)[0]
        return c2.comment_upvote_ids.length - c1.comment_upvote_ids.length
      })!)
        comments.push(
          <div key={id}>
            {generateCommentJSX(adjList, id, commentsQuery.data)}
          </div>
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

    if (comment.is_deleted && !adjList.get(comment.id)) return

    return (
      <div style={{ marginTop: '30px' }}>
        {!comment.is_deleted ? (
          <div>
            <div>{comment.user_id.display_name}</div>
            <div>{comment.text}</div>
            <div>{comment.comment_upvote_ids.length}</div>
            {userData &&
              likedComments &&
              (!likedComments.includes(comment.id) ? (
                <div
                  onClick={() => {
                    createCommentUpvote({
                      variables: { comment_id: comment.id },
                      refetchQueries: ['getComments'],
                    })
                  }}
                >
                  Upvote
                </div>
              ) : (
                <div
                  onClick={() => {
                    deleteCommentUpvote({
                      variables: { comment_id: comment.id },
                      refetchQueries: ['getComments'],
                    })
                  }}
                >
                  Unlike
                </div>
              ))}
            {userData && userData.id === comment.user_id.id && (
              <div
                onClick={() => {
                  deleteComment({
                    variables: { comment_id: comment.id },
                    refetchQueries: ['getComments'],
                  })
                }}
              >
                delete
              </div>
            )}
            {userData && (
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
            )}
            {openReplies.includes(id) && (
              <CommentReplyForm itemUUID={itemUUID} parentId={id} />
            )}
          </div>
        ) : (
          <div>This comment has been deleted</div>
        )}

        <div style={{ position: 'relative', left: '30px' }}>
          {adjList
            .get(id)
            ?.sort((id1, id2) => {
              const c1 = data.getComments.filter(
                (comment) => comment.id === id1
              )[0]
              const c2 = data.getComments.filter(
                (comment) => comment.id === id2
              )[0]
              return c2.comment_upvote_ids.length - c1.comment_upvote_ids.length
            })
            .map((childId) => (
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
          {userData ? (
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
