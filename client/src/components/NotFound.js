import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Jumbotron from 'react-bootstrap/Jumbotron';

const NotFound = () => (

    <Jumbotron>
        <h1>Page Not Found</h1>
        <Alert variant="warning">
                Sorry! The page you were looking for was not found.
        </Alert>
        
    </Jumbotron>
      

);

export default NotFound; 

