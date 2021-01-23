import React, {useState, useContext, useEffect} from 'react'
import Axios from 'axios'
import TreeDonatedModal from '../TreeDonatedModal/TreeDonatedModal'
import DonateGoal from '../DonateGoal/DonateGoal'
import DueGoal from '../DueGoal/DueGoal'
import EditGoal from '../EditGoal/EditGoal'
//import config from '../config';
import ApiContext from '../ApiContext'
import './DonateTreeWindow.css'

function DonateTreeWindow(props) {

    const value = useContext(ApiContext)

    const [goal, setGoal] = useState({})
    const [ showModalEdit, toggleModalEdit ] = useState(false)
    

    useEffect(() => {
        if (value.user.length === 0) {
        props.history.push(`/login`)
        }
        //setGoal(value.goals.find(g => g.id == props.match.params.goalId))
      }, [])

    //   console.log(props.match.params.goalId)
    //   console.log(value.goals)
    //   const {title, tree_bet} = goal
    //   console.log(value.user.email)
      

    const handleDonate = (e) => {
        e.preventDefault()
       console.log(e.target)

    //    Axios.post(`https://api-dev.digitalhumani.com/tree`, {
    //     "treeCount": e.target['tree_bet'].value,
    //     "enterpriseId": "7997dd50",
    //     "projectId": "77111010",
    //     "user": value.user.email
    //    })
    //    .then(res => {
    //     console.log(res)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    }
         


      

    return (
        <div className='Card'>
           {/* <form onSubmit={handleDonate}> */}
            {value.dueGoals && value.dueGoals.map((goal) =>
           <DonateGoal 
           goal={goal}
           />
            )}
            {/* </form> */}
           
            
          
            {/* {showModalEdit &&
                   <EditGoal
                   show={showModalEdit}
                   closeCallback={() => toggleModalEdit(!showModalEdit)}
                   customClass="custom_modal_class"
                   goalToEdit={goal}
                 /> 
                } */}
        </div>
    )
}

DonateTreeWindow.defaultProps = {
    children: <div>Empty Modal</div>,
    customClass: '',
    show: false,
    closeCallback: () => (false),
    goalTypes: [],
    userId: ""
};

export default DonateTreeWindow;