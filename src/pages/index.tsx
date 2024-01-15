import React, { useCallback, useState } from 'react'
import { Button } from "@/components/ui/button"
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const handleLogin = () => {
  console.log('------ handleLogin ------')
}

export default function Index({ name }) {
  return (
    <div className="w-full h-full justify-between items-center p-1">
      <span>content </span>
      <a href={publicRuntimeConfig.GITHUB_OAUTH_URL}>
        <Button type="submit"
          onClick={handleLogin}
          className='relative left-3'>
          Login</Button>
      </a>

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
