import React, { useState, } from 'react'

function GoalsCompleted(props) {

   const handleClick = () => {
        props.history.goBack()
    }

        return (
            <div>
                 <nav>
                    <button onClick={handleClick}>Back to Dashboard</button>
                </nav>
                <h2>No goals goals completed.</h2>
            </div>
        )
}



export default GoalsCompleted