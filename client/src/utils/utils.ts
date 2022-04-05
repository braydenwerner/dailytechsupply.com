import {
  defaultItemPageNumber,
  defaultItemPageSize,
} from '../constants/constants'

export const validateQueryParams = (query: any, itemProperties: any) => {
  const data: any = {}
  for (const key in query) {
    const value = query[key]

    if (key in itemProperties) {
      //  check that types also match
      if (typeof itemProperties[key] === 'number') {
        if (!isNumeric(value)) continue

        data[key] = parseFloat(value)
      } else if (typeof itemProperties[key] === 'boolean') {
        data[key] = value === 'true'
      } else if (typeof itemProperties[key] === 'string') {
        data[key] = value
      }
    }
  }

  if (!('pageSize' in data)) data.pageSize = defaultItemPageSize
  if (!('pageNumber' in data)) data.pageNumber = defaultItemPageNumber

  return data
}

export const isNumeric = (str: string) => {
  return /^-?\d+$/.test(str)
}
