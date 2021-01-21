import React, {useState, useContext, useEffect} from 'react'
import Axios from 'axios'
//import config from '../config';
import ApiContext from '../ApiContext'
import './DonateTreeWindow.css'

function DonateTreeWindow(props) {

    const value = useContext(ApiContext)

    const [goal, setGoal] = useState({})

    useEffect(() => {
        if (value.user.length === 0) {
        props.history.push(`/login`)
        }
        setGoal(value.goals.find(g => g.id == props.match.params.goalId))
      }, [])

      const {title, tree_bet} = goal

    const handleDonate = () => {
        
        console.log(value.user.id, tree_bet)

       Axios.post(`https://api-dev.digitalhumani.com/tree`, {
        "treeCount": tree_bet,
        "enterpriseId": "7997dd50",
        "projectId": "77111010",
        "user": value.user.email
       })
       .then(res => {
        console.log(res)
        })
        .catch(error => {
            console.log(error)
        })
    }
         

      

    return (
        <div className='Card'>
            <header>
                <h3>{title}</h3>
            </header> 
            <div className="tree-bet" id="tree_bet" name="tree_bet" value={tree_bet}>
                {(tree_bet > 1) ? <p>{tree_bet} trees at stake</p> : <p>{tree_bet} tree at stake</p>}
            </div>
            <button onClick={handleDonate}>Donate</button>
        </div>
    )
}

DonateTreeWindow.defaultProps = {
    children: <div>Empty Modal</div>,
    customClass: '',
    show: false,
    //closeCallback: () => (false),
    goalTypes: [],
    userId: ""
};

export default DonateTreeWindow;