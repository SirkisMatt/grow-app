import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'


class LandingPage extends Component {
  render() {
    return (
      <div className='landing-page'>
        <nav role="navigation">
            <ul>
                <li><Link to='/login' className='login'>Login</Link></li>
                <li><Link to='/signup' className="sign-up">Sign Up</Link></li>
            </ul>
        </nav>
        <header className='landing-header'>
          <h1>Grow</h1>
          <h3>Better You Better Planet</h3>
        </header>
        <section className='landing-section'>
          <header className='landing-header'>
              <h3>Set goals for yourself</h3>
          </header>
          <p>[<em>placeholder for screenshot of goal setting interface</em>]</p>
          <p>Grow lets you set goals for yourself and keeps you accountable.</p>
        </section>
        <section className='landing-section'>
          <header className='landing-header'>
              <h3>Plant trees if you fall short on tasks you set for yourself</h3>
          </header>
          <p>[<em>placeholder for screenshot of tree planting outcomes</em>]</p>
          <p>Succeed whether you meet your goals or not. You are either benefitting yourself or the planet! Set how many trees you will donate if you don't complete your goal.</p>
        </section>
        <section className='landing-section'>
          <header className='landing-header'>
              <h3>How does the tree planting service work?</h3>
          </header>
          <p>[<em>placeholder for screenshot Raas</em>]</p>
          <p>You set the amount of trees you will plant if you don't meet your goal. If you don't complete your goal, you will be billed 1$ per tree by trusted reforestation organizations (One Tree Planted, WeForest, TIST or Sustainable Harvest International) so that a tree is planted in the reforestation project of your choice.</p>
        </section>
      </div>
    );
  }

}

export default LandingPage;