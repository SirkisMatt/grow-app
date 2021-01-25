import React, { useState, useEffect, useContext } from 'react'
import ApiContext from '../ApiContext'
import GoalListWrapper from '../GoalListWrapper/GoalListWrapper'
import './GoalsCompleted.css'

function GoalsCompleted(props) {

    const value = useContext(ApiContext)
    const [goal_list, updateList] = useState({})

    console.log(props.goal)
    useEffect(() => {
        if (value.user.length === 0) {
        props.history.push(`/login`)
        }
      }, [])

    useEffect(() => {
        let goalList = {}
        let goals = value.goals.filter(goal => goal.completed === true)
        
        // if(value.dueGoals.length !== 0) {
        //   toggleGoalsNotComplete(true)
        // }
    
        goals.map(goal => { 
        if (!goalList[goal.goal_type_id]) {
            goalList[goal.goal_type_id] = [goal.id]
        } else {
            goalList[goal.goal_type_id].push(goal.id)
        }
        })
        
        
        updateList(goalList)
      }, [value.goals])


   const handleClick = () => {
        props.history.goBack()
    }

    const goalType = Object.keys(goal_list)  
    const goalTypeNumber = goalType.map(Number)

        return (
            <div className="goals_completed_dash">
                <header className="dashboard-header">
                    <button className="add-goal-button" onClick={handleClick}>
                    Back to Dashboard
                    </button>
                </header>
                <div className="goals_completed_list">
                    {goalTypeNumber.map(goalTypeId => 
                    <GoalListWrapper
                    key={goalTypeId}
                    id={goalTypeId}
                    header={value.goal_types.filter(item => item.id === goalTypeId)}
                    goal={value.goals.filter(goal => goal_list[goalTypeId].includes(goal.id))}
                    /> 
                    )}
                </div>
                {/* <h2>No goals goals completed.</h2> */}
            </div>
        )
}



export default GoalsCompleted