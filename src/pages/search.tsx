import { withRouter } from "next/router"

const api = require("../lib/api")

function search({ router, repos }) {
  console.log('---------------- search ----------------')
  //console.log(router)
  console.log(repos)

  const query = router.query.q
  console.log(query)

  return (
    <div className="flex flex-col w-full h-full justify-between items-center p-1">
      <span>search</span>
    </div>
  )
}

search.getInitialProps = async ({ ctx }) => {
  console.log('---------------- search getInitialProps ----------------')
  console.log(ctx)
  console.log(ctx.query)
  const { q, sort, lang, order, page } = ctx.query

  if (!q) {
    return {
      repos: {
        total_count: 0,
      }
    }
  }

  console.log('---------------- search getInitialProps 2----------------')
  let queryString = `?q=${q}`
  if (lang) {
    queryString += `&l=${lang}`
  }

  if (sort) {
    queryString += `&sort=${sort}&order=${order || 'desc'}`
  }

  if (page) {
    queryString += `&page=${page}`
  }

  console.log(queryString)

  const result = await api.request(
    {
      url: `search/repositories${queryString}`
    },
    ctx.req,
    ctx.res
  )

  return {
    repos: result.data
  }
}

export default withRouter(search)