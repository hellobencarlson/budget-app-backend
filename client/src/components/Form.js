
import React from 'react';

// provides content to sign up and sign in

export default (props) => {
    const { 
        cancel,
        elements, 
        errors,
        submit
    } = props;


    function handleCancel(event) {
        event.preventDefault();
        cancel();
        // cancel and submit, below, are from props
    }

    function handleSubmit(event) {
        event.preventDefault();
        submit();
    }

    return (
        <div>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
                {elements()} 
                {/* get elements and errors from props */}
                <button type="submit">Submit</button>
                <button onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;

    if (errors.length) {
        errorsDisplay = (
            <div>
                <h2> Validation Error</h2>
                <ul>
                { errors.map((error, i) => <li key={i}> {error} </li>)}   
                </ul>
               
        </div>
        
        );
    }

    return errorsDisplay;
}
