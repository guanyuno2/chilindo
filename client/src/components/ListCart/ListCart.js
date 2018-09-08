import React, { Component } from 'react';

class ListCart extends Component {
    constructor(props){
        super(props);
        this.state = {
            listUser: {}
        }
        this.demo = this.demo.bind(this);
        this.inObject = this.inObject.bind(this);
    }

    componentDidMount(){
        fetch('/listUser', {
            method: 'GET',
            headers: {'Content-type' : 'application/json'}
        }).then((data) => {
            data.json().then(data => {
                this.setState({
                    listUser: data
                })
                console.log(this.state.listUser)
            })
        })
    }

    inObject(x){
        return (
            <tr>
                <td>{x.IDdetailProducts}</td> 
                <td>{x.Price}</td>
                <td>{x.User}</td>
                <td>{x.isPay}</td>
            </tr>
        )
    }

    demo(){
        var data = this.state.listUser;
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

    
    render() {
        return (
            <div>
                <table className="table table-hover">
                <thead>
                <tr>
                    <th>Sản Phẩm: </th>
                    <th>Giá: </th>
                    <th>Khách Hàng: </th>
                    <th>Tình Trạng Thanh Toán: </th>
                </tr>
                </thead>
                {
                    this.demo()
                }
                </table>
            </div>
        );
    }
}

export default ListCart;