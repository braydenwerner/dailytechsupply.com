import { useContext, useState, useEffect } from 'react'
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
            <Styled.Image
              src={
                item.item_id.image_url_large
                  ? item.item_id.image_url_large
                  : item.item_id.image_url
              }
            />
          </Styled.ImageContainer>
          <Styled.InfoContainer>
            <div>{item.item_id.title}</div>
            <div>{item.item_id.description}</div>
            <div>{item.item_id.manufacturer}</div>
            <div>${item.item_id.price}</div>
            <div>{item.item_id.rating}</div>
            {itemRecommendData && <div>{getNumRecommends()}</div>}
            <a href={item.item_id.url} target="_blank">
              <div>{item.item_id.sold_by}</div>
            </a>
            {Object.keys(properties).map((key, i) => (
              <div key={i}>
                {key}: {properties[key as keyof typeof properties]?.toString()}
              </div>
            ))}
            {!loadingRecommends && (
              <div>
                {!userRecommended ? (
                  <button
                    disabled={loadingRecommends}
                    onClick={() => {
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
                  </button>
                ) : (
                  <button
                    disabled={loadingRecommends}
                    onClick={() => {
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
                  </button>
                )}
              </div>
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
