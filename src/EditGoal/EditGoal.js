import React, { useState, useContext } from 'react'
import Axios from 'axios';
import ApiContext from '../ApiContext'
import './EditGoal.css'

function EditGoal(props) {

    const value = useContext(ApiContext)

    const [title, updateTitle] = useState(props.goalToEdit.title)
    const [description, updateDescription] = useState(props.goalToEdit.description)
    const [treeBet, updateTreeBet] = useState(props.goalToEdit.tree_bet)
    const [completeBy, updateCompleteBy] = useState(props.goalToEdit.complete_by)



    function handleSubmit(e) {
        e.preventDefault()
        const userId = value.user.id
        const id = props.goalToEdit.id
        Axios.patch(`http://localhost:8000/api/goals/${userId}/${id}`, {
            title: title,
            description: description,
            tree_bet: treeBet,
            complete_by: completeBy,
            completed: false,
            user_id: value.userId,
            goal_type_id: e.target['GoalOptions'].value
        })          
        .then(goal => {
            console.log(goal.data)
            value.patchGoal(goal.data)
            closeCallback()
        })
        .catch(error => {
            console.log(error)
        })
    
    }

    function handleTitleChange(e) {
        e.preventDefault(e)
        updateTitle(e.target.value)
        //console.log(e.target.value)
    }

    function handleDescriptionChange(e) {
        e.preventDefault(e)
        updateDescription(e.target.value)
    }

    function handleTreeBetChange(e) {
        e.preventDefault(e)
        updateTreeBet(e.target.value)
    }

    function handleCompleteBy(e) {
        e.preventDefault(e)
        updateCompleteBy(e.target.value)
    }
        const { customClass, show, closeCallback, goalToEdit } = props
        const { goal_types } = value
        const goalType = goal_types.filter(type => type.id === goalToEdit.goal_type_id)

        return (
            <div className={`modal_edit_goal ${customClass}`} style={{ display: show ? 'block' : 'none'}}>
                <div className="overlay_edit_goal" onClick={closeCallback}>></div>
                    <div className="modal_content_edit_goal">
                        <form className="edit_goal" onSubmit={handleSubmit}>
                            <label htmlFor="goal-type">What type of goal is this?</label>
                            <select name="GoalOptions" id="goal-options" >
                            <option value={goalType[0].id} disabled hidden selected>{goalType[0].title}</option>
                                {goal_types.map(goal_type =>
                                    <option value={goal_type.id} key={goal_type.id}>
                                        {goal_type.title}
                                    </option>
                                )}
                            </select>
                            <br/>
                                <input htmlFor="goal-title" placeholder={title} onChange={handleTitleChange} type="text" name='goal-title' id='goal-title' />
                                <br/>
                            <textarea className="description" name="description" onChange={handleDescriptionChange} rows="10" cols="30" placeholder={description}/>
                            <br/>
                            <div>
                                <label htmlFor="tree-bet">Tree bet: </label>
                                <input placeholder={goalToEdit.tree_bet} onChange={handleTreeBetChange} type="number" id="tree_bet" name="tree_bet" min="1"/>
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
                                <input onChange={handleCompleteBy} type="date" id="complete_by" name="complete_by" placeholder="01/13/2021"/>
                            </div>
                            <br/>
                            <button>Save</button>
                            {/* <button onClick={closeCallback}>Cancel</button> */}
                        </form>
                            <button title="Close" className="close_modal" onClick={closeCallback}>
                                <i className="fas fa-times">X</i>
                            </button>
                    </div>
            </div>
        )
    }

EditGoal.defaultProps = {
    children: <div>Empty Modal</div>,
    customClass: '',
    show: false,
    closeCallback: () => (false),
    goalTypes: [],
    userId: ""
};

export default EditGoal;