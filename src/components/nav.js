import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'


class Nav extends Component{
  render(){
  return ( 
      <header>
        <img src='./img/would-you-rather-logo.png' alt='logo'/>
        <nav className='nav'>
          <ul className='nav-bar'>
            <li className='nav-box-option'>
              <NavLink to='/' exact activeClassName='nav-option' style={{ textDecoration: 'none' }}>
                Home
              </NavLink>
            </li>
            <li className='nav-box-option'>
              <NavLink to='/add' activeClassName='nav-option' style={{ textDecoration: 'none' }}>
                New Question
              </NavLink>
            </li>
            <li className='nav-box-option'>
            <NavLink to='/leaderboard' activeClassName='nav-option' style={{ textDecoration: 'none' }}>
                Leader Board
            </NavLink>
            </li>
            {
                this.props.authedUser === ''
                ?null
                :
                <li className='nav-box-option-right-name'>Hello, {this.props.authedUser}</li>
              }
            
            <li className='nav-box-option-right'>
            
              {
                this.props.authedUser === ''
                ?<NavLink to='/login' activeClassName='nav-option' style={{ textDecoration: 'none' }}>Log In</NavLink>
                :
               <NavLink to='/login' activeClassName='nav-option' style={{ textDecoration: 'none' }} onClick={()=>this.props.dispatch(setAuthedUser(''))}>Log out</NavLink>
              }
                
            
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

function mapStateToPorps({ authedUser }){
  return{
      authedUser,
  }
  }

export default connect(mapStateToPorps)(Nav)

