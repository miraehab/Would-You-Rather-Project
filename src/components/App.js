import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import history from "../utils/history";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../App.css';
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading-bar'
import Home from './home'
import Login from './login'
import Nav from './nav'
import QuestionPage from './questionPage'
import NewQuestion from './newQuestion'
import NotFound from './notfound'
import LeaderBoard from './leaderBoard'

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render(){
    return (
      <Router history={history}>
        <Fragment>
        <LoadingBar/>
          <div className="App">
            <Nav/>
            {this.props.loading === true
                    ? null
                    : 
                    <div>
                        <Route path='/' exact component={Home} />
                        <Route path='/login' exact component={Login} />
                        <Route path='/questions/:id' component={QuestionPage} />
                        <Route path='/leaderboard' exact component={LeaderBoard} />
                        <Route path='/add' component={NewQuestion} />
                        <Route path="/404" component={NotFound} />
                      </div>}
          </div>
        </Fragment>
    </Router>
    
  );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser,
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
