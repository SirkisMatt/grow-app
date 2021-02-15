import React, {useEffect, useState, useLayoutEffect} from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'
import Raas from '../images/Raas.png'
import LandingNav from '../LandingNav/LandingNav'
import growLaptop from '../images/Grow_Laptop.png'
import growthPhone from '../images/GrowthPhone_Mock.png'
import kauriLoop from '../video/kauriLoop.mp4'



function LandingPage(props) {

  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
    }, []);
    console.log(size);

    const [width, height] = size

    console.log(width)
    return (
      <div className='landing-page'>

        <div className="banner" style={{
            height: height,
            width: width
          }}>
            <LandingNav/>
            <video autoPlay loop muted className="kauri_video" 
          
          >
              <source src={kauriLoop} type="video/mp4"/>
            </video>
            <div className="overlay"></div>
            <div className="shadow-overlay"></div>
            <div className="overlay_text">
              <h3 id="catch_phrase">Better You Better Planet</h3>
              <h1>Grow lets you set goals for yourself and keeps you accountable.</h1>
              <button className="signup_btn_main"><Link to='/signup' className="sign-up">Sign Up - Start Growing</Link></button>
            </div>
        </div>
        
        <div className='landing_main'>
          <section className='landing-section'>
            <div className="landing-row">
              <div className="column-1">  
                <h3>Set goals for yourself</h3>
                <p>Grow lets you set goals for yourself and keeps you accountable.</p>
              </div>
              <div className="column-2">
                <img id="growthPhone" src={growthPhone} alt="A screenshot of the dashboard on an iphone" />
              </div>
            </div>
            
          </section>

          <hr/>

          <section className='landing-section image_only'>
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
                <p>If you don't complete your goal, you will be asked to donate 1$ per tree by trusted reforestation 
                  organizations (One Tree Planted, WeForest, TIST or Sustainable Harvest International). We use RaaS to handle the donation process. The API is powered by 
                  <a id="DigitalHumani"href="https://digitalhumani.com/" target="blank"> Digitalhumani. </a></p>
              </div>
              {/* <div className="column-2">
                <img id="Raas" src={Raas} alt="A picture of Raas"/>
              </div> */}
            </div>
          </section>
        </div>
   
      </div>
    );

}

export default LandingPage;