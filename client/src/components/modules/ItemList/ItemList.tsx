import { Printer3d } from '../../../generated/graphql'
import { ItemPreview } from '../../elements'

import * as Styled from './ItemList.styled'

interface ItemListProps {
  itemsData: Printer3d[]
  sort: string
}

export const ItemList: React.FC<ItemListProps> = ({ itemsData, sort }) => {
  return (
    <Styled.Container>
      {itemsData.map((item: Printer3d, i: number) => (
        <ItemPreview item={item} key={i} />
      ))}
    </Styled.Container>
  )
}
