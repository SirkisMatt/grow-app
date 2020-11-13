import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import STORE from '../dummy-store'
import ApiContext from '../ApiContext'
import AddGoalType from '../AddGoalType/AddGoalType'
import GoalListHeader from '../GoalListHeader/GoalListHeader'
import Goal from '../Goal/Goal'
import './Dashboard.css'


class Dashboard extends Component {
    // constructor(props) {
    //     super(props);
    // }

    static contextType = ApiContext;

    getGoalsForUser = (goals=[], userId) => (
        (!userId)
            ? goals
            : goals.filter(goal => goal.user_id == userId)
    )

 
  render() {
    const { goals=[] } = this.context
    const { userId } = this.props.match.params
    const goalsForUser = this.getGoalsForUser(goals, userId)
    console.log(goalsForUser)
    return (
      <div className='dashboard'>
        <nav role="navigation">
            <ul>
                <li><Link to='/' className='home'>Grow</Link></li>
            </ul>
        </nav>
        <div className="board-header">
           <header>
            <ul>
                <li><a href="payment.html">Edit Payment info</a></li>
            </ul>
            <p>4 Trees planted this month</p>
           </header>
       </div>
        <div>
            <div className="row">
                <div className="column">
                    <header>
                        <h2>Test Test</h2>
                    </header>
                    <ul>
                        {goalsForUser.map(goal => 
                            <li key={goal.id}>
                                <Goal 
                                id={goal.id}
                                title={goal.title}
                                description={goal.description}
                                dateCreated={goal.date_created}
                                treeBet={goal.tree_bet}
                                treeOrg={goal.tree_org}
                                goalTypeId={goal.goal_type_id}
                                />
                            </li>
                        )}
                    </ul>
                </div>
                <div className="column">
                    <header>
                        <GoalListHeader/>
                    </header>
                    <div className="task">
                        <header>
                            <h3>Meditate 30min everyday.</h3>
                        </header>
                        <p>At the end of the week I will plant 1 tree at "WeForest" for every day that I missed.</p>
                        <br/>
                        <div className="tree-bet">
                            <p>7 Trees at Stake</p>
                            <p>Complete by: Friday 11-13-2020</p>
                        </div>
                        <button>Completed</button>
                        <button>Cancel</button>
                    </div>
                    <div>
                        <a href="add-task.html"><button>Add another goal</button></a>
                    </div>
                </div>
                <AddGoalType />
            </div>
        </div>
      </div>
    );
  }

}

export default Dashboard;