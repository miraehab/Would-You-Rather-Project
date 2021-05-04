export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_Q_ANSWER = 'ADD_Q_ANSWER '
export const ADD_QUESTION_USER = 'ADD_QUESTION_USER'

export function receiveUsers (users){
    return {
        type: RECEIVE_USERS,
        users,
    }
}

export function AddQuestion (question){
    return{
        type: ADD_QUESTION_USER,
        question,
        id:question.id,
        authedUser:question.authedUser
    }
}

 

function AddAnswer ({authedUser, id, answer}){
    return{
        type:ADD_Q_ANSWER ,
        id: authedUser.id,
        authedUser: authedUser.authedUser,
        answer: authedUser.answer
    }
}

export function handleAddUserAnswer (info){
    return(dispatch)=>{
        dispatch(AddAnswer(info))
    }
}