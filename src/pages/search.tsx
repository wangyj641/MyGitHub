import Router, { withRouter } from "next/router"

const api = require("../lib/api")

const LANGUAGES = ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'Java', 'Rust']

const SORT_TYPES = [
  {
    name: "Best Match",
  },
  {
    name: "Most stars",
    value: "stars",
    order: "desc",
  },
  {
    name: "Fewest stars",
    value: "stars",
    order: "asc",
  },
  {
    name: "Most forks",
    value: "forks",
    order: "desc",
  },
  {
    name: "Fewest forks",
    value: "forks",
    order: "asc",
  }
]

function search({ router, repos }) {
  console.log('---------------- search ----------------')
  //console.log(router)
  console.log(repos)

  //const { q, lang, sort, order } = router.query

  const query = router.query.q
  console.log(query)

  const handleLanguageChange = (e) => {
    console.log('---------------- handleLanguageChange ----------------')
    console.log(e.target.innerText)

    Router.push({
      pathname: '/search',
      query: {
        ...router.query,
        lang: e.target.innerText,
      }
    })
  }

  return (
    <div className="flex flex-col h-full justify-between items-center p-1">
      <span>Language</span>
      <div className="flex flex-col w-[100px] h-full justify-between items-center p-1">
        <ul>
          {
            LANGUAGES.map(lang => (
              <li key={lang} className="text-lg">
                <a onClick={handleLanguageChange}>{lang}</a>
              </li>
            ))
          }
        </ul>
      </div>
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