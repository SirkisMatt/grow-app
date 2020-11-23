import React, { Component } from 'react'


class AccountDetails extends Component {

    handleClick = () => {
        this.props.history.goBack()
    }


    render() {
        return (
            <div>
                <nav>
                    <button onClick={this.handleClick}>Back to Dashboard</button>
                </nav>
                <h2>UserName</h2>
                <ul>
                    <li>Edit Payment</li>
                    <li>Delete Account</li>
                </ul>
            </div>
        )
    }
}

export default AccountDetails
