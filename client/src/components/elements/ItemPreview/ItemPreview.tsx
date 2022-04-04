import React from 'react'
import { Printer3d } from '../../../generated/graphql'

interface ItemPreviewProps {
  item: Printer3d
}

export const ItemPreview: React.FC<ItemPreviewProps> = ({ item }) => {
  const renderTags = () => {
    const tags: any = []
    Object.keys(item).map((key, i) => {
      if (
        key !== '__typename' &&
        key !== 'item_id' &&
        key !== 'uuid' &&
        key !== 'updated_at' &&
        key !== 'created_at' &&
        item[key as keyof typeof item]
      ) {
        tags.push(
          <div>
            <div>
              {key}:{item[key as keyof typeof item]}
            </div>
          </div>
        )
      }
    })

    return tags
  }

  return (
    <div>
      <div>{item.item_id.title}</div>
      <div>{item.item_id.description}</div>
      <div>{item.item_id.manufacturer}</div>
      <div>${item.item_id.price}</div>
      <div>{item.item_id.rating}</div>
      <div>{item.item_id.sold_by}</div>
      <div>{item.item_id.url}</div>
      <img src={item.item_id.image_url} />
      {renderTags()}
    </div>
  )
}
