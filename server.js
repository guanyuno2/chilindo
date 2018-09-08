var express = require('express');
var app = express();
const bodyParser = require('body-parser')
var urlencodeParser = bodyParser.urlencoded({extended: false})
const sequelize = require('sequelize')
var path = require('path')
var session = ''

//*----------------------Body-parser-----------------*
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

//*----------------------Postgres--------------------*

//connect
const db = new sequelize({
    database: 'Chilindo',
    username: 'postgres',
    password: 'tyvan1996',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    define: {
        freezeTableName: true
    }
})

//test connect
db.authenticate()
.then(function(){
    console.log('connect postgres thanh cong')
})
.catch(function(err){
    console.error('ket noi db loi', err)
})

//tao schema user
const user = db.define('user', {
    username: sequelize.STRING,
    password: sequelize.STRING,
    email: sequelize.STRING
})

//tao schemal detailProducts
const detailProducts = db.define('detailProducts', {
    IDdetailProducts: sequelize.STRING,
    IDProducts: sequelize.STRING,
    Name: sequelize.STRING,
    Des: sequelize.STRING,
    Urlimg: sequelize.STRING,
    Price: sequelize.INTEGER
})

//tao schemal bid
const bid = db.define('bid', {
    IDdetailProducts: sequelize.STRING,
    BidPrice: sequelize.INTEGER,
    UserGotit: sequelize.STRING
})

//tao schemal history
const history = db.define('history', {
    User: sequelize.STRING,
    IDdetailProducts: sequelize.STRING,
    isPay: sequelize.STRING,
    Price: sequelize.INTEGER
})

//tao schemal product
const product = db.define('product', {
    IDProducts: sequelize.STRING,
    name: sequelize.STRING
})

// //tao model product

// product.create({
//     IDProducts: 'dpt',
//     name: 'Điện & Phụ Tùng'
// })

// //tao model bid
// bid.create({
//     IDdetailProducts: 'dpt-02',
//     BidPrice: 2000,
//     UserGotit: ''
// })

// // //tao model user
// user.create({
//     username: 'admin',
//     password: 'admin',
//     email: 'admin@123.com'
// })

// //tao model detailProducts
// detailProducts.create({
//     IDdetailProducts: 'dpt-02',
//     IDProducts: 'dpt',
//     Name: 'Cầu Chì',
//     Des: 'Sản Xuất Tại Việt Name',
//     Urlimg: '/img/dc-01.jpg',
//     Price: 2000
// }).then(function(user){
//     console.log(user.get({plain:true}))
// })

db.sync()

//*----------------------Express--------------------*
app.use('/static', express.static(path.join(__dirname, './client/public')))

app.post('/login'   , (req, res) => {
    var usr = req.body.username
    var pwd = req.body.password
   
    
    const check = {
        correct: false,
        type: '',
    }
    user.findOne({
        where: {
            username : usr,
            password: pwd
        }
    })
    .then(function(user){
        if(user!=null){
            console.log('tim thay tai khoan')
            check.correct = true
            if(usr === 'admin'){
                check.type = 'admin'
            }
            else {
                check.type ='user'
            }
            console.log(check)
            session = usr;
            res.json(check)
        }
        else{
            console.log('khong tim thay tai khoan')
            res.json(check)
        }
    })
    
})

app.post('/products', (req, res) => {
    if(user === null) {
        res.end
    }
    var nameprops = req.body.name
    console.log('client yeu cau product')
    detailProducts.findAll({
        raw: true,
        where: {
            IDProducts: nameprops
        }
    }).then(data => {
        console.log(data)
        res.json(data)
    })
})

app.post('/bid', (req, res) => {
    if(user === null) {
        res.end
    }
    var usr = req.body.usr;
    var bidprice = req.body.bidprice;
    var IDdetailProduct = req.body.IDdetailProduct
    console.log(usr);
    console.log(bidprice);
    console.log(IDdetailProduct);
    bid.update({
        BidPrice: bidprice,
        UserGotit: usr
    },{
        where:{
            IDdetailProducts: IDdetailProduct
        }
    })
    detailProducts.update({
        Price: bidprice
    },{
        where: {
            IDdetailProducts: IDdetailProduct
        }
    })
    bid.findOne({
        where: {
            IDdetailProducts: IDdetailProduct
        }
    }).then((bid) => {
        console.log(bid);
        res.json(bid)
    })
})

app.put('/bid', (req, res) => {
    if(user === null) {
        res.end
    }
    var IDdetailProduct = req.body.IDdetailProduct;
    bid.findOne({
        where: {
            IDdetailProducts: IDdetailProduct
        }
    }).then((bid) => {
        res.json(bid);
    })
})

app.post('/history', (req, res) => {
    if(user === null) {
        res.end
    }
    var usr = req.body.Usr;
    var IDdetailProduct = req.body.IDdetailProduct;
    var Price = req.body.Price
    console.log('HISTORY' + usr )
    //nhan duoc roi
    history.create({
        User: usr,
        IDdetailProducts: IDdetailProduct,
        isPay: 'false',
        Price: Price
    })
})

app.put('/history', (req, res) => {
    if(user === null) {
        res.end
    }
    var ispay = req.body.isPay;
    var usr = req.body.User;
    var IDdetailProduct = req.body.IDdetailProduct;
    console.log(ispay);
    console.log(usr);
    console.log(IDdetailProduct)
    history.update({
        isPay: ispay
    },{
        where: {
            User: usr,
            IDdetailProducts: IDdetailProduct
        }
    })
})

app.post('/cart', (req, res) => {
    if(user === null) {
        res.end
    }
    var usr = req.body.usr;
    console.log(usr);
    history.findAll({
        where: {
            User: usr
        }
    }).then((data) => {
        res.json(data);
    })
    
})

app.get('/listUser', (req, res) => {
    if(user === null) {
        res.end
    }
    console.log('get list user')
    history.findAll({
    }).then((data) => {
        res.json(data)
    })
})

app.post('/register', (req, res) => {
    console.log(req.body.username);
    user.create({
        username: req.body.username,
        password: req.body.password,
        email: 'admin@123.com'
    })
})

app.listen(5000, function(){
    console.log('server on port 5000')
})
