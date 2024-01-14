import { resolve } from "path"
import { promiseHooks } from "v8"

export default function Index({ name }) {
  return (
    <div className="w-full h-full justify-between items-center p-1">
      <span>content </span>
      <span>{name}</span>
    </div>
  )
}

Index.getInitialProps = async () => {
  console.log('------ getInitialProps ------')

  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: '------test getInitialProps------'
      })
    }, 1000)
  })

  return await promise
}
