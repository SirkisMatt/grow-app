import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css'

class SignUp extends Component {
  render() {
    return (
        <div>
            <nav role="navigation">
                <ul>
                    <li><Link to='/' className='home'>Grow</Link></li>
                    <li><Link to='/login' className='login'>Login</Link></li>
                </ul>
            </nav>
            <form className='signup-form'>
                <div>
                    <label htmlFor="first-name">First name</label>
                    <input placeholder='First Name' type="text" name='first-name' id='first-name' />
                </div>
                <div>
                    <label htmlFor="last-name">Last name</label>
                    <input type="text" name='last-name' id='last-name' placeholder='Last Name' />
                </div>
                <div>
                    <label htmlFor="username">Email</label>
                    <input type="text" name='username' id='username' />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' id='password' />
                </div>
                <Link to='/dashboard' className='dashboard'>Sign Up</Link>
            </form>
        </div>
    );
  }

}

export default SignUp;