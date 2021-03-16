import firebase from '../../Firebase';
import { langChooseG } from '../Configuration/Configuration';
import CloseIcon from '../../resources/close';
import getDate from '../../functions/getDate';
import { useState } from 'react';
import ServiceButton from './parts/ServiceButton';

const NewToLogin = (props) => {
    const langChoose = (property) => (langChooseG(props.state.language, property));
    const [service, setService] = useState(false);
    const closeConfig = () => {
        props.accessor({
            popup: false
        })
    }

    const hyperJump = () => {
        let provider;
        if (service === "github") {
            provider = new firebase.auth.GithubAuthProvider();
        }
        if (service === "twitter") {
            provider = new firebase.auth.TwitterAuthProvider();
        }
        firebase.auth().currentUser.linkWithPopup(provider).then((result) => {
            // Accounts successfully linked.
            var credential = result.credential;
            var user = result.user;
            // ...
          }).catch((error) => {
            // Handle Errors here.
            // ...
            console.log(error);
          });
        /* props.accessor({
            popup: { title: "hyperJump" }
        }) */
    }

    return (
        <div className="fixed top-0 left-0 w-full mx-auto h-full" >
            <div className="fixed bg-gray-600 opacity-50 w-full h-full" />
            <div className="fixed p-20 w-full h-full">
                <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-xl shadow-md text-lg h-full md:p-20 w-4/6 mx-auto overflow-auto">
                    <div className="flex w-full mb-10">
                        <h1 className="text-5xl">{langChoose({ ja: "外部サービスと連携", en: "Choose App" })}</h1>
                        <button className="ml-auto focus:outline-none" onClick={closeConfig}>
                            <CloseIcon width="46" />
                        </button>
                    </div>
                    <p className="my-5">Choose app you want to add.</p>
                    <div className="w-full h-3/5 border-2 border-gray-600 rounded-sm overflow-auto">
                        <div className="px-10">
                            <ServiceButton
                                title="GitHub"
                                description={langChoose({ ja: "今日の草は生えましたか？みんなに見てもらい，日々精進しましょう．", en: "Sign in, share your repos, activities." })}
                                name="github"
                                accessor={setService}
                                state={service}
                            />
                            <ServiceButton
                                title="Twitter"
                                description={langChoose({ ja: "高専生に配るアカウントは正式にTwitterでいいんじゃないか？", en: "There's no reason not to use this if you are KOSEN-SEI." })}
                                name="twitter"
                                accessor={setService}
                                state={service}
                            />
                            <ServiceButton
                                title={"Spotify" + langChoose({ ja: " (まだ非対応です！がんばります！)", en: " (Not supported yet! We'll do our best!)" })}
                                description={langChoose({ ja: "全く...ちゃんと実装してから載せろって思いますよね？", en: "One of the best music streaming services ever!" })}
                                name="spotify"
                                accessor={setService}
                                state={service}
                                disabled={true}
                            />
                            {/* <div className="shadow-lg border-b-2 border-gray-600 w-full h-24 px-5 py-4 rounded-xl hover:bg-gray-500">
                                <h1 className="text-2xl mb-2">Microsoft</h1>
                                <p>One of the best music streaming services ever!</p>
                            </div> */}
                            <ServiceButton
                                title={langChoose({ ja: "Appを自分で作る", en: "Create own app" })}
                                description={langChoose({ ja: "天才かな？", en: "Sure! Your creativity has no limits!" })}
                                name="create_app"
                                accessor={setService}
                                state={service}
                            />
                        </div>
                    </div>
                    <div className="text-right pr-4 pt-2">
                        {service !== false && service !== "create_app" ? <p>GOを押すと選択したサービスのログイン画面へ移動します．</p> : null}
                        <button onClick={hyperJump} className={`rounded-xl ${service !== false ? "bg-blue-500" : "bg-gray-700"} px-5 py-2 shadow-md`} disabled={service === false}>
                            GO!
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default NewToLogin;