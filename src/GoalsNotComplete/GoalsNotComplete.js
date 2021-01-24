// import React, {useState, useContext, useEffect} from 'react';
// import DueGoal from '../DueGoal/DueGoal'
// import './GoalsNotComplete.css';

// function GoalNotComplete(props) {


//     return(
//         <div className={`modal_passdue ${props.customClass}`} style={{ display: props.show ? 'block' : 'none'}}>
//                 <div className="overlay_passdue" onClick={props.closeCallback}>></div>
//                     <div className="modal_content_passdue">
//                         <div className="passdue_goals">
//                             {props.passDueGoals.length === 1 ? <p>Did you complete your Goal?</p> : <p>Did you complete your Goals?</p>}
//                             {props.passDueGoals.map((goals) =>
//                                 <DueGoal 
//                                 key={goals.id}
//                                 id={goals.id}
//                                 title={goals.title}
//                                 description={goals.description}
//                                 completed={goals.completed}
//                                 complete_by={goals.complete_by}
//                                 treeBet={goals.tree_bet}
//                                 goal={goals}
//                                 closeCallback={props.closeCallback}
//                                 />
//                             )}
                            
//                             <button onClick={props.closeCallback}>Cancel</button>
//                         </div>
//                             <button title="Close" className="close_modal" onClick={props.closeCallback}>
//                                 <i className="fas fa-times">X</i>
//                             </button>
//                     </div>
//             </div>
//     )
// }

// GoalNotComplete.defaultProps = {
//     children: <div>Empty Modal</div>,
//     customClass: '',
//     show: false,
//     closeCallback: () => (false),
//     goalTypes: [],
//     userId: ""
// };

// export default GoalNotComplete;