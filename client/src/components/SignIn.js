import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class SignIn extends Component {

    // initialize state
    state = {
        emailAddress: '',
        password: '',
        errors: []
    }

    render() {

        const {
            emailAddress,
            password,
            errors
        } = this.state;
        // reference to state with password etc.

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <Form
                    // send props to form with all the needed functions and fields
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        elements={() => (
                            <React.Fragment>
                                <input
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="email"
                                    value={emailAddress}
                                    onChange={this.change}
                                    placeholder="Email"
                                />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={this.change}
                                    placeholder="Password"
                                />
                            </React.Fragment>
                        )}
                    />
                    <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                </div>
            </div>
        )

    }

    // capture any changes and update state
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value,
                errors: []  // clear errors before submit again
            };
        });
    }

    submit = () => {
            const { context } = this.props;
            const { emailAddress, password } = this.state;
            const { from } = this.props.location.state || { from: { pathname: '/accounts' }}
            context.actions.signIn(emailAddress, password)
                // run signIn function from context
            .then( user => {
                if(user === null) {
                    this.setState(() => {
                        return { errors: [ 'Failed log-in' ]};
                        // display error message through ErrorsDisplay in Form.js
                    })
                } else {
                    this.props.history.push(from);
                        // see const { from } above- sends user back to page they were on before
                    console.log(`Successful log-in ${emailAddress}!`)
                }
            })
            .catch( err => {
                console.log(err);
                this.props.history.push('/error');
            })
    }

    cancel = () => {
        this.props.history.push('/');
        // back to home
    }

}

