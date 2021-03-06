import { langChooseG } from '../Configuration/Configuration';
import GitDiff from './parts/GitDiff';
import CloseIcon from '../../resources/close';
import getDate from '../../functions/getDate';

const ModifiedHistory = (props) => {
    const langChoose = (property) => (langChooseG(props.state.language, property));

    const closeConfig = () => {
        props.accessor({
            popup: false
        })
    }
    return (
        <div className="fixed top-0 left-0 w-full mx-auto h-full" onClick={closeConfig}>
            <div className="fixed bg-gray-600 opacity-50 w-full h-full" />
            <div className="fixed p-20 w-full h-full">
                <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-xl shadow-md text-lg h-full lg:p-20 w-96 mx-auto overflow-auto">
                    <div className="flex w-full mb-5">
                        <h1 className="text-3xl">{langChoose({ ja: "編集履歴", en: "Edit History" })}</h1>
                        <button className="ml-auto focus:outline-none" onClick={closeConfig}>
                            <CloseIcon width="24" />
                        </button>
                    </div>
                    {props.state.currentPost !== undefined ? props.state.currentPost.history.map((data, i) => (
                        <div className="mb-2">
                            <h2 className="text-xl mb-2">v{i} <span className="text-xs">{getDate(props.state.language, data.modifiedAt)}</span></h2>
                            <div className="bg-black text-white">
                                <div><GitDiff string={data.diff} /></div>
                            </div>
                        </div>
                    )) : <p>Error: Failed to load post.</p>}
                    {/* <div className="mb-2">
                        <h2 className="text-xl mb-2">v1 <span className="text-xs">2021/03/14 22:25</span></h2>
                        <div className="bg-black text-white">
                            <div><GitDiff string="[-最初-]{+二度目+}の投稿" /></div>
                        </div>
                    </div>
                    <div className="mb-2t">
                        <h2 className="text-xl mb-2">v2 <span className="text-xs">2021/03/14 22:37</span></h2>
                        <div className="bg-black text-white">
                            <div><GitDiff string="二度目の投稿{+を編集+}" /></div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
export default ModifiedHistory;