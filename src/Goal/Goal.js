import React, { useContext, useState } from 'react'
import ApiContext from '../ApiContext'
import Axios from 'axios'
import './Goal.css'
import EditGoal from '../EditGoal/EditGoal'


function Goal(props) {

    const value = useContext(ApiContext)

    
    const { title, description, treeBet, id, complete_by} = props

    const [ showModalEdit, toggleModalEdit ] = useState(false)

    const handleClickDelete = e => {
        e.preventDefault()
        const userId = value.user.id
        Axios.delete(`http://localhost:8000/api/goals/${userId}/${id}`)
        .then(res => {
            if(res.status !== 204){
                return res.json().then(e => Promise.reject(e))
            }
            return res
          })
          .then(() => {
            value.deleteGoal(id)
          })
          .catch(err => {
            console.log(err)
          })
    }

    function handleCompletedGoal(e) {
        e.preventDefault()
        const userId = value.user.id
        Axios.patch(`http://localhost:8000/api/goals/${userId}/${id}`, {
            title: title,
            description: description,
            tree_bet: treeBet,
            complete_by: complete_by,
            completed: true,
        })          
        .then(goal => {
            value.patchGoal(goal.data)
        })
        .catch(error => {
            console.log(error)
        })
    
    }

    const handleToggle = () => {
        toggleModalEdit(true)
    }

   

    
    if (!props.completed) {
        return (
            <div className="Card">
                <header>
                    <h3>{title}</h3>
                </header> 
                {description}
                <div className="tree-bet">
                    {(treeBet > 1) ? <p>{treeBet} trees at stake</p> : <p>{treeBet} tree at stake</p>}
                    <p>Complete by: {complete_by}</p>
                </div>
                <button
                className='goal_complete_toggle'
                type='button'
                onClick={handleCompletedGoal}
                >
                    Completed
                </button>
                <button
                className='goal_edit'
                type='button'
                onClick={handleToggle}
                >
                    Edit
                </button>
                <button 
                className='Goal_delete'
                type='button'
                onClick={handleClickDelete}
                >
                    Delete
                </button>

                {showModalEdit &&
                   <EditGoal
                   show={showModalEdit}
                   closeCallback={() => toggleModalEdit(!showModalEdit)}
                   customClass="custom_modal_class"
                   goalToEdit={props.goal}
                 /> 
                }
                
            </div>
        )} 
    { 
        return (
        <div></div>
        )
    }

}


export default Goal