import LikeIcon from '../../resources/like';
import HeartIcon from '../../resources/heart';
import HeartFilledIcon from '../../resources/heartFilled';
import DislikeIcon from '../../resources/dislike';
import CommentIcon from '../../resources/comment';
import CalenderIcon from '../../resources/calender';
import CommitIcon from '../../resources/modify';
import { langChooseG } from '../Configuration/Configuration';
import { useState, useEffect } from 'react';
import { getPost, getCachePost } from '../../functions/post';
import { useParams } from 'react-router';
import Loading from './parts/Loading/Loading';
import Error from './parts/Error/Error';
import getDate from '../../functions/getDate';
import firebase, { getIdToken } from '../../Firebase';
import PostViewer from '../PostViewer/PostViewer';
import ErrorHandler from '../../functions/ErrorHandler';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MenuIcon from '../../resources/menu-down';
import Swal from 'sweetalert2/src/sweetalert2.js'
import '@sweetalert2/themes/dark';

const Post = (props) => {
    console.log(props)
    const { id } = useParams();
    const [postData, setPost] = useState(props.state.posts[id]);
    const [fetchingFlag, setFlag] = useState(false);
    useEffect(() => {
        if (fetchingFlag === false && props.state !== undefined && postData === false) {
            console.log("Start fetching...");
            console.log(props.state)
            getIdToken().then(token => {
                getCachePost(token, props.state.userInfo.id, id).then(value => { setPost(value) }).catch(e => { setPost(e) });
            })
            setFlag(true);
        } else {
            // console.log(props.state.authData);
        }
    })
    const openModified = () => {
        props.accessor({
            popup: {
                title: "modifiedHistory"
            }
        })
    }
    const openMenu = () => {
        Swal.fire("test")
    }
    return (
        <div className="font-sans">
            <div className="font-sans">
                {postData === false || postData === undefined ? (
                    <Loading key={id} />
                ) : ((postData.status == "error") ? (
                    <Error key={id} errorData={postData} baseState={props.baseState} />
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
                                    src={props.state.users[postData.author].icon} />
                            </div>
                            <div className="px-2 pt-2 flex-grow">
                                <header className="flex">
                                    <div>
                                        <a href="#" className="text-black dark:text-white no-underline">
                                            <span className="font-medium mr-2">{props.state.users[postData.author].display_name}</span>
                                            <span className="font-normal text-gray-400 text">@{props.state.users[postData.author].display_id}</span>
                                        </a>
                                        <div className="text-xs text-gray-400 flex items-center my-1">
                                            <CalenderIcon />
                                            <span>{getDate(props.baseState.language, postData.lastModified)}</span>
                                        </div>
                                    </div>

                                    <MenuIcon className="ml-auto text-gray-400 w-6 h-6" onClick={test}/>

                                </header>
                                <article className="py-4 text-gray-800 dark:text-gray-300 w-80 whitespace-pre-wrap">
                                    <BrowserRouter>
                                        <ErrorHandler>
                                            <PostViewer className={"h-full w-full overflow-auto"} baseState={props.baseState} history={props.history}>
                                                {postData.content.body}
                                            </PostViewer>
                                        </ErrorHandler>
                                    </BrowserRouter>
                                </article>
                                <footer className="border-t border-grey-lighter text-sm dark:text-gray-500 text-gray-600 my-2">
                                    <a href="#" className="flex no-underline text-blue-600 px-4 py-2 items-center hover:bg-grey-lighter">
                                        <LikeIcon />
                                        <span>1</span>
                                    </a>
                                    <a href="#" className="flex no-underline px-4 py-2 items-center hover:bg-grey-lighter text-pink-700">
                                        {/* <HeartIcon className="w-6 h-6"/> */} <HeartFilledIcon className="w-6 h-6 mr-2" />
                                        <span>34</span>
                                    </a>
                                    {/*  <a href="#" className="block no-underline px-4 py-2 items-center hover:bg-grey-lighter">
                                    <CommentIcon />
                                    <span>{props.data.comments !== undefined ? props.data.comments : "Reply"}</span>
                                </a> */}
                                    {postData.modifiedTimes > 0 ? (<a className="cursor-pointer block no-underline px-4 py-2 items-center hover:bg-grey-lighter" onClick={openModified}>
                                        <CommitIcon className="h-6 w-6" />
                                        <span>{postData.modifiedTimes + langChooseG(props.baseState.language, { ja: " 件の編集履歴", en: " Edited history" })}</span>
                                    </a>) : null}
                                </footer>
                            </div>
                        </div>
                    </div>
                ))}
            </div><br /><br />
        </div>
    );
};

export default Post;
