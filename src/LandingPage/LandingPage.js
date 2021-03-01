import React, {useState, useLayoutEffect, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'
import LandingNav from '../LandingNav/LandingNav'
import Axios from 'axios'
import kauriLoop from '../video/kauriLoop.mp4'



function LandingPage(props) {

  const [size, setSize] = useState([0, 0])
  const [treeCount, setCount] = useState(0)

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
    }, []);


    useEffect(() => {
      Axios.get(`https://api-dev.digitalhumani.com/enterprise/7997dd50/treeCount?startDate=2020-11-00&endDate=2030-01-01`)
      .then(res => {
        console.log(res.data)
        setCount(res.data.count)
      })
      .catch(err => {
        console.log(err)
      })
  
    }, [])

    const [width, height] = size

    return (
      <div className='landing-page'>

        <div className="banner" style={{
            height: height,
            width: width
          }}>
            <LandingNav/>
            <video autoPlay loop muted className="kauri-video" 
          
          >
              <source src={kauriLoop} type="video/mp4"/>
            </video>
            <div className="overlay"></div>
            <div className="shadow-overlay"></div>
            <div className="overlay-text">
              <h3 id="catch-phrase">Better You Better Planet</h3>
              <h1 className="desc-title">Grow lets you set goals for yourself and keeps you accountable.</h1>
              <button className="signup-btn-main"><Link to='/signup' className="sign-up">Sign Up - Start Growing</Link></button>
            </div>
        </div>
        <div className="about" >
          <div className="row section-header has-bottom-sep">
            <div className="col-full">
              <h3 className="sub-head">What we are about</h3>
              <h1 className="display-1">Healthy Planet and Happy People</h1>
            </div>
          </div>
          <div className="row about-section">
            <div className="col-full">
              <p>
              Succeed whether you meet your goals or not. You are either benefitting yourself or the planet! 
              Set how many trees you will donate if you don't complete your goal.
              </p>
              <p>If you don't complete your goal, you will be asked to donate 1$ per tree by a trusted reforestation 
                  organizations. We use RaaS to handle the donation process. The API is powered by 
                  <a id="DigitalHumani"href="https://digitalhumani.com/" target="blank"> Digitalhumani. </a>
              </p>
            </div>
          </div>
          <div className="row about-stats stats">
            <div className="col-block stats-col">
              <div className="stats-count">
                {treeCount}
              </div>
              <h5>Trees Planted</h5>
            </div>
          </div>
        </div>
        <footer>
          <div className="row footer-main">
            <div className="footer-bottom">
            <div className="info">
              <p>Developed by: Matt Sirkis</p>
              <p><a href="https://www.linkedin.com/in/matt-sirkis/" target="blank">LinkedIn</a></p>
            </div>
            </div>
            
          </div>
        </footer>
      </div>
    );

}

export default LandingPage;