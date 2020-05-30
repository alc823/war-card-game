import React, {Component} from 'react';
import { Toaster, Intent } from '@blueprintjs/core';
import { app } from './base.js';
import './Login.css';

class Login extends Component {

    authWithEmailPassword(event) {
        event.preventDefault();

        const email = this.emailInput.value
        const password = this.passwordInput.value
        app.auth().fetchSignInMethodsForEmail(email)
            .then((provider) => {
                if (provider.length === 0) {
                    return app.auth().createUserWithEmailAndPassword(email, password);
                } else {
                    return app.auth().signInWithEmailAndPassword(email, password);
                }
            })
            .then((user) => {
                if (user && user.email) {
                    this.loginForm.reset()
                }
            })
            .catch((error) => {
                this.toaster.show({ intent: Intent.DANGER, message: error.message})
            })
    }

    render() {
        return(
            <div className="login">
                <Toaster ref={(element) => {this.toaster = element}} />
                <div className="login_info">
                <h5>Welcome!</h5>
                <h5>Sign up/sign in here! First-time users will have an account automatically created once the information below is filled out.</h5>

                <form className="form" onSubmit={(event) => { this.authWithEmailPassword(event) } } ref={(form) => {this.loginForm = form}}>
                    <div className="inputs">
                    <label className="label">
                        Email
                    </label><br/>
                    <input name="email" type="email" ref={(input) => {this.emailInput=input}} placeholder="Email" className="input"></input>
                    <br/>
                    <label className="label">
                        Password
                    </label><br/>
                    <input name="password" type="password" ref={(input) => {this.passwordInput=input}} placeholder="Password" className="input"></input>
                    <br/>
                    </div>
                    <input className="button" type="submit" value="Log In/Sign up"></input><br/>
                </form>
                </div>
            </div>
        );
    }
}

export default Login;