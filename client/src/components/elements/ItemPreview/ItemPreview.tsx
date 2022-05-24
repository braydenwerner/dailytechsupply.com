import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Rating } from '@mui/material'
import {
  Printer3d,
  useGetItemRecommendsQuery,
} from '../../../generated/graphql'

import * as Styled from './ItemPreview.styled'
import { TokenContext } from '../../../providers'

interface ItemPreviewProps {
  item: Printer3d
  setNumLikes: (likes: number) => void
}

export const ItemPreview: React.FC<ItemPreviewProps> = ({
  item,
  setNumLikes,
}) => {
  const { userData } = useContext(TokenContext)

  const { data } = useGetItemRecommendsQuery({
    variables: { item_id: item.item_id.id },
  })
  const itemRecommendData = data?.getItemRecommends

  useEffect(() => {
    if (itemRecommendData) setNumLikes(getNumRecommends())
  }, [itemRecommendData])

  const checkUserRecommended = () => {
    if (!userData?.id) return false

    for (const recommend of itemRecommendData!) {
      if (recommend.user_id?.id === userData.id) return true
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

  const renderTags = () => {
    const tags: ReactJSXElement[] = []

    type key = keyof typeof item
    Object.keys(item).map((key, i) => {
      if (
        key !== '__typename' &&
        key !== 'item_id' &&
        key !== 'uuid' &&
        item[key as key]
      ) {
        tags.push(
          <div key={i}>
            {key}: {item[key as key]?.toString()}
          </div>
        )
      }
    })

    return tags
  }

  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/products/3d-printers/${item.uuid}`)}
      style={{ cursor: 'pointer' }}
    >
      <Styled.Container>
        <Styled.Image src={item.item_id.image_url} />
        <Styled.Title>{item.item_id.title}</Styled.Title>
        <Styled.SoldBy>Sold by {item.item_id.manufacturer}</Styled.SoldBy>
        <Rating
          name="read-only"
          value={item.item_id.rating}
          precision={0.5}
          readOnly
        />
        <Styled.Price>${item.item_id.price}</Styled.Price>
        <Styled.BottomContainer>
          <a href={item.item_id.url} target="_blank">
            <Styled.ItemLinkButton>
              View on {item.item_id.sold_by}
            </Styled.ItemLinkButton>
          </a>
          {itemRecommendData && (
            <Styled.LikeContainer>
              {checkUserRecommended() ? (
                <Styled.RecommendIconFill size={28} />
              ) : (
                <Styled.RecommendIcon size={28} />
              )}
              <Styled.NumRecommends>{getNumRecommends()}</Styled.NumRecommends>
            </Styled.LikeContainer>
          )}
        </Styled.BottomContainer>
      </Styled.Container>
    </div>
  )
}
