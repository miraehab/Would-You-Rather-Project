import{ _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading' 
import { AddQuestion  } from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_Q_ANSWER = 'ADD_Q_ANSWER'

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion (text1, text2, authedUser) {
  return (dispatch) => {
        dispatch(showLoading())
        return _saveQuestion({
            optionOneText: text1.text1,
            optionTwoText: text1.text2,
            author: text1.authedUser,
            
        })
      .then((question) => (
          dispatch(addQuestion(question)),
          dispatch(AddQuestion(question))
          ))
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions (questions){
    return {
        type:RECEIVE_QUESTIONS,
        questions,
    }
}

function AddAnswer ({authedUser}){
    return{
        type:ADD_Q_ANSWER ,
        id: authedUser.id,
        authedUser: authedUser.authedUser,
        answer: authedUser.answer
    }
}

export function handleAddAnswer (info){
    return(dispatch)=>{
         let i = dispatch(AddAnswer(info));
        _saveQuestionAnswer({
            authedUser: i.authedUser, 
            id: i.id, 
            answer:i.answer})
    }
}