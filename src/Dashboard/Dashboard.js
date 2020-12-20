import React, {useState, useEffect, useContext} from 'react';
import STORE from '../dummy-store'
import ApiContext from '../ApiContext'
import AddGoalCard from '../AddGoalCard/AddGoalCard'
import GoalListWrapper from '../GoalListWrapper/GoalListWrapper'
import Axios from 'axios'
import 'reactjs-popup/dist/index.css';
import './Dashboard.css'


function Dashboard(props) {
  // constructor(props) {
  //       super(props)
  //       this.state = {
  //           user: {},
  //           goal_types: [],
  //           goal_cards: [],
  //           goal_list: {},
  //           showModal: false
  //         }
  // }
    
    
    const value = useContext(ApiContext)
    console.log(value.goals)

    const [goal_list, updateList] = useState({})
    const [ showModal, toggleModal ] = useState(false)

    
   useEffect(() => {
      if (value.user.length === 0) {
      props.history.push(`/login`)
      }
    })

    //useEffect(() => {
      let goalList = {}
      // if (value.user.length === 0) {
      //   props.history.push(`/login`)
      //   }
      const goals = value.goals
      console.log(goals)


      goals.map(goal => { 
        if (!goalList[goal.goal_type_id]) {
          goalList[goal.goal_type_id] = [goal.id]
        } else {
          goalList[goal.goal_type_id].push(goal.id)
        }
      })
      console.log(goalList)
      updateList(goalList)
    //}, [])

    // componentDidMount = () => {
    //   let user = {}
    //   if (!this.context.user[0]) {
    //     this.props.history.push(`/login`)
    //   } else {
    //     user = this.context.user[0]
    //   }
      
    //   let goalType = {}
    //   const goals = this.context.goals


    //   goals.map(goal => { 
    //     if (!goalType[goal.goal_type_id]) {
    //       goalType[goal.goal_type_id] = [goal.id]
    //     } else {
    //       goalType[goal.goal_type_id].push(goal.id)
    //     }
    //   })

   
    //   this.setState({
    //     user: user,
    //     goal_types: this.context.goal_types,
    //     goal_cards: goals,
    //     goal_list: goalType
    //   })
    //   // const userId = user.id
    //   // this.getGoalsForUser(userId)
    // }

    // getGoalsForUser = (userId) => {
    //   Axios.get(`http://localhost:8000/api/goals/${userId}`)
    //   // .then(goals => {
    //   //   this.setState({
    //   //     goal_cards: goals.data
    //   //   })
    //   // })
    //   .then(goals => {
    //     this.makeGoalList(goals.data)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })

    // }

    // makeGoalList = (goals) => {
    //   let goalType = {}

    //   if (goals.message) {
    //     console.log(goals.message)
    //   } else {
    //         goals.map(goal => { 
    //         if (!goalType[goal.goal_type_id]) {
    //           goalType[goal.goal_type_id] = [goal.id]
    //         } else {
    //           goalType[goal.goal_type_id].push(goal.id)
    //         }
    //       })

    //       this.setState({
    //         goal_cards: goals,
    //         goal_list: goalType
    //       })
    //     }

       
    // }

    // handleAddGoal = goal => {
    //   const goalType = this.state.goal_list
   
    //   if (!goalType[goal.goal_type_id]) {
    //     goalType[goal.goal_type_id] = [goal.id]
    //   } else {
    //     goalType[goal.goal_type_id].push(goal.id)
    //   }
     
    //   this.setState({
    //     goal_cards: [
    //       ...this.state.goal_cards,
    //       goal
    //     ],
    //   })

    // }

   
  
    

    // toggleModal = () => {
    //     this.setState({
    //       showModal: !this.state.showModal
    //     });
    //   }



  
 

    const goalType = Object.keys(goal_list)  
    const goalTypeNumber = goalType.map(Number)
    
    return (
      <div className='dashboard'>
           <header className="dashboard-header">
           <button className="add-goal-button" onClick={toggleModal(!showModal)}>
                        add new goal +
                </button>
           </header>
        <div>
            <div className="dashboard-list">
                {goalTypeNumber.map(goalTypeId => 
                    <GoalListWrapper
                    key={goalTypeId}
                    id={goalTypeId}
                    header={value.goal_types.filter(item => item.id === goalTypeId)}
                    goal={value.goals.filter(goal => goal_list[goalTypeId].includes(goal.id))}
                    /> 
                )}
                {(value.goals.length === 0) && <AddGoalCard 
                    firstGoal= {true}
                    show= {true}
                    closeCallback={toggleModal}
                    customClass="custom_modal_class"
                    userId={value.user.id}
                    goalTypes={value.goal_types}
                    //addGoal={this.handleAddGoal}

                />}
                <AddGoalCard 
                    firstGoal= {false}
                    show= {showModal}
                    closeCallback={this.toggleModal}
                    customClass="custom_modal_class"
                    userId={value.user.id}
                    goalTypes={value.goal_types}
                    //addGoal={this.handleAddGoal}
                />
            </div>
            
        </div>
      </div>
    );

}

export default Dashboard;