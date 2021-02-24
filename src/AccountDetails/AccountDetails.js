import React, { useContext  } from 'react'
import ApiContext from '../ApiContext'
import './AccountDetails.css'


function AccountDetails(props) {

    const value = useContext(ApiContext)

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

AccountDetails.defaultProps = {
    show: false,
    customClass: '',
    toggleAccountDetails: '',
    handleEditPayment: '',
    handleDeleteAccount: '',
    // handleLogout: '',
};


export default AccountDetails
