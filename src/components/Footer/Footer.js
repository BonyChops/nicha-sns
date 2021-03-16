import React from 'react';
import SettingIcon from '../../resources/setting';
import nichaIcon from '../../resources/logo.png';
import nichaString from '../../resources/logo_full.png';
import nichaStringWhite from '../../resources/logo_full_white.png';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    openAccountPopup = () => {
        this.props.toggleAccessor("contextMenu", {
            name: "nichaSetup"
        })
    }

    render() {
        return (
            <div className="absolute bottom-0 bg-gray-900 h-16 w-screen shadow- rounded-t-3xl">
                <div className="relative left-3 top-3 mr-6 pr-6 origin-center">
                    <div className="flex">
                        <div className="flex items-center flex-no-shrink text-white ">
                            <div className="mr-4">
                                <img className="h-10" src={nichaIcon} />
                            </div>
                            <span className="font-semibold text-xl tracking-tight flex">
                                <span> <img className="h-10" src={nichaString} /> </span>
                                <span className="text-xs pl-2 bottom-0 mb-0 mt-auto"> for NNCT</span></span>
                        </div>
                        <button className="flex items-center flex-no-shrink text-white right-0 ml-auto focus:outline-none" onClick={this.openAccountPopup}>
                            <div className="w-10 right-0">
                                <img className="rounded-full" src={this.props.state.googleAccount?.photoURL} />
                                {/* <SettingIcon /> */}
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;