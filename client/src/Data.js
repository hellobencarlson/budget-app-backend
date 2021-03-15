import config from './components/config';

export default class Data {

    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiUrl + path;

        const options = {
            method,
            headers: {
            'Content-Type': 'application/json; charset=utf-8',
            },
        };
    
        if (body !== null) {
            options.body = JSON.stringify(body);
        }
        
        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials} `;
            }

        return fetch(url, options);

        
    };

    async deleteAccount(id) {
        const response = await this.api(`/accounts/${id}`, 'DELETE', null, false, null);
        console.log(response)
        if (response.status === 200) {
            return [];
        } else if (response.status === 401) {
            return response.json().then(data => {
            return data.errors
        });
        } else {
            console.log(response.status);
        }
    }

    async getAccounts() {
         
        const response = await this.api(`/accounts`, 'GET', null, false, null);
        if (response.status === 200) {
          return response.json().then(data => data);
          } else {
            console.log(response.status);
            throw new Error();
          }
      };

    
    async createAccount(accountName, accountBalance, userId, emailAddress, password) {
        
        const response = await this.api('/accounts', 'POST', { "accountName": accountName, "accountBalance": accountBalance, "userId": userId }, true, { emailAddress, password });
        
        if (response.status === 201) {
        console.log(response.status);
        return []; // empty array
        } else if (response.status === 500) {
        return response.json().then(data => {
            return data.errors // array of errors
        }); 
        } else {
        console.log(response.status);
        throw new Error();
        }
    };

    async getExpenses() {
         
        const response = await this.api(`/expenses`, 'GET', null, false, null);
        if (response.status === 200) {
          return response.json().then(data => data);
          } else {
            console.log(response.status);
            throw new Error();
          }
      };

    
    async createExpense(expenseName, expenseCost, userId, emailAddress, password) {
        
        const response = await this.api('/expenses', 'POST', { "expenseName": expenseName, "expenseCost": expenseCost, "userId": userId }, true, { emailAddress, password });
        
        if (response.status === 201) {
        console.log(response.status);
        return []; // empty array
        } else if (response.status === 500) {
        return response.json().then(data => {
            return data.errors // array of errors
        }); 
        } else {
        console.log(response.status);
        throw new Error();
        }
    };

    async updateAccount(accountId, accountName, accountBalance) {
        const response = await this.api(`/accounts/${accountId}`, 'PUT', { "accountName": accountName, "accountBalance": accountBalance }, false, null);
        if (response.status === 204) {
          console.log('success');
          return []; // empty array
          } else {
            return response.json().then(data => {
              return data.errors // array of errors
            }); 
          }
      };

    
      async updateExpense(accountId, expenseName, expenseCost) {
        const response = await this.api(`/expenses/${accountId}`, 'PUT', { "expenseName": expenseName, "expenseCost": expenseCost }, false, null);
        if (response.status === 204) {
          console.log('success');
          return []; // empty array
          } else {
            return response.json().then(data => {
              return data.errors // array of errors
            }); 
          }
      };

      async deleteExpense(id) {
        const response = await this.api(`/expenses/${id}`, 'DELETE', null, false, null);
        console.log(response)
        if (response.status === 200) {
            return [];
        } else if (response.status === 401) {
            return response.json().then(data => {
            return data.errors
        });
        } else {
            console.log(response.status);
        }
    }
  
    async createUser(user) {
      const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
          return []; // empty array
          } else if (response.status === 400) {
            return response.json().then(data => {
              return data.errors // array of errors
            }); 
          } else {
            console.log(response.status);
            //throw new Error();
          }
    }

    async getUser(emailAddress, password) {
      const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password } );
      if (response.status === 200) {
        return response.json().then(data => data); 
      } else if (response.status === 401) {
        return null;
      } else {
        throw new Error();
      }
    }

}