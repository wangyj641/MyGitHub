import dynamic from 'next/dynamic'
import withRepoBasic from '@/components/with-repo-basic'
import api from '@/lib/api'

const MDRender = dynamic(
  () => import('@/components/MarkdownRender'),
  { loading: () => <div>Loading...</div> }
)

function detail({ readme }) {
  return <MDRender content={readme.content} isBase64={true} />
}

detail.getInitialProps = async ({ ctx }) => {
  console.log('---------------- detail.getInitialProps ----------------')
  //console.log(ctx)
  const { owner, name } = ctx.query
  const url = `/repos/${owner}/${name}/readme`
  console.log(url)
  const readmeResp = await api.request(
    {
      url: url
    },
    ctx.req,
    ctx.res
  )

  return {
    readme: readmeResp.data
  }
}

export default withRepoBasic(detail, 'index')
