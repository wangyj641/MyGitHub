import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MaxWidthWrapper from './MaxWidthWrapper'

const Header = () => {
  return (
    <nav className='h-24 w-full border-b border-gray-200'>
      <MaxWidthWrapper>
        <div className='flex h-24 items-center justify-between border-b'>
          <div className='flex items-center space-x-4 sm:flex'>
            <Input type="search" placeholder="Repo" />
            <Button type="submit" >Search</Button>
          </div>
          <Button type="submit" >Login</Button>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Header
