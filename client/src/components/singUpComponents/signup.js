import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { register } from '../userFunctions';

/*
    need to verify that the email has a .com .anything at the end of string
*/

//Error function
//renders the error message
function Error(props) {
    return(
        <div>
            <h3 className='error'>{props.message}</h3>
        </div>
    );
}

/*
This is the sign up form, we can have a search bar for users to pick their cuny school
*/
class SignUp extends Component {
    constructor(){
        super();

        this.state = {
            error: '',
            formStatus: false,
            callBackResponce: false,
            client: {
                fname : '', 
                lname : '',   
                username : '',
                school : '',  
                email : '',
                password : '',
                password2: '',
            }
         };


    }

    //check if the passwords are identical 
    //set to true
    //if no match set back to false
    passwordMatch() {
        if(this.state.client.password === this.state.client.password2){
            this.setState({formStatus: !this.state.formStatus})
        }else {
            this.setState({formStatus: false})
        }   
    }
    
    onChange(e) {
        const client = this.state.client;
        const field = e.target.name;
        client[field] = e.target.value;
        //get a cb if we change pass2
        //call passwordMatch to check if passwords are the same
        this.setState({ client }, () => {
            if (field === 'password2'){
                console.log('testpas')
                this.passwordMatch();
            }
        });
    }

    onSubmit(e) {
        e.preventDefault();
        //if we have have all valid fields 
        //create a new user
        if(this.state.formStatus){
            const newUser = {
                fname : this.state.client.fname,
                lname : this.state.client.lname,
                username : this.state.client.username,
                school : this.state.client.school,
                email : this.state.client.email,
                passw : this.state.client.password,
            }
            //send post request to api
            register(newUser)
            .then(res => {
    
                //if there are any errors 
                //get the message
                let Err = this.state.error;
                Err = res.data.error;
                console.log(res)
                if(Err) {
                    this.setState({ error : Err});
                }
                else {
                    this.setState({ callBackResponce : !this.state.callBackResponce });
                }
            });
        }else {
            this.setState({ error: 'Passwords do not match!'})
        }
       
       
     
    }


    render () {
        const { callBackResponce } = this.state;
        const { error } = this.state;
        

        //if the account was created with success
        //redirect to a new path 
        //we need to also pass down userid to get the unique user
        if(callBackResponce) {
            return <Redirect to="/" />;

        } else {
            return(
                <div className="row justify-content-center">
                <div className="col-md-6 col-sm-12 col-xs-12">
                <Error message={error}/>
                <form name="register" onSubmit={ (e) => this.onSubmit(e)}>
                <div className="form-group">
                    <label>Enter name</label>
                    <div className="form-row">
                        <div className="col">
                        <input name="fname" 
                               type="text" 
                               id="validationTooltip01"
                               className="form-control"
                               placeholder="First name"
                               required
                               onChange = { (e) => this.onChange(e)}
                                ></input>
    
                        </div>
                        <div className="col">
                        <input  name="lname" 
                                type="text" 
                                className="form-control" 
                                placeholder="Last name"
                                required
                                onChange = { (e) => this.onChange(e)}
                                ></input>
    
                        </div>
                    </div>
                    <label>Enter a username</label>
                    <input name="username" 
                           className="form-control" 
                           id="username" 
                           type="text"
                           required
                           onChange = { (e) => this.onChange(e)}
                           ></input>
    
                    <label>Enter school</label>
                    <input name="school" 
                           className="form-control" 
                           id="school" 
                           type="text"
                           required
                           onChange = { (e) => this.onChange(e)}
                           ></input>
    
                    <label>Enter CUNY email</label>
                    <input name="email" 
                           className="form-control" 
                           id="email" 
                           type="email"
                           required 
                           placeholder="example@...cuny.edu"
                           onChange = { (e) => this.onChange(e)}
                          ></input>
    
                    <label>Password</label>
                    <input name="password" 
                           className="form-control" 
                           id="password" 
                           type="password"
                           required
                           onChange = { (e) => this.onChange(e)}
                           ></input>
    
                    <label>Repeat Password</label>
                    <input name="password2" 
                           className="form-control" 
                           id="password2" 
                           required
                           type="password"
                           onChange = { (e) => this.onChange(e)}
                           ></input>
                </div>
                    <button type="submit" className="btn btn-primary">Create Account</button>
                </form>
                </div>
                </div>
    
            );
        }
    }
}

export default SignUp;