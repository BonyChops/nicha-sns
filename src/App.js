import React from 'react';
import firebase from './Firebase';
import logo from './logo.svg';
import './App.css';
import CheckIcon from './resources/check'
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import ContextMenu from './components/ContextMenu/ContextMenu'
import TimeLine from './components/TimeLine/TimeLine';
import Configuration from './components/Configuration/Configuration';
import ModifiedHistory from './components/ModifiedHistory/ModifiedHistory';
import Login from './components/Login/Login';
import contextSwitcher from './functions/contextSwitcher';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import Post from './components/Post/Post';
import nichaConfig from './nicha.config';
import moment from 'moment';
//a

const language = {
  ja: "日本語",
  en: "English"
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contextMenu: false,
      contextReturn: false,
      popup: false,
      dark: true,
      language: "ja",
      languageDefine: language,
      loginRequired: false,
      hijackAttempted: false,
      loggedIn: false
    }
  }

  accessor = (state) => {
    this.setState(state);
  }

  toggleAccessor = (key, state) => {
    this.setState({
      [key]: this.state[key] === false ? state : false
    });
  }

  hideContextMenu = () => {
    this.setState({
      contextMenu: false
    })
  }

  componentDidMount() {
    if(localStorage.getItem("timess") === null){
      console.log("No data found!");
      localStorage.setItem("timess", JSON.stringify([moment().format()]))
    }else{
      console.log("there is data");
      console.log(localStorage.getItem("timess"))
      localStorage.setItem("timess", JSON.stringify([...JSON.parse(localStorage.getItem("timess")), moment().format()]))

    }
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ loggedIn: user ? true : false });
      if (user) {
        //ログイン済み
        console.log("ﾆﾁｬｱ...");
        console.log(user.providerData);
        if (user.providerData.find(user => user.providerId === "google.com").email.match(new RegExp(`${nichaConfig.schoolAddresses.student}$`)) === null) {
          //学校生徒じゃない不届き者
          this.setState({ hijackAttempted: true });
          firebase.auth().signOut();
        } else {
          this.setState({
            googleAccount: user.providerData.find(user => user.providerId === "google.com"),
            authData: user
          })
        }
      } else {
        //未ログイン
        console.log("は？");
        this.setState({
          loginRequired: true,
          popup: {
            title: "login"
          }
        })

      }
    })
  }

  componentDidUpdate() {
    contextSwitcher(this.state, this.accessor);
  }

  render() {
    return (
      <div className={"App " + (this.state.dark ? "dark" : "")}>
        <div className="font-sans  h-screen">
          <div className="h-full antialiased flex w-full z-0s">
            <div className="bg-gray-700 text-purple-lighter flex-none w-24 p-6 hidden md:block">
              <div className="cursor-pointer mb-4">
                <div className="bg-white h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden">
                  <img src="https://pbs.twimg.com/profile_images/1347203616076042241/lOT_l9fu_400x400.jpg" alt="" />
                </div>
                <div className="text-center text-white opacity-50 text-sm">&#8984;1</div>
              </div>
              <div className="cursor-pointer mb-4">
                <div className="bg-indigo-lighter opacity-25 h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden">
                  L
              </div>
                <div className="text-center text-white opacity-50 text-sm">&#8984;2</div>
              </div>
              <div className="cursor-pointer">
                <div className="bg-white opacity-25 h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden">
                  <svg className="fill-current h-10 w-10 block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z" /></svg>
                </div>
              </div>
            </div>
            <Sidebar />
            <div className="flex-1 flex flex-col dark:bg-gray-800 overflow-hidden">
              <Router>
                <Switch>
                  <Route exact path="/" render={() => <TimeLine state={this.state} />} />
                  <Route path="/posts/:id" children={() => <Post data={{
                    userInfo: {
                      username: "BonyChops",
                      id: "BonyChops",
                      icon: "https://pbs.twimg.com/profile_images/1347203616076042241/lOT_l9fu_400x400.jpg"
                    },
                    timestamp: "14 seconds ago",
                    contents: `
早稲田に推薦で受かったやついるけど俺には
\`\`\`c
#include "studio.h"

int main(){
  printf("†免許†");
  return 0;
}
\`\`\`
があるから(ﾆﾁｬｱ)"`,
                    image: true
                  }} state={this.state} accessor={this.accessor}/>} />
                  <Route render={() => <NotFound state={this.state} />} />
                </Switch>
              </Router>
            </div>
          </div>
          <Footer toggleAccessor={this.toggleAccessor} state={this.state} />
          {(this.state.popup?.title === "settings") ? <Configuration toggleAccessor={this.toggleAccessor} accessor={this.accessor} state={this.state} /> : null}
          {(this.state.popup?.title === "modifiedHistory") ? <ModifiedHistory toggleAccessor={this.toggleAccessor} accessor={this.accessor} state={this.state} /> : null}
          {(this.state.popup?.title === "login") ? <Login toggleAccessor={this.toggleAccessor} accessor={this.accessor} state={this.state} /> : null}
          <div className={"fixed w-screen h-screen left-0 top-0 " + (this.state.contextMenu !== false ? "" : "hidden")} onClick={this.hideContextMenu} />
          <ContextMenu className="z-50 fixed" state={this.state} accessor={this.accessor} />
        </div>
      </div>
    );
  }
}

export default App;