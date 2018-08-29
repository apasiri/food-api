var app = require('express')();
var bodyParser = require('body-parser');
require('dotenv').config();
var mysql = require('mysql');
var appFuctions = require('./appFuctions.js');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


var port = process.env.PORT || 4000;
//parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/', function (req, res) {
  res.send('!!!!!!!!!')
  console.log("homeStart")
})

// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });

// //parse
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
// extended: true
// }));

// app.get('/', function (req, res) {
// res.send('!!!!!!!!!')
// console.log("homeStart")
// })


  app.post('/Login',function(req,res){
    console.log(req.body.username)
    appFuctions.Login(req,res);
   
  });

  app.post('/Register',function(req,res){
    console.log(req.body.user_username)
    appFuctions.Register(req,res);
  });   

  app.post('/doRegisterstore',function(req,res){
    console.log(req.body.user_id)
    console.log(req.body.store_name)
    console.log(req.body.store_createdate)
    appFuctions.doRegisterstore(req,res);
  }); 

  app.post('/UpdateNews',function(req,res){
    console.log(req.body.news_topic)
    appFuctions.UpdateNews(req,res);
  });

  app.post('/getNews',function(req,res){
    console.log(req.body.user_status)
    appFuctions.getNews(req,res);
  });

  app.post('/DeleteNews',function(req,res){
    console.log(req.body.user_status)
    appFuctions.DeleteNews(req,res);
  });

  app.post('/DeleteMember',function(req,res){
    console.log(req.body.user_status)
    appFuctions.DeleteMember(req,res);
  });

  app.post('/getNewsHomepage',function(req,res){
    console.log(req.body.user_status)
    appFuctions.getNewsHomepage(req,res);
  });
  
  app.post('/EditAccount',function(req,res){
    console.log(req.body.user_id)
    appFuctions.EditAccount(req,res);
  });

  app.post('/goStore',function(req,res){
    console.log(req.body.user_id)
    appFuctions.goStore(req,res);
  });

  app.post('/getMember',function(req,res){
    console.log(req.body.user_status)
    console.log(req.body.selectItems)
    appFuctions.getMember(req,res);
  });

  app.post('/SearchItems',function(req,res){
    console.log(req.body.see)
    appFuctions.SearchItems(req,res);
  });

  app.post('/getMemberaccount',function(req,res){
    console.log(req.body.user_id)
    appFuctions.getMemberaccount(req,res);
  });

  app.post('/EditAccountFormAdmin',function(req,res){
    console.log(req.body.user_id)
    appFuctions.EditAccountFormAdmin(req,res);
  });

  app.post('/EditMystore',function(req,res){
    console.log(req.body.user_id)
    appFuctions.EditMystore(req,res);
  });

  app.post('/getStore',function(req,res){
    console.log(req.body.user_id)
    appFuctions.getStore(req,res);
  });
  
  app.post('/addPayment',function(req,res){
    console.log(req.body.store_id)
    appFuctions.addPayment(req,res);
  });
  
  app.post('/getPaymentCh',function(req,res){
    console.log(req.body.user_id)
    appFuctions.getPaymentCh(req,res);
  });

  app.post('/DeletePayCh',function(req,res){
    console.log(req.body.user_id)
    appFuctions.DeletePayCh(req,res);
  });

  app.post('/AddMenu',function(req,res){
    console.log(req.body.store_id)
    appFuctions.AddMenu(req,res);
  });

  app.post('/getMenu',function(req,res){
    console.log(req.body.store_id)
    appFuctions.getMenu(req,res);
  });

  app.post('/DeleteMenu',function(req,res){
    console.log(req.body.store_id)
    appFuctions.DeleteMenu(req,res);
  });
  
  app.post('/getMenuforEdit',function(req,res){
    console.log(req.body.menu_id)
    appFuctions.getMenuforEdit(req,res);
  });
  
  app.post('/EditMenu',function(req,res){
    console.log(req.body.menu_id)
    appFuctions.EditMenu(req,res);
  });

  app.post('/updateLocation',function(req,res){
    console.log(req.body.user_id)
    console.log(req.body.store_latitude)
    console.log(req.body.store_longitude)
    appFuctions.updateLocation(req,res);
  });

  app.post('/getDataMenu',function(req,res){
    console.log(req.body.user_id)
    console.log(req.body.store_latitude)
    console.log(req.body.store_longitude)
    appFuctions.getDataMenu(req,res);
  });

  app.post('/SearchMenu',function(req,res){
    console.log(req.body.selectItems)
    appFuctions.SearchMenu(req,res);
  });
  
  app.post('/getPayAdmin',function(req,res){
    console.log(req.body.user_id)
    appFuctions.getPayAdmin(req,res);
  });
  
  app.post('/AddPayAdmin',function(req,res){
    console.log(req.body.user_id)
    appFuctions.AddPayAdmin(req,res);
  });
  
  app.post('/DeletePayAdmin',function(req,res){
    console.log(req.body.user_id)
    appFuctions.DeletePayAdmin(req,res);
  });

  app.post('/addLease',function(req,res){
    console.log(req.body.user_id)
    appFuctions.addLease(req,res);
  });
  
  app.post('/getLeaseAdmin',function(req,res){
    console.log(req.body.user_id)
    appFuctions.getLeaseAdmin(req,res);
  });
  
  app.post('/getLeaseforAddTime',function(req,res){
    console.log(req.body.lease_id)
    appFuctions.getLeaseforAddTime(req,res);
  });
  
  app.post('/AddLeaseforTime',function(req,res){
    console.log(req.body.lease_user_id)
    appFuctions.AddLeaseforTime(req,res);
  });
  
  app.post('/getStoreOfmenu',function(req,res){
    console.log(req.body.menu_id)
    appFuctions.getStoreOfmenu(req,res);
  });
  
  app.post('/doneReport',function(req,res){
    console.log(req.body.user_id)
    appFuctions.doneReport(req,res);
  });
  
  app.post('/getDataReport',function(req,res){
    console.log(req.body.user_id)
    appFuctions.getDataReport(req,res);
  });
  
  app.post('/doneComment',function(req,res){
    console.log(req.body.comment_store_id)
    appFuctions.doneComment(req,res);
  });
  
  app.post('/getComment',function(req,res){
    console.log(req.body.NewStoreid)
    appFuctions.getComment(req,res);
  });
  
  app.post('/doneBooking',function(req,res){
    console.log(req.body.booking_menuid)
    appFuctions.doneBooking(req,res);
  });
  
  app.post('/sendOrder',function(req,res){
    console.log(req.body.detail)
    console.log(req.body.store_id)
    console.log(req.body.user_store_id)
    console.log(req.body.user_id)
    appFuctions.sendOrder(req,res);
  });
  
  app.post('/getbookingList',function(req,res){
    console.log(req.body.user_id)
    appFuctions.getbookingList(req,res);
  });
  
  app.post('/getbookingListforpayment',function(req,res){
    console.log(req.body.store_id)
    appFuctions.getbookingListforpayment(req,res);
  });
  
  app.post('/sendOrderpayment',function(req,res){
    console.log(req.body.payment_order_id)
    appFuctions.sendOrderpayment(req,res);
  });
  
  app.post('/getbookingListOrder',function(req,res){
    console.log(req.body.store_id)
    appFuctions.getbookingListOrder(req,res);
  });
  
  app.post('/getPaymentOrder',function(req,res){
    console.log(req.body.order_id)
    appFuctions.getPaymentOrder(req,res);
  });
  
  app.post('/confirm',function(req,res){
    console.log(req.body.payment_id)
    appFuctions.confirm(req,res);
  });
  
  app.post('/getPaymentconfirm',function(req,res){
    console.log(req.body.order_id)
    appFuctions.getPaymentconfirm(req,res);
  });

  
  app.post('/selectProvince',function(req,res){
    console.log(req.body.province)
    appFuctions.selectProvince(req,res);
  });
  
  app.post('/Checkstatus',function(req,res){
    console.log(req.body.user_id)
    appFuctions.Checkstatus(req,res);
  });

  app.post('/getStoreforMap',function(req,res){
    console.log(req.body.store_id)
    appFuctions.getStoreforMap(req,res);
  });

// port connect server 
app.listen(port,"0.0.0.0",function () {
  console.log("Listening on Port "+port);
})

// app.listen(4000, function () {
//   console.log('Runing 4000!')
// })
