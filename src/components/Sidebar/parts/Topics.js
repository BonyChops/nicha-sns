import React from 'react'
import { Link } from 'react-router-dom';
import CheckIcon from '../../../resources/check'
import HomeIcon from '../../../resources/home';

const Topics = (props) => {

    return (
        <div className="my-4">

            {props.hideTitle ? null : (<div className="px-4 mb-2 text-white flex justify-between items-center">
                {props.loading ? (<div className="rounded-xl bg-gray-700 h-4 w-28 animate-pulse"/>) : (<div className="opacity-75">{props.title}</div>)}
                <div>
                    {props.loading ? (<div className=""/>) :(<svg className="fill-current h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                    </svg>)}
                </div>
            </div>)}
            {props.loading ? (
                Array.from({ length: 5 }, (v, k) => (
                    <div key={k} className={"focus:outline-none w-full py-1 px-4 text-white flex"}>
                       <div className="rounded-xl bg-gray-700 h-4 w-28 animate-pulse"/>
                    </div>
                ))
            ) : (
                    props.topics.map((topic, key) => (
                        <Link to={topic.to} key={key} className={(topic.selected ? "bg-green-700" : "focus:bg-gray-700 hover:bg-gray-700") + " focus:outline-none w-full py-1 px-4 text-white flex"}>
                            <span className="flex">{topic.home ? <HomeIcon className="w-6 mr-2"/> : props.prefix} {topic.title}</span>
                            {(topic.isOfficial ? <span className="w-4 ml-1 mb-auto mt-auto">
                                <CheckIcon />
                            </span> : null)}
                        </Link>
                    ))
                )}
        </div>
    )
}

export default Topics