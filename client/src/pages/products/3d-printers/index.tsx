import Head from 'next/head'
import { GetServerSideProps, NextPage } from 'next'
import {
  Get3dPrintersDocument,
  GetPrinter3dInput,
  Printer3d,
} from '../../../generated/graphql'

import { client } from '../../../utils/createApolloClient'
import { printer3dProperties } from '../../../constants/constants'
import { validateQueryParams } from '../../../utils/utils'
import { ItemsPageLayout, Navbar } from '../../../components/modules'
import { RelatedItems } from '../../../components/elements'

//  Data is not changing very much, will be best to use getStaticProps with a revalidation
//  However, we can't use getStaticProps because we need to have access to query string in URL to filter data
export const getServerSideProps: GetServerSideProps = async (context) => {
  const input = validateQueryParams(context.query, printer3dProperties)

  const res = await client.query({
    query: Get3dPrintersDocument,
    variables: { input },
  })

  if (!res.data?.get3dPrinters) return { notFound: true }

  return { props: { printers: res.data.get3dPrinters, input } }
}

interface Printer3dPageProps {
  printers: Printer3d[]
  input: GetPrinter3dInput
}

const Printer3dPage: NextPage<Printer3dPageProps> = ({ printers, input }) => {
  return (
    <>
      <Head>
        <title>3D Printers - DailyTechSupply</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <RelatedItems
        items={[
          {
            imageUrl: '',
            route: '/products/3d-printer-fillament',
            title: 'Filament',
          },
          {
            imageUrl: '',
            route: '/products/3d-printer-components',
            title: 'Components',
          },
        ]}
      />
      <ItemsPageLayout printers={printers} input={input} />
    </>
  )
}

export default Printer3dPage
