import { useContext } from 'react'
import { Printer3d } from '../../../generated/graphql'

import { ItemProperties, UserData } from '../../../types'
import { TokenContext } from '../../../providers'
import { ItemViewData, ItemComments } from '..'
import * as Styled from './ItemViewLayout.styled'

interface ItemProps {
  uuid: string
  userData: UserData
  item: Printer3d
  properties: ItemProperties
}

export const ItemViewLayout: React.FC<ItemProps> = ({
  item,
  properties,
  uuid,
  userData,
}) => {
  const { isMounted, loading } = useContext(TokenContext)

  return (
    <Styled.Wrapper>
      <Styled.Container>
        <ItemViewData item={item} properties={properties} />
        {isMounted && !loading && (
          <ItemComments itemUUID={uuid} userData={userData} />
        )}
      </Styled.Container>
    </Styled.Wrapper>
  )
}
