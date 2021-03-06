import Head from 'next/head'
import { useCallback, useContext } from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import {
  Get3dPrinterDocument,
  Get3dPrinterIdsDocument,
  Printer3d,
} from '../../../../generated/graphql'

import { client } from '../../../../utils/createApolloClient'
import { ItemViewLayout, Navbar } from '../../../../components/modules'
import { ItemProperties } from '../../../../types'
import { TokenContext } from '../../../../providers'

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await client.query({
    query: Get3dPrinterIdsDocument,
  })

  const data: Printer3d[] = res.data?.get3dPrinters
  let uuids: string[] = []
  if (data) uuids = data.map((printer) => printer.uuid)

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
    query: Get3dPrinterDocument,
    variables: { uuid: params.id },
  })

  if (!res.data?.get3dPrinter) return { notFound: true }

  return { props: { uuid: params.id, printer: res.data.get3dPrinter } }
}

interface Printer3dItemProps {
  uuid: string
  printer: Printer3d
}

const Printer3dItemPage: NextPage<Printer3dItemProps> = ({ uuid, printer }) => {
  const { userData } = useContext(TokenContext)

  const getProperties = useCallback(() => {
    type key = keyof typeof printer

    const properties: ItemProperties = {}

    Object.keys(printer).map((key, i) => {
      if (
        key !== '__typename' &&
        key !== 'item_id' &&
        key !== 'uuid' &&
        printer[key as key]
      ) {
        properties[key] = printer[key as key]
      }
    })

    return properties
  }, [])

  return (
    <>
      <Head>
        <title>{printer.item_id.title} - DailyTechSupply</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar width={250} />
      <ItemViewLayout
        item={printer}
        properties={getProperties()}
        uuid={uuid}
        userData={userData}
      />
    </>
  )
}

export default Printer3dItemPage
