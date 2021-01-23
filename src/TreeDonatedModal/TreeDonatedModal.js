import React, { useState, useContext } from 'react'
import Axios from 'axios';
import ApiContext from '../ApiContext'
import './TreeDonatedModal.css'

function TreeDonatedModal(props) {

    const value = useContext(ApiContext)

    const [title, updateTitle] = useState(props.goalToEdit.title)
    const [description, updateDescription] = useState(props.goalToEdit.description)
    const [treeBet, updateTreeBet] = useState(props.goalToEdit.tree_bet)
    const [completeBy, updateCompleteBy] = useState(props.goalToEdit.complete_by)



    const handleClickDelete = e => {
        e.preventDefault()
        const userId = value.user.id
        const id = props.goal.id
        Axios.delete(`http://localhost:8000/api/goals/${userId}/${id}`)
        .then(res => {
            if(res.status !== 204){
                return res.json().then(e => Promise.reject(e))
            }
            return res
          })
          .then(() => {
            value.deleteGoal(id)
            props.history.push('/dashboard')
          })
          .catch(err => {
            console.log(err)
          })
    }



        const { customClass, show, closeCallback, goalToEdit } = props
        const { goal_types } = value
        const goalType = goal_types.filter(type => type.id === goalToEdit.goal_type_id)

        return (
            <div className={`modal_edit_goal ${customClass}`} style={{ display: show ? 'block' : 'none'}}>
                <div className="overlay_edit_goal" onClick={closeCallback}>></div>
                    <div className="modal_content_edit_goal">
                        <h2>Trees Donated!</h2>
                        <p>Would you like to try for your goal again?</p>
                            <button
                            className="goal_edit_toggle"
                            type="button"
                            onClick={props.toggleModalEdit}
                            >
                                Edit
                            </button>
                            <button
                            className='goal_delete_toggle'
                            type='button'
                            onClick={handleClickDelete}
                            >
                                Delete
                            </button>
                            <button title="Close" className="close_modal" onClick={closeCallback}>
                                <i className="fas fa-times">X</i>
                            </button>
                    </div>
            </div>
        )
    }

    TreeDonatedModal.defaultProps = {
    children: <div>Empty Modal</div>,
    customClass: '',
    show: false,
    closeCallback: () => (false),
    goalTypes: [],
    userId: ""
};

export default TreeDonatedModal;