import React from 'react'
import { LoaderIcon } from "lucide-react"

export default function PageLoading() {
    return (
        <div className='fixed left-0 top-0 right-0 bottom-0 bg-white bg-opacity-30 flex items-center justify-center z-50'>
            <LoaderIcon className="animate-spin" />
        </div>
    )
}
