
import React from 'react';
import { BrowserRouter as Router, Switch, Route,  } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AuthProvider } from './components/firebase/AuthProvider'
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Program from './components/Program'
import Artists from './components/Artists'
import Place from './components/Place'
import Tickets from './components/Tickets'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Login from './components/Login'
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile';


function App() {
  return (
    <AuthProvider>
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
                    <Route path="/program" component={Program} />
                    <Route path="/artists" component={Artists} />
                    <Route path="/place" component={Place} />
                    <Route path="/tickets" component={Tickets} />
                    <Route path="/faq" component={Faq} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <PrivateRoute exact path="/profile" component={Profile} />
                    <Route component={Error} />
                  </Switch>
                </div>
              </CSSTransition>
            </TransitionGroup>
          )} />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
