import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext'
import Axios from 'axios';
import ValidationError from '../ValidationError'
import './Login.css';

class Login extends Component {

    static contextType = ApiContext;
    

    constructor() {
        super()
        this.state = {
            error: false,
            email: {
                value: "",
                touched: false
            },
            password: {
                value: "",
                touched: false
            },
            invalid: {
                value: "Invalid email or password",
                error: false
            }
        }
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

    ValidateEmail = () => 
    {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email.value))
    {
        return (true)
    }
        return ("You have entered an invalid email address!")
    }

   
    handleSubmit = (e) => {
        e.preventDefault(e)

        Axios.post("https://immense-lowlands-49270.herokuapp.com/api/users/login", {
            email: this.state.email.value,
            password: this.state.password.value,
        })          
            .then(res => {
                if (res.status === 201) {
                    this.context.addUser(res.data)
                    this.getGoalsForUser(res.data.id)
                    
                } else {
                    throw Error
                }
            })
            .catch(error => {
                this.invalid()
            })
    }

    invalid = () => {
        this.setState({
            invalid: {
                value: "Invalid email or password",
                error: true
            }
        })
    }

    getGoalsForUser = (userId) => {
        Axios.get(`https://immense-lowlands-49270.herokuapp.com/api/goals/${userId}`)
        .then(goals => {
         this.context.getGoals(goals.data)
         this.props.history.push(`/dashboard/${userId}`)
        })
        .catch(err => {
            this.setState({
                invalid: {
                    value: "There seems to be a problem fetching your account",
                    error: true
                }
            })
        })
    }
    


  render() {
      const emailError = this.ValidateEmail();
    return (
        <div className="login-wrap">
            <h2>Login Here</h2>
            <form className='login-form' onSubmit={this.handleSubmit}>
                {this.state.invalid.error &&  <ValidationError message={this.state.invalid.value}/>}
                  <input placeholder="Email" type="text" name='email' id='email' onChange={e => this.handleEmailChange(e)} />
                  {this.state.email.touched && <ValidationError message={emailError}/>}
                    <input placeholder="Password" type="password" name='password' id='password' onChange={e => this.handlePasswordChange(e)}/>
                    <button type='submit'>
                        Log In
                    </button>
            </form>
            <p>Don't have an account? <Link to='/signup' className="sign-up">Sign Up</Link></p>
            <p>Demo user: fern@fakeemail.com Password: password</p>
    </div>
    );
  }

}

export default Login;