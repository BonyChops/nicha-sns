import LikeIcon from '../../resources/like';
import HeartIcon from '../../resources/heart';
import HeartFilledIcon from '../../resources/heartFilled';
import DislikeIcon from '../../resources/dislike';
import CommentIcon from '../../resources/comment';
import CalenderIcon from '../../resources/calender';
import gfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark, vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import CommitIcon from '../../resources/modify';
import { langChooseG } from '../Configuration/Configuration';
import { useState, useEffect } from 'react';
import { getPost } from '../../functions/post';
import { useParams } from 'react-router';
import Loading from './parts/Loading/Loading';
import Error from './parts/Error/Error';
import moment from 'moment';

const Post = (props) => {
    const { id } = useParams();
    const [postData, setPost] = useState(false);
    const [fetchingFlag, setFlag] = useState(false);
    useEffect(() => {
        if (fetchingFlag === false && props.state.authData !== undefined) {
            console.log("Start fetching...");
            getPost(props.state.authData.refreshToken, id).then(value => { setPost(value) });
            setFlag(true);
        } else {
            console.log(props.state.authData);
        }
    })

    const renderers = {
        code: ({ language, value }) => {
            return <SyntaxHighlighter style={props.state.dark ? vscDarkPlus : vs} language={language} children={value} />
        }
    }
    const openModified = () => {
        props.accessor({
            popup: {
                title: "modifiedHistory"
            }
        })
    }
    return (
        <div className="font-sans">
            <div className="font-sans">
                {postData === false || postData === undefined ? (
                    <Loading />
                ) : ((postData.status == "error") ? (
                    <Error errorData={JSON.stringify(postData, null, 2)} state={props.state}/>
                ) : (
                    <div className="bg-white dark:bg-gray-900 max-w-md mx-auto border border-grey-light rounded-b-lg shadow-2xl overflow-hidden">
                        {(postData.image !== false && postData.image !== undefined) ? (<div className="flex flex-wrap no-underline text-black h-64 overflow-hidden">
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
                                <img className="w-16 rounded-full border-green-600 border-2"
                                    src={props.data.userInfo.icon} />
                            </div>
                            <div className="px-2 pt-2 flex-grow">
                                <header>
                                    <a href="#" className="text-black dark:text-white no-underline">
                                        <span className="font-medium mr-2">{props.data.userInfo.username}</span>
                                        <span className="font-normal text-gray-400 text">@{props.data.userInfo.id}</span>
                                    </a>
                                    <div className="text-xs text-gray-400 flex items-center my-1">
                                        <CalenderIcon />
                                        <span>{moment(props.lastModified).format("YYYY/MM/DD hh:mm")}</span>
                                    </div>
                                </header>
                                <article className="py-4 text-gray-800 dark:text-gray-300 w-80">
                                    <ReactMarkdown plugins={[gfm]} renderers={renderers}>
                                        {postData.content.body}
                                    </ReactMarkdown>
                                </article>
                                <footer className="border-t border-grey-lighter text-sm dark:text-gray-500 text-gray-600 my-2">
                                    <a href="#" className="block no-underline text-blue-600 flex px-4 py-2 items-center hover:bg-grey-lighter">
                                        <LikeIcon />
                                        <span>1</span>
                                    </a>
                                    <a href="#" className="block no-underline flex px-4 py-2 items-center hover:bg-grey-lighter text-pink-700">
                                        {/* <HeartIcon className="w-6 h-6"/> */} <HeartFilledIcon className="w-6 h-6 mr-2" />
                                        <span>34</span>
                                    </a>
                                    {/*  <a href="#" className="block no-underline flex px-4 py-2 items-center hover:bg-grey-lighter">
                                    <CommentIcon />
                                    <span>{props.data.comments !== undefined ? props.data.comments : "Reply"}</span>
                                </a> */}
                                    <a className="cursor-pointer block no-underline flex px-4 py-2 items-center hover:bg-grey-lighter" onClick={openModified}>
                                        <CommitIcon className="h-6 w-6" />
                                        <span>{langChooseG(props.state.language, { ja: "3 件の編集履歴", en: "3 Edited history" })}</span>
                                    </a>
                                </footer>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Post;
