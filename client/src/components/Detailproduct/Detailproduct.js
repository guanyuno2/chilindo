import React, { Component } from 'react';
import Login from '../store'
import Pay from '../Pay/Pay'
import { Redirect } from 'react-router-dom'

class Detailproduct extends Component {

    constructor(props){
        super(props);
        this.state={
            IDdetailProduct: this.props.location.state.iddetailproduct,
            bid: this.props.location.state.price,
            timer: 10,
            usr: Login.usr,
            winner: '',
            isPay: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.down = this.down.bind(this);
        this.up = this.up.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    down(event){
        event.preventDefault();
        if(this.state.bid === this.props.location.state.price){
            return null
        }
        this.setState({
            bid: this.state.bid - 2000
        })
    }

    up(event){
        event.preventDefault();
        this.setState({
            bid: this.state.bid + 2000,
        })
    }
    

    handleSubmit(event){
        alert('Bạn đã đấu giá món hàng này với số tiền là: ' + this.state.bid + ' VNĐ')
        console.log('ham submit duoc goi voi gia ' + this.state.bid + ' tu user: ' + this.state.usr + 'san pham ' + this.state.IDdetailProduct)
        fetch('/bid', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                usr: this.state.usr,
                bidprice: this.state.bid,
                IDdetailProduct: this.state.IDdetailProduct
            })
        }).then((data) => {
            data.json().then(data => {
                console.log(data.BidPrice)
                this.setState({
                    bid: data.BidPrice
                })
                console.log(this.state.bid)
            })
        })
        
        event.preventDefault();
    }

    handleChange = event => {
        this.setState({
            [event.target.nanme]: event.target.value
        });
    }

    componentDidMount(){
        
        setInterval(() => {
            if(this.state.timer === 0 ){
                fetch('/bid', {
                    method: 'PUT',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                        IDdetailProduct: this.state.IDdetailProduct
                    })
                }).then((data) => {
                    data.json().then(data => {
                        this.setState({
                            winner: data.UserGotit
                        })
                        alert('Hết giờ đấu giá: Người chiến thắng là: ' + data.UserGotit)
                    })
                })
                
                this.setState({
                    isPay: true
                })
            }
            if(this.state.timer < 0) {
                console.log('state winner: ' + this.state.winner)
                fetch('/history', {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                        Usr: this.state.winner,
                        IDdetailProduct: this.state.IDdetailProduct,
                        Price: this.state.bid
                    })
                })
                this.setState({
                    timer: 10000
                })
            }
            this.setState({
                timer: this.state.timer - 1 
            })
        },1000)

    }

    render() {
        if(Login.isAuthen === false){
            return <Redirect to="/login" />
        }
        return (
            <div>
                <form>
                    <div className="container">
                        <div className="card">
                            <div className="container-fliud">   
                                <div className="wrapper row">
                                    <div className="preview col-md-6">
                                        <div className="product-title">
                                            <p>> Xin Chào {Login.usr}</p>
                                        </div>
                                        <div className="tab-pane active">
                                            <img src={this.props.location.state.url} alt="" />
                                        </div>

                                    </div>
                                    <div className="preview col-md-6">
                                        <h3 className="product-title"><p style={{fontWeight: 'bold', fontSize: 26}} >{this.props.location.state.name}</p>
                                        </h3>
                                        <div className="rating">
                                            <div className="stars">
                                                <span className="fa fa-star checked"></span>
                                                <span className="fa fa-star checked"></span>
                                                <span className="fa fa-star checked"></span>
                                                <span className="fa fa-star"></span>
                                                <span className="fa fa-star"></span>
                                            </div>
                                            <span className="review-no">41 reviews</span>
                                        </div>
                                        <p className="product-description">{this.props.location.state.des}</p>
                                        <h4 className="price">Giá khởi điểm: <span>{this.props.location.state.price} </span>VNĐ</h4>
                                        <p className="vote" style={{fontSize: 26}}><strong>00:{this.state.timer}</strong> </p>
                                        <h5 className="sizes">sizes:
                                            <span className="size" data-toggle="tooltip" title="small">s</span>
                                            <span className="size" data-toggle="tooltip" title="medium">m</span>
                                            <span className="size" data-toggle="tooltip" title="large">l</span>
                                            <span className="size" data-toggle="tooltip" title="xtra large">xl</span>
                                        </h5>
                                        <h5 className="colors">colors:
                                            <span className="color orange not-available" data-toggle="tooltip" title="Not In store"></span>
                                            <span className="color green"></span>
                                            <span className="color blue"></span>
                                        </h5>
                                        <div>
                                            <button  onClick={this.down} >-</button>
                                            <input placeholder="Số tiền muốn đấu giá" name="bid" value={this.state.bid} onChange={this.handleChange} />
                                            <button  onClick={this.up} >+</button>
                                        </div>
                                        <div className="action">
                                            <button className="add-to-cart btn btn-default" type="submit" onClick={this.handleSubmit}>ĐẤU GIÁ</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div>
                    {this.state.isPay ? <Pay usr={this.state.winner} price={this.state.bid} name={this.state.IDdetailProduct} IDdetailProduct={this.state.IDdetailProduct}  /> : null}
                </div>
            </div>
        );
    }
}

export default Detailproduct;