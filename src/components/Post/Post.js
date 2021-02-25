import { useState } from 'react';

const Post = (props) => {

    let [unko, setUnko] = useState("unko");

    console.log(unko);

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
                                {props.data.contents}
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
                                    <span>200,000+</span>
                                </a>
                            </footer>
                        </div>
                    </div>
                    <div class="bg-grey-lightest p-4 pl-8 flex border-t border-grey-light">
                        <div class="w-12 mr-2 flex-no-shrink">
                            <img class="p-2 rounded rounded-full"
                                src="https://scontent-frt3-1.cdninstagram.com/t51.2885-19/s150x150/22638783_1031626323645160_6412994168498421760_n.jpg" />
                        </div>
                        <div class="p-2 flex-grow">
                            <header>
                                <a href="#" class="text-black no-underline">
                                    <span class="font-medium">Max Mustermann</span>
                                    <span class="font-normal text-grey">@max_the_great</span>
                                </a>
                                <div class="text-xs text-grey flex items-center my-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                        class="h-4 w-4 mr-1 feather feather-calendar">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    <span>A few minutes ago</span>
                                </div>
                            </header>
                            <article class="py-4 text-grey-darkest">
                                Lorem ipsum no lo se dolores ametandum come
    </article>
                            <footer class="border-t border-grey-lighter text-sm flex">
                                <a href="#" class="block no-underline text-black flex px-4 py-2 items-center hover:bg-grey-lighter">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                        class="feather feather-thumbs-up h-6 w-6 mr-1">
                                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                                    </svg>
                                    <span>Like</span>
                                </a>
                                <a href="#" class="block no-underline text-black flex px-4 py-2 items-center hover:bg-grey-lighter">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                        class="feather feather-message-circle h-6 w-6 mr-1">
                                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                    </svg>
                                    <span>Reply</span>
                                </a>
                            </footer>
                        </div>
                    </div>
                    <div class="bg-grey-lightest p-4 pl-8 flex border-t border-grey-lighter">
                        <div class="w-12 mr-2 flex-no-shrink">
                            <img class="p-2 rounded rounded-full"
                                src="https://scontent-frt3-1.cdninstagram.com/t51.2885-19/s150x150/22638783_1031626323645160_6412994168498421760_n.jpg" />
                        </div>
                        <div class="p-2 flex-grow">
                            <header>
                                <a href="#" class="text-black no-underline">
                                    <span class="font-medium">Moritz Mustermann</span>
                                    <span class="font-normal text-grey">@mo</span>
                                </a>
                                <div class="text-xs text-grey flex items-center my-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                        class="h-4 w-4 mr-1 feather feather-calendar">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    <span>Just now</span>
                                </div>
                            </header>
                            <article class="py-4 text-grey-darkest leading-normal">
                                <a class="no-underline text-blue" href="#">@max_the_great</a> Lorem ipsum no lo se dolores ametandum no come,
      astare pero canime perferme
    </article>
                            <footer class="border-t border-grey-lighter text-sm flex">
                                <a href="#" class="block no-underline text-black flex px-4 py-2 items-center hover:bg-grey-lighter">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                        class="feather feather-thumbs-up h-6 w-6 mr-1">
                                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                                    </svg>
                                    <span>Like</span>
                                </a>
                                <a href="#" class="block no-underline text-black flex mr-4 px-4 py-2 items-center hover:bg-grey-lighter">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                        class="feather feather-message-circle h-6 w-6 mr-1">
                                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                    </svg>
                                    <span>Reply</span>
                                </a>
                            </footer>
                        </div>
                    </div>
                    <div class="bg-grey-lighter p-4 pl-8">
                        <textarea class="w-full border border-blue rounded"></textarea>
                        <div class="flex justify-between items-center mt-2">
                            <button class="p-2 text-blue leading-none rounded border border-transparent hover:border-blue">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    class="feather feather-image">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                    <polyline points="21 15 16 10 5 21"></polyline>
                                </svg>
                            </button>
                            <button class="py-2 px-4 bg-white border border-blue rounded rounded-full
      hover:bg-blue hover:text-white">
                                Reply
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Post;