import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import STORE from './dummy-store'
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import LandingPage from './LandingPage/LandingPage';
import Dashboard from './Dashboard/Dashboard'


class App extends Component {

  state = {
    user: [],
    goal_type: [],
    goal_card: []
  }
  componentDidMount = () => {
    this.setState({
      user: STORE.user
    })
  }

  render() {
    console.log(this.state.user)
    return (
      <main className='App'>
        <Route 
        path="/signup" 
        component={SignUp}
        />
        <Route 
        path="/login"
        component={Login}
        />
        <Route 
        exact
        path="/"
        component={LandingPage}
        />
        <Route 
        path="/dashboard"
        component={Dashboard}
        />
      </main>
    );
  }

}

export default App;