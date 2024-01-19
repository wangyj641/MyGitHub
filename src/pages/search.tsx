import { withRouter } from "next/router"

function search({ router }) {
  console.log('---------------- search ----------------')
  //console.log(router)
  const query = router.query.q
  console.log(query)

  return (
    <div className="flex flex-col w-full h-full justify-between items-center p-1">
      <span>search</span>
    </div>
  )
}

export default withRouter(search)