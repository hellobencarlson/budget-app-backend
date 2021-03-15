import React, { Component } from 'react';

import Col from 'react-bootstrap/Col';

export default class Expense extends Component {

    state = {
        expenseName: "",
        expenseCost: "",
        expenseId: "",
        errors: []
    }


    render() {

        const {
            errors
        } = this.state;

        return (
            <div>
                <div className="form-group row" id="row1">
                    <label className="form-label col-form-label col" med="4">{this.props.expenseName}</label>
                    <Col med="8">
                        <input type="number" className="form-control" defaultValue={this.props.expenseCost} id={this.props.id} onChange={this.change} />
                    </Col>
                   
                </div>
            </div>
    
        )
    }

    change = (event) => {
   
        const { context } = this.props;
        // don't bother putting change in state bc update on change, not on submit
        
        setTimeout(delay, 1000);
        function delay() {

            const expenseName = event.target.parentNode.previousElementSibling.innerHTML;
            const expenseCost = event.target.value;
            console.log(expenseCost);
            let accountId = event.target.id;
            
            context.data.updateExpense(accountId, expenseName, expenseCost)
                .then( errors => {
                    if (errors.length) {
                    console.log(errors);
                    const list = [];
                    for (var i = 0; i < errors.length; i++) {
                        list.push(errors[i].message)
                        this.setState({
                        errors: list,
                        })
                    }
                    } else {
                        console.log('Successful update');
                        window.location.href = "/accounts"
                        }
                }).catch((errors) => {
                    console.log(errors);
            
            });
        };
    };


}
