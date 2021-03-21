import React from 'react';
import firebase from '../../Firebase';
import { getIdToken } from '../../Firebase';
import Icon from '../../resources/logo.png';
import Logo from '../../resources/logo_full.png';
import LogoWhite from '../../resources/logo_full_white.png';
import { langChooseG } from '../Configuration/Configuration';
import CheckBox from '../parts/Toggle';
import CloseIcon from '../../resources/close';
import { postUsers } from '../../functions/users';
import Swal from 'sweetalert2/src/sweetalert2.js';
import '@sweetalert2/themes/dark';
import config from '../../nicha.config';
import userEvent from '@testing-library/user-event';

class CreateNewUsers extends React.Component {
    bioLimit = 300

    constructor(props) {
        super(props);
        this.state = {
            closeDisabled: props.state.popup.page === "first_account",
            firstAccount: props.state.popup.page === "first_account",
            page: props.state.popup.page,
            userName: props.state.popup.page === "first_account" ? this.props.state.googleAccount.displayName : "",
            userId: props.state.popup.page === "first_account" ? this.props.state.googleAccount.email.match(/^(.*)@(.*)$/)[1] : "",
            bio: "",
            errors: [],
            sending: false
        }
    }

    componentDidMount() {
        /* fetch("https://lh3.googleusercontent.com/a-/AOh14GjyLzuM1DSCqli_RjpK2rSTfm8v8zrFWNxLT1z43nA=s96-c").then(data => {
            data.blob();
        }) */
        if (config.sendGoogleToken) {
            firebase.auth()
                .getRedirectResult()
                .then((result) => {
                    if (result.credential) {
                        const google_token = result.credential.accessToken;
                        this.setState({ google_token })
                    } else {
                        console.log(result);
                        Swal.fire({
                            icon: 'error',
                            title: '再ログインが必要です',
                            text: 'Googleのトークンを取得できませんでした．ログインし直してください...',
                            confirmButtonText: `ログアウト`,
                        }).then(() => firebase.auth().signOut())
                    }
                }).catch(e => {
                    Swal.fire({
                        icon: 'error',
                        title: '再ログインが必要です',
                        text: 'Googleのトークンを取得できませんでした．ログインし直してください...',
                        confirmButtonText: `ログアウト`,
                    }).then(() => firebase.auth().signOut())
                })
        }

    }

    langChoose = (property) => (langChooseG(this.props.state.language, property));

    toggleDarkMode = () => {
        this.props.accessor({
            dark: !this.props.state.dark
        })
    }

    langSelect = (e) => {
        this.props.toggleAccessor("contextMenu", {
            name: "languageSelect",
            pos: {
                x: e.clientX,
                y: e.clientY
            }
        })
    }

    closeConfig = () => {
        this.props.accessor({
            popup: false
        })
    }

    logoFull = () => {
        return this.props.state.dark ? Logo : LogoWhite
    }

    sceneChanger = (title) => {
        this.setState({
            page: title
        })
    }

