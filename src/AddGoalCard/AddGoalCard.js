import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';
import ApiContext from '../ApiContext'
import './AddGoalCard.css'

export default class AddGoalCard extends Component {

    static defaultProps = {
        children: <div>Empty Modal</div>,
        customClass: '',
        show: false,
        firstGoal: false,
        closeCallback: () => (false),
        userId: ""
      };

      static contextType = ApiContext;

      handleSubmit = (e) => {
        e.preventDefault(e)

        //format new user to add to dummy-store
        const newGoal = {
            id: 5,
            title: e.target['goal-title'].value,
            description: e.target['description'].value,
            date_created: new Date().toString(),
            tree_bet: e.target['tree_bet'].value,
            tree_org: e.target['tree_org'].value,
            complete_by: e.target['complete_by'].value,
            completed: false,
            user_id: this.props.userId,
            goal_type_id: e.target['GoalOptions'].value
        }

        const goalType = {
            user_id: this.props.userId,
            goal_type_id: e.target['GoalOptions'].value,
            card_ids: newGoal.id 
        }


        this.context.addGoal(newGoal)
        this.context.addGoalType(goalType)
    
        //this.props.history.push(`/dashboard/${this.props.userId}`)
    }

    render() {
        const { customClass, show, closeCallback, firstGoal } = this.props
        const { goal_type=[] } = this.context
        return (
            <div className={`modal ${customClass}`} style={{ display: show ? 'block' : 'none'}}>
                <div className="overlay" onClick={closeCallback}>></div>
                    <div className="modal_content">
                        {firstGoal && <h3>Lets Get Started!</h3>}
                        <form className="add-goal" onSubmit={this.handleSubmit}>
                            <label htmlFor="goal-type">What type of goal is this?</label>
                            <select name="GoalOptions" id="GoalOptions">
                                {goal_type.map(goal_type =>
                                    <option value={goal_type.id}key={goal_type.id}>
                                        {goal_type.title}
                                    </option>
                                )}
                            </select>
                            <br/>
                                <input htmlFor="goal-title" placeholder='Whats your goal?' type="text" name='goal-title' id='goal-title' />
                                <br/>
                            <textarea className="description" name="description" rows="10" cols="30" placeholder='description'/>
                            <br/>
                            <div>
                                <label htmlFor="tree-bet">Tree bet: </label>
                                <input placeholder="1" type="number" id="tree_bet" name="tree_bet" min="1"/>
                            </div>
                            <br/>
                            <div>
                                <label htmlFor="tree-org">Choose an organization: </label>
                                <select id="tree_org" name="tree_org">
                                    <option value="one-tree-planted">one-tree-planted</option>
                                    <option value="WebForest">WebForest</option>
                                    <option value="TIST">TIST</option>
                                </select>
                            </div>
                            <br/>
                            <div>
                                <label htmlFor="due-date">Goal complete by: </label>
                                <input type="date" id="complete_by" name="complete_by"/>
                            </div>
                            <br/>
                            <button onClick={closeCallback}>Add Goal!</button>
                        </form>
                            <button title="Close" className="close_modal" onClick={closeCallback}>
                                <i className="fas fa-times">X</i>
                            </button>
                    </div>
            </div>
        )
    }
}