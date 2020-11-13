import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import STORE from './dummy-store'
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import LandingPage from './LandingPage/LandingPage';
import Dashboard from './Dashboard/Dashboard'
import AddPayment from './AddPayment/AddPayment'
import AddGoalType from './AddGoalType/AddGoalType'
import ApiContext from './ApiContext'
import './App.css'


class App extends Component {

  state = {
    user: [],
    goal_type: [],
    goals: []
  }
  componentDidMount = () => {
    this.setState({
      user: STORE.user,
      goal_type: STORE.goal_type,
      goals: STORE.goals
    })
  }
  
  handleAddUser = user => {
    this.setState({
      user: [
        ...this.state.user,
        user
      ]
    })
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
      </>
    )
  }

  render() {
    const value = {
      user: this.state.user,
      goal_type: this.state.goal_type,
      goals: this.state.goals,
      addUser: this.handleAddUser
    }
    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
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
      
          <main className="App_Main">{this.renderMainRoutes()}</main>
        </div>
      </ApiContext.Provider>
    );
  }

}

export default App;