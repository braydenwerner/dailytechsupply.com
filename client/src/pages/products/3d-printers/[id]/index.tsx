import { useRouter } from 'next/router'

//  Will only allow paths valid item id to be built
export async function getStaticPaths() {}

const Printer3dItem = () => {
  const router = useRouter()
  const { id } = router.query

  console.log('id: ' + id)

  return (
    <>
      <div>3d Printer: {id}</div>
    </>
  )
}

export default Printer3dItem
