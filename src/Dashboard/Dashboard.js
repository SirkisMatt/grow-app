import React, {useState, useEffect, useContext} from 'react';
import ApiContext from '../ApiContext'
import AddGoalCard from '../AddGoalCard/AddGoalCard'
import GoalListWrapper from '../GoalListWrapper/GoalListWrapper'
import GoalNotComplete from '../GoalNotComplete/GoalNotComplete'
import 'reactjs-popup/dist/index.css';
import './Dashboard.css'


function Dashboard(props) {
    
  const value = useContext(ApiContext)

  const [goal_list, updateList] = useState({})
  const [ showModal, toggleModal ] = useState(false)
  const [showGoalNotComplete, toggleGoalNotComplete] = useState(false)
  const [passDueGoals, addPassDueGoals] = useState([])

  
  useEffect(() => {
    if (value.user.length === 0) {
    props.history.push(`/login`)
    }
  }, [])

  useEffect(() => {
    let goalList = {}
    let goals = value.goals.filter(goal => goal.completed === false)
    

    if (goals.length === 0) {
     toggleModal(true)
    } else {
      goals.map(goal => { 
        if (!goalList[goal.goal_type_id]) {
          goalList[goal.goal_type_id] = [goal.id]
        } else {
          goalList[goal.goal_type_id].push(goal.id)
        }
      })
    }
    
    updateList(goalList)
  }, [value.goals])

  useEffect(() => {
    let now = new Date()
    //let goals = value.goals.map(goal => new Date(goal.complete_by))
  
    let passDue = value.goals.filter(goal => now >= new Date(goal.complete_by))
    console.log(passDue)

    if (passDue.length >= 0) {
      toggleGoalNotComplete(true)
      addPassDueGoals(passDue)
    } 

  }, [value.goals])

  const goalType = Object.keys(goal_list)  
  const goalTypeNumber = goalType.map(Number)
  
  
  return (
    <div className='dashboard'>
          <header className="dashboard-header">
          <button className="add-goal-button" onClick={() => toggleModal(!showModal)}>
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
              <AddGoalCard 
                  show= {showModal}
                  closeCallback={() => toggleModal(!showModal)}
                  customClass="custom_modal_class"
                  userId={value.user.id}
                  goals={value.goals}
                  goalTypes={value.goal_types}
              />
              <GoalNotComplete
                  show={showGoalNotComplete}
                  closeCallback={() => toggleGoalNotComplete(!showModal)}
                  customClass="custom_modal_class"
                  passDueGoals={passDueGoals}
              />
          </div>
          
      </div>
    </div>
  );

}

export default Dashboard;