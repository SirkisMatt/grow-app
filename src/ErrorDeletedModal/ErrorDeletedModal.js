import React from 'react';
import './ErrorDeletedModal.css'


function ErrorDeletedModal(props) {
    return(
        <div className={`modal_deleted_goal ${props.customClass}`} style={{ display: props.show ? 'block' : 'none'}}>
        <div className="overlay_deleted_goal" ></div>
            <div className="modal_content_deleted_goal">

                <div>
                    <h2>There was a problem when trying to delete your goal</h2>
                        <div>
                            <button
                            title="Close" 
                            className="goal_deleted_toggle"  
                            onClick={props.closeCallback}
                            >
                                Okay
                            </button>
                        </div>
                        <button title="Close" className="close_modal" onClick={props.closeCallback}>
                                <i className="fas fa-times"></i>
                        </button>
                </div>
            </div>
    </div>
    )
}

export default ErrorDeletedModal;