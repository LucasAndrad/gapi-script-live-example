import React, { Component } from 'react';
import { gapi, loadAuth2 } from 'gapi-script'

import UserCard from './UserCard';
import './GoogleLogin.css';

class GoogleLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }
    async componentDidMount() {
        let auth2 = await loadAuth2(process.env.REACT_APP_CLIENT_ID, '')
        if (auth2.isSignedIn.get()) {
            this.updateUser(auth2.currentUser.get())
        } else {
            this.attachSignin(document.getElementById('customBtn'), auth2);
        }
    }
    async componentDidUpdate() {
        if(!this.state.user) {
            let auth2 = await loadAuth2(process.env.REACT_APP_CLIENT_ID, '')
            this.attachSignin(document.getElementById('customBtn'), auth2);
        }
    }
    updateUser(currentUser) {
        let name = currentUser.getBasicProfile().getName()
        let profileImg = currentUser.getBasicProfile().getImageUrl()
        this.setState({
            user: {
                name: name,
                profileImg: profileImg
            }
        })
    }
    attachSignin(element, auth2) {
        auth2.attachClickHandler(element, {},
            (googleUser) => {
                this.updateUser(googleUser);
            }, (error) => {
                console.log(JSON.stringify(error))
            });
    }
    signOut = () => {
        let auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
            this.setState({ user: null })
            console.log('User signed out.');
        });
    }
    render() {
        if(this.state.user) {
            return (
                <div className="container">
                    <UserCard user={this.state.user} />
                    <div id="" className="btn logout" onClick={this.signOut}>
                        Logout
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <div id="customBtn" className="btn login">
                        Login
                    </div>
                </div>
            );
        }
    }
}

export default GoogleLogin;
