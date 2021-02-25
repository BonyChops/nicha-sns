import { useState } from 'react';
import { CSSTransition, Transition } from 'react-transition-group';
import SettingIcon from '../../resources/setting';
import SignOutIcon from '../../resources/signout'


const ContextMenu = (props) => {
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
        console.log(current)
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
                    {/* <hr className="my-3 border-gray-300" /> */}
                    <button className="flex hover:bg-gray-100 dark:hover:bg-gray-600 py-1 px-2 rounded" onClick={(e) => {returnResult(e, "settings")}}>
                        <div className="w-8 font-bold"><div className="w-5" ><SettingIcon /></div></div>
                        <div className="text-gray-500">Settings</div>
                    </button>
                    <div className="flex hover:bg-gray-100 dark:hover:bg-gray-600 py-1 px-2 rounded">
                        <div className="w-8 italic"><div className="w-5" ><SignOutIcon /></div></div>
                        <div className="text-gray-500">Sign Out</div>
                    </div>
                </div>
            </div>
        ),
        languageSelect: (
            <div className="block absolute transition ease-out duration-100" style={{left: buf?.pos?.x + "px", top: buf?.pos?.y }}>
                <div className="w-60 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 flex flex-col text-sm py-4 px-2 dark:text-gray-100 text-gray-900 shadow-lg ">
                    {/* <hr className="my-3 border-gray-300" /> */}
                    <button className="flex hover:bg-gray-100 dark:hover:bg-gray-600 py-1 px-2 rounded" onClick={(e) => {returnResult(e, "lang_ja")}}>
                        <div className="text-gray-500">日本語</div>
                    </button>
                    <button className="flex hover:bg-gray-100 dark:hover:bg-gray-600 py-1 px-2 rounded" onClick={(e) => {returnResult(e, "lang_en")}}>
                        <div className="text-gray-500">English</div>
                    </button>
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
            <Transition
                in={inSw}
                classNames="fade"
                timeout={550}
                {...callBacks}>
                {(contextDefine !== undefined) ? contextDefine : null}
            </Transition>
        </div>
    )
}

export default ContextMenu;