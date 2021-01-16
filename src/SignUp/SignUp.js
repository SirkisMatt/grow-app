import React, {Component} from 'react';
import ApiContext from '../ApiContext'
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import ValidationError from '../ValidationError'
import './SignUp.css'

class SignUp extends Component {

    static contextType = ApiContext;

    constructor() {
        super()
        this.state = {
            error: false,
            userName: {
                value: "",
                touched: false
            },
            email: {
                value: "",
                touched: false
            },
            password: {
                value: "",
                touched: false
            }
        }
    }
    handleUserNameChange = e => {
        this.setState({
            userName: {
                value: e.target.value,
                touched: true
            }
        })
    }

    handleEmailChange = e => {
        this.setState({
            email: {
                value: e.target.value,
                touched: true
            }
        })
    }

    handlePasswordChange = e => {
        this.setState({
            password: {
                value: e.target.value,
                touched: true
            }
        })
    }

    validateEmail = () => {
        //check to see if the email meets syntactical standards. FEW BUGS!!! Doesn't always work
        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email.value))) {
            
            return "You have entered an invalid email address!"
        };
        //check if email already exist in dummy store
        // if(this.context.user.some(user => user.email === this.state.email.value)) {
        //     return "Email already taken."
        // }
            
    }

    handleSubmit = (e) => {
        e.preventDefault(e)

        Axios.post("http://localhost:8000/api/users", {
            username: this.state.userName.value,
            email: this.state.email.value,
            password: this.state.password.value,
        })          
            .then(res => {
                if (res.status === 201) {
                    this.context.addUser(res.data)
                    this.props.history.push(`/dashboard/${res.data.id}`)
                } else {
                    console.log(res)
                }
                // if (user) {
                //     this.props.history.push(`/dashboard/${user.data.id}`)
                // }
                // this.props.history.push(`/dashboard/${user.data.id}`)
            })
            .catch(error => {
                console.log(error)
                // this.setState({error: true})
            })

        // //format new user to add to dummy-store
        // const newUser = {
        //     username: e.target['user-name'].value,
        //     email: e.target['email'].value,
        //     password: e.target['password'].value,
        // }
      
        // //Adds newUser to dummy-store
        // this.context.addUser(newUser)
        // let userId = newUser.id
        // this.props.history.push(`/add-payment/${userId}`)
      
        
    }
   

  render() {
    //validate email before submit
    const emailError = this.validateEmail()
    return (
        <div className="signup-wrap">
            <h2>Sign up Here</h2>
            <form className='signup-form' onSubmit={this.handleSubmit}>
                    <input placeholder='User Name' type="text" name='user-name' id='user-name' onChange={e => this.handleUserNameChange(e)} />
                    <input placeholder='Email' type="text" name='email' id='email' onChange={e => this.handleEmailChange(e)} />
                    {this.state.email.touched && <ValidationError message={emailError} />}
                    <input placeholder='Password' type="password" name='password' id='password' onChange={e => this.handlePasswordChange(e)}/>
                    <button 
                    type='submit'
                    disabled={
                        this.validateEmail()
                    }
                    >
                        Sign Up
                    </button>
            </form>
        </div>
    );
  }

}

export default SignUp;