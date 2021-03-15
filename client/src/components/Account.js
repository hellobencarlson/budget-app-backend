import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';

export default class Account extends Component {

    state = {
        accountName: "",
        accountBalance: "",
        accountId: "",
        userId: "",
        errors: []
    }


    render() {

        const {
            errors
        } = this.state;

       

        return (
            <div>
                <div className="form-group row" id="row1">
                    <label className="form-label col-form-label col" med="4">{this.props.accountName}</label>
                    <Col med="8">
                        <input type="number" className="form-control" defaultValue={this.props.accountBalance} id={this.props.id} onChange={this.change} />
                    </Col>
                   
                </div>
            </div>
    
        )
    }

    change = (event) => {
   
        const { context } = this.props;

        setTimeout(delay, 1000);
        function delay() {

           
            const accountName = event.target.parentNode.previousElementSibling.innerHTML;
            const accountBalance = event.target.value;
            let accountId = event.target.id;

            context.data.updateAccount(accountId, accountName, accountBalance)
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
                      window.location.href = "/accounts";
                     }
            }).catch((errors) => {
                console.log(errors);
                // this.props.history.push('/error');
            });
        }
      
    };


}
