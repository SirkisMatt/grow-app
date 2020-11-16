import React from 'react'
import './Goal.css'


export default class Goal extends React.Component {


    render() {
        const { id, title, description, dateCreated, treeBet, treeOrg, goalTypeId } = this.props
        return (
            <div className="Card">
                <header>
                    <h3>{title}</h3>
                </header> 
                {description}
                {dateCreated}
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