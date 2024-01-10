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
    <div className='flex h-20 w-full items-center justify-between border-b border-gray-200'>
      <div className='relative flex items-center sm:flex left-4'>
        <Github color="red" />
        <Input type="search" placeholder="Repo"
          value={search}
          onChange={handleSearchChange}
          className='relative left-2 w-60'
        />
        <Button type="submit" >Search</Button>
      </div>
      <Avatar className='relative right-40'>
        <AvatarImage src="w1.jpg" />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
    </div>
  )
}