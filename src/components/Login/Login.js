import CheckBox from '../parts/Toggle';
import CloseIcon from '../../resources/close';
import firebase from '../../Firebase';
import GoogleIcon from '../../resources/google.svg';

const Login = (props) => {
    const langChoose = (property) => (property[props.state.language]);
    const close = () => {
        props.accessor({
            popup: false
        })
    }
    const loginGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        provider.addScope((["openid", "https://www.googleapis.com/auth/user.birthday.read", "email", "https://www.googleapis.com/auth/userinfo.profile"]).join(" "));
        firebase.auth().signInWithRedirect(provider)
    }
    const test = () => {
        console.log("test");
    }
    return (
        <div className="fixed top-0 left-0 w-full h-full">
            <div className="fixed bg-gray-600 opacity-50 w-full h-full" />
            <div className="fixed p-20 w-full h-full">
                <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-xl shadow-md text-lg h-full md:p-20">
                    <div className="flex w-full">
                        <h1 className="text-5xl">{langChoose({ ja: "Nicha へようこそ", en: "Welcome to Nicha" })}</h1>
                        {/* <button className="ml-auto focus:outline-none" onClick={close}>
                            <CloseIcon width="48" />
                        </button> */}
                    </div>
                    <div className="my-16">
                        {props.state.hijackAttempted ? <p className="text-red-600">申し訳ございませんが，当サービスは長野高専生のみが使用できます．OSSでソースを配布していますので，そちらを使ってご自身の学校のサービスを作ってみてください💪<br />
                        長野高専生向けアナウンス: 学校のアカウントでログインしてください．</p> : null}
                        <div className="my-2">
                            {langChoose({ ja: "学校のアカウントでログインしてください", en: "Login with school account" })}:
                            <button className="w-auto mx-5 focus:outline-none" onClick={loginGoogle}>
                                <img src={GoogleIcon}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;