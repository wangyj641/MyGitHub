import dynamic from 'next/dynamic'
import withRepoBasic from '@/components/with-repo-basic'
import api from '@/lib/api'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useState, useCallback, useEffect } from 'react'
import { getLastUpdated } from '../../lib/utils'
import SearchUser from '@/components/SearchUser'
import Select, { ActionMeta, OnChangeValue, StylesConfig } from 'react-select';
import { LoaderIcon } from "lucide-react"

const isServer = typeof window === 'undefined'

const CACHE = {}

const stateOptions = [
  { value: 'all', label: 'All' },
  { value: 'open', label: 'Open' },
  { value: 'closed', label: 'Closed' }
]

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

function Label({ label }) {
  //console.log('---------------- Label ----------------')
  //console.log(label)
  return (
    <span className='text-sm p-[10px] ml-[15px]' style={{ background: `#${label.color}` }} > {label.name}</span >
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
          <div className='flex flex-row'>
            {
              issue.labels.map(label => (
                <Label key={label.id} label={label} />
              ))
            }
          </div>
          <div className='text-sm'>updated at {getLastUpdated(issue.updated_at)}</div>
        </div>
      </div >
      {showDetail ? <IssueDetail issue={issue} /> : null}
    </div>
  )
}

function makeQuery(creator, state, labels) {
  console.log('---------------- makeQuery ----------------')
  console.log(creator)
  console.log(state)
  console.log(labels)

  let creatorStr = creator ? `creator=${creator}` : ''
  let stateStr = state ? `state=${state}` : ''
  let labelsStr = labels ? `labels=${labels}` : ''

  const arr = [];
  if (creatorStr) arr.push(creatorStr);
  if (stateStr) arr.push(stateStr);
  if (labelsStr) arr.push(labelsStr);

  return `?${arr.join('&')}`
}

function issues({ initialIssues, labels, owner, name }) {
  console.log('---------------- issues ----------------')
  //console.log(labels)
  if (!isServer && labels) {
    useEffect(() => {
      console.log('---------------- cache labels ----------------')
      CACHE[`${owner}/${name}`] = labels
    }, [labels, owner, name])
  }

  const [creator, setCreator] = useState();
  const [state, setState] = useState();
  const [label, setLabel] = useState('');
  const [issues, setIssues] = useState(initialIssues);
  const [fetching, setFetching] = useState(false);

  const handleCreatorChange = useCallback(value => {
    console.log('---------------- handleCreatorChange ----------------')
    //console.log(value)
    setCreator(value)
  }, []);

  const handleStateChange = useCallback(value => {
    setState(value.value)
  }, []);

  const handleLabelChange = useCallback(value => {
    console.log('---------------- handleLabelChange ----------------')
    //console.log(value)
    let labelStr = ''
    value.forEach(item => {
      labelStr += item.value + ','
    })

    //console.log(labelStr)
    setLabel(labelStr.slice(0, -1))
    console.log(label)
  }, []);

  const handleSearch = useCallback(() => {
    console.log('---------------- handleSearch ----------------')
    const issuesUrl = `/repos/${owner}/${name}/issues`
    const query = makeQuery(creator, state, label)
    const url = `${issuesUrl}${query}`
    console.log(url)

    setFetching(true)

    api.request(
      {
        url: url
      }
    ).then(resp => {
      console.log(resp)
      setFetching(false)
      setIssues(resp.data)
    })
  }, [owner, name, creator, state, label])

  return (
    <div className='flex flex-col mb-[20px] mt-[20px] border-2 border-gray-200 rounded-md'>
      <div className='flex flex-row'>
        <SearchUser
          onChange={handleCreatorChange}
        />
        <Select
          className='w-[200px] ml-[20px]'
          placeholder="State"
          onChange={handleStateChange}
          options={stateOptions}
        />

        <Select
          className='flex-grow ml-[20px] mr-[20px]'
          placeholder="Label"
          isMulti
          onChange={handleLabelChange}
          options={
            labels.map(label => {
              return {
                value: label.name,
                label: label.name
              }
            })
          }
        />

        <Button
          type="primary"
          disabled={fetching}
          onClick={handleSearch}
          className="relative"
        >
          Search
        </Button>
      </div>

      {
        fetching ?
          (
            <div className='flex flex-col w-full h-[300px] flex-grow justify-center items-center'>
              <LoaderIcon className="animate-spin" />
            </div>
          ) :
          issues.map(issue => (
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
  const full_name = `${owner}/${name}`
  const issuesUrl = `/repos/${full_name}/issues`
  const labelsUrl = `/repos/${full_name}/labels`

  console.log(issuesUrl, labelsUrl)

  const fetchs = await Promise.all([
    await api.request(
      {
        url: issuesUrl
      },
      ctx.req,
      ctx.res
    ),

    CACHE[`${full_name}`] ?
      Promise.resolve({ data: CACHE[`${full_name}`] }) :
      await api.request(
        {
          url: labelsUrl
        },
        ctx.req,
        ctx.res
      )
  ])

  return {
    initialIssues: fetchs[0].data,
    labels: fetchs[1].data,
    owner: owner,
    name: name
  }
}

export default withRepoBasic(issues, 'issues')
