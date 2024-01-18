export default function index() {
  return (
    <div className="flex flex-col w-full h-full justify-between items-center p-1">
      <span>index</span>
    </div>
  )
}

// Index.getInitialProps = async () => {
//   console.log('------ getInitialProps ------')
//   const promise = new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         name: '------test getInitialProps------'
//       })
//     }, 1000)
//   })

//   return await promise
// }
