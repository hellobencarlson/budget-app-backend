import React from "react";
import { Route , Redirect } from "react-router-dom";
import { Consumer } from '../Context';

export default ({ component: Component, ...rest }) => {
    // destructures & renames components prop, collects props in a ...rest variable
    return ( // consumer bc then it has access to authUser, etc.
        <Consumer> 
            
            { context => (
                <Route
                    {...rest}
                    render={props => context.authenticatedUser ? (
                        <Component {...props} />
                        // if authenticatedUser, display the component & its props   
                    ) : (
                        <Redirect to={{
                            pathname: '/signin',
                            state: { from: props.location },
                        }}
                        />
                    )}
                />
            )}

        </Consumer>
    )
}