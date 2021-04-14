import React from 'react';
import {withRouter} from 'react-router';
import Post from './parts/Post';
import {getCacheList} from '../../functions/lists';
import firebase, {getIdToken} from '../../Firebase';
import Loading from './parts/Loading';
import moment from 'moment';
import Error from './parts/Error';
import Icon from '../../resources/logo.png';
import Swal from 'sweetalert2/src/sweetalert2.js'
import '@sweetalert2/themes/dark';
import {BrowserRouter} from 'react-router-dom';
import ErrorHandler from '../../functions/ErrorHandler';
import PostViewer from '../PostViewer/PostViewer';
import {getCacheUsers} from "../../functions/users";

class TimeLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listId: (this.props.location.pathname === "/") ? this.props.state.userInfo.follow.match(/^lists\/(.*)$/)[1] : this.props.match.params.id,
            mode: "posts"
        }
    }

    componentDidMount = () => {
        if (true || this.props.state?.lists?.[this.state.listId] === undefined) {
            // TODO Consider Update Condition
            console.log("aaa");
            if (this.props.userView) {
                getIdToken().then(token => getCacheUsers(this.props.accessor, token, this.props.match.params.id, this.props.state.userInfo?.id, true))
            } else {
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
    }

    NichaDummyPost = (props) => (
        <Post data={{
            content: {body: props.body},
            author: "nicha",
            lastModified: moment().format()
        }} state={this.props.state} baseState={this.props.baseState} disableActions={true} {...props} />
    )

    switchMode = (name) => {
        if (name === "userDetails") {
            if (!this.state.warnedPrivacy) {
                Swal.fire({
                    icon: "warning",
                    title: "注意！",
                    html: "詳細タブには個人情報が含まれていることがあります．表示する際にはスクリーンショットや配信等による意図しない拡散に注意してください．<br /><br />安全のため，一定時間が経つと自動的にページが戻ります．",
                    showCancelButton: true,
                    cancelButtonText: "キャンセル"
                }).then(result => {
                    if (result.isConfirmed) {
                        this.setState({mode: name, warnedPrivacy: true});
                        setTimeout(() => {
                            if (name === "userDetails") {
                                this.setState({mode: "posts"})
                            }
                        }, 30000);
                    }
                })
            } else {
                this.setState({mode: name})
                setTimeout(() => {
                    if (name === "userDetails") {
                        this.setState({mode: "posts"})
                    }
                }, 30000);
            }

        } else {
            this.setState({mode: name})
        }
    }

    render() {
        console.log(this.props.state)
        /* if (this.props.state.posts === undefined || this.props.state.lists === undefined) {
            console.log("bye");
            return null;
        } */
        return (
            <div
                className="dark:text-white scrollbar-thin scrollbar-thumb-gray-500 hover:scrollbar-thumb-gray-400 overflow-y-scroll mt-6">
                {this.props.state.lists === undefined || this.props.state?.lists[this.state.listId] === undefined ? (
                    <div>
                        {Array.from({length: 3}, (v, k) => (
                            <Loading/>
                        ))}
                    </div>
                ) : (this.props.state.lists[this.state.listId].status === "error" ? (
                    <Error errorData={this.props.state.lists[this.state.listId]} baseState={this.props.baseState}/>
                ) : (this.props.state.lists[this.state.listId].length === 0 ? (
                            <div>
                                <this.NichaDummyPost body={"**まだ投稿がありません！**\nなにか投稿してみましょう！"}/>
                                <this.NichaDummyPost body={"タイムラインはこのように投稿が一列になって表示されます．他のSNSとおんなじですね"}/>
                                {(this.props.location.pathname === "/") ? (<this.NichaDummyPost
                                    body={"まだフォローした人がいないのであれば，興味がある人をフォローしてみましょう！もしかしたら仲良くなれるかも？\n[おすすめのユーザーを探す！](https://google.com)"}/>) : null}
                                <this.NichaDummyPost
                                    body={"**Tips:**\nNichaでは**マークダウン**が使えます．上手く使いこなして，投稿を彩ってみましょう！\n\n**強調**:\n```\n**強調**\n```\n\n*斜体*:\n```\n*斜体*\n```\n\n~取り消し~:\n```\n~取り消し~\n```\n\nソースコード:\n```text\n/`\\`\\`\nconsole.log(\"Hello World!\");\n\\`\\`\\`\n```\n↓\n```javascript\nconsole.log(\"Hello World!\")\n```\n通常は自動で言語が判別されてシンタックスカラーリングされますが，自分で言語を指定することもできます．\n```text\n\``\`hsp\nmes \"Hello World!\"\n`\`\`\n```\n↓\n```hsp\nmes \"Hello World!\"\n```\n"}/>
                            </div>
                        ) :
                        (<div className="max-w-3xl mx-auto">
                            {this.props.userView ? (
                                <div className="flex">
                                    <div className="absolute w-44 mr-10 mt-8">
                                        <img src={Icon} className="rounded-full border-green-600 border-2"/>
                                        <h1 className="mt-6 text-4xl">TEST</h1>
                                        <h2 className="text-2xl text-gray-500">@TEST</h2>
                                        <p className="mt-3">学生アカウント</p>
                                        <button className="mt-6 w-full rounded-xl h-8 bg-gray-600">
                                            プロフィールを編集
                                        </button>
                                        <button className="mt-6">
                                            11 フォロー
                                        </button>
                                        <p className="mt-6">Web系が好きな高専4年 2/10〜4/1はよく寝よう月間です なんもわからん</p>
                                    </div>
                                    <div className="w-44 mr-10 mt-8"/>
                                    <div className="">
                                        <div className="absolute bg-gray-800 rounded-xl shadow-md px-4 py-2 mx-0">
                                            <button
                                                className={"px-4 py-2 focus:outline-none " + (this.state.mode === "posts" ? "border-b-2" : "")}
                                                onClick={() => this.switchMode("posts")}>投稿
                                            </button>
                                            <button className=" px-4 py-2 focus:outline-none "
                                                    onClick={() => Swal.fire({
                                                        title: "開発中です！",
                                                        text: "ここでユーザーが公開しているレポジトリが確認できるようになる...予定です！"
                                                    })}>レポジトリ
                                            </button>
                                            <button
                                                className={"px-4 py-2 focus:outline-none " + (this.state.mode === "userDetails" ? "border-b-2" : "")}
                                                onClick={() => this.switchMode("userDetails")}>詳細
                                            </button>
                                        </div>
                                        <div className="right-0 mt-20 mr-10 max-w-md">
                                            {this.state.mode === "posts" ? this.props.state.lists[this.state.listId].map((postId, k) => (
                                                <Post key={k} disableUser={false} data={this.props.state.posts[postId]}
                                                      state={this.props.state} baseState={this.props.baseState}/>
                                            )) : (this.state.mode === "userDetails" ? (
                                                    <div>
                                                        <div className="mb-4">
                                                            <h2 className="text-2xl">本名:</h2>
                                                            <p>小島祐介</p>
                                                        </div>
                                                        <div className="mb-4">
                                                            <h2 className="text-2xl">識別ID:</h2>
                                                            <p>12345678</p>
                                                        </div>
                                                        <div className="mb-4">
                                                            <h2 className="text-2xl">詳細な自己紹介:</h2>
                                                            <BrowserRouter>
                                                                <ErrorHandler>
                                                                    <PostViewer textScalingDisable={true}>
                                                                        みなさんこんにちは！YouTubeで活動を行っている**田中一郎**です！_チャンネル登録してくれると嬉しいです_！
                                                                        https://youtube.com/BonyChops
                                                                    </PostViewer>
                                                                </ErrorHandler>
                                                            </BrowserRouter>
                                                        </div>
                                                    </div>
                                                ) : null
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : this.props.state.lists[this.state.listId].map((postId, k) => (
                                <Post key={k} disableUser={false} data={this.props.state.posts[postId]}
                                      state={this.props.state} baseState={this.props.baseState}/>
                            ))}


                        </div>)
                ))}
            </div>
        )
    }
}

export default withRouter(TimeLine);