import React, { Component } from 'react';
import Login from '../store';
import { Link, Redirect } from 'react-router-dom';



class ListProducts extends Component {
    constructor(props){
        super(props);
        this.state = {
            namePro: '',
            usr: Login.usr,
            time: 10,
            first: {},
            second: {}
        };
        this.getName = this.getName.bind(this);
        this.getDes = this.getDes.bind(this);
        this.defineSTT = this.defineSTT.bind(this);
        this.getURL = this.getURL.bind(this);
        // this.setName = this.setName.bind(this);
    }

   componentDidMount(){
        var nameprop = this.props.name
        fetch('/products', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                name: nameprop
            })
        }).then((data) => {
            data.json().then(data => {
                this.setState({
                    first: {
                        Des: data[0].Des,
                        IDProducts: data[0].IDProducts,
                        IDdetailProducts: data[0].IDdetailProducts,
                        Name: data[0].Name,
                        Price: data[0].Price,
                        Urlimg: data[0].Urlimg
                    },
                    second: {
                        Des: data[1].Des,
                        IDProducts: data[1].IDProducts,
                        IDdetailProducts: data[1].IDdetailProducts,
                        Name: data[1].Name,
                        Price: data[1].Price,
                        Urlimg: data[1].Urlimg
                    }
                })
            })
        })
        setInterval(() => {
            if(this.state.time === 0){
                this.setState({
                    time: 11
                })
            }
            this.setState({
                time: this.state.time -1
            })
        },1000)
    }
    componentWillUnmount(){
        this.setState({
            time: 0
        })
    }

    // setName(x){
    //     this.setState=({
    //         namePro: x
    //     })
    //     console.log('ham setName duoc goi')
    // }

    getName(x){
        switch(x){
            case 1: 
                return this.state.first.Name;
            case 2:
                return this.state.second.Name;
            default:
                return null;    
        }
    }

    getDes(x){
        switch(x){
            case 1:
            return this.state.first.Des;
            case 2:
            return this.state.second.Des;
            default:
            return null;
        }
    }
    getURL(x){
        switch(x){
            case 1:
            console.log(this.state.first.Urlimg)
            return this.state.first.Urlimg;
            case 2:
            return this.state.second.Urlimg;
            default: return null;
        }
    }
    defineSTT(x){
        if(x === 'dc'){
            return 1;
        }
        if(x === 'dpt'){
            return 2;
        }
        else return null;
    }

    render() {
        if(Login.isAuthen === false){
            return <Redirect to="/login" />
        }
        return (
            <div >
                <div >
                    <div>
                        <p>Xin Chào {this.state.usr}</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-6" style={{width: "18rem"}}>
                            <div >
                                <Link to={{
                                    pathname: "/:detailproduct",
                                    search: '?sort=name',
                                    hash: '#the-hash',
                                    state: {
                                        name: this.state.first.Name,
                                        des: this.state.first.Des,
                                        price: this.state.first.Price,
                                        url: this.state.first.Urlimg,
                                        idproduct: this.state.first.IDProducts,
                                        iddetailproduct: this.state.first.IDdetailProducts
                                    }
                                }} ><img className="card-img-top" src={process.env.PUBLIC_URL + this.getURL(1)} alt=""  />  </Link>                       
                            </div>
                            <div className="card-body">
                                <h5 style={{fontWeight: "bold"}}>00:{this.state.time}</h5>
                                <p className="card-title" style={{fontWeight: "bold",fontSize: 16, color: "red"}}>{this.getName(1)}</p>
                                <p className="card-text">{this.getDes(1)}</p>
                            </div>
                        </div>
                        <div className="col-lg-6" style={{width: "18rem"}}>
                            <div >
                                <Link to={{
                                    pathname: "/:detailproduct",
                                    search: '?sort=name',
                                    hash: '#the-hash',
                                    state: {
                                        name: this.state.first.Name,
                                        des: this.state.first.Des,
                                        price: this.state.first.Price,
                                        url: this.state.first.Urlimg,
                                        idproduct: this.state.first.IDProducts,
                                        iddetailproduct: this.state.first.IDdetailProducts
                                    }
                                }}><img className="card-img-top" src={process.env.PUBLIC_URL + this.getURL(1)} alt="" /> </Link>                   
                            </div>
                            <div className="card-body">
                                <h5 style={{fontWeight: "bold"}}>00:{this.state.time}</h5>
                                <p className="card-title" style={{fontWeight: "bold",fontSize: 16, color: "red"}}>{this.getName(1)}</p>
                                <p className="card-text">{this.getDes(1)}</p>    
                            </div>
                        </div>
                        <div className="col-lg-6" style={{width: "18rem"}}>
                            <div >
                                <Link to={{
                                    pathname: "/:detailproduct",
                                    search: '?sort=name',
                                    hash: '#the-hash',
                                    state: {
                                        name: this.state.second.Name,
                                        des: this.state.second.Des,
                                        price: this.state.second.Price,
                                        url: this.state.second.Urlimg,
                                        idproduct: this.state.second.IDProducts,
                                        iddetailproduct: this.state.second.IDdetailProducts
                                    }
                                }}><img className="card-img-top" src={process.env.PUBLIC_URL + this.getURL(2)} alt="" />        </Link>                  
                            </div>
                            <div className="card-body">
                                <h5 style={{fontWeight: "bold"}}>00:{this.state.time}</h5>
                                <p className="card-title" style={{fontWeight: "bold",fontSize: 16, color: "red"}}>{this.getName(2)}</p>
                                <p className="card-text">{this.getDes(2)}</p>    
                            </div>
                        </div>
                        <div className="col-lg-6" style={{width: "18rem"}}>
                            <div >
                                <Link to={{
                                    pathname: "/:detailproduct",
                                    search: '?sort=name',
                                    hash: '#the-hash',
                                    state: {
                                        name: this.state.second.Name,
                                        des: this.state.second.Des,
                                        price: this.state.second.Price,
                                        url: this.state.second.Urlimg,
                                        idproduct: this.state.second.IDProducts,
                                        iddetailproduct: this.state.second.IDdetailProducts
                                    }
                                }}><img className="card-img-top" src={process.env.PUBLIC_URL + this.getURL(2)} alt="" />   </Link>                           
                            </div>
                            <div className="card-body">
                                <h5 style={{fontWeight: "bold"}}>00:{this.state.time}</h5>
                                <p className="card-title" style={{fontWeight: "bold",fontSize: 16, color: "red"}}>{this.getName(2)}</p>
                                <p className="card-text">{this.getDes(2)}</p>    
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        );
    }
}

export default ListProducts;