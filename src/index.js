import React from 'react';
import ReactDOM from 'react-dom';
 import { BrowserRouter } from 'react-router-dom';
import App from './App';
import fern from './images/fern.png'
import './index.css';


// function Image() {
//     const [ bgImg, changeBg ] = useState(true)
// }
// export default Image;
// style={{ backgroundImage: Image() && fern }}

ReactDOM.render(
    <BrowserRouter>
    <App />
    </BrowserRouter>,
   document.getElementById('root')
  );
