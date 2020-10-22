import React from 'react';
import './App.css';
import { Content } from './components/content';
import { Footer } from './components/footer';
import { Header } from './components/header';
import 'bootstrap/dist/css/bootstrap.min.css'; //import Bootstrap
import { Navbar, Nav } from 'react-bootstrap'; //import Navbar
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";//import Router Switch & Route
import { Create } from './components/create';
import { Read } from './components/read';
//Class "App" inherits from react.component
class App extends React.Component {
  render() {
    return (
      // Router linking components
      <Router>
        <div className="App">
          {/* //Navigation Bar Code */}
          <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="/">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/sport">Sport</Nav.Link>
              <Nav.Link href="/travel">Pricing</Nav.Link>
            </Nav>
          </Navbar>
          {/* Switch through Navigation Bar */}
          <Switch>
            {/* //links Home to component Content */}
            <Route path='/' component={Content} exact></Route>
            {/* //links sport to component Create */}
            <Route path='/sport' component={Create}></Route>
            {/* //links travel to component Footer */}
            <Route path='/travel' component={Read}></Route>
          </Switch>

          {/* <Header></Header>
        <Content></Content>
        <Footer></Footer> */}
        </div>
      </Router>
    );
  }
}//App

export default App;
