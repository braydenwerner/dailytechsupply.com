import { GetPrinter3dInput } from '../../../generated/graphql'

import { SearchRange, SearchCheckbox } from '../../modules'
import * as Styled from './Printer3dSearch.styled'

interface Printer3dSearchProps {
  input: GetPrinter3dInput
}

export const Printer3dSearch: React.FC<Printer3dSearchProps> = ({ input }) => {
  return (
    <Styled.ContainerWrapper>
      <Styled.Container>
        <SearchRange
          input={input}
          title="Price"
          fieldNames={['minPrice', 'maxPrice']}
          minValue={0}
          maxValue={500}
          minDistance={10}
          formatValueLabel={(value) => '$' + value}
        />
      </Styled.Container>
      <Styled.Container>
        <SearchRange
          input={input}
          title="X-Axis"
          fieldNames={['minX', 'maxX']}
          minValue={0}
          maxValue={500}
          minDistance={10}
          formatValueLabel={(value) => value + ' cm'}
        />
        <SearchRange
          input={input}
          title="Y-Axis"
          fieldNames={['minY', 'maxY']}
          minValue={0}
          maxValue={500}
          minDistance={10}
          formatValueLabel={(value) => value + ' cm'}
        />
        <SearchRange
          input={input}
          title="Z-Axis"
          fieldNames={['minZ', 'maxZ']}
          minValue={0}
          maxValue={500}
          minDistance={10}
          formatValueLabel={(value) => value + ' cm'}
        />
        {/* <SearchCheckbox
          title="Resume Printing"
          fieldName="resumePrinting"
          defaultValue={false}
        /> */}
      </Styled.Container>
    </Styled.ContainerWrapper>
  )
}
