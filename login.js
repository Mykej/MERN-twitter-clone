//login.js
//import validator and validText from respective library and/or file
const Validator = require('validator');//installation/library
const validText = require('./valid-text');//file

module.exports = function validateLoginInput(data){
    let errors = {};

    //ternary operator that says if the email is a string return the email if not return empty string
    data.email = validText(data.email) ? data.email : '';
    data.password = validText(data.password) ? data.password : '';

    //if statement that says if the entered email is not valid return email error with the Email is invalid string
    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    //if statement that says if the email field is empty return the error "email field is required string"
    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    //if statement that says if the password field is empty return the error 'Password field is required' string
    if(Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }


    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}