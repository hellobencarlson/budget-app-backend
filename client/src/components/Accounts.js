import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';



export default class Accounts extends Component {

    state = {
        accountName: "",
        accountBalance: "",
        errors: [],
    }


    
    render() {

        const {
            errors,
        } = this.state;

        
        return (
            <React.Fragment>

               {
                    this.props.context.showAccountsState &&
               
                    <Accordion defaultActiveKey="0">
                        <Card>
                                <Card.Body>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Account Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter account name" name="accountName" onChange={this.change} />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Account Balance</Form.Label>
                                            <Form.Text className="text-muted">
                                                For credit cards, enter a negative balance
                                        </Form.Text>
                                            <Form.Control type="number" placeholder="Enter account balance" name="accountBalance" onChange={this.change}  />
                                        </Form.Group>
                                        <Button variant="primary" type="submit" onClick={this.submit}>
                                            Add Account
                                        </Button>
                                    </Form>
                                </Card.Body>
                        </Card>
                        </Accordion>
                 
               }
            </React.Fragment>
           
        )
    }

    change = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        if (name == "accountName") {
            value =  value.charAt(0).toUpperCase() + value.slice(1);
            console.log(value);
        }
      
        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    submit = (e) => {
        e.preventDefault();
        const { context } = this.props;
        const userId = context.authenticatedUser.user[0].id;
        const { accountName, accountBalance, errors } = this.state;

        context.data.createAccount(accountName, accountBalance, userId)
            .then( errors => {
                if (errors.length) {
                    console.log(errors);
                } else {
                    console.log('Account added')
                    window.location.href = "/accounts";
                }
            })
    }

}

