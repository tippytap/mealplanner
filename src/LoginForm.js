import React from 'react';
import { login, logout } from './Firebase';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
    }

    handleSubmit(event) {
        const emailVal = event.target[1].value;
        const passVal = event.target[2].value;
        login(emailVal, passVal);
        event.preventDefault();
    }

    handleLogout() {
        logout();
    }

    render() {
        return (
            <>
            <form id="login" onSubmit={this.handleSubmit}>
                <fieldset>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                    <button>Submit</button>
                </fieldset>
            </form>
            <button onClick={this.handleLogout}>Log out</button>
            </>
        )
    }
}

export default LoginForm;