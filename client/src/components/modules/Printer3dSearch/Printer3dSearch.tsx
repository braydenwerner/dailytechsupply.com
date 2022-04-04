import React from 'react'
import { GetPrinter3dInput } from '../../../generated/graphql'
import { Search } from '../../modules'

interface Printer3dSearchProps {
  input: GetPrinter3dInput
}

export const Printer3dSearch: React.FC<Printer3dSearchProps> = ({ input }) => {
  console.log(input)
  return (
    <div>
      <Search
        input={input}
        type="range"
        title="Price"
        fieldNames={['minPrice', 'maxPrice']}
        minValue={0}
        maxValue={500}
        minDistance={10}
      />
    </div>
  )
}
