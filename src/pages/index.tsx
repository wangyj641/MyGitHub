import { useEffect } from "react"

const api = require("../lib/api")

export default function index() {
  useEffect(() => {
    //axios.post('/github/test', { 'key', 'test123' })
  })

  return (
    <div className="flex flex-col w-full h-full justify-between items-center p-1">
      <span>index</span>
    </div>
  )
}

index.getInitialProps = async ({ ctx }) => {
  const result = await api.request(
    {
      url: '/search/repositories?q=react'
    },
    ctx.req,
    ctx.res)

  return {
    data: result.data
  }
}
