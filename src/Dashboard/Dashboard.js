import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import STORE from '../dummy-store'
import './Dashboard.css'


class Dashboard extends Component {
    // constructor(props) {
    //     super(props);
    // }

 
  render() {
    console.log(STORE)
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
                        <h2>Exercise</h2>
                    </header>
                    <div className="task">
                        <header>
                            <h3>Run 15 miles this week.</h3>
                        </header> 
                        <div className="tree-bet">
                            <p>2 Trees at Stake</p>
                            <p>Complete by: Friday 11-13-2020</p>
                        </div>
                        <button>Completed</button>
                        <button>Cancel</button>
                    </div>
                    <div>
                        <a href="add-task.html"><button>Add another goal</button></a>
                    </div>
                </div>
                <div className="column">
                    <header>
                        <h2>Self Care</h2>
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
                <div className="column">
                    <button id="add-list">+ Add goal type</button>
                </div>
            </div>
        </div>
      </div>
    );
  }

}

export default Dashboard;