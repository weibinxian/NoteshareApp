import axios from 'axios';

/*
    Post request to api, to register new user to database 
*/
export const register = newUser => {
    return axios
    .post('api/account/signup', {
         fname : newUser.fname,
         lname : newUser.lname,
         username : newUser.username,
         school : newUser.school,
         email : newUser.email,
         passw : newUser.passw,
    });
}

/*
    Post reqest to api, to login in and user authentication 
*/
export const loginAccount = User => {
    return axios
    .post('api/account/signin', {
        email: User.email,
        password: User.password,
    });
}
