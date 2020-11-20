import React from 'react';
import Goal from '../Goal/Goal'
import './GoalListWrapper.css';

function GoalListWrapper(props) {
    // static defaultProps = {

    // }


    //console.log(props)
    return (
        <section className="List">
            <header className="List-header">
                <h2>{props.header[0].title}</h2>
                <h2>Hello</h2>
            </header>
            <div className="List-cards">
                {props.goal.map((goals) =>
                     <Goal 
                     id={goals.id}
                     title={goals.title}
                     description={goals.description}
                     dateCreated={goals.date_created}
                     treeBet={goals.tree_bet}
                     treeOrg={goals.tree_org}
                     />
                )}
                {/* <button
                    type="button"
                    className="List-add-button"
                    onClick={() => props.onClickAdd(props.id)}
                >
                    + Add Random Card
                </button> */}
            </div>
        </section>
    )
}
GoalListWrapper.defaultProps = {
    goal: []
}

export default GoalListWrapper