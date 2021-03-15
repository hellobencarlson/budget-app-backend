import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Jumbotron from 'react-bootstrap/Jumbotron';

const Error = () => (

    <Jumbotron>
        <h1>Error</h1>
        <Alert variant="warning">
                Sorry! There has been an error.
        </Alert>
        
    </Jumbotron>
      

);

export default Error; 