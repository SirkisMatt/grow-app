import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'
import ApiContext from '../ApiContext'
import AccountDetails from '../AccountDetails/AccountDetails'
import DeleteAccount from '../DeleteAccount/DeleteAccount'
import './DashboardNav.css'


function DashboardNav(props) {

    
    const [ toggle, toggleNavLinks ] = useState(false)
    const [ showDeleteAccount, toggleDeleteAccount ] = useState(false)
    const [ showAccountDetails, toggleAccountDetails ] = useState(false)

    const value = useContext(ApiContext);

    // logout the user
    const handleLogout = () => {
        value.logout()
        props.history.push(`/login`)
    };

    const handleEditPayment = () => {
        toggleAccountDetails(false)
        props.history.push('/edit-payment')
    }

    const handleDeleteAccount = () => {
        toggleAccountDetails(false)
        toggleDeleteAccount(true)
    }
    const handleExit = () => {
        value.logout()
        props.history.push('/')
    }

    return (
        <div>
            <nav role="navigation" className="dashboard-nav">
                <div className="tree-count">
                    <p><span id="tree-number"> {value.treesDonated} </span>Trees planted!</p>
                </div>
                <div className='grow-title'>
                        <Link to='/' className='home'>Grow</Link>
                </div>
                <FaBars className="toggle-button" onClick={() => toggleNavLinks(!toggle)}/>
            </nav>
            <div className="navbar-links" style={{display: toggle ? "inherit" : "none"}}>
                <ul >
                    <li><button className="btn" onClick={() => toggleAccountDetails(true)}>Account Details</button></li>
                    <li><button className="btn"><Link to='/goals-completed/:userId'>Goals Completed</Link></button></li>
                    <li><button className="btn" onKeyDown={handleLogout} onClick={handleLogout}>Log Out</button></li>
                </ul>
            </div>
            <AccountDetails
            show={showAccountDetails}
            customClass='custom_account_details'
            toggleAccountDetails={() => toggleAccountDetails(false)}
            handleEditPayment={() => handleEditPayment()}
            handleDeleteAccount={() => handleDeleteAccount()}
            handleLogout={() => handleLogout()}
            />
            {
                showDeleteAccount && 
                    <DeleteAccount
                    show={showDeleteAccount}
                    toggleCallback={() => toggleDeleteAccount(!showDeleteAccount)}
                    customClass="delete_account"
                    handleExit={handleExit}
                    handleLogout={() => handleLogout()}
                />
            }
        </div>
    )
    
}

export default DashboardNav