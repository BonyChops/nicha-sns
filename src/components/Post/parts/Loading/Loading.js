

const Loading = () => {
    return (
        <div className="bg-white dark:bg-gray-900 max-w-md mx-auto border border-grey-light rounded-b-lg shadow-2xl overflow-hidden">
            <div className="flex pt-4 px-4">
                <div className="w-16 mr-2">
                    <div className="w-16 h-16 rounded-full bg-gray-700 animate-pulse" />
                </div>
                <div className="px-2 pt-2 flex-grow">
                    <header>
                        <div className="text-black dark:text-white no-underline w-32 h-5 rounded-md bg-gray-700 animate-pulse mb-2" />
                        <div className="text-black dark:text-white no-underline w-32 h-5 rounded-md bg-gray-700 animate-pulse" />
                    </header>
                    <article className="py-4 text-gray-800 dark:text-gray-300">
                        <div className="text-black dark:text-white no-underline w-80 h-5 rounded-md bg-gray-700 animate-pulse mb-2" />
                        <div className="text-black dark:text-white no-underline w-80 h-5 rounded-md bg-gray-700 animate-pulse mb-2" />
                        <div className="text-black dark:text-white no-underline w-80 h-5 rounded-md bg-gray-700 animate-pulse mb-2" />
                    </article>
                    <footer className="border-t border-grey-lighter text-sm dark:text-gray-500 text-gray-600 my-2">
                        <div className="text-black dark:text-white no-underline w-20 h-7 rounded-md bg-gray-700 animate-pulse my-2" />
                        <div className="text-black dark:text-white no-underline w-20 h-7 rounded-md bg-gray-700 animate-pulse my-2" />
                    </footer>
                </div>
            </div>
        </div>
    )
}
export default Loading;