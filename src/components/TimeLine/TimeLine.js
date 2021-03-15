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
                    id: "1234",
                    timestamp: "14 seconds ago",
                    contents: "こういう感じの長文投稿でもどういう感じに表示になるのかを考案するのが大事だと思うんですねェ．チキンチキンかつえ？",
                    comments: "3"
                }} state={this.props.state} />
                <Post data={{
                    userInfo: {
                        username: "BonyChops",
                        id: "BonyChops",
                        icon: "https://pbs.twimg.com/profile_images/1347203616076042241/lOT_l9fu_400x400.jpg"
                    },
                    id: "1234",
                    timestamp: "14 seconds ago",
                    contents: `
学校課題で\`Hello world\`表示させなきゃいけないんだけど原因わからん．
なんでや...
\`\`\`c
#include "stdio.h"

int main(){
    print("Hello world!");
    return 0;
}
\`\`\``,
                    image: true
                }} state={this.props.state} />
                <Post data={{
                    userInfo: {
                        username: "BonyChops",
                        id: "BonyChops",
                        icon: "https://pbs.twimg.com/profile_images/1347203616076042241/lOT_l9fu_400x400.jpg"
                    },
                    timestamp: "14 seconds ago",
                    contents: "俺のへ臭すぎ",
                }} state={this.props.state} />
            </div>
        )
    }
}

export default TimeLine;