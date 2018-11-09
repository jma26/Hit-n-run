const Validator = require('validator');

module.exports = function validateRegistration(data) {
  let errors = {};
  if(Validator.isEmpty(data.firstName)) {
    errors.firstNameEmpty = 'First Name field is required.';
  }
  if(!Validator.isLength(data.firstName, {min: 3, max: 18})) {
    errors.firstNameLength = 'First Name has to be between 3 and 18 characters long.';
  }
  if(Validator.isEmpty(data.lastName)) {
    errors.lastNameEmpty = 'Last Name field is required.';
  }
  if(!Validator.isLength(data.lastName, {min: 3, max: 18})) {
    errors.lastNameLength = 'Last Name has to be between 3 and 18 characters long.';
  }
  if(Validator.isEmpty(data.email)) {
    errors.emailEmpty = 'Email field is required.';
  }
  if(!Validator.isEmail(data.email)) {
    errors.emailInvalid = 'Email address is not valid.';
  }
  if(Validator.isEmpty(data.password)) {
    errors.passwordEmpty = 'Password Field is required.';
  }
  if(!Validator.isLength(data.password, {min: 8, max: 32})) {
    errors.passwordLength = 'Password has to be between 8 and 32 characters long.';
  }
  if(data.password !== data.confirmPassword) {
    errors.passwordNotMatching = 'Passwords are not matching.';
  }
  if(errors.firstNameEmpty || errors.firstNameLength || errors.lastNameEmpty || errors.lastNameLength || errors.emailEmpty || errors.emailInvalid || errors.passwordEmpty || errors.passwordLength || errors.passwordNotMatching) {
    return errors;
  } else {
    return true;
  }
};