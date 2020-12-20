import React, {useState, useEffect} from 'react';
import { Route } from 'react-router-dom';
import STORE from './dummy-store'
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
import config from './config'
//I would wrap context in index.js
import ApiContext from './ApiContext'
import './App.css'


function App() {
  // constructor() {
  //   super()
  //   this.state = {
  //     user: [],
  //     goal_types: [],
  //     goals: [],
  //     loggedIn: false
  //     }
  // }

  const [user, setUser] = useState([])
  const [goal_types, handleGoalTypes] = useState([])
  const [goals, setGoalsForUser] = useState([])
  const [loggedIn, handleLoggedIn] = useState(false)

  useEffect(() => {
    Axios.get(`http://localhost:8000/api/goal-types`)
    .then(goalTypes => {
      handleGoalTypes(goalTypes.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])
  

  // componentDidMount = () => {
  //   Axios.get(`http://localhost:8000/api/goal-types`)
  //   .then(goalTypes => {
  //     this.setState({
  //       goal_types: goalTypes.data
  //     })
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
    
  // }

  const handleAddUser = user => {
    let userId = user.id
    console.log(userId)
    // Axios.get(`http://localhost:8000/api/goals/${userId}`)
    // .then(goals => {
    //   console.log(goals)
    //  getGoalsForUser(goals.data)
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  
    setUser(user)
    handleLoggedIn(true)
    
      
    }



  // handleNavToDash = (userId) => {
  //   console.log(window.history)
  //   window.history.go(`/dashboard/${userId}`)
  // }

 

 const handleAddGoal = goals => {
   setGoalsForUser(goals)
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

    
    const value = {
      user,
      goal_types,
      goals,
      loggedIn,
      addUser: handleAddUser,
      addGoal: handleAddGoal,
    }

    console.log(goals)

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