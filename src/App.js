import React from 'react';
import firebase from './Firebase';
import logo from './logo.svg';
import './App.css';
import CheckIcon from './resources/check'
import AccountsManager from './AccountsManager';
import Footer from './components/Footer/Footer';
import ContextMenu from './components/ContextMenu/ContextMenu'
import Configuration from './components/Configuration/Configuration';
import ModifiedHistory from './components/ModifiedHistory/ModifiedHistory';
import Login from './components/Login/Login';
import contextSwitcher from './functions/contextSwitcher';
import nichaConfig from './nicha.config';
import NewToLogin from './components/NewToLogin/NewToLogin';
import HyperJump from './components/HyperJump/HyperJump';
import CreateNewUsers from './components/CreateNewUsers/CreateNewUsers';
import { getUsers } from './functions/users';
import Icon from './resources/logo.png';
import Logo from './resources/logo_full.png';
import Swal from 'sweetalert2/src/sweetalert2.js'
import '@sweetalert2/themes/dark';
import moment from 'moment';

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
    const bootStart = moment();
    setTimeout(() => {
      if (!this.state.loggedIn) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'warning',
          title: `通常よりも起動に時間がかかっています`,
          text: "再読み込みしたほうがよいかもしれません．"
        })
      }
    }, 5000)
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ loggedIn: user ? true : false });
      if (user) {
        //ログイン済み
        console.log("ﾆﾁｬｱ...");
        console.log(user.providerData);
        if (user.providerData.find(user => user.providerId === "google.com").email.match(new RegExp(`${nichaConfig.schoolAddress.student}$`)) === null) {
          //学校生徒じゃない不届き者
          this.setState({ hijackAttempted: true });
          firebase.auth().currentUser.delete();
          return;
        }
        this.setState({
          googleAccount: user.providerData.find(user => user.providerId === "google.com"),
          authData: user
        })
        this.setState({
          loggedIn: true
        })
        const bootEnd = moment();
        if(bootEnd.diff(bootStart, "seconds") > 10){
          Swal.fire({
            icon: "warning",
            title: `起動に${bootEnd.diff(bootStart, "seconds", true)}秒かかりました`,
            text: "運営に報告しますか？",
            showDenyButton: true,
            denyButtonText: `Don't save`,
          })
        }
        firebase.auth().currentUser.getIdTokenResult().then(idTokenResult => {
          console.log(idTokenResult);
          if (idTokenResult.claims.usersAvailable) {
            console.log("Claim users available")
            this.setState({
              loggedInUsers: idTokenResult.claims.users
            })
            return;
          }
          if (idTokenResult.claims.usersAvailable === undefined) {
            console.log("Claim not defined")
            this.setState({
              popup: {
                title: "usersCreation",
                page: "first_account"
              }
            })
            return;
          }
          console.log("Claim users unavailable.");
          console.log("Try to get via REST API...")
          this.authByRESTAPI();
        })
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

  authByRESTAPI() {
    firebase.auth().currentUser.getIdToken().then((idToken) => {
      console.log(idToken);
      getUsers(idToken).then(users => {
        if (users.status === "ok") {
          this.setState({
            loggedInUsers: users.usersClaim
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
          Swal.fire({
            icon: 'error',
            title: 'サーバーエラー',
            text: 'サーバーのエラーによりログインできませんでした．時間を置いて再読込してみてください...',
            confirmButtonText: `再読み込み`,
          }).then(() => window.location.reload());
        }
      });
    }).catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'サーバーエラー',
        text: 'サーバーのエラーによりログインできませんでした．時間を置いて再読込してみてください...',
        confirmButtonText: `再読み込み`,
      }).then(() => window.location.reload())
      console.error(error);
    });
  }

  componentDidUpdate() {
    contextSwitcher(this.state, this.accessor);
  }

  render() {
    return (
      <div className={"App " + (this.state.dark ? "dark" : "")}>
        {!this.state.loggedIn ? (!this.state.loginRequired ? (
          <div className="absolute top-0 left-0 bg-gray-800 text-center w-full h-full">
            <div className="absolute top-0 bottom-0 left-0 right-0 m-auto h-32 w-96">
              <div className="flex ">
                <img className="w-32 h-32" src={Icon} />
                <img className="h-32" src={Logo} />
              </div>
            </div>
          </div>
        ) : (
          <Login toggleAccessor={this.toggleAccessor} accessor={this.accessor} state={this.state} />
        )) : (<div className="font-sans  h-screen">
          <div className="">
            <AccountsManager state={this.state} accessor={this.accessor} />


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