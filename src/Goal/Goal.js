import React, { useContext, useState, useEffect } from 'react'
import ApiContext from '../ApiContext'
import TreeDonatedModal from '../TreeDonatedModal/TreeDonatedModal'
import Axios from 'axios'
import Leaf from '../Icons/Leaf'
import './Goal.css'
import EditGoal from '../EditGoal/EditGoal'


function Goal(props) {

    const value = useContext(ApiContext)

    
    const { title, description, treeBet, id, complete_by, goal} = props

    const [ showModalEdit, toggleModalEdit ] = useState(false)
    const [ overdue, handleOverdue ] = useState(false)
    const [ showTreeDonatedModal, toggleTreeDonatedModal ] = useState(false)
    console.log(overdue)

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
            console.log('patch response', goal.data)
        })
        .catch(error => {
            console.log(error)
        })
    
    }

    const handleToggle = () => {
        toggleModalEdit(true)
    }

    useEffect(() => {
        const overdue = value.dueGoals.some(dueGoal => dueGoal.id === goal.id)
        if(overdue === true) {
            handleOverdue(true)
        } else {
            handleOverdue(false)
        }
    }, [value.dueGoals])

    const handleDonateTrees = () => {
        Axios.post(`https://api-dev.digitalhumani.com/tree`, {
         "treeCount": treeBet,
         "enterpriseId": "7997dd50",
         "projectId": "77111010",
         "user": value.user.email
        })
        .then(res => {
            if(res.status === 200) {
               toggleTreeDonatedModal(true)
            }
         })
         .catch(error => {
             console.log(error)
         })
     }

    const handleModalChange = () => {
        toggleModalEdit(!showModalEdit)
        toggleTreeDonatedModal(!showTreeDonatedModal)
    }


   

    
    if (!props.completed) {
        return (
            <div className="Card">
                <header>
                    <h3>{title}</h3>
                </header> 
                {description}
                <div className="tree-bet" >
                    {(treeBet > 1) ? <p>{treeBet} trees at stake</p> : <p>{treeBet} tree at stake</p>}
                    <p style={{ color: overdue && 'red'}}>Complete by: {complete_by}</p>
                </div>
                {overdue && 
                <button
                className='donate_tree_button'
                type='button'
                style=  {{  color: 'Green',
                          
                        }}
                onClick={handleDonateTrees}
                >
                <Leaf style={{  width: "15px",
                                height: "15px",
                                marginRight: "3px",
                             }}  />
                   
                </button>
                }
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

                {
                    showModalEdit &&
                        <EditGoal
                        show={showModalEdit}
                        closeCallback={() => toggleModalEdit(!showModalEdit)}
                        customClass="custom_modal_class"
                        goalToEdit={props.goal}
                        /> 
                }
                {
                    showTreeDonatedModal && 
                        <TreeDonatedModal 
                        show={showTreeDonatedModal}
                        toggleCallback={() => toggleTreeDonatedModal(!showTreeDonatedModal)}
                        customClass="tree_donated_modal"
                        toggleModalEdit={() => handleModalChange()}
                        goal={goal}
                        goalId={goal.id}
                    />
                }
                
            </div>
        )} 
    { 
        return (
        <div className="Card">
            <header>
                <h3>{title}</h3>
            </header> 
            {description}
            <div className="tree-bet" >
                {(treeBet > 1) ? <p>{treeBet} trees at stake</p> : <p>{treeBet} tree at stake</p>}
                <p style={{ color: overdue && 'red'}}>Complete by: {complete_by}</p>
            </div>
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

}

Goal.defaultProps = {
    goal: []
};


export default Goal