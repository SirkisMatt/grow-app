import React, {Component} from 'react';
import STORE from '../dummy-store'
import ApiContext from '../ApiContext'
import AddGoalCard from '../AddGoalCard/AddGoalCard'
import GoalListWrapper from '../GoalListWrapper/GoalListWrapper'
import Axios from 'axios'
import 'reactjs-popup/dist/index.css';
import './Dashboard.css'


class Dashboard extends Component {
  constructor(props) {
        super(props)
        this.state = {
            user: {},
            goal_types: [],
            goal_cards: [],
            goal_list: {},
            showModal: false
          }
  }
    
    

    static contextType = ApiContext;

    componentDidMount = () => {
      let user = {}
      if (!this.context.user[0]) {
        this.props.history.push(`/login`)
      } else {
        user = this.context.user[0]
      }
      
      let goalType = {}
      console.log(this.context)
      let goalCards = this.context.goals


      goalCards.map(goal => { 
        if (!goalType[goal.goal_type_id]) {
          goalType[goal.goal_type_id] = [goal.id]
        } else {
          goalType[goal.goal_type_id].push(goal.id)
        }
       })

   
      this.setState({
        user: user,
        goal_types: this.context.goal_types,
        goal_cards: goalCards,
        goal_list: goalType,
      })
     
    }

    handleAddGoal = goal => {
      const goalType = this.state.goal_list
   
      if (!goalType[goal.goal_type_id]) {
        goalType[goal.goal_type_id] = [goal.id]
      } else {
        goalType[goal.goal_type_id].push(goal.id)
      }
     
      this.setState({
        goal_cards: [
          ...this.state.goal_cards,
          goal
        ],
      })

    }

   
  
    

    toggleModal = () => {
        this.setState({
          showModal: !this.state.showModal
        });
      }



  
 
  render() {
    const goalType = Object.keys(this.state.goal_list)  
    console.log(this.state.goal_cards)
    return (
      <div className='dashboard'>
           <header className="dashboard-header">
           <button className="add-goal-button" onClick={this.toggleModal}>
                        add new goal +
                </button>
           </header>
        <div>
            <div className="dashboard-list">
                {goalType.map(goalTypeId => 
                    <GoalListWrapper
                    key={goalTypeId}
                    id={goalTypeId}
                    header={this.state.goal_type.filter(item => item.id === goalTypeId)}
                    goal={this.state.goal_cards.filter(goal => this.state.goal_list[goalTypeId].includes(goal.id))}
                    /> 
                )}
                {(this.state.goal_cards.length === 0) && <AddGoalCard 
                    firstGoal= {true}
                    show= {true}
                    closeCallback={this.toggleModal}
                    customClass="custom_modal_class"
                    userId={this.state.user.id}
                    goalTypes={this.state.goal_types}
                    addGoal={this.handleAddGoal}

                />}
                <AddGoalCard 
                    firstGoal= {false}
                    show={this.state.showModal}
                    closeCallback={this.toggleModal}
                    customClass="custom_modal_class"
                    userId={this.state.user.id}
                    goalTypes={this.state.goal_types}
                    addGoal={this.handleAddGoal}
                />
            </div>
            
        </div>
      </div>
    );
  }

}

export default Dashboard;