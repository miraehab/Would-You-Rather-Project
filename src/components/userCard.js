import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserCard extends Component{
    render(){
        const { users, id, questions, answers, rank} = this.props

        return(
            <div className='question-box-score'>
                <div>
                    <h3>{rank}) {users[id].name}</h3>
                <img src= {users[id].avatarURL} alt='user avatar' className='author-avatar'/>
                </div>
                <div>
                    <p>Number of questions {questions}</p>
                    <p>Number of answers {answers}</p>
                </div>
                <div>
                    <h3>Score</h3>
                    <p>{questions+answers}</p>
                </div>
            </div>
        )
    }
}

function mapStateToPorps ({}, {id, questions, answers, users, rank}){
    return{
        users,
        id,
        questions,
        answers,
    }
}

export default connect(mapStateToPorps)(UserCard)