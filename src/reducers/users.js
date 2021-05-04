import { RECEIVE_USERS, ADD_Q_ANSWER, ADD_QUESTION_USER } from '../actions/users'

export default function users (state={}, action){
    switch(action.type){
        case RECEIVE_USERS :
            return{
                ...state,
                ...action.users
            }
        case ADD_Q_ANSWER :
            return{
                ...state,
                [action.authedUser]:{
                    ...state[action.authedUser],
                    answers:{
                        ...state[action.authedUser].answers,
                        [action.id]:action.answer
                    },
                    score: state[action.authedUser].score +1
                }
            }
        case ADD_QUESTION_USER:
            console.log("hena: ", state)
            return{
                ...state,
                [action.question.author]:{
                    ...state[action.question.author],
                    questions: state[action.question.author].questions.concat([action.id]),
                    score: state[action.question.author].score +1
                }
            }
        default:
            return state
    }
}