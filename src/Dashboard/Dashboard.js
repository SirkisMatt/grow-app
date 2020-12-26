import React, {useState, useEffect, useContext} from 'react';
import ApiContext from '../ApiContext'
import AddGoalCard from '../AddGoalCard/AddGoalCard'
import GoalListWrapper from '../GoalListWrapper/GoalListWrapper'
import 'reactjs-popup/dist/index.css';
import './Dashboard.css'


function Dashboard(props) {
    
  const value = useContext(ApiContext)

  const [goal_list, updateList] = useState({})
  const [ showModal, toggleModal ] = useState(false)

  
  useEffect(() => {
    if (value.user.length === 0) {
    props.history.push(`/login`)
    }
  }, [])

  useEffect(() => {
    let goalList = {}
    const goals = value.goals
    

    if (!goals.message) {
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
              {value.goals.message ? 
              <AddGoalCard 
                  firstGoal= {true}
                  show= {true}
                  closeCallback={() => toggleModal(!showModal)}
                  customClass="custom_modal_class"
                  userId={value.user.id}
                  goalTypes={value.goal_types}
                  //addGoal={this.handleAddGoal}
              /> :
              goalTypeNumber.map(goalTypeId => 
                  <GoalListWrapper
                  key={goalTypeId}
                  id={goalTypeId}
                  header={value.goal_types.filter(item => item.id === goalTypeId)}
                  goal={value.goals.filter(goal => goal_list[goalTypeId].includes(goal.id))}
                  /> 
              )}
              <AddGoalCard 
                  firstGoal= {false}
                  show= {showModal}
                  closeCallback={() => toggleModal(!showModal)}
                  customClass="custom_modal_class"
                  userId={value.user.id}
                  goalTypes={value.goal_types}
              />
          </div>
          
      </div>
    </div>
  );

}

export default Dashboard;