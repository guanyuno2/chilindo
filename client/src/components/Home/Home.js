import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Login from '../store'
import AddProduct from '../AddProduct/AddProduct'
import DeleteProduct from '../DeleteProduct/DeleteProduct'
import EditProduct from '../EditProduct/EditProduct'
import ListCart from '../ListCart/ListCart'

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            username: Login.usr,
            them: false,
            xoa: false,
            sua: false,
            list: false
        }
        this.clickThem = this.clickThem.bind(this);
        this.clickXoa = this.clickXoa.bind(this);
        this.clickSua = this.clickSua.bind(this);
        this.clickList = this.clickList.bind(this);
    }

    clickThem(){
        this.setState({
            them: !this.state.them
        })
    }
    
    clickXoa(){
        this.setState({
            xoa: !this.state.xoa
        })
    }

    clickSua(){
        this.setState({
            sua: !this.state.sua
        })
    }

    clickList(){
        this.setState({
            list: !this.state.list
        })
    }

    render() {
        if(Login.isAuthen === false){
            return <Redirect to="/login" />
        }
        if(Login.type === 'user'){
            return <div>BẠN KHÔNG ĐƯỢC PHÉP TRUY CẬP</div>
        }
        return (
            <div >
                Xin Chào {this.state.username}
                <nav>
                    <ul className="list-group">
                        <li className="container-fluid">
                            <button className="btn btn-primary" onClick={this.clickThem}>THÊM SẢN PHẨM</button>
                            {this.state.them ? <AddProduct /> : null}
                       </li>
                        <hr />
                        <li className="container-fluid">
                            <button className="btn btn-primary" onClick={this.clickXoa}>XÓA SẢN PHẨM</button>
                            {this.state.xoa ? <DeleteProduct /> : null}
                        </li>
                        <hr />
                        <li className="container-fluid">
                            <button className="btn btn-primary" onClick={this.clickSua}>SỬA SẢN PHẨM</button>
                            {this.state.sua ? <EditProduct /> : null}
                        </li>
                        <hr />
                        <li className="container-fluid">
                            <button className="btn btn-primary" onClick={this.clickList}>DANH SÁCH ĐẤU GIÁ</button>
                            {this.state.list ? <ListCart /> : null}
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Home;