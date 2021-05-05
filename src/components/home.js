import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './question'
import { Redirect } from 'react-router-dom'
import history from "../utils/history";


class Home extends Component{
    state={
        category : 'unanswered',
        toLogin: true,
    }

    changeCategory = (val) => this.setState({category : val})
    render(){
        if(this.props.authedUser === ''){
            this.setState({
                toLogin:false
            })
        }
        if(this.state.toLogin === false){
            return <Redirect to='/login' />
            history.push("/")
        }
        let user = this.props.authedUser
        return(
            <div>
                <div className='q-choice'>
                    <button value='unanswered' type="button" id='button-home1' className='button-home'
                    onClick={(e)=>{
                        this.changeCategory(e.target.value); 
                        document.getElementById('button-home2').style.backgroundColor='#feffdb'
                        document.getElementById('button-home1').style.backgroundColor='#fbf9af'
                    }}
                    >Unanswered</button>
                    <button value='answered' type="button" id='button-home2' className='button-home'
                    onClick={(e)=>{
                        this.changeCategory(e.target.value);
                        document.getElementById('button-home1').style.backgroundColor='#feffdb'
                        document.getElementById('button-home2').style.backgroundColor='#fbf9af'
                    }}
                    >Answered</button>
                </div>
                {this.props.authedUser === ''
                ?null
                :
                (<ul>
                    {( this.state.category === 'unanswered')
                        ?
                        (this.props.questionsIDs.map((id)=>(
                            this.props.questions[id].optionOne.votes.find(element => element === user) === user  
                            || this.props.questions[id].optionTwo.votes.find(element => element === user) === user 
                            ?null
                            :<li key={id}>
                                <Question id={id}/>
                            </li>)))
                        :
                        (this.props.questionsIDs.map((id)=>(
                            this.props.questions[id].optionOne.votes.find(element => element === user) === user 
                            || this.props.questions[id].optionTwo.votes.find(element => element === user) === user 
                            ? (<li key={id}>
                                    <Question id={id}/>
                                </li>)
                            :null ))
                    )}
                    </ul>)}
            </div>
        )
    }
    }

function mapStateToPorps({questions, authedUser}){
    return {
        authedUser,
        questions,
        questionsIDs: Object.keys(questions)
        .sort((a,b)=> questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToPorps)(Home)
