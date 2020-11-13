import React, { Component } from 'react'
import ApiContext from '../ApiContext'

export default class GoalListHeader extends Component {

    static contextType = ApiContext;

    //Work in Progress obvi!

    render() {
        const { goal_type } = this.context
        //console.log(goal_type[1].title)
        return (
        <div>
            <h2></h2>
        </div>
        )
    }
}