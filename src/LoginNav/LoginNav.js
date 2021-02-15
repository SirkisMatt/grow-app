import React from 'react'
import { Link } from 'react-router-dom';
import './LoginNav.css'
import whiteTree from '../images/White_Tree.png'

export default function LoginNav(props) {
    return (
        <nav role="navigation" className="login-nav">
            <div className='header-logo'>
                <img src={whiteTree} className="tree_outline"/>
                <Link to='/' className='site-logo'>Grow</Link>
            </div>
        </nav>
    )
}