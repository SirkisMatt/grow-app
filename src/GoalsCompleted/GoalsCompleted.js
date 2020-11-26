import React, { Component } from 'react'

class GoalsCompleted extends Component {

    handleClick = () => {
        this.props.history.goBack()
    }


    render() {
        return (
            <div>
                 <nav>
                    <button onClick={this.handleClick}>Back to Dashboard</button>
                </nav>
                <h2>No goals goals completed.</h2>
            </div>
        )
    }
}



export default GoalsCompleted