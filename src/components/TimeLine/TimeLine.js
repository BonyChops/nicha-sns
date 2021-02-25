import React from 'react';
import Post from './parts/Post';

class TimeLine extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="dark:text-white scrollbar-thin scrollbar-thumb-gray-500 hover:scrollbar-thumb-gray-400 overflow-y-scroll">
                <Post data={{
                    userInfo: {
                        username: "BonyChops",
                        id: "BonyChops",
                        icon: "https://pbs.twimg.com/profile_images/1347203616076042241/lOT_l9fu_400x400.jpg"
                    },
                    timestamp: "14 seconds ago",
                    contents: "トイレ行ってくるンゴ",
                    comments: "3"
                }} />
                <Post data={{
                    userInfo: {
                        username: "BonyChops",
                        id: "BonyChops",
                        icon: "https://pbs.twimg.com/profile_images/1347203616076042241/lOT_l9fu_400x400.jpg"
                    },
                    timestamp: "14 seconds ago",
                    contents: "俺のへ臭すぎ",
                    image: true
                }} />
                <Post data={{
                    userInfo: {
                        username: "BonyChops",
                        id: "BonyChops",
                        icon: "https://pbs.twimg.com/profile_images/1347203616076042241/lOT_l9fu_400x400.jpg"
                    },
                    timestamp: "14 seconds ago",
                    contents: "俺のへ臭すぎ",
                }} />
            </div>
        )
    }
}

export default TimeLine;