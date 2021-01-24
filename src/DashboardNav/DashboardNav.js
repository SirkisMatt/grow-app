import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'
import ApiContext from '../ApiContext'
import './DashboardNav.css'


class DashboardNav extends Component {

    constructor() {
        super()
        this.state = {
            toggle: false
        }
    }

    static contextType = ApiContext;

    // logout the user
    handleLogout = () => {
        localStorage.clear();
        this.context.logout()
        this.props.history.push(`/login`)
    };

    toggleNavLinks = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    render() {
        
        return (
            <div>
                <nav role="navigation" className="dashboard-nav">
                    <div className="tree-count">
                        <p><span id="tree-number"> {this.context.treesDonated} </span>Trees planted!</p>
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
                        <li><button onClick={this.handleLogout}>Log Out</button></li>
                    </ul>
                </div>
            </div>
          
        )
    }
    
}

export default DashboardNav