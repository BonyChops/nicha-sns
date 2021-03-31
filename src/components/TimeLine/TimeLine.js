import React from 'react';
import { withRouter } from 'react-router';
import Post from './parts/Post';
import { getCacheList } from '../../functions/lists';
import firebase, { getIdToken } from '../../Firebase';
import Loading from './parts/Loading';
import moment from 'moment';

class TimeLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listId: (this.props.location.pathname === "/") ? this.props.state.userInfo.follow.match(/^lists\/(.*)$/)[1] : this.props.match.params.id
        }
    }

    componentDidMount = () => {
        if (true || this.props.state?.lists?.[this.state.listId] === undefined) {
            console.log("aaa");
            getIdToken().then(token => getCacheList(
                token,
                this.props.state.userInfo.id,
                this.state.listId,
                true,
                false,
                true,
                this.props.accessor
            ));
        }
    }

    NichaDummyPost = (props) => (
        < Post data={{
            content: { body: props.body },
            author: "nicha",
            lastModified: moment().format()
        }} state={this.props.state} baseState={this.props.baseState} disableActions={true} {...props} />
    )

    render() {
        console.log(this.props.state)
        /* if (this.props.state.posts === undefined || this.props.state.lists === undefined) {
            console.log("bye");
            return null;
        } */
        return (
            <div className="dark:text-white scrollbar-thin scrollbar-thumb-gray-500 hover:scrollbar-thumb-gray-400 overflow-y-scroll">
                {this.props.state.lists === undefined || this.props.state?.lists[this.state.listId] === undefined ? (
                    <div>
                        {Array.from({ length: 3 }, (v, k) => (
                            <Loading />
                        ))}
                    </div>
                ) : this.props.state.lists[this.state.listId].length === 0 ? (
                    <div>
                        <this.NichaDummyPost body={"**まだ投稿がありません！**\nなにか投稿してみましょう！"} />
                        <this.NichaDummyPost body={"タイムラインはこのように投稿が一列になって表示されます．他のSNSとおんなじですね"} />
                       {(this.props.location.pathname === "/") ? ( <this.NichaDummyPost body={"まだフォローした人がいないのであれば，興味がある人をフォローしてみましょう！もしかしたら仲良くなれるかも？\n[おすすめのユーザーを探す！](https://google.com)"} />) : null}
                        <this.NichaDummyPost body={"**Tips:**\nNichaでは**マークダウン**が使えます．上手く使いこなして，投稿を彩ってみましょう！\n\n**強調**:\n```\n**強調**\n```\n\n*斜体*:\n```\n*斜体*\n```\n\n~取り消し~:\n```\n~取り消し~\n```\n\nソースコード:\n```text\n/`\\`\\`\nconsole.log(\"Hello World!\");\n\\`\\`\\`\n```\n↓\n```javascript\nconsole.log(\"Hello World!\")\n```\n通常は自動で言語が判別されてシンタックスカラーリングされますが，自分で言語を指定することもできます．\n```text\n\``\`hsp\nmes \"Hello World!\"\n`\`\`\n```\n↓\n```hsp\nmes \"Hello World!\"\n```\n"} />
                    </div>
                ) :
                    this.props.state.lists[this.state.listId].map((postId, k) => (
                        <Post key={k} data={this.props.state.posts[postId]} state={this.props.state} baseState={this.props.baseState} />
                    ))}
            </div>
        )
    }
}

export default withRouter(TimeLine);