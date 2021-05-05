import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddAnswer } from '../actions/questions'
import { handleAddUserAnswer } from '../actions/users'
import history from "../utils/history";

class QuestionPage extends Component{
    state={
        toLogin: true,
        answer: ''
    }

    handleSubmit = (authedUser,id , answer)=>{
        const { dispatch } = this.props;
        dispatch(handleAddAnswer({authedUser, id, answer}))
        dispatch(handleAddUserAnswer({authedUser, id, answer}))
    }

    render(){
        const { question, users, id, authedUser } = this.props 
        let answer = ''

        if(question === undefined){
            return <Redirect to='/404'/>
        }

        if(this.props.authedUser === ''){
            this.setState({
                toLogin:false
            })
        }
        if(this.state.toLogin === false){
            return <Redirect to='/login' />
            history.push(`/questions/${id}`)
        }

        return(
                <div className='question-box'>
                    <div className='created-by-q-page'>Asked by <strong>{question.author}</strong></div>
                    <div >
                        <img src= {users[question.author].avatarURL} alt='user avatar' className='author-avatar'/>
                    </div>
                    <div className='question-details'>
                        <h2>Would you rather...</h2>
                       { question.optionOne.votes.find(element => element === this.props.authedUser) === this.props.authedUser  || question.optionTwo.votes.find(element => element === this.props.authedUser) === this.props.authedUser
                       ? <div>
                           {question.optionOne.votes.find(element => element === this.props.authedUser) === this.props.authedUser 
                           ? (<div><p><strong>your answer is</strong>  {question.optionOne.text} <strong>votes: </strong> {((question.optionOne.votes.length)/(question.optionOne.votes.length+question.optionTwo.votes.length))*100} %</p>
                           <p>{question.optionOne.votes.length} of {question.optionOne.votes.length+question.optionTwo.votes.length}</p></div>)
                           :(<div>
                               <p>{question.optionOne.text} <strong>votes: </strong>{((question.optionOne.votes.length)/(question.optionOne.votes.length+question.optionTwo.votes.length))*100} %</p>
                               <p>{question.optionOne.votes.length} of {question.optionOne.votes.length+question.optionTwo.votes.length}</p></div>)}
                           {question.optionTwo.votes.find(element => element === this.props.authedUser) === this.props.authedUser 
                           ? 
                           (<div><p><strong>your answer is</strong> {question.optionTwo.text} <strong>votes: </strong> {((question.optionTwo.votes.length)/(question.optionOne.votes.length+question.optionTwo.votes.length))*100} %</p>
                           <p>{question.optionTwo.votes.length} of {question.optionOne.votes.length+question.optionTwo.votes.length}</p></div>)
                           :(<div>
                               <p>{question.optionTwo.text} <strong>votes: </strong> {((question.optionTwo.votes.length)/(question.optionOne.votes.length+question.optionTwo.votes.length))*100} %</p>
                               <p>{question.optionTwo.votes.length} of {question.optionOne.votes.length+question.optionTwo.votes.length}</p></div>)}
                            </div>
                        :(
                        <div>
                            <div>
                        <label>
                             <input type='radio' name='option' value={question.optionOne.text} onClick={()=>{answer="optionOne"}}/>
                             {question.optionOne.text}
                         </label><br/>
                         <label>
                             <input type='radio' name='option' value={question.optionTwo.text} onClick={()=>{answer="optionTwo"}}/>
                             {question.optionTwo.text}
                         </label>
                         
                         </div>
                         <button className='submit-btn' onClick={()=>{
                            
                            this.handleSubmit({authedUser, id, answer})
                        }}>
                        Submit
                        </button>
                    </div>)
                         
                        }
                        
                    </div>

                </div>
        )
    }
}

function mapStateToPorps ({ questions, users, authedUser }, props) {
    const { id } = props.match.params

    return {
      id,
      question: questions[id],
      users,
      authedUser,
  }
}

export default connect(mapStateToPorps)(QuestionPage)