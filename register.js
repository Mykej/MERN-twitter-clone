//register.js
//The new validation will require two password fields to be passed on registration so that we can check whether they match:
//import validator and validText from respective library or file
const Validator = require('validator');//library/installation
const validText = require('./valid-text')//file

module.exports = function validateRegisterInput(data) {
    let errors = {};

    //Ternary operators that check if handle, email, password, password2 are strings. If so they will return respective field if not they will return empty strings
    data.handle = validText(data.handle) ? data.handle : '';
    data.email = validText(data.email) ? data.email : '';
    data.password = validText(data.password) ? data.password : '';
    data.password2 = validText(data.password2) ? data.password2 : '';

    //if statement to check if length of handle meets the requirements
    if(!Validator.isLength(data.handle, { min: 2, max: 30 })) {
        errors.handle = 'Handle must be between 2 and 30 characters';
    }

    //if statement to check if handle is empty, if empty error string is returned
    if(Validator.isEmpty(data.handle)) {
        errors.handle = 'Handle field is required';
    }

    //if statement to check if email field is empty, if empty error string is returned
    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    //if statement to check if email is valid, if invalid error string is returned
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    //if statement to check if password is empty, if empty error sting is returned
    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    //if statement to check if password meets the requirements, if not error string is returned
    if(!Validator.isLength(data.password, { min: 6, max: 30})) {
        errors.password = 'Password must be at least 6 characters';
    }

    //if statement to check if password2 field is generated, if empty error string is returned
    if(Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm Password field is required';
    }

    //if statement to check if password and password2 match, if they don't error string is returned
    if(!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};