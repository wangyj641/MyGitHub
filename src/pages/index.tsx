import React, { useCallback, useState, useEffect } from 'react'
//import { Button } from "@/components/ui/button"
import getConfig from 'next/config'
import axios from 'axios'

const { publicRuntimeConfig } = getConfig()

const handleLogin = () => {
  console.log('------ handleLogin ------')
}

export default function Index() {
  useEffect(() => {
    console.log('------ get user info ------')
    axios.get('/api/user/info').then(res => {
      console.log(res.data)
    })
  }, [])

  return (
    <div className="flex flex-col w-full h-full justify-between items-center p-1">
      <span>Not login in </span>
      <a href={publicRuntimeConfig.OAUTH_URL}>Login</a>
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
