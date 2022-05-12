import {
  defaultItemPageNumber,
  defaultItemPageSize,
} from '../constants/constants'
import { GetCommentsQuery } from '../generated/graphql'

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

export const generateCommentsGraph = (comments: GetCommentsQuery) => {
  const commentsData = comments.getComments
  if (!commentsData) return

  const adjList = new Map<number | undefined, number[]>()

  for (const comment of commentsData) {
    const parentId = comment.parent_id?.id

    if (adjList.has(parentId)) adjList.get(parentId)?.push(comment.id)
    else adjList.set(parentId, [comment.id])
  }

  return adjList
}

export const createDateString = (timestamp: string) => {
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const date = new Date(parseInt(timestamp))

  return `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}
