import React, { Component } from 'react';
import Login from '../store'
import { Redirect } from 'react-router-dom';
import ListProducts from '../ListProducts/ListProducts';



class Products extends Component {
    constructor(){
        super();
        this.state = {
           dc: false,
           dpt: false
        }
       this.clickdc = this.clickdc.bind(this)
       this.clickdpt = this.clickdpt.bind(this)
    }
    
    clickdc = event => {
        this.setState({
            dc: !this.state.dc
        })
        event.preventDefault();
    }
    clickdpt = event => {
        this.setState({
            dpt: !this.state.dpt
        })
        event.preventDefault();
    }

    componentDidMount()  {
        // fetch('/hello')
        //     .then(res => res.json())
        //     .then(products => this.setState({products}, () => {
        //         console.log('products', products)
        //     }))
    }

    render() {
        if(Login.isAuthen === false ){
            return <Redirect to="/login" />
        }

        return (
            <div>
               <div >
                    <div>
                        <div>
                            <div>
                                <nav>
                                    <ul className="list-group">
                                        <li className="container-fluid"><button onClick={this.clickdc} className="btn btn-primary">Đồ Chơi</button>{
                                            this.state.dc ? <ListProducts name="dc" /> : null
                                        }
                                        </li>
                                        <hr />
                                        <li className="container-fluid"><button onClick={this.clickdpt} className="btn btn-primary">Điện & Phụ Tùng</button>{
                                            this.state.dpt ? <ListProducts name="dpt" /> : null
                                        }</li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div id="content">

                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Products;