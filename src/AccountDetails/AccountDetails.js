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
                <h3 className="username">Username: {value.user.username}</h3>
                <div className="acc_btn_container">
                    <button
                    className="acc_details_btn"
                    onClick={props.handleEditPayment}
                    >
                            Edit Payment
                    </button>
                    <button
                    className="acc_details_btn"
                    onClick={props.handleDeleteAccount}
                    >
                            Delete Account
                    </button>
                    <button 
                    className="acc_details_btn" 
                    onClick={props.toggleAccountDetails}>
                        Back to Dashboard
                    </button>
                </div>
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
