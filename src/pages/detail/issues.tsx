import dynamic from 'next/dynamic'
import withRepoBasic from '@/components/with-repo-basic'
import api from '@/lib/api'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useState, useCallback } from 'react'
import { getLastUpdated } from '../../lib/utils'
import SearchUser from '@/components/SearchUser'
import Select, { ActionMeta, OnChangeValue, StylesConfig } from 'react-select';

const MDRender = dynamic(
  () => import('@/components/MarkdownRender'),
  { loading: () => <div>Loading...</div> }
)

function IssueDetail({ issue }) {
  console.log('---------------- IssueDetail ----------------')
  return (
    <div className='flex flex-col p-5'>
      {issue.body ? <MDRender content={issue.body} /> : <div>No body</div>}
      <div className='flex flex-row justify-end'>
        <a href={issue.html_url} target='_blank'
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Open issue discussion page
        </a>
      </div>
    </div>
  )
}

function IssueItem({ issue }) {
  //console.log(issue)
  const [showDetail, setShowDetail] = useState(false)

  const toggleShowDetail = useCallback(() => {
    console.log('---------------- toggleShowDetail ----------------')
    setShowDetail(detail => !detail)
  }, [])

  return (
    <div>
      <div className='flex flex-row relative p-3 hover:bg-slate-500 border-t-2'>
        <Button size='sm' style={{ position: 'absolute', right: 10, top: 10 }} onClick={toggleShowDetail}>
          {showDetail ? 'Hide' : 'Detail'}
        </Button>
        <Avatar className='mr-[20px]'>
          <AvatarImage src={issue.user.avatar_url} />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
        <div className='flex flex-col '>
          <div className='text-base max-w-[600px] pr-[40px]'>{issue.title}</div>
          <div className='text-sm'>updated at {getLastUpdated(issue.updated_at)}</div>
        </div>
      </div >
      {showDetail ? <IssueDetail issue={issue} /> : null}
    </div>
  )
}

const options = [
  { value: 'all', label: 'All' },
  { value: 'open', label: 'Open' },
  { value: 'closed', label: 'Closed' }
]

function issues({ issues, labels }) {
  console.log('---------------- issues ----------------')
  console.log(labels)

  const [creator, setCreator] = useState();
  const [state, setState] = useState();
  const [label, setLabel] = useState([]);

  const handleCreatorChange = useCallback(value => {
    setCreator(value)
  }, []);

  const handleStateChange = useCallback(value => {
    setState(value)
  }, []);

  const handleLabelChange = useCallback(value => {
    setLabel(value)
  }, []);

  const handleSearch = useCallback(value => {

  }, []);


  return (
    <div className='flex flex-col mb-[20px] mt-[20px] border-2 border-gray-200 rounded-md'>
      <SearchUser />
      <Select
        placeholder="State"
        onChange={handleStateChange}
        value={state}
        options={options}
      />

      <Select
        placeholder="Label"
        isMulti
        onChange={handleLabelChange}
        value={label}
        options=
        {
          labels.map(label => {
            return {
              value: label.name,
              label: label.name
            }
          })
        }
      />

      <Button
        type="submit"
        onClick={handleSearch}
        className="relative"
      >
        Search
      </Button>

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
  const issuesUrl = `/repos/${owner}/${name}/issues`
  const labelsUrl = `/repos/${owner}/${name}/labels`
  console.log(issuesUrl, labelsUrl)
  const issuesResp = await api.request(
    {
      url: issuesUrl
    },
    ctx.req,
    ctx.res
  )

  const labelsResp = await api.request(
    {
      url: labelsUrl
    },
    ctx.req,
    ctx.res
  )

  return {
    issues: issuesResp.data,
    labels: labelsResp.data
  }
}

export default withRepoBasic(issues, 'issues')
