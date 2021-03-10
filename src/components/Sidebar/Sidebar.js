import React from 'react'
import CheckIcon from '../../resources/check'
import Topics from './parts/Topics'
import NotificationIcon from '../../resources/notification';
import PostButton from './parts/PostButton';

class Sidebar extends React.Component {

    render() {
        return (
            <div className="bg-indigo-900 text-purple-lighter flex-none w-64 pb-6 hidden md:block scrollbar-thin scrollbar-thumb-gray-500 hover:scrollbar-thumb-gray-400 overflow-y-scroll">
                <div className="text-white mb-2 mt-3 px-4 flex justify-between">
                    <div className="flex-auto">
                        <h1 className="font-semibold text-xl leading-tight mb-1 truncate">うんこ</h1>
                        <div className="flex items-center mb-6">
                            <span className="bg-green-400 rounded-full block w-2 h-2 mr-2"></span>
                            <span className="text-white opacity-50 text-sm">@ブリブリ学籍番号</span>
                        </div>
                    </div>
                    <div>
                        <NotificationIcon />
                    </div>
                </div>
                <div>
                    <PostButton />
                </div>
                <Topics title="Topics" prefix="# " topics={[
                    {
                        title: "エヴァネタバレ"
                    },
                    {
                        title: "エバー"
                    },
                    {
                        title: "ApexSwitch勢",
                        isOfficial: true
                    },
                    {
                        title: "NNCT",
                        isOfficial: true,
                        author: "Nicha"
                    },
                    {
                        title: "programming",
                        isOfficial: true,
                        selected: true
                    },
                    {
                        title: "WACCA"
                    }
                ]} />
                <Topics title="Lists" prefix="" topics={[
                    {
                        title: "NNCT",
                        isOfficial: true,
                        author: "Nicha"
                    },
                    {
                        title: "Student",
                        isOfficial: true,
                        author: "Nicha"
                    },
                    {
                        title: "Teacher",
                        isOfficial: true,
                        author: "Nicha"
                    },
                    {
                        title: "18J",
                        isOfficial: true
                    },
                    {
                        title: "クイズ同好会"
                    }
                ]} />
                <div className="mb-8">
                    <div className="px-4 mb-2 text-white flex justify-between items-center">
                        <div className="opacity-75">Direct Messages</div>
                        <div>
                            <svg className="fill-current h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex items-center mb-3 px-4">
                        <span className="bg-green-500 rounded-full block w-2 h-2 mr-2"></span>
                        <span className="text-white opacity-75">Bony_Chops <span className="text-grey text-sm">(お前)</span></span>
                    </div>
                    <div className="flex items-center mb-3 px-4">
                        <span className="bg-green-500 rounded-full block w-2 h-2 mr-2"></span>
                        <span className="text-white opacity-75">うしたぷにきあくん（笑）</span>
                    </div>
                    <div className="flex items-center px-4 mb-6 opacity-50">
                        <span className="border border-white rounded-full w-2 h-2 mr-2"></span>
                        <span className="text-white">ダメだね<span className="rounded-lg bg-blue-400 text-sm ml-2 px-1 py-0.5">BOT</span> </span>
                    </div>
                </div>
                <div>
                    <div className="px-4 mb-2 text-white flex justify-between items-center">
                        <div className="opacity-75">Apps</div>
                        <div>
                            <svg className="fill-current h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar