//src/components/nav/navbar.js

import React from 'react';
import { link } from 'react-router-dom';
import './navbar.css';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    //selectively render links dependent on whether the user is logged in
    getLinks() {
        if (this.props.loggedIn) {
            retrun (
                <div>
                    <Link to = {'/tweets'}>All Tweets</Link>
                    <Link to = {'/profile'}>Profile</Link>
                    <Link to = {'/new_tweets'}>Write a Tweet</Link>
                    <button onClick = {this.logoutUser}>Logout</button>
                </div>
            );
        } else {
            return (
                <div>
                    <Link to = {'/signup'}>Signup</Link>
                    <Link to = {'/login'}>Login</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h1>Chirper</h1>
                { this.getLinks() }
            </div>
        );
    }
}

export default NavBar;