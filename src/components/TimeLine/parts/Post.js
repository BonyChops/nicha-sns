import LikeIcon from '../../../resources/like';
import DislikeIcon from '../../../resources/dislike';
import CommentIcon from '../../../resources/comment';
import CalenderIcon from '../../../resources/calender';
import gfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'

const renderers = {
    code: ({ language, value }) => {
        return <SyntaxHighlighter style={dark} language={language} children={value} />
    }
}

const Post = (props) => {
    return (
        <div className="font-sans">
            <div className="font-sans">
                <div className="bg-white dark:bg-gray-900 max-w-md mx-auto my-8 border border-grey-light rounded-lg shadow-2xl overflow-hidden">
                    {(props.data.image !== false && props.data.image !== undefined) ? (<div className="flex flex-wrap no-underline text-black h-64 overflow-hidden">
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
                    <div className="flex pt-4 px-4">
                        <div className="w-16 mr-2">
                            <img className="p-2 rounded-full"
                                src={props.data.userInfo.icon} />
                        </div>
                        <div className="px-2 pt-2 flex-grow">
                            <header>
                                <a href="#" className="text-black dark:text-white no-underline">
                                    <span className="font-medium">{props.data.userInfo.username}</span>
                                    <span className="font-normal text-gray-400">@{props.data.userInfo.id}</span>
                                </a>
                                <div className="text-xs text-gray-400 flex items-center my-1">
                                    <CalenderIcon />
                                    <span>{props.data.timestamp}</span>
                                </div>
                            </header>
                            <article className="py-4 text-gray-800 dark:text-gray-300">
                                <ReactMarkdown plugins={[gfm]} renderers={renderers}>
                                    {props.data.contents}
                                </ReactMarkdown>
                            </article>
                            <footer className="border-t border-grey-lighter text-sm flex">
                                <a href="#" className="block no-underline text-blue-600 flex px-4 py-2 items-center hover:bg-grey-lighter">
                                    <LikeIcon />
                                    <span></span>
                                </a>
                                <a href="#" className="block no-underline text-gray-600 flex px-4 py-2 items-center hover:bg-grey-lighter">
                                    <DislikeIcon />
                                    <span></span>
                                </a>
                                <a href="#" className="block no-underline text-gray-600 flex px-4 py-2 items-center hover:bg-grey-lighter">
                                    <CommentIcon />
                                    <span>{props.data.comments !== undefined ? props.data.comments : "Reply"}</span>
                                </a>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
