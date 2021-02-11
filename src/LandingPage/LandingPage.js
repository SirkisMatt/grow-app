import React, {Component} from 'react';
import './LandingPage.css'
import Raas from '../images/Raas.png'
import growLaptop from '../images/Grow_Laptop.png'
import growthPhone from '../images/GrowthPhone_Mock.png'
import kauriLoop from '../video/kauriLoop.mp4'



class LandingPage extends Component {
  render() {
    return (
      <div className='landing-page'>
        <div className="banner">
            <video autoPlay loop muted className="kauri_video">
              <source src={kauriLoop} type="video/mp4"/>
            </video>
            <div className="overlay_text">
              <h3 id="catch_phrase">Better You Better Planet</h3>
              <button>Sign Up - Start Growing</button>
            </div>
        </div>
        
        <div>
          <section className='landing-section'>
            <div className="landing-row">
              <div className="column-1">  
                <h3>Set goals for yourself</h3>
                <p>Grow lets you set goals for yourself and keeps you accountable.</p>
              </div>
              <div className="column-2">
                <img src={growthPhone} alt="A screenshot of the dashboard on an iphone" height="228" width="512" />
              </div>
            </div>
            
          </section>

          <hr/>

          <section className='landing-section'>
            <div className="img_container">
              <div>
              <img src={growLaptop} alt="A screenshot of trees being donated"/>
              </div>
              <div className="overlay_second_img">
                <h3>Plant trees if you fall short on tasks you set for yourself</h3>
              </div>
              {/* <div className="column-2">
                <img src={growLaptop} alt="A screenshot of trees being donated"/>
              </div>
              <div className="column-1">
                <h3>Plant trees if you fall short on tasks you set for yourself</h3>
                <p>Succeed whether you meet your goals or not. You are either benefitting yourself or the planet! Set how many trees you will donate if you don't complete your goal.</p>
              </div> */}
            </div>
          </section>

          <hr/>

          <section className='landing-section'>
            <div className="landing-row">
              <div className="column-1">
                <h3>How does the tree planting service work?</h3>
                <p>You set the amount of trees you will plant if you don't meet your goal. If you don't complete your goal, you will be billed 1$ per tree by trusted reforestation organizations (One Tree Planted, WeForest, TIST or Sustainable Harvest International) so that a tree is planted in the reforestation project of your choice.</p>
              </div>
              <div className="column-2">
                <img src={Raas} alt="A picture of Raas"/>
              </div>
            </div>
          </section>
        </div>
   
      </div>
    );
  }

}

export default LandingPage;