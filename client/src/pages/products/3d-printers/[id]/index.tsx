import Head from 'next/head'
import { useCallback, useContext, useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import {
  Get3dPrinterByIdDocument,
  Get3dPrinterIdsDocument,
  Printer3d,
} from '../../../../generated/graphql'

import { client } from '../../../../utils/createApolloClient'
import { ItemView, Navbar } from '../../../../components/modules'
import { ItemProperties } from '../../../../types'
import { ItemComments } from '../../../../components/elements/ItemComments/ItemComments'
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
    query: Get3dPrinterByIdDocument,
    variables: { uuid: params.id },
  })

  if (!res.data?.get3dPrinterByUUID) return { notFound: true }

  return { props: { uuid: params.id, printer: res.data.get3dPrinterByUUID } }
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
      <Navbar />
      <ItemView item={printer} properties={getProperties()} />
      <ItemComments itemUUID={uuid} signedIn={!!userData} />
    </>
  )
}

export default Printer3dItemPage
