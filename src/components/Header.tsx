'use client'

import React, { useCallback, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { connect } from 'react-redux'
import getConfig from 'next/config'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const { publicRuntimeConfig } = getConfig()

function Header(user) {
  const [search, setSearch] = useState('')

  const handleSearchChange = useCallback((event: any) => {
    setSearch(event.target.value)
  }, [])

  const handleOnSearch = useCallback(() => { }, [])

  console.log('---------------- Header ----------------')
  console.log(user)
  const userInfo = user.user

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
          userInfo && userInfo.id ?
            (
              <DropdownMenu>
                <DropdownMenuTrigger className='relative right-40'>
                  < a href='/'>
                    <Avatar>
                      <AvatarImage src={userInfo.avatar_url} />
                      <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                  </a>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{userInfo.login}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) :
            (
              <TooltipProvider >
                <Tooltip >
                  <TooltipTrigger>
                    <a href={publicRuntimeConfig.OAUTH_URL}>
                      <User className='relative right-40' />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent className='relative right-20'>
                    <p>Please login</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
        }
      </div>
    </div >
  )
}

export default connect(function mapState(state) {
  return {
    user: state.user
  }
})(Header)