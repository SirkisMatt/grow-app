import React, { Component } from 'react'
import Axios from 'axios';
import ApiContext from '../ApiContext'
import './AddGoalCard.css'

export default class AddGoalCard extends Component {

    static defaultProps = {
        children: <div>Empty Modal</div>,
        customClass: '',
        show: false,
        firstGoal: false,
        closeCallback: () => (false),
        goalTypes: [],
        userId: ""
    };

    static contextType = ApiContext;

    handleSubmit = (e) => {
        e.preventDefault(e)

        Axios.post("http://localhost:8000/api/goals", {
            title: e.target['goal-title'].value,
            description: e.target['description'].value,
            tree_bet: e.target['tree_bet'].value,
            complete_by: e.target['complete_by'].value,
            completed: false,
            user_id: this.props.userId,
            goal_type_id: e.target['GoalOptions'].value
        })          
        .then(goal => {
            this.context.addGoal(goal.data)
        })
        .catch(error => {
            console.log(error)
        })
    
    }

    render() {
        const { customClass, show, closeCallback, goals, goalTypes } = this.props
        return (
            <div className={`modal ${customClass}`} style={{ display: show ? 'block' : 'none'}}>
                <div className="overlay" onClick={closeCallback}>></div>
                    <div className="modal_content">
                        <form className="add-goal" onSubmit={this.handleSubmit}>
                            {goals.length === 0 && <h3>Lets Get Started!</h3>}
                            <label htmlFor="goal-type">What type of goal is this?</label>
                            <select name="GoalOptions" id="goal-options">
                                {goalTypes.map(goal_type =>
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
                            {/* <div>
                                <label htmlFor="tree-org">Choose an organization: </label>
                                <select id="tree_org" name="tree_org">
                                    <option value="one-tree-planted">one-tree-planted</option>
                                    <option value="WebForest">WebForest</option>
                                    <option value="TIST">TIST</option>
                                </select>
                            </div> */}
                            <div>
                                <label htmlFor="due-date">Complete by: </label>
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