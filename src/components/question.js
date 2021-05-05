import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component{
    render(){
        const { question, users, id } = this.props
        return(
                <div className='question-box'>
                    <div className='created-by'>Asked by <strong>{question.author}</strong></div>
                    <div >
                        <img src= {users[question.author].avatarURL} alt='user avatar' className='author-avatar'/>
                    </div>
                    <div className='question-details'>
                        <h2>Would you rather...</h2>
                        <Link to={`/questions/${id}`} className='question'>
                            <button type='button' className='toQuestion-page'>view Poll</button>
                        </Link>
                    </div>

                </div>
        )
    }
}

function mapStateToPorps({authedUser, users, questions}, {id}){
    const question = questions[id]
    return{
        authedUser,
        question: question,
        users
    }
}

export default withRouter(connect(mapStateToPorps)(Question))