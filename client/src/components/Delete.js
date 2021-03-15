import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

export default class Delete extends Component {
    render() {
        
        let results = this.props.accountList;
        let accountListOptions = [];
        // build array with for loop  through each result in state
        for (var i = 0; i < results.length; i++) {
            if (results[i].userId == this.props.context.authenticatedUser.user[0].id ) {
            accountListOptions[i] = 
                 <option id={results[i].id} key={i} >{results[i].accountName}</option>
        
                }
        }

        let results2 = this.props.expenseList;
         let expenseListOptions = [];
         // build array with for loop  through each result in state
        if (results2 != null) {
            for (var i = 0; i < results2.length; i++) {
                if (results2[i].userId == this.props.context.authenticatedUser.user[0].id ) {
                expenseListOptions[i] = 
                     <option id={results2[i].id} key={i} >{results2[i].expenseName}</option>
                }
            }
        } else {
            console.log('null');
        }
        

        return (
           <React.Fragment>
                
                {
                    this.props.context.showDeleteAccountState &&
                        <Card>
                          
                  
                                <Card.Body>
                                    <Form>
                                        <Form.Group>
                                            <Form.Control as="select" id="accountOption" custom>
                                                <option defaultValue="Select an account to delete" disabled ></option>
                                                {accountListOptions}
                                            </Form.Control>
                                        </Form.Group>   
                                        <Button variant="primary" type="button" onClick={this.delete}>
                                            Delete
                                        </Button>
                                    </Form>
                                </Card.Body>
              
                        </Card>
    }
      {
                    this.props.context.showDeleteExpenseState &&
                        <Card>
   
                                <Card.Body>
                                    <Form>
                                        <Form.Group>
                                            <Form.Control as="select" id="expenseOption" custom>
                                                <option defaultValue="Select an account to delete" disabled ></option>
                                                {expenseListOptions}
                                            </Form.Control>
                                        </Form.Group>   
                                        <Button variant="primary" type="button" onClick={this.delete2}>
                                            Delete
                                        </Button>
                                    </Form>
                                </Card.Body>
                        </Card>
    }
           </React.Fragment>
           
        )
    }

    delete = (e) => {
        const { context } = this.props;
       
        // retrieve selected item from menu and id
        const chooseDelete = document.getElementById('accountOption');
        const optionSelected = chooseDelete.options[chooseDelete.selectedIndex];
        const id = optionSelected.id;
      

        context.data.deleteAccount(id)
            .then(() => {
                window.location.href = "/accounts";
       
      
            }).catch((errors) => {
                console.log(errors);
                // this.props.history.push('/error');
            });  
     }

     delete2 = (e) => {
        const { context } = this.props;
       
        // retrieve selected item from menu and id
        const chooseDelete2 = document.getElementById('expenseOption');
        const optionSelected2 = chooseDelete2.options[chooseDelete2.selectedIndex];
        const id = optionSelected2.id;
      

        context.data.deleteExpense(id)
            .then(() => {
                window.location.href = "/accounts";
       
      
            }).catch((errors) => {
                console.log(errors);
                // this.props.history.push('/error');
            });  
     }
}