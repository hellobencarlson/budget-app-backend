import React, { Component } from 'react';
import Accounts from './Accounts';
import withContext from '../Context';
import Account from './Account';
import Form from 'react-bootstrap/Form';
import Delete from './Delete';
import Expenses from './Expenses';
import Expense from './Expense';
import Button from 'react-bootstrap/Button';;

const DeleteWithContext = withContext(Delete);
const AccountsWithContext = withContext(Accounts);
const ExpensesWithContext = withContext(Expenses);
const AccountWithContext = withContext(Account);  
const ExpenseWithContext = withContext(Expense); 

export default class Budget extends Component {
    

    state = {
        accountList: "",
        expenselizt: "",
    }

    componentDidMount() {
        const { context } = this.props;

        context.data.getAccounts()
            .then( accounts => {
                this.setState(
                     {
                        accountList: accounts.accounts
                    }
                )
            }).catch((errors) => {
                console.log(errors);
            });
        context.data.getExpenses()
                .then( expenses => {
                    this.setState(
                        {
                            expenseList: expenses.expenses
                        }
                    )
        }).catch((errors) => {
            console.log(errors);
        });

};
 

    render() {

        let results = this.state.accountList;
        
            let accountsObject = [];

            for (var i = 0; i < results.length; i++) {
                if (results[i].userId === this.props.context.authenticatedUser.user[0].id) {
                accountsObject[i] = 
                    <AccountWithContext
                        accountName={results[i].accountName}
                        accountBalance={results[i].accountBalance}
                        key={results[i].id}
                        id={results[i].id}
                        userId={results[i].userId}
                    />
                }
            }

            let expenseResults = this.state.expenseList;

            let accountSum = 0;
        
            let expensesObject = [];

            if (expenseResults != null) { // gives chance for expenseResults to load
                for (var i = 0; i < expenseResults.length; i++) {
                   if (expenseResults[i].userId === this.props.context.authenticatedUser.user[0].id) {
                        console.log('match')
                        expensesObject[i] = 
                        <ExpenseWithContext
                        expenseName={expenseResults[i].expenseName}
                        expenseCost={expenseResults[i].expenseCost}
                        key={expenseResults[i].id}
                        id={expenseResults[i].id}
                        userId={results[i].userId}
                    />
                   } 
                    
                }
            
                for (var i = 0; i < expenseResults.length; i++) {
                    if (expenseResults[i].userId === this.props.context.authenticatedUser.user[0].id) {
                        accountSum += expenseResults[i].expenseCost;
                    }
                }
                    accountSum = accountSum * -1
                
            }

            for (var i = 0; i < results.length; i++) {
                if (results[i].userId === this.props.context.authenticatedUser.user[0].id) {
                    accountSum += results[i].accountBalance;
                }
            }

          
      
 
        return (

            <React.Fragment>

                <div className="body">
                    <h1>Budget Overview</h1>
                    <h3>Accounts</h3>
                    <Form>
                        {accountsObject}
                    </Form>
                    <h3>Expenses</h3>
                   <Form>
                         {expensesObject} 
                    </Form>
                    <div className="total">
                        <h5>You have ${accountSum} left for expenses</h5>
                    </div>
                    <div className="button-div">
                            <div>
                                <Button variant="primary" onClick={this.handleClick}>Add Account</Button>
                                <Button variant="primary" onClick={this.handleClick}>Add Expense</Button>
                            </div>
                            <div>
                                <Button variant="danger" onClick={this.handleClick}>Delete Account</Button>
                                <Button variant="danger" onClick={this.handleClick}>Delete Expense</Button>
                            </div>
                            <div className="edit-accounts">
                                <AccountsWithContext />
                                <ExpensesWithContext />
                                <DeleteWithContext accountList={this.state.accountList} expenseList={this.state.expenseList} />
                            </div>
                        
                    </div>
                    
                   
                    
                </div>
                 

            </React.Fragment>
           
        )
    }

    handleClick = (e) => {
        const { context } = this.props;
        if(e.target.innerHTML === "Add Account") {
            this.props.context.actions.showAccounts()
        }
        else if(e.target.innerHTML === "Add Expense") {
            this.props.context.actions.showExpenses()
        }
        else if(e.target.innerHTML === "Delete Account") {
            this.props.context.actions.showDeleteAccount()
        } else {
            this.props.context.actions.showDeleteExpense()
        }
    }  
  
   
}

