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
            user: [],
            userId: "",
            goal_type: [],
            goal_cards: [],
            goal_list: [],
            showModal: false
          }
  }
      
    

    static contextType = ApiContext;

    toggleModal = () => {
        this.setState({
          showModal: !this.state.showModal
        });
      }

    //Gets correct goals for user that logged in. 
    getGoalsForUser = (goal_cards=[], userId) => (
        (!userId)
            ? goal_cards
            : goal_cards.filter(goal => goal.user_id == userId)
    )


    //Gets goal_list based on user
    getGoalTitleIds = (goal_list=[], userId) => (
        (!userId)
            ? goal_list
            : goal_list.filter(item => item.user_id == userId)
    )
    
    
 
  render() {
    const { goal_cards=[], goal_list=[], goal_type=[] } = this.context
    const { userId } = this.props.match.params

    const goalsForUser = this.getGoalsForUser(goal_cards, userId)
    //const goalTitle = this.findGoalTitle(goal_type, goalsForUser)

    //Gets goal_list based on user
    const goalListForUser = this.getGoalTitleIds(goal_list, userId)
    
    
    return (
      <div className='dashboard'>
        <nav role="navigation">
            <ul>
                <li><Link to='/' className='home'>Grow</Link></li>
            </ul>
        </nav>
        <div>
           <header className="App-header">
                <ul>
                    <li><a href="payment.html">Edit Payment info</a></li>
                </ul>
                <p className="tree-count">4 Trees planted this month</p>
                <button className="modal_opener NavCircleButton btn" onClick={this.toggleModal}>
                    Add New Goal!
                </button>
                <AddGoalCard 
                    show={this.state.showModal}
                    closeCallback={this.toggleModal}
                    customClass="custom_modal_class"
                    userId={userId}
                />
           </header>
       </div>
        <div>
            <div className="App-list">
                {goalListForUser.map(list => 
                    <GoalListWrapper
                        key={list.goal_type_id}
                        id={list.goal_type_id}
                        header={goal_type.filter(item => item.id == list.goal_type_id)}
                        goal={list.card_ids.map(id => goalsForUser[id - 1])}
                    />
                )}
            </div>
        </div>
      </div>
    );
  }

}

export default Dashboard;