import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import STORE from '../dummy-store'
import ApiContext from '../ApiContext'
import GoalListHeader from '../GoalListHeader/GoalListHeader'
import AddGoalCard from '../AddGoalCard/AddGoalCard'
import GoalListWrapper from '../GoalListWrapper/GoalListWrapper'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Goal from '../Goal/Goal'
import './Dashboard.css'


class Dashboard extends Component {
  constructor(props) {
        super(props)
        this.state = {
            user: {},
            userId: 1234,
            goal_type: [],
            goal_cards: [],
            goal_list: {},
            showModal: false
          }
  }
    
    

    static contextType = ApiContext;

    componentDidMount = () => {
      let user = STORE.user[0]
      let goalType = {}
      let goalCards = STORE.goal_cards.filter(goal => goal.user_id == user.id)


      goalCards.map(goal => { 
        if (!goalType[goal.goal_type_id]) {
          goalType[goal.goal_type_id] = [goal.id]
        } else {
          goalType[goal.goal_type_id].push(goal.id)
        }
       })

   
      this.setState({
        user: user,
        goal_type: STORE.goal_type,
        goal_cards: goalCards,
        goal_list: goalType,
      })
     
    }
    

    toggleModal = () => {
        this.setState({
          showModal: !this.state.showModal
        });
      }



  
 
  render() {
    
    
    const goalType = Object.keys(this.state.goal_list)
    console.log(this.state.goal_list)
    console.log(goalType)
    
    goalType.map(goalTypeId => { 
      console.log(goalTypeId)
    })
    
    return (
      <div className='dashboard'>
           <header className="App-header">
                <ul>
                  <li className="tree-count">
                      <p><span id="tree-number"> 4 </span>Trees planted this month</p>
                  </li>
                  <li>
                      <Link to="/add-payment" className="btn">Edit Payment info</Link>
                  </li>
                </ul>
           </header>
        <div>
            <div className="App-list">
                {goalType.map(goalTypeId => {
                    <GoalListWrapper
                        key={goalTypeId}
                        id={goalTypeId}
                        header={this.state.goal_type.filter(item => item.id == goalTypeId)}
                        goal={this.state.goal_cards.filter(goal => this.state.goal_list[goalTypeId].includes(goal.id))}
                    /> 
                })}
                <button className="NavCircleButton" onClick={this.toggleModal}>
                        add new goal +
                </button>
                {(this.state.goal_cards.length === 0) && <AddGoalCard 
                    firstGoal= {true}
                    show= {true}
                    closeCallback={this.toggleModal}
                    customClass="custom_modal_class"
                    userId={this.state.user.id}
                />}
                <AddGoalCard 
                    firstGoal= {false}
                    show={this.state.showModal}
                    closeCallback={this.toggleModal}
                    customClass="custom_modal_class"
                    userId={this.state.user.id}
                />
            </div>
            
        </div>
      </div>
    );
  }

}

export default Dashboard;