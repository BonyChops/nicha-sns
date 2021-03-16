import React from 'react';
import Icon from '../../resources/logo.png';
import Logo from '../../resources/logo_full.png';
import LogoWhite from '../../resources/logo_full_white.png';
import { langChooseG } from '../Configuration/Configuration';
import CheckBox from '../parts/Toggle';
import CloseIcon from '../../resources/close';

class CreateNewUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            closeDisabled: props.state.popup.page === "first_account",
            firstAccount: props.state.popup.page === "first_account",
            page: props.state.popup.page,
            userName: props.state.popup.page === "first_account" ? this.props.state.googleAccount.displayName : "",
            userId: props.state.popup.page === "first_account" ? this.props.state.googleAccount.email.match(/^(.*)@(.*)$/)[1] : "",
            bio: ""
        }
    }

    componentDidMount() {
        /* fetch("https://lh3.googleusercontent.com/a-/AOh14GjyLzuM1DSCqli_RjpK2rSTfm8v8zrFWNxLT1z43nA=s96-c").then(data => {
            data.blob();
        }) */
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
                        <button onClick={() => this.sceneChanger("create_user")} className="rounded-xl bg-blue-500 px-5 py-2 shadow-md text-white">
                            {this.langChoose({ ja: "次へ", en: "Next" })}
                        </button>
                    </div>
                </div>
            ),
            create_user: (
                <div>
                    <div className="flex w-full mb-5">
                        <h1 className="text-4xl flex align-text-bottom">{this.langChoose({
                            ja: "アカウントの作成",
                            en: "Create an account"
                        })}</h1>
                        {this.state.closeDisabled ? null : (<button className="ml-auto focus:outline-none" onClick={this.closeConfig}>
                            <CloseIcon width="24" />
                        </button>)}
                    </div>
                    {this.state.firstAccount ? this.langChoose({
                        ja: (<p className="text-sm">
                            まずはメインアカウントを作成しましょう．
                            <ul class="list-disc mt-2">
                                <li>このアカウントのプロフィールに<b>本名・クラス・学科が記載されます</b>．</li>
                                <li>メインアカウントは教員・学生と連絡を取ったりなど，<u>学業関係に用いると良いでしょう</u>．</li>
                                <li>メインアカウントの他に，IDが変更可能・個数制限なし・匿名のサブアカウントを作ることができるようになります．</li>
                                <li>Nichaサービスを使用するに当たり，メインアカウントは削除できません．</li>
                            </ul>
                        </p>),
                        en: (
                            <p className="text-sm">
                                //
                            </p>
                        )
                    }) : ""}
                    <form className="my-16">
                        <div className="my-2 flex">
                            {this.langChoose({ ja: "ディスプレイ名", en: "Account Name" })}:
                            <input
                                className="ml-auto border border-gray-500 dark:bg-gray-700 dark:text-gray-200 rounded-xl w-64 px-5 mx-5 py-2 focus:outline-none"
                                value={this.state.userName}
                                required={true}
                                onChange={(e) => this.setState({ userName: e.target.value })}
                            />
                        </div>
                        <div className="my-2 flex">
                            <p>ID:</p>
                            <div className={"flex ml-auto border border-gray-500 bg-white shadow-md dark:bg-gray-700  rounded-xl w-64 px-5 mx-5 py-2 " + (this.state.firstAccount ? "text-gray-500" : "dark:text-gray-200")}>
                                @<input
                                    className="dark:bg-gray-700 bg-white focus:outline-none w-52"
                                    value={this.state.userId}
                                    required={true}
                                    disabled={this.state.firstAccount}
                                    onChange={(e) => this.setState({ userId: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="my-2">
                            <p>自己紹介文:</p>
                            <div className={"ml-auto border border-gray-500 dark:bg-gray-700  rounded-xl w-full px-5 mx-5 py-2 dark:text-gray-200 shadow-md"}>
                                <textarea
                                    className="mt-2 dark:bg-gray-700 focus:outline-none w-full h-16"
                                    value={this.state.bio}
                                    onChange={(e) => this.setState({ bio: e.target.value })}
                                />
                                <p className={"ml-auto w-10 " + (140 - this.state.bio.length < 0 ? "text-red-600" : "")}>{140 - this.state.bio.length}</p>
                            </div>
                        </div>
                    </form>
                    {this.langChoose({
                        ja: <p className="flex">ここの項目はあなたのプロフィールからいつでも変更できます．</p>,
                        en: <p className="flex">You can always change these options with your profile page.</p>
                    })}
                    <div className="relative h-auto">
                        <div className="flex pr-4 pt-2 bottom-7">
                            {this.state.firstAccount ? (<div className="relative">
                                <button onClick={() => this.sceneChanger("first_account")} className="ml-auto rounded-xl bg-blue-500 px-5 py-2 shadow-md text-white">
                                    {this.langChoose({ ja: "戻る", en: "Back" })}
                                </button>
                            </div>) : null}
                            <div className="relative ml-auto">
                                <button className="flex ml-auto rounded-xl bg-blue-500 px-5 py-2 shadow-md text-white">
                                    <img src={Icon} className="w-6 mr-2" /><p className="top-0 bottom-0 my-auto">{this.langChoose({ ja: "はじめる", en: "Start" })}</p>
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            )
        })[page]
    }

    render() {
        return (
            <div className="fixed top-0 left-0 w-full mx-auto h-full">
                <div className="fixed bg-gray-600 opacity-50 w-full h-full" />
                <div className="fixed p-20 w-full h-full">
                    <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-xl shadow-md text-lg h-full md:p-20 w-4/6 mx-auto overflow-auto">
                        {this.pageSelector(this.state.page)}
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateNewUsers;