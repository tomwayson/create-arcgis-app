import React from 'react';
import { Route } from 'react-router-dom';
import AppNav from './components/AppNav';
import Home from './routes/Home';
import Items from './routes/Items';

class App extends React.Component {
  signIn = () => {
    console.log('TODO: sign in!');
  }
  render () {
    return (
      <div>
        <AppNav onSignIn={this.signIn} />
        <Route exact path="/" component={Home} />
        <Route path="/items" component={Items} />
      </div>
    );  
  }
}

export default App;
