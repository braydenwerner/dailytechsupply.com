import {
  Printer3d,
  useCreateItemRecommendMutation,
} from '../../../generated/graphql'

import { ItemProperties } from '../../../types'
import * as Styled from './ItemView.styled'

interface ItemProps {
  item: Printer3d
  properties: ItemProperties
}

export const ItemView: React.FC<ItemProps> = ({ item, properties }) => {
  const [createItemRecommend] = useCreateItemRecommendMutation()

  console.log(item)
  return (
    <Styled.Wrapper>
      <Styled.Container>
        <Styled.ImageContainer>
          <img src={item.item_id.image_url} />
        </Styled.ImageContainer>
        <Styled.InfoContainer>
          <div>{item.item_id.title}</div>
          <div>{item.item_id.description}</div>
          <div>{item.item_id.manufacturer}</div>
          <div>${item.item_id.price}</div>
          <div>{item.item_id.rating}</div>
          <div>{item.item_id.sold_by}</div>
          <div>{item.item_id.url}</div>
          {Object.keys(properties).map((key, i) => (
            <div key={i}>
              {key}: {properties[key as keyof typeof properties]?.toString()}
            </div>
          ))}
          <button
            onClick={async () => {
              createItemRecommend({
                variables: { item_id: item.item_id.id },
                refetchQueries: ['get3dPrinterByUUID'],
              })
            }}
          >
            Recommend
          </button>
        </Styled.InfoContainer>
      </Styled.Container>
    </Styled.Wrapper>
  )
}
