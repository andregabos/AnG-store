import React, { useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom";
import { auth, createUserProfileDocument } from "./Firebase/firebase.utils";
import Homepage from "./Pages/Homepage/Homepage";
import Signpage from "./Pages/SignPage/Signpage";
import Shop from "./Pages/Shop/Shop";
import Header from "./Components/Header/Header";
import './App.css';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });

          console.log(this.state);
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={Shop} />
          <Route path='/signin' component={Signpage} />
        </Switch>
      </div>
    );
  }
}


export default App;
