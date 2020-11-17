import React, {Component} from 'react';
import { Link } from 'react-router-dom';
//import STORE from './dummy-store'
import ValidationError from '../ValidationError'
import './Login.css';

class Login extends Component {

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


  render() {
      const emailError = this.ValidateEmail();
    return (
        <div>
        <nav role="navigation" className="login-nav">
            <ul>
            <li><Link to='/' className='home'>Grow</Link></li>
            </ul>
        </nav>
        <main>
            <form className='login-form' onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="username">
                        Email
                    </label>
                  <input type="text" name='email' id='email' onChange={e => this.handleEmailChange(e)} />
                  {this.state.email.touched && <ValidationError message={emailError}/>}
                </div>
                <div>
                    <label htmlFor="password"> 
                        Password
                    </label>
                    <input type="password" name='password' id='password' onChange={e => this.handlePasswordChange(e)}/>
                </div>
                <a href="user-dashboard.html">Sign In</a>
            </form>
            <p>Don't have an account? <Link to='/signup' className="sign-up">Sign Up</Link></p>
        </main>
    </div>
    );
  }

}

export default Login;