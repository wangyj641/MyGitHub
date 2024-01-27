import dynamic from 'next/dynamic'
import withRepoBasic from '@/components/with-repo-basic'
import api from '@/lib/api'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function IssueItem({ issue }) {
  console.log(issue)
  return (
    <div className='flex flex-col'>
      <Avatar>
        <AvatarImage src={issue.user.avatar_url} />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
      <div className='text-base'>{issue.title}</div>
      <div className='text-sm'>updated at {issue.updated_at}</div>
    </div>
  )
}

function issues({ issues }) {
  console.log('---------------- issues ----------------')
  console.log(issues)
  return (
    <div className='flex flex-col'>
      {issues.map(issue => (
        <IssueItem issue={issue} key={issue.id} />
      ))
      }
    </div >
  )
}

issues.getInitialProps = async ({ ctx }) => {
  console.log('---------------- issues.getInitialProps ----------------')
  //console.log(ctx)
  const { owner, name } = ctx.query
  const url = `/repos/${owner}/${name}/issues`
  console.log(url)
  const issuesResp = await api.request(
    {
      url: url
    },
    ctx.req,
    ctx.res
  )

  return {
    issues: issuesResp.data
  }
}

export default withRepoBasic(issues, 'issues')
