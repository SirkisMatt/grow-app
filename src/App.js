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
import DonateTreeWindow from './DonateTreeWindow/DonateTreeWindow';


function App() {

  const [user, setUser] = useState([])
  const [goal_types, handleGoalTypes] = useState([])
  const [goals, setGoalsForUser] = useState([])
  const [ dueGoals, setDueGoals ] = useState([])
  const [loggedIn, handleLoggedIn] = useState(false)
  const [treesDonated, handleTreesDonated] = useState(0)
  
  console.log(goals)

//On render get goalTypes
  useEffect(() => {
    Axios.get(`http://localhost:8000/api/goal-types`)
    .then(goalTypes => {
      handleGoalTypes(goalTypes.data)
      //localStorage.setItem('goalTypes', JSON.stringify(goalTypes.data))
    })
    .catch(err => {
      console.log(err)
    })


  }, [])

  //counter for number of trees donated
  useEffect(() => {
    Axios.get(`https://api-dev.digitalhumani.com/tree?enterpriseId=${'7997dd50'}&user=${user.email}`)
    .then(res => {
      if(res.status === 200) {
        handleTreesDonated(res.data.count)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }, [goals])

  //adds dueGoals to state
  useEffect(() => {
    let now = new Date()
    let passDue = goals.filter(goal => now >= new Date(goal.complete_by))
      if (passDue.length > 0) {
        setDueGoals(passDue)
      } 
  }, [goals])


  
//handle page reload
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user");
  //   const goalsForUser = localStorage.getItem("goals")
  //   //const goalTypes = localStorage.getItem("goalTypes")
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser);
  //     console.log(foundUser)
  //     setUser(foundUser);
  //   }
  //     if (goalsForUser) {
  //       const goals = JSON.parse(goalsForUser);
  //       //const types = JSON.parse(goalTypes)
  //       //handleGoalTypes(types)
  //       setGoalsForUser(goals)
  //     }
  //     console.log(goals)

  // }, [goal_types]);
  

  const handleLogout = () => {
    setUser([])
    setGoalsForUser([])
  }

//Add new user to state
  const handleAddUser = user => {
    setUser(user)
    handleLoggedIn(true)
  }

//Adds goals when new user logs in
  const handleGetGoals = goals => {
    if (!goals.message) {
      setGoalsForUser(goals)
    } else {
      setGoalsForUser([])
    }
    
  }

//Adds goal to state
  const handleAddGoal = goal => {
    setGoalsForUser(goals => ([ ...goals, goal ]))
  }

//Adds dueGoals to state
  const handleAddDueGoals = dueGoal => {
    setDueGoals(dueGoal)
  }

//Delete goal
  const handleDeleteGoal = id => {
    setGoalsForUser(goals.filter(goal => goal.id !== parseInt(id)))
  }
//Delete dueGoal
  const handleDeleteDueGoal = id => {
    setDueGoals(dueGoals.filter(dueGoal => dueGoal.id !== parseInt(id)))
  }

//Patch Goal
  const handlePatchGoal = (goalToEdit) => {
    //get index of goal to edit
    let index = goals.findIndex((goals => goals.id === parseInt(goalToEdit.id)))
    //replace goal to edit
    let goalsState = goals
    goalsState[index] = goalToEdit
    //setState
    setGoalsForUser([...goalsState])
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
          {/* <Route
            path="/donate/:goalId"
            component={DashboardNav}
          />
          <Route
            path="/donate/"
            component={DashboardNav}
          /> */}
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
        {/* <Route
        path='/donate'
        component={DonateTreeWindow}
        /> */}
        {/* <Route
        path='/donate'
        component={DonateTreeWindow}
        /> */}
      </>
    )
  }
    
  //context 
    const value = {
      user,
      goal_types,
      goals,
      dueGoals,
      loggedIn,
      treesDonated,
      addUser: handleAddUser,
      addGoal: handleAddGoal,
      getGoals: handleGetGoals,
      deleteGoal: handleDeleteGoal,
      patchGoal: handlePatchGoal,
      addDueGoals: handleAddDueGoals,
      deleteDueGoal: handleDeleteDueGoal,
      logout: handleLogout,
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