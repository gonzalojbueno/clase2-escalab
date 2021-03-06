import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import {auth , createUserProfileDocument} from './firebase/firebase.utils';
import Header from './components/header/header.component';
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

class App extends React.Component {
    constructor () {
        super ();
        this.state = {
           currentUser : null,
        };
    }

    unsubscribeFromAuth = null;

        // ciclos de vida : montado , actualizado y desmontado
        componentDidMount() {
            this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
                if (userAuth) {
                    const userRef = await createUserProfileDocument(userAuth);
                    // onSnapshot() recibe la referencia de usuario 
                    userRef.onSnapshot(snapShot => {
                        this.setState({
                            currentUser : {
                                id : snapShot.id,
                                ...snapShot.data()
                            }
                        });

                        console.log(this.state);
                    });
                }
                // currentUser va a ser del tipo userAuth
                this.setState({ currentUser : userAuth })
            });
        }
        // desmontar el componente
    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
          <div>
            <Header currentUser={this.state.currentUser} />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/shop" component={ShopPage} />
              <Route path="/signin" component={SignInAndSignUpPage} />
            </Switch>
          </div>
        );
    }
}

export default App;
