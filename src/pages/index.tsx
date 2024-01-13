export default function Index() {
  return (
    <div className="w-full h-full justify-between items-center p-1">
      <span>content</span>
    </div>
  )
}

Index.getInitialProps = async () => {
  console.log('------ getInitialProps ------')
  return {
    name: 'wang'
  }
}
