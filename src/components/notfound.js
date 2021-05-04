import React, { Component } from 'react'

class NotFound extends Component{
    state={
        toHome: true,
    }
    render(){
        
        return(
            <img src='./img/404-img.png' alt='404 not found' className='not-found'/>
        )
    }
}


export default NotFound