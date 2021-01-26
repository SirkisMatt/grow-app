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
                    //localStorage.setItem('user', JSON.stringify(res.data))
                } else {
                    console.log(res)
                }
            })
            .catch(error => {
                console.log(error)
            })
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