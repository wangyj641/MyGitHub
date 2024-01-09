import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MaxWidthWrapper from './MaxWidthWrapper'

export default function Footer() {
    return (
        <div className='flex h-24 w-full border-t border-gray-200'>
            <MaxWidthWrapper>
                <div className='flex h-24 items-center justify-center'>
                    Developed by Yongjun Wang @
                    <a href='mailto: wangyj641@gmail.com'>wangyj641@gmail.com</a>
                </div>
            </MaxWidthWrapper>
        </div>
    )
}