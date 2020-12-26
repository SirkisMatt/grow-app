import React from 'react'

export default React.createContext({
    user: [],
    goal_type: [],
    goals: [],
    addUser: () => {},
    addGoal: () => {},
    getGoals: () => {},
    userLogin: () => {}
})