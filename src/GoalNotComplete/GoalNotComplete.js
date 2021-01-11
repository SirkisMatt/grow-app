import React, {useState, useContext, useEffect} from 'react';

function GoalNotComplete(props) {


    return(
        <div className={`modal ${props.customClass}`} style={{ display: props.show ? 'block' : 'none'}}>
                <div className="overlay" onClick={props.closeCallback}>></div>
                    <div className="modal_content">
                        <form className="add-goal">
                            
                            <button onClick={props.closeCallback}>Add Goal!</button>
                        </form>
                            <button title="Close" className="close_modal" onClick={props.closeCallback}>
                                <i className="fas fa-times">X</i>
                            </button>
                    </div>
            </div>
    )
}

GoalNotComplete.defaultProps = {
    children: <div>Empty Modal</div>,
    customClass: '',
    show: false,
    closeCallback: () => (false),
    goalTypes: [],
    userId: ""
};

export default GoalNotComplete;