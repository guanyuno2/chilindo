import React, { Component } from 'react';
import Login from '../store'
import { Redirect } from 'react-router-dom'

class Cart extends Component {
    constructor(props){
        super(props);
        this.state={
            cart: {
               
            }
        };
        // this.loadCart1 = this.loadCart1.bind(this);
        this.demo = this.demo.bind(this);
        this.inObject = this.inObject.bind(this);
        this.pay = this.pay.bind(this);
    }

    pay(x){
        alert('Cảm ơn bạn đã thanh toán!')
        //ok xong roi fetch len server de doi cai thanh toan
        fetch('/history', {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                User: x.User,
                isPay: 'true',
                IDdetailProduct: x.IDdetailProducts
            })
        })
    }
    

    // loadCart1(cart){
    //     // for(var i=0; i< this.state.cart.length; i++){
            
    //     //     // return (
    //     //     //     <tr>
    //     //     //         <td>{this.state.cart[i].User}</td>
    //     //     //         <td>{this.state.cart[i].IDdetailProducts}</td>
    //     //     //         <td>{this.state.cart[i].Price}</td>
    //     //     //         <td>{this.state.cart[i].isPay}</td>
    //     //     //         <td><button>Thanh Toán</button></td>
    //     //     //     </tr>
    //     //     // )
    //     // }
    //     var listcart = this.state.cart
    //     var show = listcart.map((listcart) => {
    //         <div>
    //             <td>listcart.User</td>
    //             <td>listcart.IDdetailProducts</td>
    //             <td>listcart.Price</td>
    //             <td>listcart.isPay</td>
    //         </div>
    //     })
    //     return (
    //         <tr>{show}</tr>
    //     )
    //     console.log(this.state.cart)
    //     // return (
    //     //     <tr>
    //     //       <td>{ cart.User }</td>
    //     //       <td>{ cart.IDdetailProducts }</td>
    //     //       <td>{ cart.Price }</td>
    //     //       <td>{ cart.isPay }</td>
    //     //       <td><button>Thanh Toán</button></td>
    //     //     </tr>
    //     //   );
    // }
    inObject(x){
        return (
            <tr>
                <td>{x.User}</td>
                <td>{x.IDdetailProducts}</td>
                <td>{x.Price}</td>
                <td>{x.isPay}</td>
                <td><button type="button" className="btn btn-primary" onClick={() => this.pay((x))} >Thanh Toán</button></td>
            </tr>
        )
    }
    
    demo(){
        var data = this.state.cart;
        var menu = [];
        for(var i=0; i<data.length; i++){
            
            menu.push(this.inObject(data[i]));
        }
        return (
            <tbody>
                {menu}
            </tbody>
        )
    }
    
    componentDidMount(){
        fetch('/cart', {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                usr: Login.usr
            })
        }).then((data) => {
            data.json().then(data => {
                this.setState({
                    cart: data
                })
            })
        })
        
    }
    
    render() {
        
        // const data = this.state.cart
        // console.log(data[0])
        var data = this.state.cart;
        for(var i=0; i<data.length; i++){
            this.inObject(data[i]);
        }

        if(Login.isAuthen === false ){
            return <Redirect to="/login" />
        }
        return (
            
            <div>
                <div className="container">
                    <h2><strong>Đơn Hàng của: </strong></h2><h3>{Login.usr}</h3>
                            
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Khách Hàng</th>
                            <th>Tên Sản Phẩm</th>
                            <th>Giá </th>
                            <th>Tình Trạng Tranh Toán</th>
                            <th>Thanh Toán</th>
                        </tr>
                        </thead>
                        
                        {/* <tr>
                            <td></td>
                            <td>Doe</td>
                            <td>john@example.com</td>
                            <td>Chưa Thanh Toán</td>
                            <td><button>Thanh Toán</button></td>
                        </tr> */}
                        {/* {this.loadCart1()} */}
                        {this.demo()}
                        
                    </table>
                    {/* { this.state.cart.map((item, index) => (
                            <p>{item.User}</p>
                    ))} */}
                    
                </div>
            </div>
        );
    }
}

export default Cart;