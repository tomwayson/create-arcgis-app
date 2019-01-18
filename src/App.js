import React from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import AppNav from './components/AppNav';
import Home from './routes/Home';
import Items from './routes/Items';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: undefined
    };
  }
  signIn = () => {
    // TODO: actually sign in
    this.setState({
      currentUser: {
        fullName: 'Tom W'
      }
    });
  }
  signOut = () => {
    // TODO: actually sign out
    this.setState({
      currentUser: null
    });
  }
  render () {
    const { currentUser } = this.state;
    return (
      <>
        <AppNav currentUser={currentUser} onSignIn={this.signIn} onSignOut={this.signOut} />
        <div className="container mt-5">
          <Route exact path="/" component={Home} />
          <Route path="/items" component={Items} />
        </div>
      </>
    );  
  }
}

export default App;
