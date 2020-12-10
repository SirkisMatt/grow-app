import React, {Component} from 'react';
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


class App extends Component {
  constructor() {
    super()
    this.state = {
      user: [],
      goal_types: [],
      goals: [],
      loggedIn: false
      }
  }

  componentDidMount = () => {
    Axios.get(`http://localhost:8000/api/goal-types`)
    .then(goalTypes => {
      this.setState({
        goal_types: goalTypes.data
      })
    })
    
  }

  handleAddUser = user => {
    this.setState({
      user: [
        user
      ],
      loggedIn: true
    })
   const userId = user
    this.getGoalsForUser(userId)
  }

  getGoalsForUser = (userId) => {
    Axios.get(`http://localhost:8000/api/goals/${userId}`)
    .then(goals => {
      console.log(goals.data)
      this.setState({
        goals: goals.data
      })
    })
  }

  handleAddGoal = goal => {
    this.setState({
      goal_cards: [
        ...this.state.goal_cards,
        goal
      ]
    })
  }


  renderNavRoutes() {
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


  renderMainRoutes() {
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

  render() {
    console.log(this.state.goals)
    const value = {
      user: this.state.user,
      goal_types: this.state.goal_types,
      goals: this.state.goals,
      goal_list: this.state.goal_list,
      addUser: this.handleAddUser,
      addGoal: this.handleAddGoal,
    }
    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
       {this.renderNavRoutes()}

          <main className="App_Main">{this.renderMainRoutes()}</main>
        </div>
      </ApiContext.Provider>
    );
  }

}

export default App;