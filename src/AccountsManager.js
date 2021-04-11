import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import Post from './components/Post/Post';
import TimeLine from './components/TimeLine/TimeLine';
import NewToLogin from './components/NewToLogin/NewToLogin';
import NewPost from './components/NewPost/NewPost';
import { createBrowserHistory } from "history";
import Icon from './resources/logo.png';
import Loading from './components/TimeLine/parts/Loading'
import YouTube from 'react-youtube';

const history = createBrowserHistory();

const merge = require('deepmerge');

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
        <div onClick={props.callback} className="cursor-pointer mb-4 focus:outline-none">
            <button onClick={props.callback} className={"focus:outline-none bg-white h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden " + (props.addButton ? "opacity-25 " : "") + (props.selected ? "ring" : "")}>
                {props.addButton ? <AddButton /> : (props.img !== false ? <img src={props.img} alt={props.accountName} /> : "N")}
            </button>
            <div className="text-center text-white opacity-50 text-sm overflow-x-hidden truncate">{props.subTitle}</div>
        </div>
    )
}

class AccountsManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }
    componentDidMount() {
    }

    accessor = (state, id = this.props.state.loggedInUsers.find(user => user.selected)?.id) => {
        console.log(state)
        if (id === undefined) return false;
        console.log("updated")
        const keyName = `user_${id}`;
        this.setState({
            [keyName]: merge(
                (this.state[keyName] === undefined ? {
                } : this.state[keyName]),
                state,
                { arrayMerge: (destinationArray, sourceArray, options) => sourceArray }
            )
        })
        console.log(this.state[keyName]);
    }

    toggleAccessor = (key, state) => {
        this.accessor({
            [key]: (this.userState())[key] === false ? state : false
        });
    }

    toggleBaseAccessor = (key, state) => {
        this.props.accessor({
            [key]: this.props.state[key] === false ? state : false
        });
    }

    userState = (id = (this.props.state.loggedInUsers !== false ? this.props.state.loggedInUsers.find(user => user.selected)?.id : undefined)) => {
        if (this.state === null) return undefined;
        if (id === undefined) return undefined;
        let result = this.state[`user_${id}`];
        if (typeof result !== "object") result = {};
        result.userInfo = this.props.state.loggedInUsers.find(user => user.id === id);
        result = merge({
            users: { nicha: { icon: Icon, display_id: "nichaSNS", display_name: "Nicha for NNCT", official: true } },
            posts: { test: "a" },
        }, result)
        return result;
    }

    switchAccount = (id) => {
        let users = this.props.state.loggedInUsers;
        users = users.map(user => (user.selected = false, user));
        users.find(user => user.id === id).selected = true;
        this.props.accessor({ loggedInUsers: users });
        this.render();
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(this.props.state.loggedInUsers) !== JSON.stringify(prevProps.state.loggedInUsers) && this.props.state.loggedInUsers !== false) {
            if (!this.props.state.loggedInUsers.some(user => user.selected)) {
                const loggedInUsers = this.props.state.loggedInUsers;
                loggedInUsers[0].selected = true;
                this.props.accessor({
                    loggedInUsers
                });
            }
            console.log("a");
        }
    }

    render() {
        return (
            <div className="h-screen antialiased flex w-full z-0s ">
                <div className="bg-gray-800 text-purple-lighter flex-none w-24 p-6 hidden lg:block overflow-auto scrollbar-thin ">
                    {this.props.state.loggedInUsers === false ? (
                        <div>
                            <LoadingButton />
                            <LoadingButton />
                            <LoadingButton />
                            <LoadingButton />
                            <LoadingButton />
                        </div>
                    ) : (
                        <div>
                            {this.props.state.loggedInUsers.map((user, key) => (
                                <AccountButton key={key} img={user.icon} subTitle={user.display_id} selected={user.selected} callback={() => this.switchAccount(user.id)} />
                            ))}
                            <AccountButton addButton={true} callback={() => this.props.accessor({ popup: { title: "usersCreation", page: "create_user" } })} />
                            <br /><br />
                        </div>
                    )}
                </div>

                <BrowserRouter>
                    <Sidebar accessor={this.accessor} state={this.userState()} />
                    {this.userState() === undefined ? (
                        <div className="flex-1 flex flex-col dark:bg-gray-800 overflow-auto">
                            <div className="dark:text-white scrollbar-thin scrollbar-thumb-gray-500 hover:scrollbar-thumb-gray-400 overflow-y-scroll">
                                {Array.from({ length: 3 }, (v, k) => (
                                    <Loading />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col dark:bg-gray-800 overflow-auto">
                            <div>
                                <Switch>
                                    <Route exact path="/" render={(props) => <TimeLine
                                        key={this.userState()?.userInfo.id + props.match.params.id}
                                        state={this.userState()}
                                        baseState={this.props.state}
                                        accessor={this.accessor}
                                        toggleAccessor={this.toggleAccessor}
                                        {...props}
                                    />} />
                                    <Route path="/p/:id" children={(props) => (<Post
                                        history={props.history}
                                        key={props.match.params.id}
                                        state={this.userState()}
                                        baseState={this.props.state}
                                        accessor={this.accessor}
                                        toggleAccessor={this.toggleAccessor}
                                        toggleBaseAccessor={this.toggleBaseAccessor}
                                        {...props}
                                    />)
                                    } />
                                    <Route path="/l/:id" render={(props) => <TimeLine
                                        key={this.userState()?.userInfo.id + props.match.params.id}
                                        state={this.userState()}
                                        baseState={this.props.state}
                                        accessor={this.accessor}
                                        toggleAccessor={this.toggleAccessor}
                                        {...props}
                                    />} />
                                    <Route path="/u/:id" render={(props) => <TimeLine
                                        key={this.userState()?.userInfo.id + props.match.params.id}
                                        state={this.userState()}
                                        baseState={this.props.state}
                                        accessor={this.accessor}
                                        toggleAccessor={this.toggleAccessor}
                                        userView={true}
                                        {...props}
                                    />} />
                                    <Route path="/secret" render={(props) => (
                                        <div className="dark:text-gray-400">
                                            <h1 className="text-3xl">名曲</h1>
                                            <p className="">いつかYouTube Playerも実装したい＞＜</p>
                                            <YouTube videoId="dQw4w9WgXcQ" onReady={(event) => { setTimeout(() => { event.target.playVideo(); }, 300) }} />
                                        </div>
                                    )} />
                                    <Route render={() => <NotFound key={this.userState()?.userInfo.id} state={this.state} baseState={this.props.state} />} />
                                </Switch>
                                {(this.userState()?.popup?.title === "newPost") ? <NewPost toggleAccessor={this.toggleAccessor} accessor={this.accessor} state={this.userState()} baseState={this.props.state} /> : null}
                                {(this.userState()?.popup?.title === "addApp") ? <NewToLogin toggleAccessor={this.toggleAccessor} accessor={this.accessor} state={this.userState()} baseState={this.props.state} /> : null}
                            </div>
                            <br /><br />
                        </div>)}
                </BrowserRouter>
            </div>
        )
    }

}

export default AccountsManager;