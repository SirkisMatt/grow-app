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

    componentDidMount = () => {
      this.setState({
        goal_list: this.context.goal_list.filter(item => item.user_id == this.props.match.params.userId)
      })
      
    }
    

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
    const userId = 1234
    // const { userId } = this.props.match.params

    const goalsForUser = this.getGoalsForUser(goal_cards, userId)
    
    //Gets goal_list based on user
    const goalListForUser = this.getGoalTitleIds(goal_list, userId)
  

    
    
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
                {goalListForUser.map(list => 
                    <GoalListWrapper
                        key={list.goal_type_id}
                        id={list.goal_type_id}
                        header={goal_type.filter(item => item.id == list.goal_type_id)}
                        goal={list.card_ids.map(id => goalsForUser[id - 1])}
                    />
                )}
                <button className="NavCircleButton" onClick={this.toggleModal}>
                        add new goal +
                </button>
                {(goalListForUser.length === 0) && <AddGoalCard 
                    firstGoal= {true}
                    show= {true}
                    closeCallback={this.toggleModal}
                    customClass="custom_modal_class"
                    userId={userId}
                />}
                <AddGoalCard 
                    firstGoal= {false}
                    show={this.state.showModal}
                    closeCallback={this.toggleModal}
                    customClass="custom_modal_class"
                    userId={userId}
                />
            </div>
        </div>
      </div>
    );
  }

}

export default Dashboard;