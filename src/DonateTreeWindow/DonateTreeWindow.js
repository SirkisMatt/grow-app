// import React, {useState, useContext, useEffect} from 'react'
// import Axios from 'axios'
// import TreeDonatedModal from '../TreeDonatedModal/TreeDonatedModal'
// import DonateGoal from '../DonateGoal/DonateGoal'
// import DueGoal from '../DueGoal/DueGoal'
// import EditGoal from '../EditGoal/EditGoal'
// //import config from '../config';
// import ApiContext from '../ApiContext'
// import './DonateTreeWindow.css'

// function DonateTreeWindow(props) {

//     const value = useContext(ApiContext)

//     const [dueGoals, setGoals] = useState([])
    
//     useEffect(() => {
//         if (value.user.length === 0) {
//         props.history.push(`/login`)
//         }
//       }, [])

//     useEffect(() => {
//         if(value.dueGoals) {
//             setGoals(value.dueGoals)
//         } 
//     }, [value.dueGoals])

//     return (
//     <section className="List">
//         <div className='List-cards'>
//             {value.dueGoals.map((goal) =>
//             <DonateGoal 
//             goal={goal}
//             key={goal.id}
//             />
//             )}
//         </div>
//     </section>
//     )
// }

// export default DonateTreeWindow;