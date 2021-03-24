import React from 'react'
import CheckIcon from '../../resources/check'
import Topics from './parts/Topics'
import NotificationIcon from '../../resources/notification';
import PostButton from './parts/PostButton';
import AddButton from '../../resources/add';
import Swal from 'sweetalert2';
import '@sweetalert2/themes/dark';

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    addApp = () => {
        Swal.fire({
            title: "開発中です！",
            text: "完成したらTwitterやGitHub，カスタムトークンの発行などができるようになります！\n\n乞うご期待！！"
        })
        return;
        this.props.accessor({
            popup: {
                title: "addApp"
            }
        })
    }

    newPost = () => {
        console.log("a")
        this.props.accessor({
            popup: { title: "newPost" }
        })
    }

    render() {
        console.log(this.props.state);
        return (
            <div className="bg-indigo-900 text-purple-lighter flex-none w-64 pb-6 hidden lg:block scrollbar-thin scrollbar-thumb-gray-500 hover:scrollbar-thumb-gray-400 overflow-y-scroll">
                <div className="text-white mb-2 mt-3 px-4 flex justify-between">
                    <div className="flex-auto overflow-x-hidden">
                        {this.props.state?.userInfo !== undefined ? (<h1 className="font-semibold text-xl leading-tight mb-1 truncate">{this.props.state.userInfo?.display_name}</h1>)
                            : (<div className="w-32 h-4 bg-gray-700 rounded-xl animate-pulse" />)}
                        <div className="flex items-center mt-2 mb-6">
                            <span className={(this.props.state?.userInfo === undefined ? "bg-gray-700 animate-pulse" : "bg-green-400") + " rounded-full block w-2 h-2 mr-2"} />
                            {this.props.state?.userInfo !== undefined ? (<span className="text-white opacity-50 text-sm truncate overflow-x-hidden">@{this.props.state?.userInfo?.display_id}</span>)
                                : (<div className="w-28 h-2 bg-gray-700 rounded-xl animate-pulse" />)}
                        </div>
                    </div>
                    <div>
                        <NotificationIcon />
                    </div>
                </div>
                <div>
                    <PostButton loading={this.props.state?.userInfo === undefined} onClick={this.newPost} />
                </div>
                <Topics loading={this.props.state?.userInfo === undefined} title="Topics" prefix="# " topics={[
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
                <Topics loading={this.props.state?.userInfo === undefined} title="Lists" prefix="" topics={[
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
                            <AddButton />
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
                        <button className="focus:outline-none" onClick={this.addApp}>
                            <AddButton />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar