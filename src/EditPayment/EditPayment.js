import React, { useContext } from 'react'
import ApiContext from '../ApiContext'
import { Link } from 'react-router-dom';
import './EditPayment.css'

function EditPayment(props) {
    const value = useContext(ApiContext)

    return (
        <div className="payment-wrap">
        <h2>(App in beta so no payment accepted)</h2>
        <h2>Edit method of payment to donate trees!</h2>
        <form className='payment-form'>
            <input placeholder='First Name' type="text" name='first-name' id='first-name' />
            <input placeholder='Last Name' type="text" name='last-name' id='last-name'  />
            <input placeholder='Card Number' type="password" name='card-number' id='card-number' />
            <input placeholder='Expiry Date' type="text" name='expiry-date' id='expiry-date' />
            <input placeholder='CV' type="text" name='cv' id='cv' />
            <button><Link to={`/dashboard/${value.user.id}`}>Back to Dashboard</Link></button>
        </form>
        </div>
    )
}

export default EditPayment;