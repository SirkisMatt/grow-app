import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import STORE from './dummy-store'
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import LandingPage from './LandingPage/LandingPage';
import Dashboard from './Dashboard/Dashboard'
import DashboardNav from './DashboardNav/DashboardNav'
import AddPayment from './AddPayment/AddPayment'
import AddGoalType from './AddGoalType/AddGoalType'
import ApiContext from './ApiContext'
import './App.css'


class App extends Component {

  state = {
    user: [],
    goal_type: [],
    goal_cards: [],
    goal_list: []
  }
  componentDidMount = () => {
    this.setState({
      user: STORE.user,
      goal_type: STORE.goal_type,
      goal_cards: STORE.goal_cards,
      goal_list: STORE.goal_list,
      loggedIn: false
    })
  }
  
  handleAddUser = user => {
    this.setState({
      user: [
        ...this.state.user,
        user
      ],
      loggedIn: true
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

  handleAddGoalType = goalList => {
    // const getUser = this.state.user.map(user => {
    //   if (user.id === goalList.user_id) {

    //   }
    // })

    const newList = this.state.goal_list.map(list => {
      if (list.goal_type_id === goalList.goal_type_id && list.user_id === goalList.user_id) {
        return {
          ...list,
          card_ids: [...list.card_ids, goalList.card_ids],
        }
      } else if (list.goal_type_id === goalList.goal_type_id && list.user_id !== goalList.user_id){
        return {
          ...list,
          card_ids: [...list.card_ids, goalList.card_ids],
          user_id: goalList.user_id,
          goal_type_id: goalList.goal_type_id
        }
      } else {
        return list
      }
      
      
    })

    this.setState({
      goal_list: newList
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
      </>
    )
  }

  render() {
    const value = {
      user: this.state.user,
      goal_type: this.state.goal_type,
      goal_cards: this.state.goal_cards,
      goal_list: this.state.goal_list,
      addUser: this.handleAddUser,
      addGoal: this.handleAddGoal,
      addGoalType: this.handleAddGoalType
    }
    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
         <DashboardNav
         loggedIn= {this.state.loggedIn}
         />
      
          <main className="App_Main">{this.renderMainRoutes()}</main>
        </div>
      </ApiContext.Provider>
    );
  }

}

export default App;