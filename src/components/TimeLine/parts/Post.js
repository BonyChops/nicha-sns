import LikeIcon from '../../../resources/like';
import DislikeIcon from '../../../resources/dislike';
import CommentIcon from '../../../resources/comment';
import CalenderIcon from '../../../resources/calender';
import ModifyIcon from '../../../resources/modify';
import HeartIcon from '../../../resources/heart';
import PostViewer from '../../PostViewer/PostViewer';
import ErrorHandler from '../../../functions/ErrorHandler';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark, vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { withRouter } from 'react-router';
import { langChooseG } from '../../Configuration/Configuration';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loading from './Loading';
import getDate from '../../../functions/getDate';
import OfficialIcon from '../../../resources/check';
import TeacherIcon from '../../../resources/teacher';


const Post = (props) => {
    const openPost = () => {
        props.history.push(`/posts/${props.data.id}`)
    }

    return (
        <div>
            <div className="font-sans">
                <div className="font-sans">
                    <div className="bg-white dark:bg-gray-900 max-w-md mx-auto my-8 border border-grey-light rounded-lg shadow-2xl overflow-hidden">
                        {(props.data?.image !== false && props.data?.image !== undefined) ? (<div className="flex flex-wrap no-underline text-black h-64 overflow-hidden">
                            <div className="w-3/4 h-full">
                                <img className="block pr-px w-full h-full" src="https://pbs.twimg.com/media/DRKabGUW0AA4yzH.jpg:large" alt=""
                                    style={{ "objectFit": "cover" }} />
                            </div>
                            <div className="w-1/4 h-full">
                                <div className="bg-grey-darkest mb-px h-32">
                                    <img className="block w-full h-full" src="https://pbs.twimg.com/media/DRKabdIX0AAN-Pa.jpg" alt=""
                                        style={{ "objectFit": "cover" }} />
                                </div>
                                <div className="bg-grey-darkest h-32">
                                    <img className="block w-full h-full" src="https://pbs.twimg.com/media/DRKacEZWkAAg0-l.jpg" alt=""
                                        style={{ "objectFit": "cover" }} />
                                </div>
                            </div>
                        </div>) : null}
                        <div className="flex pt-4 px-4 cursor-pointer" onClick={openPost}>
                            <div className="w-16 p-2 mr-2">
                                <img className="w-16 rounded-full"
                                    src={props.state.users[props.data.author].icon} />
                            </div>
                            <div className="px-2 pt-2 flex-grow">
                                <header>
                                    <a href="#" className="text-black dark:text-white no-underline">
                                        <span className="font-medium mr-2 flex">{props.state.users[props.data.author].display_name}{/* <OfficialIcon className="w-4 h-4 my-auto ml-1"/> */}<TeacherIcon className="w-4 h-4 my-auto ml-1"/></span>
                                        <span className="font-normal text-gray-400 text-xs">@{props.state.users[props.data.author].display_id}</span>
                                    </a>
                                    <div className="text-xs text-gray-400 flex items-center my-1">
                                        {!props.disableActions ? (<div className="flex mr-2">
                                            <CalenderIcon />
                                            <span>{(getDate(props.baseState.language, props.data.lastModified))}</span>
                                        </div>) : null}
                                        <div className="flex">
                                            <ModifyIcon className="h-4 w-4" /> 4
                                        </div>
                                    </div>
                                </header>
                                <article className={"pb-4 pt-2 text-gray-800 dark:text-gray-300 w-80 whitespace-pre-wrap " + (props.data.content.body.length > 12 ? "" : "text-2xl")}>
                                    <BrowserRouter>
                                        <ErrorHandler>
                                            <PostViewer className={"h-full w-full overflow-auto"} baseState={props.baseState} history={props.history}>
                                                {props.data.content.body}
                                            </PostViewer>
                                        </ErrorHandler>
                                    </BrowserRouter>
                                </article>
                                {props.disableActions !== true ? (<footer className="border-t border-grey-lighter text-sm flex">
                                    <a href="#" className="block no-underline text-blue-600 flex px-4 py-2 items-center hover:bg-grey-lighter">
                                        <LikeIcon />
                                        <span></span>
                                    </a>
                                    <a href="#" className="block no-underline text-gray-600 flex px-4 py-2 items-center hover:bg-grey-lighter">
                                        <HeartIcon className="w-6 h-6" />
                                        <span></span>
                                    </a>
                                    <a href="#" className="block no-underline text-gray-600 flex px-4 py-2 items-center hover:bg-grey-lighter">
                                        <CommentIcon />
                                        <span>{props.data.comments !== undefined ? props.data.comments : "Reply"}</span>
                                    </a>
                                    <a href="#" className="block no-underline text-gray-600 flex px-4 py-2 items-center hover:bg-grey-lighter">
                                        <ModifyIcon className="h-6 w-6" />
                                        <span>{props.data.comments !== undefined ? props.data.comments : "Reply"}</span>
                                    </a>
                                </footer>) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Post);
