'use client'

import React, { useCallback, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { connect } from 'react-redux'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

function Header(user) {
  const [search, setSearch] = useState('')

  const handleSearchChange = useCallback((event: any) => {
    setSearch(event.target.value)
  }, [])

  const handleOnSearch = useCallback(() => { }, [])

  return (
    <div className='flex h-20 w-full items-center justify-between border-b border-gray-200'>
      <div className='relative flex items-center sm:flex left-4'>
        <Github color="red" />
        <Input type="search" placeholder="Find a repository..."
          value={search}
          onChange={handleSearchChange}
          className='relative left-2 w-60'
        />
        <Button type="submit"
          onClick={handleOnSearch}
          className='relative left-3'>
          Search</Button>
      </div>

      <div className='flex items-center justify-center'>
        {
          user && user.id ?
            (
              <a href='/'>
                <Avatar className='relative right-40'>
                  <AvatarImage src={user.avatar_url} />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              </a>
            ) :
            (
              <a href={publicRuntimeConfig.OAUTH_URL}>
                <Avatar className='relative right-40'>
                  <AvatarImage src="w1.jpg" />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              </a>
            )
        }
      </div>
    </div>
  )
}

export default connect(function mapState(state) {
  return {
    user: state.user
  }
})(Header)