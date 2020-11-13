import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext'
import { v4 as uuidv4 } from 'uuid';
import ValidationError from '../ValidationError'
import './SignUp.css'

class SignUp extends Component {

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

    validateEmail = () => {
        //check to see if the email meets syntactical standards. FEW BUGS!!! Doesn't always work
        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email.value))) {
            
            return "You have entered an invalid email address!"
        };
        //check if email already exist in dummy store
        if(this.context.user.some(user => user.email === this.state.email.value)) {
            return "Email already taken."
        }
            
    }

    handleSubmit = (e) => {
        e.preventDefault(e)

        //format new user to add to dummy-store
        const newUser = {
            id: uuidv4(),
            username: e.target['user-name'].value,
            email: e.target['email'].value,
            password: e.target['password'].value,
            date_created: new Date()
        }
      
        //Adds newUser to dummy-store
        this.context.addUser(newUser)
        this.props.history.push(`/dashboard/${newUser.id}`)
      
        
    }
   

  render() {
    //validate email before submit
    const emailError = this.validateEmail()
    return (
        <div>
            <nav role="navigation">
                <ul>
                    <li><Link to='/' className='home'>Grow</Link></li>
                    <li><Link to='/login' className='login'>Login</Link></li>
                </ul>
            </nav>
            <form className='signup-form' onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="user-name">User Name</label>
                    <input placeholder='User Name' type="text" name='user-name' id='user-name' />
                </div>
                <div>
                    <label htmlFor="username">Email</label>
                    <input type="text" name='email' id='email' onChange={e => this.handleEmailChange(e)} />
                    {this.state.email.touched && <ValidationError message={emailError} />}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' id='password' onChange={e => this.handlePasswordChange(e)}/>
                </div>
                <Link to='/dashboard' className='dashboard'>Short Cut</Link>
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