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
  const [hiddenReplies, setHiddenReplies] = useState<number[]>([])
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
      <>
        <Styled.ImageNameTimeContainer>
          {comment.user_id.profile_picture_url ? (
            <Styled.ProfilePictureWrapper>
              <Styled.ProfilePicture
                url={comment.user_id.profile_picture_url}
              />
            </Styled.ProfilePictureWrapper>
          ) : (
            <Styled.ProfileSvgWrapper>
              <Styled.PersonSvg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
              >
                <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
              </Styled.PersonSvg>
            </Styled.ProfileSvgWrapper>
          )}
          <div>{comment.user_id.display_name}</div>
          <div>{comment.created_at}</div>
        </Styled.ImageNameTimeContainer>
        <Styled.CommentContainer>
          {!comment.is_deleted ? (
            <>
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
            </>
          ) : (
            <div>This comment has been deleted</div>
          )}
          {adjList.get(id) && (
            <div
              onClick={() => {
                setHiddenReplies((oldHiddenReplies) => {
                  if (oldHiddenReplies.includes(id))
                    return oldHiddenReplies.filter((num) => num !== id)

                  return [...oldHiddenReplies, id]
                })
              }}
            >
              {hiddenReplies.includes(id) ? 'unhide replies' : 'hide replies'}
            </div>
          )}
          {!hiddenReplies.includes(id) && (
            <div
              style={{
                position: 'relative',
                left: '30px',
              }}
            >
              {adjList
                .get(id)
                ?.sort((id1, id2) => {
                  const c1 = data.getComments.filter(
                    (comment) => comment.id === id1
                  )[0]
                  const c2 = data.getComments.filter(
                    (comment) => comment.id === id2
                  )[0]
                  return (
                    c2.comment_upvote_ids.length - c1.comment_upvote_ids.length
                  )
                })
                .map((childId) => (
                  <div key={childId}>
                    {generateCommentJSX(adjList, childId, data)}
                  </div>
                ))}
            </div>
          )}
        </Styled.CommentContainer>
      </>
    )
  }

  return (
    <Styled.CommentsWrapper>
      <Styled.CommentsContainer>
        <div>
          {userData ? (
            <CommentReplyForm itemUUID={itemUUID} parentId={undefined} />
          ) : (
            'Log in or sign up to write a comment.'
          )}
        </div>
        {commentsData && generateCommentStructure()}
      </Styled.CommentsContainer>
    </Styled.CommentsWrapper>
  )
}
