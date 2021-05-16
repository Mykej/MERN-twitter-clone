//src/util/route_util.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

//passed in from parent component or from mapStateToProps
const Auth = ({ component: Component, path, loggedIn, exact }) => (
    <Route path = {path} exact = {exact} render = {(props) => (
        !loggedIn? (
            <Component {...props} />
        ) : (
            //Redirect to the tweets page if the user is authenticated
            <Redirect to = '/tweets' />
        )
    )} />
);

const Protected = ({ component: Component, loggedIn, ...rest }) => (
    <Route
        {...rest}
        render = {props =>
        loggedIn ? (
            <Component {...props} />
        ) : (
            //Redirect to the login page if the user is aleady authenticated
            <Redirect to = '/login' />
        )
    } />
);

//Use the isAuthenticated slice of state to determine whether a user is logged in

const mapStateToProps = state => (
    {loggedIn: state.session.isAuthenticated}
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));