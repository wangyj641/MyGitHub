import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MaxWidthWrapper from './MaxWidthWrapper'

export default function Footer() {
    return (
        <div className='h-24 w-full border-t border-gray-200 items-center justify-center'>
            <MaxWidthWrapper>
                <div className='flex h-24 w-full items-center justify-between text-center'>
                    Developed by Yongjun Wang@wangyj641@gmail.com
                </div>
            </MaxWidthWrapper>
        </div>
    )
}