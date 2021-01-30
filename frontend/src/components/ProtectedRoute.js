import React from 'react';
import { Route, Redirect } from "react-router-dom";


const ProtectedRoute = ({component: Component, ...props}) => {
    
    return(
        <Route>
            {
                () => props.loggedIn ? <Component{...props}/> : <Redirect to="/signin"></Redirect>
            }
        </Route>
    )
}

export default ProtectedRoute;

