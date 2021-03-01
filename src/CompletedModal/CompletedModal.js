import React from 'react';
import './CompletedModal.css'


function CompletedModal(props) {
    return(
        <div className={`modal_completed_goal ${props.customClass}`} style={{ display: props.show ? 'block' : 'none'}}>
        <div className="overlay_completed_goal" ></div>
            <div className="modal_content_completed_goal">

                <div>
                    <h2>Good Work</h2>
                        <div>
                            <p>Would you like to try for your goal again?</p>
                            
                            <button
                            className="goal_edit_toggle"
                            type="button"
                            onClick={props.toggleModalEdit}
                            >
                                Yes
                            </button>
                            <button
                            className='goal_delete_toggle'
                            type='button'
                            onClick={props.handleCompletedGoal}
                            >
                                No
                            </button>
                            <button title="Close" className="close_modal" onClick={props.toggleCallback}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                </div>
            </div>
    </div>
    )
}

export default CompletedModal;