import Link from 'next/link'
import Repo from '../../components/Repo.tsx'
import api from '../../lib/api.tsx'

function detail({ repoBasic }) {
    return (
        <div className="flex flex-col w-full h-full p-1 pt-[20px]">
            <div className="flex flex-col w-full h-full p-5 mb-[20px]">
                <Repo repo={repoBasic} />
                <div className="flex mt-[20px]">
                    <div className="flex mr-[20px]">
                        <Link href="/detail" legacyBehavior className="text-red-500">Readme</Link>
                    </div>
                    <div className="flex mr-[20px]">
                        <Link href="/detail/issues" legacyBehavior className="text-red-500">Issues</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

detail.getInitialProps = async ({ ctx }) => {
    console.log('---------------- detail.getInitialProps ----------------')
    //console.log(ctx.query)
    const { owner, name } = ctx.query
    console.log(owner, name)

    const repoBasic = await api.request(
        {
            url: `/repos/${owner}/${name}`,
        },
        ctx.req,
        ctx.res)

    console.log(repoBasic)
    return {
        repoBasic: repoBasic.data
    }
}

export default detail

