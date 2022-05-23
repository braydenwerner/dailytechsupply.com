import { useState, useEffect } from 'react'
import { Printer3d } from '../../../generated/graphql'
import { ItemPreview } from '../../elements'

import * as Styled from './ItemList.styled'

interface ItemListProps {
  itemsData: Printer3d[]
  sort: string
}

export const ItemList: React.FC<ItemListProps> = ({ itemsData, sort }) => {
  const [sortedData, setSortedData] = useState<Printer3d[]>([...itemsData])

  useEffect(() => {
    if (sort === 'newest') {
      setSortedData((oldSortedData: any) => {
        return oldSortedData.sort(
          (i1: any, i2: any) => parseInt(i2.createdAt) - parseInt(i1.createdAt)
        )
      })
    }
    if (sort === 'lowestPrice') {
      setSortedData((oldSortedData: any) => {
        return oldSortedData.sort(
          (i1: any, i2: any) => i2.item_id.price - i1.item_id.price
        )
      })
    } else if ('highestPrice') {
      setSortedData((oldSortedData: any) => {
        return oldSortedData.sort(
          (i1: any, i2: any) => i1.item_id.price - i2.item_id.price
        )
      })
    }
  }, [sort])

  return (
    <Styled.Container>
      {sortedData.map((item: Printer3d, i: number) => (
        <ItemPreview item={item} key={i} />
      ))}
    </Styled.Container>
  )
}
