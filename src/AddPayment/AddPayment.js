import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './AddPayment.css'

class AddPayment extends Component {
//   handleSubmit = (e) => {
//     e.preventDefault(e)

//     //this.props.history.push(`/dashboard/${newUser}`)
// }



    render() {
        return (
          <div className="payment-wrap">
            <h2>Add method of payment to donate trees!</h2>
            <form className='payment-form'>
              <input placeholder='First Name' type="text" name='first-name' id='first-name' />
              <input placeholder='Last Name' type="text" name='last-name' id='last-name'  />
              <input placeholder='Card Number' type="password" name='card-number' id='card-number' />
              <input placeholder='Expiry Date' type="text" name='expiry-date' id='expiry-date' />
              <input placeholder='CV' type="text" name='cv' id='cv' />
              <button><Link to='/dashboard/1234'>Add Card</Link></button>
            </form>
          </div>
        )
    }
}

export default AddPayment;