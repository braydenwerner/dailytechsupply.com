import { useState } from 'react'
import { GetPrinter3dInput, Printer3d } from '../../../generated/graphql'

import { ItemList } from '../ItemList/ItemList'
import { Printer3dSearch } from '../Printer3dSearch/Printer3dSearch'
import { Wrapper } from '../../../styles/shared.styled'
import * as Styled from './ItemsPageLayout.styled'

interface ItemsPageLayoutProps {
  printers: Printer3d[]
  input: GetPrinter3dInput
}

export const ItemsPageLayout: React.FC<ItemsPageLayoutProps> = ({
  printers,
  input,
}) => {
  const [sort, setSort] = useState('newest')

  return (
    <Wrapper style={{ flexDirection: 'column' }}>
      <Styled.SortContainer>
        <Styled.ItemTitle>3d Printers</Styled.ItemTitle>
        <Styled.ItemSelectContainer>
          <Styled.ItemSelect
            name="comment-sort-select"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="mostLiked">Most Liked</option>
            <option value="lowestPrice">Lowest Price</option>
            <option value="highestPrice">Highest Price</option>
          </Styled.ItemSelect>
        </Styled.ItemSelectContainer>
      </Styled.SortContainer>
      <Styled.Container>
        <Printer3dSearch input={input} />
        <ItemList itemsData={printers} sort={sort} />
      </Styled.Container>
    </Wrapper>
  )
}
