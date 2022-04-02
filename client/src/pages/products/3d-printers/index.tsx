import { NextPage } from 'next'
import { gql } from '@apollo/client'
import { client } from '../../../utils/createApolloClient'
import { GetPrinter3dInput } from '../../../generated/graphql'
import { useRouter } from 'next/router'
import { printer3dProperties } from '../../../constants/constants'
import { validateQueryParams } from '../../../utils/utils'
interface Printer3dPageProps {
  printers?: GetPrinter3dInput[]
}
const Printer3dPage: NextPage<Printer3dPageProps> = (printers) => {
  const router = useRouter()

  if (!printers || Object.keys(printers).length == 0) {
    router.push('/404')
  }

  return (
    <>
      <div>3d Printer page</div>
      <div>{JSON.stringify(printers, null, 4)}</div>
    </>
  )
}

//  Data is not changing very much, will be best to use getStaticProps with a revalidation
//  However, we can't use getStaticProps because we need to have access to query string in URL to filter data
Printer3dPage.getInitialProps = async (context) => {
  //  generate query param object
  let res = await client.query({
    variables: {
      data: validateQueryParams(context.query, printer3dProperties),
    },
    query: gql`
      query get3dPrinters($data: GetPrinter3dInput!) {
        get3dPrinters(data: $data) {
          item_id {
            title
            description
            price
            rating
            manufacturer
            sold_by
            url
            image_url
            is_affiliate
          }
          uuid
          x_axis
          y_axis
          z_axis
          auto_leveling
          resume_printing
          removeable_build_surface
          material
          weight
          voltage
          wattage
          compatible_material
          created_at
          updated_at
        }
      }
    `,
  })

  return { printers: res.data.get3dPrinters }
}

export default Printer3dPage
