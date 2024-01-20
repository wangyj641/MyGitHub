import Link from 'next/link'

const getLicense = (license) => {
    return 'No license'
}

export default function Repo({ repo }) {
    return (
        <div className='flex flex-row w-[500px] justify-between'>
            <div className='flex flex-start flex-col'>
                <h3 className=''>
                    <Link legacyBehavior href={repo.html_url} passHref>
                        <a className=''>${repo.full_name}</a>
                    </Link>
                </h3>
                <p className=''>repo description ...</p>
                <p className='flex flex-row'>
                    <span className='mr-3'>{getLicense(repo.license)}</span>
                    <span className='mr-3'>{repo.updated_at}</span>
                    <span className='mr-3'>{repo.open_issues_count}</span>
                </p>
            </div>
            <div className='flex flex-col justify-start items-start'>
                <span className=''>{repo.language}</span>
                <span className=''>{repo.stargazers_count}</span>
            </div >
        </div>
    )
}