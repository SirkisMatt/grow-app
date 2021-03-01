import React from 'react';
import CompletedGoal from '../CompletedGoal/CompletedGoal'
import './CompletedGoalWrapper.css';

function CompletedGoalWrapper(props) {
        
    return (
        <section className="complete_list">
            <header className="complete_list_header">
                <h2>{props.header[0].title}</h2>
            </header>
            <div className="complete_list_cards">
                {props.goal.map((goal) =>
                        <CompletedGoal 
                        key={goal.id}
                        id={goal.id}
                        title={goal.title}
                        description={goal.description}
                        completed={goal.completed}
                        complete_by={goal.complete_by}
                        treeBet={goal.tree_bet}
                        />
                )}
            </div>
        </section>
    )       
}
CompletedGoalWrapper.defaultProps = {
    goal: []
}

export default CompletedGoalWrapper