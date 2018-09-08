import React, { Component } from 'react';
import Redirect from 'react-router-dom/Redirect';
import Login from '../store'

class Pay extends Component {
    constructor(props){
        super(props);
        this.state={
           redirect: false
        };
        this.pay = this.pay.bind(this);
    }

    pay(){
        alert('Thanh Toán Thành Công')
        console.log(this.props.usr)
        var name = this.props.usr
        var IDdetailProduct = this.props.IDdetailProduct
        fetch('/history',{
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                User: name,
                isPay: 'true',
                IDdetailProduct: IDdetailProduct
            })
        }).then(() => {
            this.setState({
                redirect: true
            })
        })
    }

    render() {
        if(Login.usr !== this.props.usr){
            return <h2>Bạn không phải là {this.props.usr}</h2>
        }
        if(Login.isAuthen === false){
            return <Redirect to="/login" />
        }
        return (
            <div>
                <div style={{width: 1000, height: 500, backgroundColor: '#CFCFCF', marginLeft:200, marginTop: 50, marginBottom: 50}}>
                    <div style={{margin: 50, padding: 20, backgroundColor: 'white'}}>
                        <h2 style={{textAlign: 'center', fontWeight: 'bold'}} >PHIẾU THANH TOÁN</h2>
                        <p><strong>Tên Khách Hàng: </strong>{this.props.usr}</p>
                        <hr />
                        <p><strong>Tên Sản Phẩm: </strong>{this.props.name}</p>
                        <hr />
                        <p><strong>Giá tiền: </strong>{this.props.price} VNĐ</p>
                        <hr />
                        <button type="button" className="btn btn-primary" onClick={this.pay}>Thanh toán</button>
                    </div>
                </div>
                {this.state.redirect ? <Redirect to="/products" /> : null}
            </div>
        );
    }
}

export default Pay;