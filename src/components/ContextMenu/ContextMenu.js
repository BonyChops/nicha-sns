import { useState } from 'react';
import { CSSTransition, Transition } from 'react-transition-group';
import SettingIcon from '../../resources/setting';
import SignOutIcon from '../../resources/signout'
import ContextButton from './parts/button';
import Swal from 'sweetalert2/src/sweetalert2.js';
import '@sweetalert2/themes/dark';

const ContextMenu = (props) => {
    const langChoose = (property) => (property[props.state.language]);
    const [bufState, setBuf] = useState(false);
    let buf = bufState;

    const deleteState = () => {
        setBuf(false);
        buf = false;
    }

    const current = props.state.contextMenu;
    let inSw = false;

    if (buf === false) {
        if (current === false) {
            return null;
        }
        inSw = true
        buf = current;
    } else {
        if (current === false) {
            inSw = false;
        }
    }

    const returnResult = (e, value) => {
        props.accessor({
            contextMenu: false,
            contextReturn: value
        })
    }

    console.log(inSw);
    if (current === false) {
        return null;
    }

    console.log(buf?.name);
    const contextDefine = {
        nichaSetup: (
            <div className="block absolute right-5 bottom-16 transition ease-out duration-100">
                <div className="w-60 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 flex flex-col text-sm py-4 px-2 dark:text-gray-100 text-gray-900 shadow-lg ">
                    <ContextButton title={langChoose({ en: "Feedback", ja: "フィードバック / お問い合わせ" })} onClick={(e) => {
                        Swal.fire({
                            title: "フィードバック / お問い合わせ",
                            input: 'textarea',
                            html: '何かお気づきの点がございましたでしょうか？ご意見やご不明点，ご質問などを受け付けておりますので何なりとお申し付けください．<br />通常，我々は返答いたしませんが，送信された内容がご質問等，ご利用者様がご返答を希望する場合のみこちらからご連絡させていただきます．',
                            inputPlaceholder: 'Type your message here...',
                            inputAttributes: {
                                'aria-label': 'Type your message here'
                            },
                            showCancelButton: true,
                            footer: '<a href="https://github.com/BonyChops/nicha-sns/issues" target="_blank">技術的なご意見はこちらへもどうぞ</a>'
                        }).then(result => {
                            if (result.isConfirmed) {
                                Swal.mixin({
                                    toast: true,
                                    position: 'top-end',
                                    showConfirmButton: false,
                                    timer: 3000,
                                    timerProgressBar: true,
                                    didOpen: (toast) => {
                                        toast.addEventListener('mouseenter', Swal.stopTimer)
                                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                                    }
                                }).fire({
                                    icon: 'success',
                                    title: 'フィードバックへのご協力ありがとうございました' + result.value
                                })
                            }
                        })
                    }} icon={<SettingIcon />} />
                    <hr className="my-3 border-gray-300" />
                    <ContextButton title={langChoose({ en: "Settings", ja: "設定" })} onClick={(e) => { returnResult(e, "settings") }} icon={<SettingIcon />} />
                    <ContextButton title={langChoose({ en: "Sign Out", ja: "サインアウト" })} onClick={(e) => { returnResult(e, "signout") }} icon={<SignOutIcon />} />
                </div>
            </div>
        ),
        languageSelect: (
            <div className="block absolute transition ease-out duration-100" style={{ left: buf?.pos?.x + "px", top: buf?.pos?.y }}>
                <div className="w-60 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 flex flex-col text-sm py-4 px-2 dark:text-gray-100 text-gray-900 shadow-lg ">
                    {/* <hr className="my-3 border-gray-300" /> */}
                    <ContextButton title="日本語" onClick={(e) => { returnResult(e, "lang_ja") }} />
                    <ContextButton title="English(β)" onClick={(e) => {
                        Swal.fire({
                            icon: "info",
                            title: "This language is still beta!",
                            text: "Translation may not be perfect! Could you report to me(owner) if you found mistranslation? Thanks for your help."
                        })
                        returnResult(e, "lang_en")
                    }} />
                </div>
            </div>
        )
    }[buf?.name];

    const callBacks = {
        onEnter: () => console.log("うんち"),
        onEntered: () => console.log("うんち"),
        onExit: () => console.log("うんち"),
        onExited: () => console.log("うんち")
    };

    return (
        <div className="z-50">
            {/* <Transition
                in={inSw}
                classNames="fade"
                timeout={550}
                {...callBacks}> */}
            {(contextDefine !== undefined) ? contextDefine : null}
            {/*  </Transition> */}
        </div>
    )
}

export default ContextMenu;