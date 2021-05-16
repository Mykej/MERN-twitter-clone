//src/index.js
import React from 'react';
import ReactDom from 'react-dom';

import Root from './components/root';
import configureStore from './store/store';//from store.js
import jwt_decode from 'jwt-decode';//use this to parse the user's session token
import { setAuthtoken } from './util/session_api_util';//from session_api_util.js
import { logout } from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
  let store;

  //if a returning user has a session token stored in localStorage
  if (localStorage.jwtToken) {

    //set the token as a common header for all axios requests
    setAuthtoken(localStorage.jwtToken);

    //decode the token to obtain the user's information
    const decodedUser = jwt_decode(localStorage.jwtToken);

    //Create a preconfigured state we can immediately add to our store
    const preloadedState = { session: { isAuthenticated: true, user: decodedUser} };

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;

    //If the user's token has expired
    if (decodedUser.exp < currentTime) {
      //logout the user and redirect to the login page
      store.dispatch(logout());
      window.location.href = '/login';
    }
  } else {
    //if this is a first time user, start with an empty store
    store = configureStore({});
  }
  //render our root component and pass in the store as a prop
  const root = document.getElementById('root');
  ReactDom.render(<Root store={store} />, root);
});