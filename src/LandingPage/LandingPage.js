import React, {Component} from 'react';
import './LandingPage.css'
import Raas from '../images/Raas.png'
import trees from '../images/trees_donated.png'
import dashboard from '../images/grow_dashboard.png'



class LandingPage extends Component {
  render() {
    return (
      <div className='landing-page'>
        
        <header className='landing-main-header'>
              <h1 className="xlarge-font">Grow</h1>
              <h3 className="large-font">Better You Better Planet</h3>
        </header>
        <hr/>
        <section className='landing-section'>
          <div className="landing-row">
            <div className="column-1">
                
              <p><span style={{fontSize: "36px"}}>Set goals for yourself</span>Grow lets you set goals for yourself and keeps you accountable.</p>
            </div>
            <div className="column-2">
             
              <img src={dashboard} alt="A screenshot of the dashboard" width="335" height="471"/>
            </div>
          </div>
          
        </section>
        <hr/>
        <section className='landing-section'>
          <div className="landing-row">
            <div className="column-2">
              <img src={trees} alt="A screenshot of trees being donated" width="335" height="471"/>
            </div>
            <div className="column-1">
              <header className='landing-header'>
                  <h3>Plant trees if you fall short on tasks you set for yourself</h3>
              </header>
              <p>Succeed whether you meet your goals or not. You are either benefitting yourself or the planet! Set how many trees you will donate if you don't complete your goal.</p>
            </div>
          </div>
        </section>
        <hr/>
        <section className='landing-section'>
        <div className="landing-row">
            <div className="column-1">
            <header className='landing-header'>
                  <h3>How does the tree planting service work?</h3>
              </header>
              <p>You set the amount of trees you will plant if you don't meet your goal. If you don't complete your goal, you will be billed 1$ per tree by trusted reforestation organizations (One Tree Planted, WeForest, TIST or Sustainable Harvest International) so that a tree is planted in the reforestation project of your choice.</p>
            </div>
            <div className="column-2">
              <img src={Raas} alt="A picture of Raas" width="335" height="471"/>
            </div>
          </div>
        </section>
      </div>
    );
  }

}

export default LandingPage;