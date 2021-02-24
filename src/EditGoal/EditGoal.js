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


    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          background: '#fff',
          borderColor: '#9e9e9e',
          minHeight: '38px',
          height: '38px',
          maxWidth: '300px',
          boxShadow: state.isFocused ? null : null,
          
        }),
    
        valueContainer: (provided, state) => ({
          height: '38px',
          padding: '10px 6px'
        }),
    
        input: (provided, state) => ({
          ...provided,
          margin: '5px',
        }),
        indicatorSeparator: state => ({
          display: 'none',
        }),
        indicatorsContainer: (provided, state) => ({
          ...provided,
          height: '32px',
        }),
        menu: (provided, state) => ({
            ...provided,
            maxWidth: '300px',
        })
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