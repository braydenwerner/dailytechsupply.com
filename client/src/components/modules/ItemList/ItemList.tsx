import { useState, useEffect } from 'react'
import { Printer3d } from '../../../generated/graphql'
import { ItemPreview } from '../../elements'

import * as Styled from './ItemList.styled'

interface ItemListProps {
  itemsData: Printer3d[]
  sort: string
}

export const ItemList: React.FC<ItemListProps> = ({ itemsData, sort }) => {
  const getSortedData = () => {
    if (sort === 'newest') {
      return [...itemsData].sort(
        (i1: any, i2: any) => parseInt(i2.created_at) - parseInt(i1.created_at)
      )
    } else if (sort === 'mostLiked') {
      return [...itemsData].sort(
        (i1: any, i2: any) => i2.numLikes - i1.numLikes
      )
    } else if (sort === 'lowestPrice') {
      return [...itemsData].sort(
        (i1: any, i2: any) => i1.item_id.price - i2.item_id.price
      )
    } else if (sort === 'highestPrice') {
      return [...itemsData].sort(
        (i1: any, i2: any) => i2.item_id.price - i1.item_id.price
      )
    } else {
      return itemsData
    }
  }

  console.log(itemsData)

  return (
    <Styled.Container>
      {getSortedData()?.map((item: Printer3d, i: number) => (
        <ItemPreview
          key={i}
          item={item}
          setNumLikes={(likes: number) => {
            const tempData: any = [...getSortedData()!]
            tempData[i].numLikes = likes
            return tempData
          }}
        />
      ))}
    </Styled.Container>
  )
}
