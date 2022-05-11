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
  const [URL, setURL] = useState<string | undefined>()

  const { data } = useGetItemRecommendsQuery({
    variables: { item_id: item.item_id.id },
  })
  const itemRecommendData = data?.getItemRecommends

  const [createItemRecommend] = useCreateItemRecommendMutation()
  const [deleteItemRecommend] = useDeleteItemRecommendMutation()

  const { userData, isMounted, loading } = useContext(TokenContext)

  useEffect(() => {
    if (window) {
      setURL(
        window.location.href.substring(0, window.location.href.lastIndexOf('/'))
      )
    }
  })

  useEffect(() => {
    if (userData && itemRecommendData) {
      setUserRecommended(checkUserRecommended())
      setLoadingRecommends(false)
    } else if (!userData && isMounted && !loading) setLoadingRecommends(false)
  }, [userData, itemRecommendData])

  const checkUserRecommended = () => {
    for (const recommend of itemRecommendData!) {
      if (recommend.user_id?.id === userData!.id) return true
    }
    return false
  }

  const getNumRecommends = () => {
    const set = new Set()
    let deletedAccountRecommends = 0
    for (const recommend of itemRecommendData!) {
      if (recommend.user_id) set.add(recommend.user_id.id)
      else deletedAccountRecommends++
    }
    return set.size + deletedAccountRecommends
  }

  const parseTags = () => {
    type key = keyof typeof properties
    return Object.keys(properties).map((key, i) => {
      if (key === 'created_at' || key === 'updated_at') return
      let parsedKey = key
      let parsedValue = properties[key as key]?.toString()
      parsedKey = parsedKey.replace(/_/g, ' ')
      parsedKey = parsedKey
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ')

      if (typeof properties[key as key] === 'boolean') {
        return (
          <Styled.Tag key={i}>
            <Styled.TagText>{parsedKey}</Styled.TagText>
          </Styled.Tag>
        )
      }

      if (parsedValue) {
        parsedValue = parsedValue
          .split(' ')
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ')

        if (key === 'weight') parsedValue += ' pounds'
        else if (key === 'x_axis' || key === 'y_axis' || key === 'z_axis')
          parsedValue += ' cm'
      }

      return (
        <Styled.Tag key={i}>
          <Styled.TagText>
            {parsedKey}: {parsedValue}
          </Styled.TagText>
        </Styled.Tag>
      )
    })
  }

  return (
    <>
      <Styled.Wrapper>
        {URL && (
          <a style={{ width: '100%' }} href={URL}>
            <Styled.BackButtonContainer>
              <Styled.BackArrow size={20} />
              <Styled.BackButtonText>Back to Products</Styled.BackButtonText>
            </Styled.BackButtonContainer>
          </a>
        )}
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
            <Styled.TagContainer>{parseTags()}</Styled.TagContainer>
            {!loadingRecommends && (
              <Styled.RecommendContainer>
                {!userRecommended ? (
                  <Styled.RecommendIconContainer>
                    <Styled.RecommendIcon
                      size={36}
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
                    <Styled.RecommendIconFill
                      size={36}
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
                    </Styled.RecommendIconFill>
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
