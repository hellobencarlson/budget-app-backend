import React, { Component } from 'react';
import Form from './Form';

export default class UserSignUp extends Component {
    
    // initialize state
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        errors: [],
    }
    
    
    render() {

            // access state
        const {
            firstName,
            lastName,
            emailAddress,
            password, 
            errors 
        } = this.state;

        

        return (
    
            <div>
                <div>
                    <h1>Sign Up</h1>
                        {/* send props to Form.js, including elements */}
                        <Form
                            cancel={this.cancel}
                            errors={errors}
                            submit={this.submit}
                            elements={() => (
                                <React.Fragment>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={firstName}
                                        onChange={this.change}
                                        placeholder="First Name"
                                    />
                                        <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        value={lastName}
                                        onChange={this.change}
                                        placeholder="Last Name"
                                    />
                                    <input
                                        id="emailAddress"
                                        name="emailAddress"
                                        type="emailAddress"
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

                    <p>&nbsp;</p>
                    <p>Already have a user account? <a href="/signin">Click here</a> to sign in!</p>
                </div>
            </div>

 
        );

    }

        // update state with changes
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    submit = () => {
        const { context } = this.props;
        // can just refer to "context"
       
        const { 
            firstName,
            lastName,
            emailAddress,
            password
        } = this.state;

        // creates user object
        const user = {
            firstName,
            lastName,
            emailAddress,
            password
        }

      
        context.data.createUser(user)
        // call createUser from Data.js
            .then( errors => {
                if (errors.length) {
                    this.setState({ errors });
                    console.log(errors);
                    // show errors in ErrorsDisplay in Form.ks
                } else {
                    console.log(`${firstName} is signed up!`)
                    context.actions.signIn(emailAddress, password)
                        // if success, signIn function from context
                        .then(() => {
                            this.props.history.push('/accounts');
                        });
                }
            })
            .catch((errors) => {
                console.log(errors);
                this.props.history.push('/error');
            });
    }


    cancel = () => {
        this.props.history.push('/');
    }
};
