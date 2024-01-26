import Link from 'next/link'
import Repo from './Repo'
import api from "../lib/api"
import { withRouter } from 'next/router'
import { getRepoFromCache, cacheRepo } from '../lib/repo-basic-cache.tsx'
import { useEffect, useState } from "react"

const isServer = typeof window === 'undefined'

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

export default function (Comp, type) {
  function withDetail({ repoBasic, router, ...rest }) {
    console.log('---------------- withDetail ----------------')
    const query = makeQuery(router.query)
    console.log(query)

    useEffect(() => {
      console.log('---------------- withDetail useEffect ----------------')
      if (!isServer) {
        if (repoBasic) {
          console.log('---------------- set cache ----------------')
          cacheRepo(repoBasic)
        }
      }
    }, [repoBasic])


    return (
      <div className="flex flex-col w-full h-full p-1 pt-[20px]">
        <div className="flex flex-col w-full h-full p-5 mb-[20px]">
          <Repo repo={repoBasic} />
          <div className="flex mt-[20px]">
            <div className="flex mr-[20px]">
              {type === 'index' ? <span className='text-red-500'>Readme</span> :
                <Link href={`/detail${query}`} legacyBehavior>Readme</Link>}
            </div>
            <div className="flex mr-[20px] ">
              {type === 'issues' ? <span className='text-red-500'>Issues</span> :
                <Link href={`/detail/issues${query}`} legacyBehavior>Issues</Link>
              }
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full h-full p-5 mb-[20px]">
          <Comp {...rest} />
        </div>
      </div >
    )
  }

  withDetail.getInitialProps = async (context) => {
    console.log('---------------- withDetail.getInitialProps ----------------')
    const { ctx } = context
    const { owner, name } = ctx.query
    console.log(owner, name)

    let pageData = {}
    if (Comp.getInitialProps) {
      pageData = await Comp.getInitialProps(context)
    }

    const repoFullName = `${owner}/${name}`
    if (getRepoFromCache(repoFullName)) {
      return {
        repoBasic: getRepoFromCache(repoFullName),
        ...pageData
      }
    }

    const repoBasic = await api.request(
      {
        url: `/repos/${owner}/${name}`,
      },
      ctx.req,
      ctx.res)

    console.log(repoBasic)

    return {
      repoBasic: repoBasic.data,
      ...pageData
    }
  }

  return withRouter(withDetail)
}