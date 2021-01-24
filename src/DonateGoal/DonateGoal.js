// import React, { useContext, useState } from 'react'
// import { Link } from 'react-router-dom'
// import ApiContext from '../ApiContext'
// import Axios from 'axios'
// import EditGoal from '../EditGoal/EditGoal'
// import TreeDonatedModal from '../TreeDonatedModal/TreeDonatedModal'
// import DonateTreeWindow from '../DonateTreeWindow/DonateTreeWindow'
// import './DonateGoal.css'



// function DonateGoal(props) {

//     const value = useContext(ApiContext)
//     const goal = props.goal
//     const { title, description, treeBet, id, complete_by} = goal

//     const [ showModalEdit, toggleModalEdit ] = useState(false)
//     const [ showTreeDonatedModal, toggleTreeDonatedModal ] = useState(false)
//     // const [ showModalDonate, toggleModalDonate ] = useState(false)

//     const handleClickDelete = e => {
//         e.preventDefault()
//         const userId = value.user.id
//         Axios.delete(`http://localhost:8000/api/goals/${userId}/${id}`)
//         .then(res => {
//             if(res.status !== 204){
//                 return res.json().then(e => Promise.reject(e))
//             }
//             return res
//           })
//           .then(() => {
//             value.deleteDueGoal(id)
//             value.deleteGoal(id)
            
//           })
//           .catch(err => {
//             console.log(err)
//           })
//     }

//     function handleCompletedGoal(e) {
//         e.preventDefault()
//         const userId = value.user.id
//         Axios.patch(`http://localhost:8000/api/goals/${userId}/${id}`, {
//             title: title,
//             description: description,
//             tree_bet: treeBet,
//             complete_by: complete_by,
//             completed: true,
//         })          
//         .then(goal => {
//             value.patchGoal(goal.data)
//         })
//         .catch(error => {
//             console.log(error)
//         })
    
//     }

//     const handleToggle = () => {
//         toggleModalEdit(true)
//     }

//     const handleDonateTrees = () => {
//        Axios.post(`https://api-dev.digitalhumani.com/tree`, {
//         "treeCount": treeBet,
//         "enterpriseId": "7997dd50",
//         "projectId": "77111010",
//         "user": value.user.email
//        })
//        .then(res => {
//         toggleTreeDonatedModal(true)
//         })
//         .catch(error => {
//             console.log(error)
//         })
//     }

//     const handleModalChange = () => {
//         toggleModalEdit(!showModalEdit)
//         toggleTreeDonatedModal(!showTreeDonatedModal)
//     }


    
//     if (!props.completed) {
//         return (
//                 <div className="Card">
//                     <header>
//                     <h3>{goal.title}</h3>
//                 </header> 
//                 <label className="tree-bet" id="tree_bet" name="tree_bet" value={goal.tree_bet}>
//                     {(goal.tree_bet > 1) ? <p>{goal.tree_bet} trees at stake</p> : <p>{goal.tree_bet} tree at stake</p>}
//                 </label> 
                
//                 <button
//                 className='donate_tree_button'
//                 type='button'
//                 onClick={handleDonateTrees}
//                 >
//                    Donate
//                 </button>
//                 <button
//                 className='goal_complete_toggle'
//                 type='button'
//                 onClick={handleCompletedGoal}
//                 >
//                     Completed
//                 </button>
//                 <button
//                 className='goal_edit'
//                 type='button'
//                 onClick={handleToggle}
//                 >
//                     Edit
//                 </button>
//                 <button 
//                 className='Goal_delete'
//                 type='button'
//                 onClick={handleClickDelete}
//                 >
//                     Delete
//                 </button>
//                 {showModalEdit &&
//                    <EditGoal
//                    show={showModalEdit}
//                    closeCallback={() => toggleModalEdit(!showModalEdit)}
//                    customClass="custom_modal_class"
//                    goalToEdit={goal}
//                  /> 
//                 }
//                   {showTreeDonatedModal && 
//                     <TreeDonatedModal 
//                     show={showTreeDonatedModal}
//                     toggleCallback={() => toggleTreeDonatedModal(!showTreeDonatedModal)}
//                     customClass="tree_donated_modal"
//                     toggleModalEdit={() => handleModalChange()}
//                     goal={goal}
//                     goalId={goal.id}
//                 />
//                 }
//                 {/* {showModalDonate &&
//                     <DonateTreeWindow
//                     show={showModalDonate}
//                     closeCallback={() => toggleModalDonate(!showModalDonate)}
//                     customClass="custom_modal_class"
//                     goal={goal}
//                     />
//                 } */}
//             </div>
//         )} 
//     { 
//         return (
//         <div></div>
//         )
//     }

// }


// export default DonateGoal