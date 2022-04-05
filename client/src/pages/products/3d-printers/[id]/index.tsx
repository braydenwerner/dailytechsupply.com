import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import {
  Get3dPrinterByUuidDocument,
  Get3dPrinterIdsDocument,
  Printer3d,
} from '../../../../generated/graphql'

import { client } from '../../../../utils/createApolloClient'

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await client.query({
    query: Get3dPrinterIdsDocument,
  })

  const data: Printer3d[] = res.data?.get3dPrinters
  let uuids: string[] = []
  if (data) {
    uuids = data.map((printer) => printer.uuid)
  }

  const paths = uuids.map((uuid) => {
    return {
      params: { id: uuid },
    }
  })

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params

  if (!params?.id) return { notFound: true }

  const res = await client.query({
    query: Get3dPrinterByUuidDocument,
    variables: { uuid: params.id },
  })

  if (!res.data?.get3dPrinterByUUID) return { notFound: true }

  return { props: { printer: res.data.get3dPrinterByUUID } }
}

interface Printer3dItemProps {
  printer: Printer3d
}

const Printer3dItem: NextPage<Printer3dItemProps> = ({ printer }) => {
  const renderTags = () => {
    const tags: ReactJSXElement[] = []

    type key = keyof typeof printer
    Object.keys(printer).map((key, i) => {
      if (
        key !== '__typename' &&
        key !== 'item_id' &&
        key !== 'uuid' &&
        printer[key as key]
      ) {
        tags.push(
          <div key={i}>
            {key}: {printer[key as key]?.toString()}
          </div>
        )
      }
    })

    return tags
  }

  return (
    <div>
      <div>{printer.item_id.title}</div>
      <div>{printer.item_id.description}</div>
      <div>{printer.item_id.manufacturer}</div>
      <div>${printer.item_id.price}</div>
      <div>{printer.item_id.rating}</div>
      <div>{printer.item_id.sold_by}</div>
      <div>{printer.item_id.url}</div>
      <img src={printer.item_id.image_url} />
      {renderTags()}
    </div>
  )
}

export default Printer3dItem
