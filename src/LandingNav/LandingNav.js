import React from 'react'
import { Link } from 'react-router-dom';
import './LandingNav.css'
import whiteTree from '../images/White_Tree.png'

export default function LandingNav(props) {
    return (
        <header className="landing_header">
            <div className='header-logo'>
                <img src={whiteTree} className="tree_outline" alt="white-tree"/>
                <Link to='/' className='site-logo'>Grow</Link>
            </div>
            <nav role="navigation" className="landing-nav">
                <ul>
                        <li><Link to='/login' className='login'>Login</Link></li>
                        <li><button className="signup_btn"><Link to='/signup' className="sign-up">Sign Up</Link></button></li>
                </ul>
            </nav>
        </header>
    )
}