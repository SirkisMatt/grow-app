import React, { useContext } from 'react'
import ApiContext from '../ApiContext'
import Axios from 'axios'
import './DueGoal.css'


function DueGoal(props) {

    const value = useContext(ApiContext)
    const { title, description, treeBet, id, complete_by} = props

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
            console.log(goal.data)
            value.patchGoal(goal.data)
        })
        .catch(error => {
            console.log(error)
        })
    
    }

    const handleClickEdit = e => {
        e.preventDefault()
        console.log(e)
    }


    
    if (!props.completed) {
        return (
            <div className="Card">
                <header>
                    <h3>{title}</h3>
                </header> 
                <div className="tree-bet">
                    {(treeBet > 1) ? <p>{treeBet} trees at stake</p> : <p>{treeBet} tree at stake</p>}
                    <p>Complete by: {complete_by}</p>
                </div>

                <button>Grow</button>
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
                onClick={handleClickEdit}
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
            </div>
        )} 
    { 
        return (
        <div></div>
        )
    }

}


export default DueGoal