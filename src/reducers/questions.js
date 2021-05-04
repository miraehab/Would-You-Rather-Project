import { ADD_QUESTION, RECEIVE_QUESTIONS, ADD_Q_ANSWER  } from '../actions/questions'

export default function questions (state={}, action){
    switch(action.type){
        case RECEIVE_QUESTIONS :
            return{
                ...state,
                ...action.questions
            }
        case ADD_QUESTION :
        
            return {
                ...state,
                [action.question.id]: action.question,
            }
        case ADD_Q_ANSWER :
            console.log("mee: ",state[action.id])
            return{
                  ...state,
                      [action.id]:{
                          ...state[action.id],
                          [action.answer]: {
                            ...state[action.id][action.answer],
                        votes: state[action.id][action.answer].votes.concat([action.authedUser])
                      }
                      }
                      
                    }
        default:
            return state
    }
}