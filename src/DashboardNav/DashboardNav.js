import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'
import ApiContext from '../ApiContext'
import AccountDetails from '../AccountDetails/AccountDetails'
import DeleteAccount from '../DeleteAccount/DeleteAccount'
import whiteTree from '../images/White_Tree.png'
import './DashboardNav.css'


function DashboardNav(props) {

    
   
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
        alert('account deleted')
    }

    return (
        <header role="navigation" className="dashboard-nav">
                {/* <div className="tree-count">
                    <p><span id="tree-number"> {value.treesDonated} </span>Trees planted!</p>
                </div> */}
                <div className='dashboard-logo'>
                    <img src={whiteTree} className="db-tree-outline" alt="white tree"/>
                    <Link to='/' className='db-site-logo'>Grow</Link>
                </div>
                <FaBars className="toggle-button" onClick={props.toggleNavLinks}/>
            <nav className="navbar-links" style={{display: props.toggle ? "inherit" : "none"}}>
                <ul >
                    <li><button className="nav-btn" onClick={() => toggleAccountDetails(true)}>Account Details</button></li>
                    <li><button className="nav-btn"><Link to='/goals-completed/:userId'>Goals Completed</Link></button></li>
                    <li><button className="nav-btn" onKeyDown={handleLogout} onClick={handleLogout}>Log Out</button></li>
                </ul>
            </nav>
            <AccountDetails
            show={showAccountDetails}
            customClass='custom_account_details'
            toggleAccountDetails={() => toggleAccountDetails(false)}
            handleEditPayment={() => handleEditPayment()}
            handleDeleteAccount={() => handleDeleteAccount()}
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
        </header>
    )
    
}

export default DashboardNav