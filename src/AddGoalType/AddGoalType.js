import React, {Component} from 'react'
import ApiContext from '../ApiContext'

export default class AddGoalType extends Component {
    static contextType = ApiContext;
    render() {
        const { goal_type=[] } = this.context
        return (
            <form className="add-goal-type">
                <label for="GoalOptions">Choose a Goal Type:</label>
                <select name="GoalOptions" id="GoalOptions">
                    {goal_type.map(goal_type =>
                        <option key={goal_type.id}>
                            {goal_type.title}
                        </option>
                    )}
                </select>
            </form>
        )
    }
}

