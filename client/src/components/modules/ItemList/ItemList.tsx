import React from 'react'
import { Printer3d } from '../../../generated/graphql'
import { ItemPreview } from '../../elements'

interface ItemListProps {
  itemsData?: Printer3d[]
}

export const ItemList: React.FC<ItemListProps> = ({ itemsData }) => {
  console.log(itemsData)
  return (
    <div>
      {itemsData &&
        itemsData.map((item: Printer3d, i: number) => (
          <div style={{ marginBottom: '50px' }}>
            <ItemPreview item={item} />
          </div>
        ))}
    </div>
  )
}
