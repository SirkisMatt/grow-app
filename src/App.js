import React, {useState, useEffect} from 'react';
import { Route } from 'react-router-dom';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import LandingPage from './LandingPage/LandingPage';
import Dashboard from './Dashboard/Dashboard'
import DashboardNav from './DashboardNav/DashboardNav'
import AccountDetails from './AccountDetails/AccountDetails'
import LandingNav from './LandingNav/LandingNav'
import AddPayment from './AddPayment/AddPayment'
import AddGoalType from './AddGoalType/AddGoalType'
import GoalsCompleted from './GoalsCompleted/GoalsCompleted'
import Axios from 'axios'
import ApiContext from './ApiContext'
import './App.css'


function App() {

  const [user, setUser] = useState([])
  const [goal_types, handleGoalTypes] = useState([])
  const [goals, setGoalsForUser] = useState([])
  const [loggedIn, handleLoggedIn] = useState(false)

//On render get goalTypes
  useEffect(() => {
    Axios.get(`http://localhost:8000/api/goal-types`)
    .then(goalTypes => {
      handleGoalTypes(goalTypes.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

//Add new user to state
  const handleAddUser = user => {
    let userId = user.id
    setUser(user)
    handleLoggedIn(true)
  }

//Adds goals when new user logs in
  const handleGetGoals = goals => {
    setGoalsForUser(goals)
  }

//Adds goal to state
  const handleAddGoal = goal => {
    setGoalsForUser(goals => ([ ...goals, goal ]))
  }

  const renderNavRoutes = () => {
    return (
        <>
          {['/', '/signup', 'add-payment', 'login'].map(path => (
              <Route
                  exact
                  key={path}
                  path={path}
                  component={LandingNav}
              />
          ))}
          <Route
            path="/dashboard/:userId"
            component={DashboardNav}
          />
        </>
    );
  }

 const renderMainRoutes = () => {
    return (
      <>
         <Route
        exact
        path="/"
        component={LandingPage}
        />
        <Route
        path="/dashboard/:userId"
        component={Dashboard}
        />
        <Route
        path="/add-goal-type"
        component={AddGoalType}
        />
        <Route
        path="/signup"
        component={SignUp}
        />
        <Route
        path="/add-payment"
        component={AddPayment}
        />
        <Route
        path="/login"
        component={Login}
        />
        <Route
        path="/account/:userId"
        component={AccountDetails}
        />
        <Route 
        path='/goals-completed/:userId'
        component={GoalsCompleted}
        />
      </>
    )
  }
    
  //context 
    const value = {
      user,
      goal_types,
      goals,
      loggedIn,
      addUser: handleAddUser,
      addGoal: handleAddGoal,
      getGoals: handleGetGoals
    }

    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
       {renderNavRoutes()}
          <main className="App_Main">{renderMainRoutes()}</main>
        </div>
      </ApiContext.Provider>
    );
}

export default App;