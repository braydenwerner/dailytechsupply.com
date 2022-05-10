import { useContext, useState, useEffect } from 'react'
import { Rating } from '@mui/material'
import {
  Printer3d,
  useCreateItemRecommendMutation,
  useDeleteItemRecommendMutation,
  useGetItemRecommendsQuery,
} from '../../../generated/graphql'

import { TokenContext } from '../../../providers'
import { ItemProperties } from '../../../types'
import { SignUp, SignIn } from '..'
import { SpringModal } from '../../elements'
import * as Styled from './ItemViewData.styled'

interface ItemProps {
  item: Printer3d
  properties: ItemProperties
}

export const ItemViewData: React.FC<ItemProps> = ({ item, properties }) => {
  const [userRecommended, setUserRecommended] = useState(false)
  const [loadingRecommends, setLoadingRecommends] = useState(true)
  const [modalOpenMode, setModalOpenMode] = useState<string | null>(null)

  const { data } = useGetItemRecommendsQuery({
    variables: { item_id: item.item_id.id },
  })
  const itemRecommendData = data?.getItemRecommends

  const [createItemRecommend] = useCreateItemRecommendMutation()
  const [deleteItemRecommend] = useDeleteItemRecommendMutation()

  const { userData, isMounted, loading } = useContext(TokenContext)

  useEffect(() => {
    if (userData && itemRecommendData) {
      setUserRecommended(checkUserRecommended())
      setLoadingRecommends(false)
    } else if (!userData && isMounted && !loading) setLoadingRecommends(false)
  }, [userData, itemRecommendData])

  const checkUserRecommended = () => {
    for (const recommend of itemRecommendData!) {
      if (recommend.user_id.id === userData!.id) return true
    }
    return false
  }

  const getNumRecommends = () => {
    const set = new Set()
    for (const recommend of itemRecommendData!) {
      set.add(recommend.user_id.id)
    }
    return set.size
  }

  return (
    <>
      <Styled.Wrapper>
        <Styled.Container>
          <Styled.ImageContainer>
            <a href={item.item_id.url} target="_blank">
              <Styled.Image
                src={
                  item.item_id.image_url_large
                    ? item.item_id.image_url_large
                    : item.item_id.image_url
                }
              />
            </a>
          </Styled.ImageContainer>
          <Styled.InfoContainer>
            <Styled.Title>{item.item_id.title}</Styled.Title>
            {/* <Styled.Description>{item.item_id.description}</Styled.Description> */}
            <Styled.Manufacturer>
              Sold by {item.item_id.manufacturer}
            </Styled.Manufacturer>
            <Rating
              name="read-only"
              value={item.item_id.rating}
              precision={0.5}
              readOnly
              style={{ marginTop: '10px' }}
            />
            <Styled.Price>${item.item_id.price}</Styled.Price>
            <a href={item.item_id.url} target="_blank">
              <Styled.ItemLinkButton>
                View on {item.item_id.sold_by}
              </Styled.ItemLinkButton>
            </a>
            {/* {Object.keys(properties).map((key, i) => (
              <div key={i}>
                {key}: {properties[key as keyof typeof properties]?.toString()}
              </div>
            ))} */}
            {!loadingRecommends && (
              <Styled.RecommendContainer>
                {!userRecommended ? (
                  <Styled.RecommendIconContainer>
                    <Styled.RecommendIcon
                      size={36}
                      recommended={userRecommended}
                      onClick={() => {
                        if (loadingRecommends) return

                        if (userData) {
                          setLoadingRecommends(true)
                          createItemRecommend({
                            variables: { item_id: item.item_id.id },
                            refetchQueries: ['getItemRecommends'],
                          })
                        } else {
                          setModalOpenMode('signUp')
                        }
                      }}
                    >
                      Recommend
                    </Styled.RecommendIcon>
                  </Styled.RecommendIconContainer>
                ) : (
                  <Styled.RecommendIconContainer>
                    <Styled.RecommendIcon
                      size={36}
                      recommended={userRecommended}
                      onClick={() => {
                        if (loadingRecommends) return

                        if (userData) {
                          setLoadingRecommends(true)
                          deleteItemRecommend({
                            variables: { item_id: item.item_id.id },
                            refetchQueries: ['getItemRecommends'],
                          })
                        } else {
                          setModalOpenMode('signUp')
                        }
                      }}
                    >
                      Unrecommend
                    </Styled.RecommendIcon>
                  </Styled.RecommendIconContainer>
                )}
                {itemRecommendData && (
                  <Styled.RecommendNumber>
                    {getNumRecommends()}{' '}
                    {getNumRecommends() === 1 ? 'Recommend' : 'Recommends'}
                  </Styled.RecommendNumber>
                )}
              </Styled.RecommendContainer>
            )}
          </Styled.InfoContainer>
        </Styled.Container>
      </Styled.Wrapper>
      {modalOpenMode && (
        <SpringModal
          title={modalOpenMode === 'SignIn' ? 'Log In' : 'Sign Up'}
          onClose={() => setModalOpenMode(null)}
          width={568}
        >
          {modalOpenMode === 'SignIn' ? (
            <SignIn
              onSuccess={() => setModalOpenMode(null)}
              toggleToSignUp={() => setModalOpenMode('SignUp')}
            />
          ) : (
            <SignUp
              onSuccess={() => setModalOpenMode(null)}
              toggleToSignIn={() => setModalOpenMode('SignIn')}
            />
          )}
        </SpringModal>
      )}
    </>
  )
}
