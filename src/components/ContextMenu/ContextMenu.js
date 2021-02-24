import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import SettingIcon from '../../resources/setting';
import SignOutIcon from '../../resources/signout'


const ContextMenu = (props) => {
    const [bufState, setBuf] = useState(false);
    let buf = bufState;

    const deleteState = () => {
        setBuf(false);
    }

    const current = props.state.contextMenu;
    let inSw = false;

    if (buf === false) {
        if (current === false) {
            return null;
        }
        console.log(current)
        console.log("a");
        inSw = true
        buf = current;
    } else {
        if (current === false) {
            inSw = false;
        }
    }


    console.log()
    if (current === false) {
        return null;
    }
    const contextDefine = {
        nichaSetup: (
            <div className="block absolute right-5 bottom-16 transition ease-out duration-100">
                <div className="w-60 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 flex flex-col text-sm py-4 px-2 dark:text-gray-100 text-gray-900 shadow-lg ">
                    {/* <hr className="my-3 border-gray-300" /> */}
                    <div className="flex hover:bg-gray-100 dark:hover:bg-gray-600 py-1 px-2 rounded">
                        <div className="w-8 font-bold"><div className="w-5" ><SettingIcon /></div></div>
                        <div className="text-gray-500">Settings</div>
                    </div>
                    <div className="flex hover:bg-gray-100 dark:hover:bg-gray-600 py-1 px-2 rounded">
                        <div className="w-8 italic"><div className="w-5" ><SignOutIcon /></div></div>
                        <div className="text-gray-500">Sign Out</div>
                    </div>
                </div>
            </div>
        )
    }[buf?.name];

    return (
        <div>
            {/* <CSSTransition
                in={inSw}
                classNames="fade"
                onExited={deleteState}> */}
                {(contextDefine !== undefined) ? contextDefine : null}
            {/* </CSSTransition> */}
        </div>

    )
}

export default ContextMenu;