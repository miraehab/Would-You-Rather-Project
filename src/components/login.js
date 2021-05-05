import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dropdown } from 'react-bootstrap';
import { DropdownButton } from 'react-bootstrap';
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
import history from "../utils/history";

class Login extends Component{
    state={
        toHome: false,
    }
    changeUser=(usr)=>{
        this.setState({
            toHome : true
        })
        this.props.dispatch(setAuthedUser(usr))
    }

    render(){
        if (this.state.toHome === true) {
            return <Redirect to={history.location.pathname} />
        }
        return(
            <div className='login-box'>
                <p>Login</p>
                <img src='./img/would-you-rather-logo.png' alt='logo' className='login-logo' />
                <DropdownButton title="Users" className='users-btn' onSelect={(usr)=>this.changeUser(usr) }>
                    {
                        this.props.usersNames.map((user)=> (
                            <Dropdown.Item
                            eventKey={this.props.users[user].id}
                            key={this.props.users[user].id}
                            >
                                <img 
                                    src={this.props.users[user].avatarURL} 
                                    height="5%" 
                                    width="5%"
                                    alt='user-avatar'
                                /> {this.props.users[user].name}
                            </Dropdown.Item>
                        )
                        )
                    }
                </DropdownButton>
            </div>
        )
    }
}

function mapStateToPorps({users, authedUser}, { redirectedfrom }){
    return {
        authedUser,
        users,
        usersNames: Object.keys(users),
        redirectedfrom,
    }
}

export default connect(mapStateToPorps)(Login)