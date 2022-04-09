import { useRouter } from 'next/router'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Printer3d } from '../../../generated/graphql'

interface ItemPreviewProps {
  item: Printer3d
}

export const ItemPreview: React.FC<ItemPreviewProps> = ({ item }) => {
  const router = useRouter()

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

  return (
    <div
      onClick={() =>
        router.push({ pathname: `/products/3d-printers/${item.uuid}` })
      }
    >
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
