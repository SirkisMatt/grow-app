import React, { useState, useContext, useEffect } from 'react'
import Axios from 'axios';
import ApiContext from '../ApiContext'
import {myConfig} from '../config.js'
import DonatingSpinner from '../FontAwesome/DonatingSpinner'
import './TreeDonatedModal.css'

function TreeDonatedModal(props) {

    const value = useContext(ApiContext)

    const [ donated, setDonation ] = useState(false)
    const [ donatedTitle, setDonationTitle ] = useState('')
    const [ highDonation, setHighDonation ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        if(!donated && props.goal.tree_bet > 1) {
            setDonationTitle('Trees to donate')
        } else if(!donated && props.goal.tree_bet === 1) {
            setDonationTitle('Tree to donate')
        } else if(props.goal.tree_bet > 1) {
            setDonationTitle('Trees Donated')
        } else {
            setDonationTitle('Tree Donated')
        }
    }, [donated, props.goal.tree_bet])

    const handleDonateTrees = () => {
        if (props.goal.tree_bet < 5) {
            setLoading(true)
            Axios.post(`https://api-dev.digitalhumani.com/tree`, {
                "treeCount": props.goal.tree_bet,
                "enterpriseId": myConfig.ENTERPRISE_ID,
                "projectId": "77111010",
                "user": value.user.email
               })
               .then(res => {
                   if(res.status === 200) {
                      setDonation(true)
                      setLoading(false)
                   }
                })
                .catch(error => {
                    console.log(error)
                })
            } else {
            setHighDonation(true)
            }
       
     }

     const donateHighNumber = () => {
        setLoading(true)
        Axios.post(`https://api-dev.digitalhumani.com/tree`, {
            "treeCount": props.goal.tree_bet,
            "enterpriseId": myConfig.ENTERPRISE_ID,
            "projectId": "77111010",
            "user": value.user.email
           })
           .then(res => {
               if(res.status === 200) {
                    setLoading(false)
                    setDonation(true)
                    setHighDonation(false)
               }
            })
            .catch(error => {
                console.log(error)
            })
     }

    const handleClickDelete = e => {
        e.preventDefault()
        const userId = value.user.id
        const id = props.goal.id
        Axios.delete(`https://immense-lowlands-49270.herokuapp.com/api/goals/${userId}/${id}`)
        .then(res => {
            if(res.status !== 204){
                return res.json().then(e => Promise.reject(e))
            }
            return res
          })
          .then(() => {
            value.deleteDueGoal(id)
            value.deleteGoal(id)
            props.toggleCallback()
          })
          .catch(err => {
            console.log(err)
          })
    }


        const { customClass, show, goal } = props

        return (
            <div className={`modal_donate_goal ${customClass}`} style={{ display: show ? 'block' : 'none'}}>
                <div className="overlay_donate_goal" ></div>
                    <div className="modal_content_donate_goal">
                       {
                       loading 
                       ? 
                       <DonatingSpinner/> 
                       : 
                        <div>
                            <h2>{goal.tree_bet} {donatedTitle}</h2>
                            {!donated ? (highDonation ?
                                    <div> 
                                        <p>You sure you want to donate {goal.tree_bet} trees?</p>
                                        <button
                                        className="donate_modal_button"
                                        type='button'
                                        onClick={donateHighNumber}
                                        >
                                            Yep I want that crisp air
                                        </button>
                                        <button
                                            className="donate_modal_button"
                                            type="button"
                                            onClick={props.toggleModalEdit}
                                            >
                                                Edit
                                        </button>
                                    </div> 
                                :
                                    <div>
                                        <button
                                        aria-label="donate_button"
                                        className='donate_modal_button'
                                        type='button'
                                        onClick={handleDonateTrees}
                                        >
                                            Donate
                                        </button>
                                        <button
                                        className='donate_modal_button'
                                        type='button'
                                        onClick={props.toggleCallback}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )
                            :
                                <div>
                                    <p>Would you like to try for your goal again?</p>
                                    <button
                                    className="donate_modal_button"
                                    type="button"
                                    onClick={props.toggleModalEdit}
                                    >
                                        Edit
                                    </button>
                                    <button
                                    className='donate_modal_button'
                                    type='button'
                                    onClick={handleClickDelete}
                                    >
                                        Delete
                                    </button>
                                </div>
                                
                            }
                        </div>
                        }
                    </div>
            </div>
        )
    }

    TreeDonatedModal.defaultProps = {
    children: <div>Empty Modal</div>,
    customClass: '',
    show: false,
    closeCallback: () => (false),
    //toggleCallback: () => (false),
    goalTypes: [],
    userId: ""
};

export default TreeDonatedModal;