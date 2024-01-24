import Link from 'next/link'
import Repo from '../../components/Repo.tsx'
import api from '../../lib/api.tsx'
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

function detail({ repoBasic, router }) {
  console.log('---------------- detail ----------------')
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
        Readme
      </div>
    </div>
  )
}

detail.getInitialProps = async ({ ctx }) => {
  console.log('---------------- detail.getInitialProps ----------------')
  //console.log(ctx.query)
  const { owner, name } = ctx.query
  console.log(owner, name)

  const repoBasic = await api.request(
    {
      url: `/repos/${owner}/${name}`,
    },
    ctx.req,
    ctx.res)

  console.log(repoBasic)
  return {
    repoBasic: repoBasic.data
  }
}

export default withRouter(detail)

