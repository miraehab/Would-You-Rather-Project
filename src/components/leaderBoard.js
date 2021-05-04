import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserCard from './userCard'
import { Redirect } from 'react-router-dom'

class LeaderBoard extends Component{
    state={
        toLogin: true,
    }
    render(){
        if(this.props.authedUser === ''){
            this.setState({
                toLogin:false
            })
        }
        if(this.state.toLogin === false){
            return <Redirect to='/login' />
        }

        const { users, usersIDs } = this.props

        usersIDs.sort((a,b)=> users[b].score - users[a].score)

        return(
            <div>
                {usersIDs.map((user)=>
                    (<UserCard 
                    key={users[user].id}
                    users={users}
                    id={users[user].id}
                    questions={users[user].questions.length}
                    answers={Object.keys(users[user].answers).length}
                    rank={usersIDs.indexOf(user)+1}
                    />)
                )
                    }
            </div>
        )
    }
}

function mapStateToProps({ users, authedUser }){
    return{
        users,
        authedUser,
        usersIDs: Object.keys(users)
    }
}

export default connect(mapStateToProps)(LeaderBoard) 