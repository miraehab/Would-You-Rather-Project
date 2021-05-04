import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { handleAddQuestion } from '../actions/questions'


class NewQuestion extends Component{
    state={
        toLogin: true,
        optionOne:'',
        optionTwo:''
    }

    handleSubmit = (text1, text2, authedUser)=>{
        const { dispatch } = this.props;
        dispatch(handleAddQuestion({text1, text2, authedUser}))

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
        return(
            <div>
                <h2 className='title'>Wouls you rather...</h2>
                <Form className='add-new-question'>
                    <Form.Group controlId="formBasic">
                        <Form.Label>Option One</Form.Label>
                        <Form.Control placeholder="Option One..." value = {this.state.optionOne} onChange={(e)=>{this.setState({optionOne:e.target.value})}}/>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Option Two</Form.Label>
                        <Form.Control placeholder="Option Two..." value = {this.state.optionTwo} onChange={(e)=>{this.setState({optionTwo:e.target.value})}}/>
                    </Form.Group>
                </Form>
                <Link to='/' className='submit-btn'
                    onClick={()=>this.handleSubmit(this.state.optionOne,this.state.optionTwo, this.props.authedUser)}
                    >
                        Submit
                    </Link>
            </div>
        )
    }
}

function mapStateToPorps({authedUser}){
    return{
        authedUser
    }
}

export default connect(mapStateToPorps)(NewQuestion)