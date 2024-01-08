import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MaxWidthWrapper from './MaxWidthWrapper'

const Header = () => {
  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b'>
          <div className='flex items-center space-x-4 sm:flex'>
            <Input type="email" placeholder="Repo" />
            <Button type="submit" >Search</Button>
          </div>
          <Button type="submit" >Login</Button>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Header
