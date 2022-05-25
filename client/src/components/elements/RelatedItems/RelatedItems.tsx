import { Wrapper } from '../../../styles/shared.styled'
import * as Styled from './RelatedItems.styled'

interface RelatedItemsProps {
  items: {
    title: string
    route: string
    imageUrl: string
  }[]
}

export const RelatedItems: React.FC<RelatedItemsProps> = ({ items }) => {
  return (
    <Wrapper>
      <Styled.Container>
        <Styled.Title style={{ marginBottom: '30px', paddingTop: '15px' }}>
          Related Items
        </Styled.Title>
        <Styled.RelatedItemsContainer>
          {items.map((item, i) => (
            <a href={item.route}>
              <Styled.RelatedItem>
                <img src={item.imageUrl} width={150} height={150} />
                <Styled.Title>{item.title}</Styled.Title>
              </Styled.RelatedItem>
            </a>
          ))}
        </Styled.RelatedItemsContainer>
      </Styled.Container>
    </Wrapper>
  )
}
