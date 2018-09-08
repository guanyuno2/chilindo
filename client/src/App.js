import React, { Component } from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home'
import { Route, Link, Redirect, Switch } from "react-router-dom";
import Products from './components/Products/Products';
import Detailproduct from './components/Detailproduct/Detailproduct'
import Cart from './components/Cart/Cart';
import Register from './components/Register/Register';



class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: Login.usr
    }
  }

  componentDidMount(){
    
    console.log('nguoi dung' + this.state.username)
    return this.state.username;
    
  }  

  render() {
    if(Login.isAuthen === false){
      return <Redirect to="/login" />
    }
    if(Login.isAuthen === true){
      return <Redirect to="/home" />
    }

    return (
      
        <div>
          <div className="header">
            <nav className="navbar navbar-inverse">
              <div className="navbar-collapse">
                <ul className="nav navbar-nav" >
                  <li >
                    <Link to="/home">Dashboard</Link>
                  </li>
                  <li >
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/products">Product</Link>
                  </li>
                  <li>
                    <Link to='/register'>Register</Link>

                  </li>
                  <li>
                    <p>{this.state.username}</p>
                  </li>
                  <li>
                    <Link to={{
                                    pathname: "/cart",
                                    state: {
                                      usr: Login.usr
                                    }
                                }}>Cart</Link>
                  </li>
                  
                </ul>
              </div>
            </nav>
          </div>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/products" component={Products} />
              
            <Route exact path="/register" component={Register} /> 
            <Route path="/:detailproduct" component={Detailproduct} />        
          </Switch>
        </div>
     
    );
  }
}

export default App;
