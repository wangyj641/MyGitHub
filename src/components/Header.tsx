'use client'

import React, { useCallback, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MaxWidthWrapper from './MaxWidthWrapper'
import { Github } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function Header() {
  const [search, setSearch] = useState('')

  const handleSearchChange = useCallback((event: any) => {
    setSearch(event.target.value)
  }, [])

  const handleOnSearch = useCallback(() => { }, [])

  return (
    <nav className='h-20 w-full border-b border-gray-200'>
      <MaxWidthWrapper>
        <div className='flex h-20 items-center justify-between'>
          <div className='flex items-center space-x-4 sm:flex'>
            <Github color="red" size={44} />
            <Input type="search" placeholder="Repo"
              value={search}
              onChange={handleSearchChange}
            />
            <Button type="submit" >Search</Button>
          </div>
          <Avatar>
            <AvatarImage src="w1.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

        </div>
      </MaxWidthWrapper>
    </nav>
  )
}