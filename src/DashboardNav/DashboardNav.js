import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'
import './DashboardNav.css'

class DashboardNav extends Component {

    constructor() {
        super()
        this.state = {
            toggle: false
        }
    }

    toggleNavLinks = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    render() {
        console.log(this.state.toggle)
        return (
            <div>
                <nav role="navigation" className="dashboard-nav">
                    <div className="tree-count">
                        <p><span id="tree-number"> 4 </span>Trees planted this month</p>
                    </div>
                    <div className='grow-title'>
                            <Link to='/' className='home'>Grow</Link>
                    </div>
                    <FaBars className="toggle-button" onClick={this.toggleNavLinks}/>
                </nav>
                <div className="navbar-links" style={{display: this.state.toggle ? "inherit" : "none"}}>
                    <ul >
                        <li><Link to='/account/:userId' >Account Details</Link></li>
                        <li><Link to='/goals-completed/:userId'>Goals Completed</Link></li>
                        <li>Log Out</li>
                    </ul>
                </div>
            </div>
          
        )
    }
    
}

export default DashboardNav