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
  //console.log(ctx.query)
  const { q, sort, lang, order, page } = ctx.query
  console.log(q, sort, lang, order, page)

  if (!q) {
    return {
      repos: {
        total_count: 0,
      }
    }
  }

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

  //console.log(queryString)
  const new_url = `/search/repositories${queryString}`
  console.log(new_url)

  const result = await api.request(
    {
      url: new_url
    },
    ctx.req,
    ctx.res
  )

  return {
    repos: result.data
  }
}

export default withRouter(search)