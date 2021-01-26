import React, { Component } from 'react';
import Goal from '../Goal/Goal'
import './GoalListWrapper.css';

class GoalListWrapper extends Component {
    
    static defaultProps = {
        goal: [],
        header: []
      };

    render() {
        
        return (
            <section className="List">
                <header className="List-header">
                    <h2>{this.props.header[0].title}</h2>
                </header>
                <div className="List-cards">
                    {this.props.goal.map((goal) =>
                         <Goal 
                         key={goal.id}
                         id={goal.id}
                         goal={goal}
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
  
}
GoalListWrapper.defaultProps = {
    goal: []
}

export default GoalListWrapper