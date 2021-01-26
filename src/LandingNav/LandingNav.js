import React from 'react'
import { Link } from 'react-router-dom';
import './LandingNav.css'

export default function LandingNav(props) {
    return (
        <nav role="navigation" className="landing-nav">
            <ul>
                <li><Link to='/' className='home'>Grow</Link></li>
                {!props.loggedIn 
                ? 
                    <div className="not-loggedin">
                        <li><Link to='/login' className='login'>Login</Link></li>
                        <li><button className="signup_btn"><Link to='/signup' className="sign-up">Sign Up</Link></button></li>
                    </div> 
                :
                    <div className="account-details">
                        <li>Account Details</li>
                    </div>
                }
            </ul>
        </nav>
    )
}