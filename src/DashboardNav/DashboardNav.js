import React from 'react'
import { Link } from 'react-router-dom';

export default function DashboardNav(props) {
    return (
        <nav role="navigation" className="dashboard-nav">
           <li><Link to='/' className='home'>Grow</Link></li>
        </nav>
    )
}