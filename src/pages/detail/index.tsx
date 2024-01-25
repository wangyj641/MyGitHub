import withRepoBasic from '@/components/with-repo-basic'

function detail({ text }) {
  return (
    <div>
      <h1>Detail add {text}</h1>
    </div>
  )
}

detail.getInitialProps = async ({ ctx }) => {
  console.log('---------------- detail.getInitialProps ----------------')
  return {
    text: 123
  }
}

export default withRepoBasic(detail)
