
import React from 'react';
import { BrowserRouter as Router, Switch, Route,  } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Contact from './components/Contact'
import Error from './components/Error'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route render={({location}) => ( 
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={450}
              classNames='fade'
            >
              <div className='fixed-container'>
                <Switch location={location}>
                  <Route exact path="/" component={Home} />
                  <Route path="/contact" component={Contact} />
                  <Route component={Error} />
                </Switch>
              </div>
            </CSSTransition>
          </TransitionGroup>
        )} />
      </Router>
    </div>
  );
}

export default App;
