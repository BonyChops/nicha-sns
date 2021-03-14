import { langChooseG } from '../Configuration/Configuration';
import GitDiff from './parts/GitDiff';
import CloseIcon from '../../resources/close';

const ModifiedHistory = (props) => {
    const langChoose = (property) => (langChooseG(props.state.language, property));

    const closeConfig = () => {
        props.accessor({
            popup: false
        })
    }
    return (
        <div className="fixed top-0 left-0 w-full mx-auto h-full" onClick={closeConfig}>
            <div className="fixed bg-gray-600 opacity-50 w-full h-full"/>
            <div className="fixed p-20 w-full h-full">
                <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-xl shadow-md text-lg h-full md:p-20 w-96 mx-auto overflow-auto">
                    <div className="flex w-full mb-5">
                        <h1 className="text-3xl">{langChoose({ ja: "編集履歴", en: "Edit History" })}</h1>
                        <button className="ml-auto focus:outline-none" onClick={closeConfig}>
                            <CloseIcon width="24" />
                        </button>
                    </div>
                    <div className="mb-2">
                        <h2 className="text-xl mb-2">v1 <span className="text-xs">2021/03/14 22:25</span></h2>
                        <div className="bg-black">
                            <div><GitDiff string="[-うん-]{+えっ+}ち" /></div>
                        </div>
                    </div>
                    <div className="mb-2">
                        <h2 className="text-xl mb-2">v2 <span className="text-xs">2021/03/14 22:37</span></h2>
                        <div className="bg-black">
                            <div><GitDiff string="[-えっち-]{+Slackって言ったやつはころすね+}" /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModifiedHistory;