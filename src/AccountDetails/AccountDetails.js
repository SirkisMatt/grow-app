import React, { useState, useEffect, useContext  } from 'react'
import ApiContext from '../ApiContext'


function AccountDetails(props) {

    const value = useContext(ApiContext)

    useEffect(() => {
        if (value.user.length === 0) {
        props.history.push(`/login`)
        }
      }, [])

    const handleClick = () => {
        props.history.goBack()
    }



    return (
        <div>
            <nav>
                <button onClick={handleClick}>Back to Dashboard</button>
            </nav>
            <h2>{value.user.username}</h2>
            <div>
            <button>
                Edit Payment
            </button>
            <button>
                Delete Account
            </button>
            </div>
        </div>
    )
    
}

export default AccountDetails
