import withRepoBasic from '@/components/with-repo-basic'

function issues({ text }) {
  return (
    <div>
      <h1>issues add {text}</h1>
    </div>
  )
}

issues.getInitialProps = async ({ ctx }) => {
  console.log('---------------- issues.getInitialProps ----------------')
  return {
    text: 123
  }
}

export default withRepoBasic(issues, 'issues')
