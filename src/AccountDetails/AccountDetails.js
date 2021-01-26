import React, { useEffect, useContext  } from 'react'
import ApiContext from '../ApiContext'
import './AccountDetails.css'


function AccountDetails(props) {

    const value = useContext(ApiContext)

    useEffect(() => {
        if (value.user.length === 0) {
        props.handleLogout()
        }
      }, [])

    return (
         <div className={`modal_account_details ${props.customClass}`} style={{ display: props.show ? 'block' : 'none'}}>
         <div className="overlay_account_details" ></div>
             <div className="modal_content_account_details">
                <h1 className="title">Account Details</h1>
                    <nav>
                        <button className="btn" onClick={props.toggleAccountDetails}>Back to Dashboard</button>
                    </nav>
                <h3 className="username">{value.user.username}</h3>
                <button
                className="btn"
                onClick={props.handleEditPayment}
                >
                        Edit Payment
                </button>
                <button
                className="btn"
                onClick={props.handleDeleteAccount}
                >
                        Delete Account
                </button>
             </div>
            
     </div>
    )
    
}

export default AccountDetails
