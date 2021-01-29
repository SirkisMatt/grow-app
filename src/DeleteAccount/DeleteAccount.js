import React, { useState, useContext } from 'react'
import Axios from 'axios';
import ApiContext from '../ApiContext'
import './DeleteAccount.css'

function DeleteAccount(props) {

    const value = useContext(ApiContext)


    const handleClickDelete = e => {
        e.preventDefault()
        const userId = value.user.id
        Axios.delete(`https://immense-lowlands-49270.herokuapp.com/api/users/${userId}`)
        .then(res => {
            if(res.status !== 204){
                console.log('deleted')
            }
          })
          .then(() => {
            props.handleExit()
          })
          .catch(err => {
            console.log(err)
          })
    }



        const { customClass, show, toggleCallback} = props
        //const { goal_types } = value
        //const goalType = goal_types.filter(type => type.id === goal.goal_type_id)

        return (
            <div className={`modal_delete_account ${customClass}`} style={{ display: show ? 'block' : 'none'}}>
                <div className="overlay_delete_account" ></div>
                    <div className="modal_content_delete_account">
                        <p>Are you sure you want to quit? All your accomplishments will be lost forever.</p>
                            <button
                            className="cancel"
                            type="button"
                            onClick={toggleCallback}
                            >
                                Cancel
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

    DeleteAccount.defaultProps = {
    children: <div>Empty Modal</div>,
    customClass: '',
    show: false,
    closeCallback: () => (false),
    goalTypes: [],
    userId: ""
};

export default DeleteAccount;