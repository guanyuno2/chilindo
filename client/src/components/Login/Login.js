import React, { Component } from 'react';
import login from '../store'



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            correct: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    
    handleSubmit(event) {
        console.log(this.state);
        
        fetch('/login', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }).then((data) => {
            data.json().then(data => {
                console.log(data)
                if(data.correct === true){
                    alert('Đăng Nhập Thành Công')
                    console.log('dang nhap thanh cong')
                    login.isAuthen = true;
                    login.usr = this.state.username;
                    login.type = data.type;
                }
                else{
                    alert('Đăng Nhập Thất Bại')
                    console.log('dang nhap that bai')
                }
            })
        })
        event.preventDefault();
    }
    
    

    render() {
        return (
            <div>
                <form className="form-horizontal" onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <label htmlFor="inputEmail3" className="col-sm-2 control-label" >Username: </label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control"  placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Password</label>
                        <div className="col-sm-10">
                        <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                        <div className="checkbox">
                            <label>
                            <input type="checkbox" /> Remember me
                            </label>
                        </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-primary">Sign in</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;