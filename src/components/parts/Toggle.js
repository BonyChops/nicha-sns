import React, { useState } from 'react';

class Toggle extends React.Component {

    constructor(props){
        super(props);
    }

    callback = () => {
        console.log(this.props);
        if (this.props.callback !== undefined) {
            this.props.callback();
        }
    }
    render() {
        const toggle = this.props.toggle;

        return (
            <div className="flex my-2">
                <div className="">
                    <div className={"flex justify-center items-center transition duration-200 ease-linear " + (toggle ? "bg-green-500" : "bg-gray-500") + " rounded-full"}>
                        <div className={"relative rounded-full w-12 h-6 transition duration-200 ease-linear" + (toggle ? 'bg-green-400' : 'bg-gray-400')}>
                            <label htmlFor={this.props.name}
                                className={"absolute left-0 bg-white border-2 mb-2 w-6 h-6 rounded-full transition transform duration-100 ease-linear cursor-pointer "
                                    + (toggle ? 'translate-x-full' : 'translate-x-0')}></label>
                            <input type="checkbox" id={this.props.name} name={this.props.name}
                                className="appearance-none w-full h-full active:outline-none focus:outline-none" onClick={this.callback} />
                        </div >
                    </div >
                </div>
                <div className="mx-5">
                    {this.props.name}
                </div>
            </div>
        )
    }
}

export default Toggle;
