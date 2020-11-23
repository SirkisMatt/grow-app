import React from 'react'
import './Goal.css'


export default class Goal extends React.Component {


    render() {
        const { title, description, dateCreated, treeBet, treeOrg} = this.props
        return (
            <div className="Card">
                <header>
                    <h3>{title}</h3>
                </header> 
                {description}
                <div className="tree-bet">
                    <p>{treeBet} Trees at Stake</p>
                    <p>Donate to: {treeOrg}</p>
                    <p>Complete by: Friday 11-13-2020</p>
                </div>
                <button>Completed</button>
                <button>Cancel</button>
            </div>
        )
    }
}