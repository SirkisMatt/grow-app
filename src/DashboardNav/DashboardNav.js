import React from 'react'
import { Link } from 'react-router-dom';
import './DashboardNav.css'

export default function DashboardNav(props) {
    return (
        
        <nav role="navigation" className="dashboard-nav">
            <ul>
                <li><Link to='/' className='home'>Grow</Link></li>
                {!props.loggedIn && <div className="not-loggedin">
                    <li><Link to='/login' className='login'>Login</Link></li>
                    <li><Link to='/signup' className="sign-up">Sign Up</Link></li>
                </div>}
            </ul>
        </nav>
    )
}