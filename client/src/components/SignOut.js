import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export default ({ context }) => {
    
    useEffect(() => context.actions.signOut());
    // waits to signOut until after UserSignOut component renders
    // signOut function in context
    

    return (
     <Redirect to="/signin" />
     // go to home
    );
}