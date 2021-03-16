import React from 'react';
import firebase from './Firebase';
import nichaConfig from './nicha.config';
import { getUsers } from './functions/users';

const AddButton = () => (
    <svg className="fill-current h-10 w-10 block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z" /></svg>
)

const LoadingButton = () => (
    <div className="cursor-pointer mb-4">
        <div className={"bg-white h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden opacity-25 animate-pulse"} />
        <div className="text-center text-white opacity-50 text-sm"> </div>
    </div>
)

const AccountButton = (props) => {
    return (
        <div className="cursor-pointer mb-4">
            <div className={"bg-white h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden " + (props.addButton ? "opacity-25" : "")}>
                {props.addButton ? <AddButton /> : <img src={props.img} alt={props.accountName} />}
            </div>
            <div className="text-center text-white opacity-50 text-sm">{props.subTitle}</div>
        </div>
    )
}

class AccountsManager extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="bg-gray-800 text-purple-lighter flex-none w-24 p-6 hidden md:block">
                {this.props.state.loggedInUsers === false ? (
                    <div>
                        <LoadingButton />
                        <LoadingButton />
                    </div>
                ) : (
                    <div>
                        <AccountButton img="https://pbs.twimg.com/profile_images/1347203616076042241/lOT_l9fu_400x400.jpg" />
                        <AccountButton addButton={true} />
                    </div>
                )}
            </div>
        )
    }

}

export default AccountsManager;