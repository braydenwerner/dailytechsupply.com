import { Printer3d } from '../../../generated/graphql'
import { ItemPreview } from '../../elements'

interface ItemListProps {
  itemsData: Printer3d[]
}

export const ItemList: React.FC<ItemListProps> = ({ itemsData }) => {
  return (
    <div>
      {itemsData.map((item: Printer3d, i: number) => (
        <div key={i} style={{ marginBottom: '50px' }}>
          <ItemPreview item={item} />
        </div>
      ))}
    </div>
  )
}
