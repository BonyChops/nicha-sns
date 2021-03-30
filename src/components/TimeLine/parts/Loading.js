const Loading = (props) => {
    return (
        <div className="font-sans">
            <div className="font-sans">
                <div className="bg-white dark:bg-gray-900 max-w-md mx-auto my-8 border border-grey-light rounded-lg shadow-2xl overflow-hidden">
                    <div className="flex pt-4 px-4 cursor-pointer">
                        <div className="w-16 h-16 p-2 mr-2 rounded-full bg-gray-700 animate-pulse">
                        </div>
                        <div className="px-2 pt-2 flex-grow">
                            <header>
                                <a href="#" className="text-black dark:text-white no-underline">
                                    <div className="font-medium mr-2 w-32 h-4 rounded-xl bg-gray-700 animate-pulse mb-2"></div>
                                    <div className="font-medium mr-2 w-24 h-2 rounded-xl bg-gray-700 animate-pulse"></div>
                                </a>
                                <div className="text-xs text-gray-400 flex items-center my-1">
                                    <div className="font-medium mr-2 w-24 h-2 rounded-xl bg-gray-700 animate-pulse"></div>
                                </div>
                            </header>
                            <article className={"py-4 text-gray-800 dark:text-gray-300 w-80 whitespace-pre-wrap "}>
                                <div className="font-medium mr-2 w-32 h-4 rounded-xl bg-gray-700 animate-pulse mb-2"></div>
                                <div className="font-medium mr-2 w-32 h-4 rounded-xl bg-gray-700 animate-pulse mb-2"></div>
                                <div className="font-medium mr-2 w-32 h-4 rounded-xl bg-gray-700 animate-pulse mb-2"></div>

                            </article>
                            <footer className="border-t border-grey-lighter text-sm flex">
                                <div className="font-medium mr-2 w-72 h-4 rounded-xl bg-gray-700 animate-pulse my-2"></div>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading;