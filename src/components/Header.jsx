import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Header() {
  return (
    <div className='flex h-20 justify-between'>
        <div className="flex items-center">
            <Input type="github" placeholder="Repo" />
            <Button type="submit">Search</Button>
        </div>
        <div className="flex items-center">
            <Button type="submit">Login</Button>
        </div>
    </div>
  )
}
