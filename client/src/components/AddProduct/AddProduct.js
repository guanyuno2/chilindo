import React, { Component } from 'react';

class AddProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            valID: '',
        }
        
    }

    

    render() {
        return (
            <div>
               <form>
                   <div className="form-group">
                        <label><strong>Dòng Sản Phẩm:</strong></label> <br />
                        <input type="text" className="form-control" placeholder='Dòng Sản Phẩm' />
                   </div>
                   <div className="form-group">
                        <label><strong>Ảnh</strong></label><br />
                        <input type="text" className="form-control" placeholder='Ảnh' />
                   </div>
                   <div className="form-group">
                        <label><strong>Tên Sản Phẩm:</strong></label><br />
                        <input type="text" className="form-control" placeholder='Tên Sản Phẩm' />
                   </div>
                   <div className="form-group">
                        <label><strong>Giá: </strong></label><br />
                        <input type="text" className="form-control" placeholder='Giá' />
                   </div>
                   <button type="submit" className="btn btn-primary">THÊM </button>
               </form>
            </div>
        );
    }
}

export default AddProduct;