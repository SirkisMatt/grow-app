import React, { useState, useContext } from 'react'
import Select from 'react-select'
import Axios from 'axios';
import ApiContext from '../ApiContext'
import './EditGoal.css'

function EditGoal(props) {

    const value = useContext(ApiContext)

    const [title, updateTitle] = useState(props.goalToEdit.title)
    const [description, updateDescription] = useState(props.goalToEdit.description)
    const [treeBet, updateTreeBet] = useState(props.goalToEdit.tree_bet)
    const [completeBy, updateCompleteBy] = useState(props.goalToEdit.complete_by)
    const [error, toggleError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')



    function handleSubmit(e) {
        e.preventDefault()
        const userId = value.user.id
        const id = props.goalToEdit.id
        Axios.patch(`https://immense-lowlands-49270.herokuapp.com/api/goals/${userId}/${id}`, {
            title: title,
            description: description,
            tree_bet: treeBet,
            complete_by: completeBy,
            completed: false,
            user_id: value.userId,
            goal_type_id: e.target['GoalOptions'].value
        })          
        .then(goal => {
            if (goal.status === 201) {
                value.patchGoal(goal.data)
                toggleError(false)
                setErrorMessage('')
                closeCallback()
            } else {
                throw Error
            }
        })
        .catch(error => {
            if (error.response.status === 400) {
                toggleError(true)
                setErrorMessage(error.response.data.error.message)
            } else {
                toggleError(true)
                setErrorMessage('Sorry there seems to be a problem with processing your request')
            }
        })
    
    }

    function handleTitleChange(e) {
        e.preventDefault(e)
        updateTitle(e.target.value)
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

    //This block sets up the default value for the goalType dropdown and object for Select
    const { goal_types } = value
    const goalType = goal_types.filter(type => type.id === goalToEdit.goal_type_id)
    const options = goal_types.map(type => {
        const container = {}

        container['value'] = type.id
        container['label'] = type.title

        return container
    })

    const firstValue = options.filter(option => option.value === goalType[0].id)



    const targetHeight = 40;

    const customStyles = {
    control: base => ({
        ...base,
        minHeight: 'initial',
        fontSize: '1rem',
    }),
    //   valueContainer: base => ({
    //     ...base,
    //     height: `${targetHeight - 1 - 1}px`,
    //     padding: '0px 8px',
    //   }),
    clearIndicator: base => ({
        // ...base,
        padding: `${(targetHeight - 20 - 1 - 1) / 2}px`,
    }),
    dropdownIndicator: base => ({
        ...base,
        padding: `${(targetHeight - 20 - 1 - 1) / 2}px`,
        zIndex: 500
    }),
    };


    return (
        <div className={`modal_edit_goal ${customClass}`} style={{ display: show ? 'block' : 'none'}}>
            <div className="overlay_edit_goal" onClick={closeCallback}></div>
                <div className="modal_content_edit_goal">
                    <form className="edit_goal" onSubmit={handleSubmit}>
                        <div className="goalType_container">
                                
                            <label htmlFor="goal-type">What type of goal is this?</label>
                            <div className="select_control">
                                <Select classNamePrefix="mySelect" styles={customStyles} name="GoalOptions" defaultValue={firstValue} options={options}/>
                            </div>
                        </div>

                        <div className="title_container">
                            {error && <h3>{errorMessage}</h3>}
                            <label htmlFor="title">Title: </label>
                            <input htmlFor="goal-title" defaultValue={title} onChange={handleTitleChange} type="text" name='goal-title' id='goal-title' />
                        </div>
                        <div className="description_container">
                            <label htmlFor="description">Description: </label>
                            <br/>

                            <textarea className="description" name="description" onChange={handleDescriptionChange} rows="10" cols="30" defaultValue={description}/>
                        </div>
                           
                      
                        <div className="tree_bet_container">
                            <label htmlFor="tree-bet">Tree bet: </label>
                            <input defaultValue={goalToEdit.tree_bet} onChange={handleTreeBetChange} type="number" id="tree_bet" name="tree_bet" min="1"/>
                        </div>
                      
                        <div className="due_date_container">
                            <label htmlFor="due-date">Complete by: </label>
                            <input onChange={handleCompleteBy} type="date" id="complete_by" name="complete_by" defaultValue={goalToEdit.complete_by}/>
                        </div>
                       
                        <button className="edit_goal_btn" type="submit">Save</button>
                        <button
                        className='cancel_btn'
                        type='button'
                        onClick={closeCallback}
                        >
                            Cancel
                        </button>
                    </form>
                        
                        <button title="Close" className="close_modal" onClick={closeCallback}>
                            <i className="fas fa-times"></i>
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