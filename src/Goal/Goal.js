import React, { useContext, useState, useEffect } from 'react'
import ApiContext from '../ApiContext'
import TreeDonatedModal from '../TreeDonatedModal/TreeDonatedModal'
import Axios from 'axios'
import Leaf from '../Icons/Leaf'
import './Goal.css'
import EditGoal from '../EditGoal/EditGoal'
import CompletedModal from '../CompletedModal/CompletedModal'


function Goal(props) {

    const value = useContext(ApiContext)

    
    const { title, description, treeBet, id, complete_by, goal} = props

    const [ showModalEdit, toggleModalEdit ] = useState(false)
    const [ overdue, handleOverdue ] = useState(false)
    const [ showTreeDonatedModal, toggleTreeDonatedModal ] = useState(false)
    const [ showCompletedModal, toggleCompletedModal ] = useState(false)
    


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

    function handleCompletedGoal() {
        const userId = value.user.id
        Axios.patch(`https://immense-lowlands-49270.herokuapp.com/api/goals/${userId}/${id}`, {
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

    useEffect(() => {
        const overdue = value.dueGoals.some(dueGoal => dueGoal.id === goal.id)
        if(overdue === true) {
            handleOverdue(true)
        } else {
            handleOverdue(false)
        }
    }, [value.dueGoals, goal.id])

    const handleDonateTrees = () => {
        if(showCompletedModal) {
            toggleCompletedModal(false)
            
        }

        toggleTreeDonatedModal(true)
     }

    const handleModalChange = () => {
        toggleModalEdit(!showModalEdit)
        toggleTreeDonatedModal(!showTreeDonatedModal)
    }

    const handleCompletedGoalModalChange = () => {
        toggleModalEdit(!showModalEdit)
        toggleCompletedModal(!showCompletedModal)
    }


        return (
            <div className="Card">
                <header>
                    <h3>{title}</h3>
                </header> 
                <p className="card-description">
                    {description}
                </p>
                <div className="tree-bet" >
                    {(treeBet > 1) ? <p>{treeBet} trees at stake</p> : <p>{treeBet} tree at stake</p>}
                    <p className="card-complete-by" style={{ color: overdue && 'green'}}>Complete by: {complete_by}</p>
                </div>
                {overdue && 
                <button
                aria-label="donate_tree_button"
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
                className='goal_btn'
                type='button'
                onClick={() => toggleCompletedModal(!showCompletedModal)}
                >
                    Completed
                </button>
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
                        handleCompletedGoal={() => handleCompletedGoal()}
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
                {
                    showCompletedModal && 
                    <CompletedModal 
                    show={showCompletedModal}
                    toggleCallback={() => toggleCompletedModal(!showCompletedModal)}
                    customClass="completed_modal"
                    toggleModalEdit={() => handleCompletedGoalModalChange()}
                    handleCompletedGoal={() => handleCompletedGoal()}
                    goal={goal}
                    />
                }
            </div>
        ) 
}

Goal.defaultProps = {
    goal: []
};


export default Goal