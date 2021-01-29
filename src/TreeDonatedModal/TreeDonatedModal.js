import React, { useState, useContext } from 'react'
import Axios from 'axios';
import ApiContext from '../ApiContext'
import './TreeDonatedModal.css'

function TreeDonatedModal(props) {

    const value = useContext(ApiContext)


    const handleClickDelete = e => {
        e.preventDefault()
        const userId = value.user.id
        const id = props.goal.id
        Axios.delete(`https://immense-lowlands-49270.herokuapp.com/api/goals/${userId}/${id}`)
        .then(res => {
            if(res.status !== 204){
                return res.json().then(e => Promise.reject(e))
            }
            return res
          })
          .then(() => {
            value.deleteDueGoal(id)
            value.deleteGoal(id)
            props.toggleCallBack()
          })
          .catch(err => {
            console.log(err)
          })
    }



        const { customClass, show, closeCallback, goal } = props
        //const { goal_types } = value
        //const goalType = goal_types.filter(type => type.id === goal.goal_type_id)

        return (
            <div className={`modal_edit_goal ${customClass}`} style={{ display: show ? 'block' : 'none'}}>
                <div className="overlay_edit_goal" ></div>
                    <div className="modal_content_edit_goal">
                        {goal.tree_bet > 1 ? <h2>{goal.tree_bet} Trees Donated!</h2> : <h2>{goal.tree_bet} Tree Donated</h2>}
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