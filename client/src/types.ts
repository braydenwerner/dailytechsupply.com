import { Item } from './generated/graphql'

export type ItemProperties = {
  [x: string]: string | number | boolean | Item | null | undefined
}
