import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext'
import Axios from 'axios';
//import STORE from './dummy-store'
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


    // handleSubmit = (e) => {
    //     e.preventDefault(e)

    //     this.props.history.push(`/dashboard/1234`)
    // }
   
    handleSubmit = (e) => {
        e.preventDefault(e)

        Axios.post("http://localhost:8000/api/users/login", {
            email: this.state.email.value,
            password: this.state.password.value,
        })          
            // .then((res) => {
            //     if (!res.status.ok)
            //         return res.json().then(e => Promise.reject(e))
            //     return res.json()
            // })
            .then(user => {
                this.context.addUser(user.data)
                this.props.history.push(`/dashboard/${user.data.id}`)
            })
            .catch(error => {
                console.log(error)
                // this.setState({error: true})
            })
    }

    


  render() {
      const emailError = this.ValidateEmail();
    return (
        <div className="login-wrap">
            <h2>Login Here</h2>
            <form className='login-form' onSubmit={this.handleSubmit}>
                  <input placeholder="Email" type="text" name='email' id='email' onChange={e => this.handleEmailChange(e)} />
                  {this.state.email.touched && <ValidationError message={emailError}/>}
                    <input placeholder="Password" type="password" name='password' id='password' onChange={e => this.handlePasswordChange(e)}/>
                    <button type='submit'>
                        Sign In
                    </button>
            </form>
            <p>Don't have an account? <Link to='/signup' className="sign-up">Sign Up</Link></p>
    </div>
    );
  }

}

export default Login;