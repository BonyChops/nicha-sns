import React from 'react';
import firebase from './Firebase';
import logo from './logo.svg';
import './App.css';
import CheckIcon from './resources/check'
import AccountsManager from './AccountsManager';
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
import NewToLogin from './components/NewToLogin/NewToLogin';
import HyperJump from './components/HyperJump/HyperJump';
import CreateNewUsers from './components/CreateNewUsers/CreateNewUsers';
import { getUsers } from './functions/users';
import Icon from './resources/logo.png';
import Logo from './resources/logo_full.png';

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
      loggedIn: false,
      loggedInUsers: false
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
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ loggedIn: user ? true : false });
      if (user) {
        //ログイン済み
        console.log("ﾆﾁｬｱ...");
        console.log(user.providerData);
        if (user.providerData.find(user => user.providerId === "google.com").email.match(new RegExp(`${nichaConfig.schoolAddress.student}$`)) === null) {
          //学校生徒じゃない不届き者
          this.setState({ hijackAttempted: true });
          firebase.auth().signOut();
        } else {
          this.setState({
            googleAccount: user.providerData.find(user => user.providerId === "google.com"),
            authData: user
          })
          this.setState({
            loggedIn: true
          })
          const token = firebase.auth().currentUser.getIdToken().then((idToken) => {
            console.log(idToken);
            getUsers(idToken).then(users => {
              if (users.status === "ok") {
                this.setState({
                  loggedInUsers: users
                })
              } else if (users.type === "not_found_users_created") {
                console.log("popup");
                this.setState({
                  popup: {
                    title: "usersCreation",
                    page: "first_account"
                  }
                })
              } else {
                console.log(users.type);
              }
            });
          }).catch(function (error) {
            // Handle error
          });
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
        {!this.state.loggedIn ? (
          <div className="absolute top-0 left-0 bg-gray-800 text-center w-full h-full">
            <div className="absolute top-0 bottom-0 left-0 right-0 m-auto h-32 w-96">
              <div className="flex ">
                <img className="w-32 h-32" src={Icon} />
                <img className="h-32" src={Logo} />
              </div>
            </div>

          </div>
        ) : (<div className="font-sans  h-screen">
          <div className="h-full antialiased flex w-full z-0s">
            <AccountsManager state={this.state} accessor={this.accessor} />

            <Sidebar accessor={this.accessor} />
            <div className="flex-1 flex flex-col dark:bg-gray-800 overflow-auto">
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
                    image: true
                  }} state={this.state} accessor={this.accessor} />} />
                  <Route render={() => <NotFound state={this.state} />} />
                </Switch>
              </Router>
              <br /><br />
            </div>
          </div>
          <Footer toggleAccessor={this.toggleAccessor} state={this.state} />
          {(this.state.popup?.title === "usersCreation") ? <CreateNewUsers toggleAccessor={this.toggleAccessor} accessor={this.accessor} state={this.state} /> : null}
          {(this.state.popup?.title === "hyperJump") ? <HyperJump toggleAccessor={this.toggleAccessor} accessor={this.accessor} state={this.state} /> : null}
          {(this.state.popup?.title === "addApp") ? <NewToLogin toggleAccessor={this.toggleAccessor} accessor={this.accessor} state={this.state} /> : null}
          {(this.state.popup?.title === "settings") ? <Configuration toggleAccessor={this.toggleAccessor} accessor={this.accessor} state={this.state} /> : null}
          {(this.state.popup?.title === "modifiedHistory") ? <ModifiedHistory toggleAccessor={this.toggleAccessor} accessor={this.accessor} state={this.state} /> : null}
          {(this.state.popup?.title === "login") ? <Login toggleAccessor={this.toggleAccessor} accessor={this.accessor} state={this.state} /> : null}
          <div className={"fixed w-screen h-screen left-0 top-0 " + (this.state.contextMenu !== false ? "" : "hidden")} onClick={this.hideContextMenu} />
          <ContextMenu className="z-50 fixed" state={this.state} accessor={this.accessor} />
        </div>)}
      </div>
    );
  }
}

export default App;