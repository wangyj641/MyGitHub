import Link from 'next/link'
import Repo from './Repo'
import api from "../lib/api"
import { withRouter } from 'next/router'

// get current query string from router
// actually, it is the current url substring
function makeQuery(queryObject) {
  const query = Object.entries(queryObject)
    .reduce((result, entry) => {
      result.push(entry.join('='))
      return result
    }, []).join('&')

  return `?${query}`
}

export default function (Comp) {
  function withDetail({ repoBasic, router, ...rest }) {
    console.log('---------------- withDetail ----------------')
    const query = makeQuery(router.query)
    console.log(query)

    return (
      <div className="flex flex-col w-full h-full p-1 pt-[20px]">
        <div className="flex flex-col w-full h-full p-5 mb-[20px]">
          <Repo repo={repoBasic} />
          <div className="flex mt-[20px]">
            <div className="flex mr-[20px]">
              <Link href={`/detail${query}`} legacyBehavior className="text-red-500">Readme</Link>
            </div>
            <div className="flex mr-[20px]">
              <Link href={`/detail/issues${query}`} legacyBehavior className="text-red-500">Issues</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full h-full p-5 mb-[20px]">
          <Comp {...rest} />
        </div>
      </div>
    )
  }

  withDetail.getInitialProps = async ({ ctx }) => {
    console.log('---------------- withDetail.getInitialProps ----------------')
    const { owner, name } = ctx.query
    console.log(owner, name)

    const repoBasic = await api.request(
      {
        url: `/repos/${owner}/${name}`,
      },
      ctx.req,
      ctx.res)

    console.log(repoBasic)

    let pageData = {}
    if (Comp.getInitialProps) {
      pageData = await Comp.getInitialProps(ctx)
    }

    return {
      repoBasic: repoBasic.data,
      ...pageData
    }
  }

  return withRouter(withDetail)
}