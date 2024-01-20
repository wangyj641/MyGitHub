import Link from 'next/link'
import { getLastUpdated } from '../lib/utils'
import { Star } from 'lucide-react'

function getLicense(license) {
    return license ? `${license.spdx_id} license` : ''
}

export default function Repo({ repo }) {
    return (
        <div className='flex flex-row justify-between border-y-[1px] border-solid border-gray-200 pt-[20px]'>
            <div className='flex flex-col mr-[40px]'>
                <h3 className='text-xl'>
                    <Link legacyBehavior href={`/detail?owner=${repo.owner.login}&name=${repo.name}`} passHref>
                        <a>{repo.full_name}</a>
                    </Link>
                </h3>
                <p className='w-[400px]'>{repo.description}</p>
                <p className=''>
                    {repo.license ? (<span className='mr-3'>{getLicense(repo.license)}</span>) : null}
                    <span className='mr-3'>{getLastUpdated(repo.updated_at)}</span>
                    <span className='mr-3'>{repo.open_issues_count} open issues</span>
                </p>
            </div>
            <div className='flex flex-row'>
                <span className='w-[170px]'>{repo.language}</span>
                <span className=''>{repo.stargazers_count}</span>
                <Star size={16} className='mt-1' />
            </div >
        </div >
    )
}