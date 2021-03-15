import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';



export default class Expenses extends Component {

    state = {
        expenseName: "",
        expenseCost: "",
        userId: "",
        errors: [],
    }
    
    render() {

        const {
            errors,
        } = this.state;

       
        
        return (
            <React.Fragment>

                {
                    this.props.context.showExpensesState &&
                  
                
                        <Card>
                        
                                <Card.Body>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Expense Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter expense name" name="expenseName" onChange={this.change} />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Expense Cost</Form.Label>
                                            <Form.Text className="text-muted">
                                                Savings can also be set as an "expense"
                                            </Form.Text>
                                            <Form.Control type="number" placeholder="Enter expense cost" name="expenseCost" onChange={this.change}  />
                                        </Form.Group>
                                        <Button variant="primary" type="submit" onClick={this.submit}>
                                            Add Expense
                                        </Button>
                                    </Form>
                                </Card.Body>
                           
                        </Card>
                    
                        
                 
                 }
            </React.Fragment>
           
        )
    }

    change = (event) => {
        const name = event.target.name;
        let value = event.target.value;
        if (name == "expenseName") {
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
        const { expenseName, expenseCost, errors } = this.state;
        const userId = context.authenticatedUser.user[0].id;
        const emailAddress = context.authenticatedUser.user[0].emailAddress;
        const password = context.currentPassword;

        context.data.createExpense(expenseName, expenseCost, userId, emailAddress, password)
            .then( errors => {
                if (errors.length) {
                    console.log(errors);
                } else {
                    console.log('Expense added')
                    window.location.href = "/accounts";
                }
            })
    }

}

