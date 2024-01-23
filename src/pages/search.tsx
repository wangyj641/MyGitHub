import { withRouter } from "next/router"
import Link from "next/link"
import { memo } from "react"
import Repo from '../components/Repo.tsx'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

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

const slecltedItemStyle = 'px-2 py-1 rounded-lg text-lg'

const FilterLink = memo(({ name, q, order, sort, lang }) => {
  console.log('---------------- FilterLink ----------------')

  let queryString = `?q=${q}`
  if (lang) {
    queryString += `&lang=${lang}`
  }

  if (sort) {
    queryString += `&sort=${sort}&order=${order || 'desc'}`
  }

  // if (page) {
  //   queryString += `&page=${page}`
  // }

  //console.log(queryString)
  const new_url = `/search${queryString}`
  console.log(new_url)

  return (<Link legacyBehavior href={new_url}>{name}</Link>)
})

function search({ router, repos }) {
  console.log('---------------- search ----------------')
  //console.log(router)
  //console.log(repos)
  //console.log(router.query)
  const { ...querys } = router.query
  const { q, lang, sort, order } = router.query

  return (
    <div className="flex">
      <div className="flex flex-col h-full w-[200px] justify-between items-center p-1">
        <span>Language</span>
        <div className="flex flex-col w-[100px] h-full justify-between items-center p-1">
          <ul>
            {
              LANGUAGES.map(item => {
                console.log(item)
                const selected = item === lang
                return (
                  <li key={item} className={selected ? (slecltedItemStyle) : ('')}>
                    {selected ? (
                      <span className="text-red-500">{item}</span>
                    ) : (
                      <FilterLink {...querys} lang={item} name={item} />
                    )}
                  </li>
                )
              }
              )
            }
          </ul>
        </div>
      </div >
      <div className="flex flex-col h-full w-[800px] justify-between items-center p-1">
        <h3 className="text-3xl font-bold">Search Results: {repos.total_count}</h3>
        {repos.items.map((repo) => {
          return (
            <Repo key={repo.id} repo={repo} />
          )
        })}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

search.getInitialProps = async ({ ctx }) => {
  console.log('---------------- search getInitialProps ----------------')
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