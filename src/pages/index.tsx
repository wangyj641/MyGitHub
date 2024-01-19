import { useEffect } from "react"

const api = require("../lib/api")

export default function index({ userRepos, userStarredRepos, isLogin }) {
  console.log('---------------- index ----------------')
  //console.log(userRepos)
  console.log(userStarredRepos)
  console.log(isLogin)

  return (
    <div className="flex flex-col w-full h-full justify-between items-center p-1">
      <span>index</span>
    </div>
  )
}

index.getInitialProps = async ({ ctx, reduxStore }) => {
  console.log('---------------- index getInitialProps ----------------')
  console.log(reduxStore)
  const user = reduxStore.getState().user
  if (!user || !user.id) {
    return {
      isLogin: false
    }
  }

  const userRepos = await api.request(
    {
      url: '/user/repos'
    },
    ctx.req,
    ctx.res)

  const userStarredRepos = await api.request(
    {
      url: '/user/starred'
    },
    ctx.req,
    ctx.res)


  return {
    isLogin: true,
    userRepos: userRepos.data,
    userStarredRepos: userStarredRepos.data
  }
}
