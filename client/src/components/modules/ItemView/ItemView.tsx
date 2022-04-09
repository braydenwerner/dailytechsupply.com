import { Printer3d } from '../../../generated/graphql'
import { ItemProperties } from '../../../types'

interface ItemProps {
  item: Printer3d
  properties: ItemProperties
}

export const ItemView: React.FC<ItemProps> = ({ item, properties }) => {
  return (
    <>
      <div>{item.item_id.title}</div>
      <div>{item.item_id.description}</div>
      <div>{item.item_id.manufacturer}</div>
      <div>${item.item_id.price}</div>
      <div>{item.item_id.rating}</div>
      <div>{item.item_id.sold_by}</div>
      <div>{item.item_id.url}</div>
      <img src={item.item_id.image_url} />
      {Object.keys(properties).map((key, i) => (
        <div key={i}>
          {key}: {properties[key as keyof typeof properties]?.toString()}
        </div>
      ))}
    </>
  )
}
