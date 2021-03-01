import React, { useContext, useState } from 'react'
import ApiContext from '../ApiContext'
import Axios from 'axios'
import './CompletedGoal.css'
import EditGoal from '../EditGoal/EditGoal'


function CompleteGoal(props) {

    const value = useContext(ApiContext)

    
    const { title, description, treeBet, id, complete_by} = props

    const [ showModalEdit, toggleModalEdit ] = useState(false)
    

    const handleClickDelete = e => {
        e.preventDefault()
        const userId = value.user.id
        Axios.delete(`https://immense-lowlands-49270.herokuapp.com/api/goals/${userId}/${id}`)
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


    const handleToggle = () => {
        toggleModalEdit(true)
    }



    return (
        <div className="card_completed">
            <header>
                <h3>{title}</h3>
            </header> 
            {description}
            <div className="tree-bet" >
                {(treeBet > 1) ? <p>{treeBet} trees at stake</p> : <p>{treeBet} tree at stake</p>}
                <p>Complete by: {complete_by}</p>
            </div>
            <button
                className='goal_btn'
                type='button'
                onClick={handleToggle}
                >
                    Edit
                </button>
                <button 
                className='goal_btn'
                type='button'
                onClick={handleClickDelete}
                >
                    Delete
                </button>
                {
                    showModalEdit &&
                        <EditGoal
                        show={showModalEdit}
                        closeCallback={() => toggleModalEdit(!showModalEdit)}
                        customClass="custom_modal_class"
                        goalToEdit={props.goal}
                        /> 
                }
        </div>
    )
}

CompleteGoal.defaultProps = {
    goal: []
};


export default CompleteGoal