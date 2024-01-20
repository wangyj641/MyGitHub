import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { connect } from "react-redux"
import config from '../../global.config.js'
import { Mail } from 'lucide-react'
import Repo from '../components/Repo.tsx'

const api = require("../lib/api")

function index({ userRepos, userStarredRepos, user }) {
  console.log('---------------- index ----------------')
  //console.log(userRepos)
  //console.log(userStarredRepos)
  //console.log(user)

  if (!user || !user.id) {
    const loginUrl = config.OAUTH_URL
    console.log(loginUrl)

    return (
      <div className="flex flex-col w-full h-[550px] justify-center items-center p-1">
        <p>Not login</p>
        <a href={loginUrl}>
          <Button>Login</Button>
        </a>
      </div >
    )
  }
  else {
    return (
      <div className="flex flex-start py-2 px-2">
        <div className="flex flex-col width-[100px] mr-[40px]">
          <img src={user.avatar_url} alt="avatar" className="w-full rounded" />
          <span className="text-lg, mt-[20px]">{user.login}</span>
          <span className="text-base">{user.name}</span>
          <span className="my-[20px]">{user.bio}</span>
          <p>
            <Mail className="right-[10px]" />
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </p>
        </div>
        <div>
          {userRepos.map((repo) => {
            return (
              <Repo repo={repo} />
            )
          })}
        </div>
      </div>
    )
  }
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

export default connect(function mapState(state) {
  return {
    user: state.user
  }
})(index)
