import { GetPrinter3dInput, Printer3d } from '../../../generated/graphql'
import { ItemList } from '../ItemList/ItemList'
import { Printer3dSearch } from '../Printer3dSearch/Printer3dSearch'

interface ItemsPageLayoutProps {
  printers: Printer3d[]
  input: GetPrinter3dInput
}

export const ItemsPageLayout: React.FC<ItemsPageLayoutProps> = ({
  printers,
  input,
}) => {
  return (
    <>
      <ItemList itemsData={printers} />
      <Printer3dSearch input={input} />
    </>
  )
}
