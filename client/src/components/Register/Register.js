import React, { Component } from 'react';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            usr: '',
            pwd: ''
         }
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event)=> {
        event.preventDefault();
        console.log(this.state.usr);
        fetch('/register', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                username: this.state.usr,
                password: this.state.pwd
            })
        }).then(() => {
            alert('dang ky thanh cong')
        })
    }

    render() {
        

        return (
            <div>
                <div>
                <form className="form-horizontal" onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <label htmlFor="inputEmail3" className="col-sm-2 control-label" >Username: </label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control"  placeholder="Username" name="usr" value={this.state.usr} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Password</label>
                        <div className="col-sm-10">
                        <input type="password" className="form-control" placeholder="Password" name="pwd" value={this.state.pwd} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Re-Password</label>
                        <div className="col-sm-10">
                        <input type="password" className="form-control" placeholder="Password" name="pwd" value={this.state.pwd} onChange={this.handleChange} />
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
                        <button type="submit" className="btn btn-primary">Sign up</button>
                        </div>
                    </div>
                </form>
            </div>
            </div>
        );
    }
}

export default Register;    