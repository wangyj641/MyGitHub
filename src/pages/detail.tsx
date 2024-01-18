export default function detail() {
    return (
        <div className="flex flex-col w-full h-full justify-between items-center p-1">
            <span>detail</span>
        </div>
    )
}

detail.getInitialProps = async () => {
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: '------test getInitialProps------'
            })
        }, 5000)
    })

    return await promise
}

