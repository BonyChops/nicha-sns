import React from 'react';
import SettingIcon from '../../resources/setting';

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
                            <svg className="h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
                            <span className="font-semibold text-xl tracking-tight flex"><span>Nicha</span>
                                <span className="text-xs pl-2 bottom-0 mb-0 mt-auto"> for NNCT</span></span>
                        </div>
                        <button className="flex items-center flex-no-shrink text-white right-0 ml-auto focus:outline-none" onClick={this.openAccountPopup}>
                            <div className="w-10 right-0">
                                <SettingIcon />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;