import React from 'react'
import { useRouter } from 'next/router'
import { GetPrinter3dInput } from '../../../generated/graphql'

import { DualRangeSlider } from '../../elements'

interface SearchProps {
  input: GetPrinter3dInput
  type: 'range' | 'checkbox'
  title: string
  fieldNames: string[]
  minValue?: number
  maxValue?: number
  minDistance?: number
  checkboxValue?: boolean
}

export const Search: React.FC<SearchProps> = ({
  input,
  type,
  title,
  fieldNames,
  minValue,
  maxValue,
  minDistance,
  checkboxValue,
}) => {
  const router = useRouter()

  const handleRangeSubmit = (values: number[]) => {
    router.push(`?${fieldNames[0]}=${values[0]}&${fieldNames[1]}=${values[1]}`)
  }

  if (
    type === 'range' &&
    minValue !== undefined &&
    maxValue !== undefined &&
    minDistance !== undefined &&
    fieldNames.length === 2
  ) {
    return (
      <div>
        <div>{title}</div>
        <DualRangeSlider
          defaultValue={
            input.minPrice && input.maxPrice
              ? [input.minPrice, input.maxPrice]
              : [minValue, maxValue]
          }
          minValue={minValue}
          maxValue={maxValue}
          minDistance={10}
          handleRangeSubmit={handleRangeSubmit}
        />
      </div>
    )
  } else if (type === 'checkbox' && fieldNames.length === 1) {
  }

  return null
}
