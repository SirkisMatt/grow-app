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
                    {this.props.goal.map((goals) =>
                         <Goal 
                         key={goals.id}
                         id={goals.id}
                         title={goals.title}
                         description={goals.description}
                         dateCreated={goals.date_created}
                         treeBet={goals.tree_bet}
                         treeOrg={goals.tree_org}
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