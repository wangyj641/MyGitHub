import Link from 'next/link'
import { getLastUpdated } from '../lib/utils'

function getLicense(license) {
    return license ? `${license.spdx_id} license` : ''
}

export default function Repo({ repo }) {
    return (
        <div className='flex flex-row w-[800px] justify-between border-y-[1px] border-solid border-gray-200 pt-[20px]'>
            <div className='flex flex-start flex-col'>
                <h3 className='text-xl'>
                    <Link legacyBehavior href={repo.html_url} passHref>
                        <a>{repo.full_name}</a>
                    </Link>
                </h3>
                <p className='w-[400px]'>repo description ...</p>
                <p className=''>
                    <span className='mr-3'>{getLicense(repo.license)}</span>
                    <span className='mr-3'>{getLastUpdated(repo.updated_at)}</span>
                    <span className='mr-3'>{repo.open_issues_count} open issues</span>
                </p>
            </div>
            <div className='flex flex-row w-[200px] justify-between'>
                <span className='w-[160px]'>{repo.language}</span>
                <span className='w-[40px]'>{repo.stargazers_count}</span>
            </div >
        </div>
    )
}