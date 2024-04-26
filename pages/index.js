
export default function Home() {
    return (
        <div className="bg-white">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#0380fc_100%)] flex flex-1 items-center">
                <div className="text-center w-full h-fit px-1">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Build Customer Loyalty</h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600 drop-shadow-sm">
                        Reward your customers with the chance to win gift cards for your business!
                    </p>
                    <div className="mt-10 flex items-center gap-x-6 justify-center">
                        <a href="/User" className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
                        {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a> */}
                    </div>
                </div>               
            </div>
        </div>
    )
}
