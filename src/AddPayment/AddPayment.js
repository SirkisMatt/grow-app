import React, { Component } from 'react'

class AddPayment extends Component {
    render() {
        return (
            <form className='payment-form'>
            <div>
              <label htmlFor="first-name">First name on Card</label>
              <input placeholder='First Name' type="text" name='first-name' id='first-name' />
            </div>
            <div>
              <label htmlFor="last-name">Last name on Card</label>
              <input type="text" name='last-name' id='last-name' placeholder='Last Name' />
            </div>
            <div>
              <label htmlFor="card-number">Card Number</label>
              <input type="number" name='card-number' id='card-number' />
            </div>
            <div>
              <label htmlFor="expiry-date">Expiry Date</label>
              <input type="number" name='expiry-date' id='expiry-date' />
            </div>
            <div>
                <label htmlFor="cv">CV</label>
                <input type="number" name='cv' id='cv' />
              </div>
            <a type='submit' href="user-dashboard.html">Add Card</a>
        </form>
        )
    }
}

export default AddPayment;