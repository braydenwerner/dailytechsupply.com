import { useRouter } from 'next/router'
import { GetPrinter3dInput } from '../../../generated/graphql'

import { DualRangeSlider } from '../../elements'
import * as Styled from './SearchRange.styled'

interface SearchProps {
  input: GetPrinter3dInput
  title: string
  fieldNames: string[]
  minValue: number
  maxValue: number
  minDistance: number
}

export const SearchRange: React.FC<SearchProps> = ({
  input,
  title,
  fieldNames,
  minValue,
  maxValue,
  minDistance,
}) => {
  const router = useRouter()

  const handleRangeSubmit = (values: number[]) => {
    //  if the slider is at the default value, clear router params
    //  items that do not have the field specified should become visible again
    if (values[0] === minValue && values[1] === maxValue) {
      delete router.query[fieldNames[0]]
      delete router.query[fieldNames[1]]
      router.push({
        pathname: '/products/3d-printers',
        query: { ...router.query },
      })
    } else {
      router.push({
        pathname: '/products/3d-printers',
        query: {
          ...router.query,
          [fieldNames[0]]: values[0].toString(),
          [fieldNames[1]]: values[1].toString(),
        },
      })
    }
  }

  if (fieldNames.length === 2) {
    return (
      <Styled.Container>
        <Styled.Title>{title}</Styled.Title>
        <DualRangeSlider
          defaultValue={
            input.minPrice && input.maxPrice
              ? [input.minPrice, input.maxPrice]
              : [minValue, maxValue]
          }
          minValue={minValue}
          maxValue={maxValue}
          minDistance={minDistance}
          handleRangeSubmit={handleRangeSubmit}
        />
      </Styled.Container>
    )
  }

  return null
}