    confirm = (e) => {
        e.preventDefault();
        const errors = [];
        if (this.state.userName === "") errors.push("no_username");
        if (this.state.userName > 20) errors.push("username_too_long");
        if (this.state.userId === "") errors.push("no_userId");
        if (this.state.userId.match(/^[\w]{3,16}$/) === null) errors.push("not_valid_id");
        if (this.state.bio.length > this.bioLimit) errors.push("bio_too_long");
        this.setState({ errors });
        if (errors.length !== 0) {
            return false;
        }


        this.setState({ sending: true });
        getIdToken().then(idToken => {
            postUsers({
                display_name: this.state.userName,
                bio: this.state.bio,
                isMain: this.state.firstAccount,
                display_id: this.state.userId
            }, idToken).then(result => {
                if (result.status !== "ok") {
                    switch (true) {
                        case result.type.match(/^conflict\_(.*)/) !== null:
                            Swal.fire({
                                icon: 'error',
                                title: 'アカウントを作成できませんでした',
                                text: 'サーバーの状況とクライアントの状況が衝突しました．最読み込みしてください...',
                                confirmButtonText: `再読み込み`,
                            }).then(res => { getIdToken(true).then(() => window.location.reload()) })
                            return;
                    }
                    Swal.fire({
                        icon: 'error',
                        title: 'アカウントを作成できませんでした',
                        text: 'サーバーのエラーによりログインできませんでした．時間を置いて再読込してみてください...',
                        showCancelButton: true,
                        cancelButtonText: 'エラーの内容を表示する',
                    }).then(res => {
                        if (res.isDismissed) {
                            Swal.fire({
                                icon: "info",
                                title: "Error Log",
                                html: `You can also check these info by opening debug console.<br /><br /><pre><code>${JSON.stringify(result, null, 2)}</code></pre>`
                            })
                        }
                    })
                    this.setState({ sending: false });
                    return;
                }
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                console.log(result.users);
                Toast.fire({
                    icon: 'success',
                    title: `${result.users.find(user => user.selected === true).display_name} さん，ようこそ！`
                })
                getIdToken(true);
                this.props.accessor({
                    popup: false,
                    loggedInUsers: result.users
                })
            }).catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'アカウントを作成できませんでした',
                    text: 'サーバーのエラーによりログインできませんでした．時間を置いて再読込してみてください...',
                })
                console.error(e);
                return;
            })
        })


    }

    pageSelector(page) {
        return ({
            first_account: (
                <div>
                    <div className="flex w-full mb-5">
                        {this.langChoose({
                            ja: (<h1 className="text-2xl flex align-text-bottom"><img className="w-64" src={this.logoFull()} /><span className="mt-auto">へようこそ</span></h1>),
                            en: (<h1 className="text-2xl">Welcome to <img className="w-64" src={this.logoFull()} /></h1>)
                        })}
                        {this.state.closeDisabled ? null : (<button className="ml-auto focus:outline-none" onClick={this.closeConfig}>
                            <CloseIcon width="24" />
                        </button>)}
                    </div>
                    <div className="my-16">
                        <div className="my-2">
                            {this.langChoose({ ja: "言語", en: "Language" })}:
                            <button className="border border-gray-500 rounded-xl w-auto px-5 mx-5 py-2 focus:outline-none" onClick={this.langSelect}>
                                {this.props.state.languageDefine[this.props.state.language]}
                            </button>
                        </div>
                        <CheckBox name={this.props.state.dark ? this.langChoose({ ja: "ダークモード", en: "Dark Mode" }) : this.langChoose({ ja: "ライトモード(β)", en: "Light Mode(β)" })} toggle={this.props.state.dark} callback={this.toggleDarkMode} />
                    </div>
                    {this.langChoose({
                        ja: <p className="flex">ここの項目は右下の<img className="w-7 h-7 mx-2 rounded-full" src={this.props.state.googleAccount.photoURL} />からいつでも変更できます．</p>,
                        en: <p className="flex">You can always change these options by pressing <img className="w-6 h-6 mx-2 rounded-full" src={this.props.state.googleAccount.photoURL} /> at the right bottom.</p>
                    })}
                    <div className="text-right pr-4 pt-2">
                        <button onClick={() => this.sceneChanger("create_user")} className="rounded-xl bg-blue-500 px-5 py-2 shadow-md text-white" translate="no">
                            {this.langChoose({ ja: "次へ", en: "Next" })}
                        </button>
                    </div>
                </div>
            ),
            create_user: (
                <div>
                    <div className="flex w-full mb-5">
                        <h1 className={"text-4xl flex align-text-bottom " + (this.state.sending ? "animate-pulse" : null)}>{this.langChoose({
                            ja: this.state.sending ? "アカウントを作成しています..." : "アカウントの作成",
                            en: this.state.sending ? "Creating your account..." : "Create an account"
                        })}</h1>
                        {(this.state.closeDisabled || this.state.sending) ? null : (<button className="ml-auto focus:outline-none" onClick={this.closeConfig}>
                            <CloseIcon width="24" />
                        </button>)}
                    </div>
                    {this.state.firstAccount ? (!this.state.sending ? (this.langChoose({
                        ja: (<div className="text-sm">
                            <p>まずはメインアカウントを作成しましょう．</p>
                            <ul className="list-disc mt-2">
                                <li>このアカウントのプロフィールに<b>ディスプレイ名・本名・クラス・学科が記載されます</b>．</li>
                                <li>メインアカウントは教員・学生と連絡を取ったりなど，<u>学業関係に用いると良いでしょう</u>．</li>
                                <li>メインアカウントの他に，IDが変更可能・個数制限なし・匿名のサブアカウントを作ることができるようになります．</li>
                            </ul>
                        </div>),
                        en: (
                            <div className="text-sm">
                                <p>Let's create your main account first.</p>
                                <ui className="list-disc mt-2">
                                    <li><b>Your display name, real name, classroom, department</b> will be displayed on your profile.</li>
                                    <li>We recommend you to use the main account for <u>academic things</u>.</li>
                                    <li>In addition to the main account, you can create the sub-account, having an editable ID, no limits to creating and anonymous.</li>
                                </ui>
                            </div>
                        )
                    })) : (
                        <p className="animate-pulse">しばらくお待ちください...</p>
                    )) : ""}
                    <form onSubmit={this.confirm}>
                        <div className="my-16">
                            <div className="my-2 flex">
                                {this.langChoose({ ja: "ディスプレイ名", en: "Display Name" })}:
                                <input
                                    className={"ml-auto border border-gray-500 dark:bg-gray-700 rounded-xl w-64 px-5 mx-5 py-2 focus:outline-none " + (this.state.sending ? "text-gray-500" : "dark:text-gray-200")}
                                    value={this.state.userName}
                                    disabled={this.state.sending}
                                    required={true}
                                    maxLength={20}
                                    onChange={(e) => this.setState({ userName: e.target.value })}
                                />
                                {this.state.errors.some(error => error === "no_username") ? <p className="text-red-600">ディスプレイ名を入力してください．</p> : null}
                                {this.state.errors.some(error => error === "username_too_long") ? <p className="text-red-600">ディスプレイ名が長すぎます．</p> : null}
                            </div>
                            <div className="my-2 flex">
                                <p>ID:</p>
                                <div className={"flex ml-auto border border-gray-500 bg-white shadow-md dark:bg-gray-700  rounded-xl w-64 px-5 mx-5 py-2 " + ((this.state.firstAccount || this.state.sending) ? "text-gray-500" : "dark:text-gray-200")}>
                                    @<input
                                        className="dark:bg-gray-700 bg-white focus:outline-none w-52"
                                        value={this.state.userId}
                                        required={true}
                                        maxLength={16}
                                        disabled={this.state.firstAccount || this.state.sending}
                                        onChange={(e) => this.setState({ userId: e.target.value })}
                                    />
                                </div>
                            </div>
                            {this.state.errors.some(error => error === "no_userId") ? <p className="text-red-600">IDを入力してください．</p> : null}
                            {this.state.errors.some(error => error === "not_valid_id") ? <p className="text-red-600">無効なIDです．3〜16文字の英数字，アンダースコアのみ使用できます．</p> : null}

                            <div className="my-2">
                                <p>  {this.langChoose({ ja: "自己紹介文", en: "Bio" })}:</p>
                                <div className={"ml-auto border border-gray-500 dark:bg-gray-700  rounded-xl w-full px-5 mx-5 py-2 shadow-md " + (this.state.sending ? "text-gray-500" : "dark:text-gray-200")}>
                                    <textarea
                                        className="mt-2 dark:bg-gray-700 focus:outline-none w-full h-16"
                                        value={this.state.bio}
                                        disabled={this.state.sending}
                                        onChange={(e) => this.setState({ bio: e.target.value })}
                                    />
                                    <p className={"ml-auto w-10 " + (this.bioLimit - this.state.bio.length < 0 ? "text-red-600" : "")}>{this.bioLimit - this.state.bio.length}</p>
                                </div>
                                {this.state.errors.some(error => error === "bio_too_long") ? <p className="text-red-600">自己紹介文が長すぎます．ここは簡潔に書いたほうがかっこいいらしいですよ？</p> : null}
                            </div>
                        </div>
                        {this.langChoose({
                            ja: <p className="flex">ここの項目はあなたのプロフィールからいつでも変更できます．</p>,
                            en: <p className="flex">You can always change these options with your profile page.</p>
                        })}
                        <div className="relative h-auto">
                            <div className="flex pr-4 pt-2 bottom-7">
                                {this.state.firstAccount ? (<div className="relative">
                                    <button onClick={() => this.sceneChanger("first_account")}
                                        className={"ml-auto rounded-xl px-5 py-2 shadow-md text-white " + (this.state.sending ? "bg-gray-700" : "bg-blue-500")}
                                        translate="no"
                                        disabled={this.state.sending}
                                    >
                                        {this.langChoose({ ja: "戻る", en: "Back" })}
                                    </button>
                                </div>) : null}
                                <div className="relative ml-auto">
                                    <button type="submit"
                                        className={"flex ml-auto rounded-xl bg-blue-500 px-5 py-2 shadow-md text-white focus:outline-none " + (this.state.sending ? "animate-pulse" : "")}
                                        translate="no"
                                        disabled={this.state.sending}
                                    >
                                        <img src={Icon} className={"w-6 mr-2 " + (this.state.sending ? "animate-spin" : "")} /><p className="top-0 bottom-0 my-auto">{this.langChoose({ ja: "はじめる", en: "Start" })}</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            )
        })[page]
    }

    render() {
        return (
            <div className="fixed top-0 left-0 w-full mx-auto h-full">
                <div className="fixed bg-gray-600 opacity-50 w-full h-full" />
                <div className="fixed xl:p-20 w-full h-full">
                    <div className="bg-white dark:bg-gray-800 dark:text-gray-100 xl:rounded-xl xl:shadow-md text-lg h-full p-20 xl:w-4/6 w-full xl:mx-auto overflow-auto">
                        {this.pageSelector(this.state.page)}
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateNewUsers;