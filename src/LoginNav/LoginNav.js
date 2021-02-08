import React from 'react'
import { Link } from 'react-router-dom';
import './LoginNav.css'

export default function LoginNav(props) {
    return (
        <nav role="navigation" className="login-nav">
            <ul>
                <li><Link to='/' className='home'>Grow</Link></li>
            </ul>
        </nav>
    )
}