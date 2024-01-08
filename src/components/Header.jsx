import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

const Header = () => {
  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>

          <Link href='/' className='flex z-40 font-semibold'>
            <span>AAAAAAAjjA</span>
          </Link>

          <div className='flex items-center space-x-4 sm:flex'>
            <Input type="email" placeholder="Repo" className={buttonVariants({
              variant: 'ghost',
              size: 'sm',
            })} />
            <Button type="submit" className={buttonVariants({
              variant: 'ghost',
              size: 'sm',
            })}>Search</Button>
            <Button type="submit" className={buttonVariants({
              variant: 'ghost',
              size: 'sm',
            })}>xxx</Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Header
