import React, {useState, useEffect, useContext} from 'react';
import ApiContext from '../ApiContext'
import AddGoalCard from '../AddGoalCard/AddGoalCard'
import GoalListWrapper from '../GoalListWrapper/GoalListWrapper'
import DashboardNav from '../DashboardNav/DashboardNav.js'
import 'reactjs-popup/dist/index.css';
import './Dashboard.css'


function Dashboard(props) {
    
  const value = useContext(ApiContext)

  const [ toggle, toggleNavLinks ] = useState(false)
  const [goal_list, updateList] = useState({})
  const [ showModal, toggleModal ] = useState(false)

  const loggedIn = value.user.length

  useEffect(() => {
    if (loggedIn === 0) {
    props.history.push(`/login`)
    }
  }, [loggedIn, props.history])

  useEffect(() => {
    let goalList = {}
    let goals = value.goals.filter(goal => goal.completed === false)
    
    // if(value.dueGoals.length !== 0) {
    //   toggleGoalsNotComplete(true)
    // }

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


  const goalType = Object.keys(goal_list)  
  const goalTypeNumber = goalType.map(Number)
  
  
  return (
    <div className='dashboard'>
      <DashboardNav 
      toggleNavLinks={() => toggleNavLinks(!toggle)}
      toggle={toggle}
      history={props.history}
      />
          <div className="dashboard-header-buttons" style={{ marginTop: toggle && '120px'}}>
          <button className="add-goal-button" onClick={() => toggleModal(!showModal)}>
                      add new goal +
          </button>
          </div>
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
          </div>
          
      </div>
    </div>
  );

}

export default Dashboard;