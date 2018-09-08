import React, { Component } from 'react';
import Login from '../store'

class Customers extends Component {
    constructor(){
        super();
        this.state = {
            customers: []
        }
        this.demo = this.demo.bind(this);
    }

    demo() {
        console.log(login.isAuthen)
    }

    componentDidMount() {
        fetch('/api/hello')
            .then(res => res.json())
            .then(customers => this.setState({customers},() =>{
                console.log('Customers fetched...', customers)
            } ))
    }

    render() {
        if(Login.isAuthen === false){
            return <Redirect to="/login" />
        }
        return (
            <div>
                <h2>Customer {this.demo()}</h2>
                
            </div>
        );
    }
}

export default Customers;