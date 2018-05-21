

var mysql = require('mysql');


//ตรวจสอบการ Login 
exports.Login = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    let user_username = req.body.username;
    let user_password = req.body.password;
    
    //ตรวจสอบ username และ password 
    sql = "SELECT * FROM users where user_username = ? and user_password = ?";
    con.query(sql, [user_username,user_password], function (err, result){
    if (err) throw err;
        if(result!="")
        {
            var user_id = result[0].user_id;

            sql = `SELECT * FROM users where user_id = ?`;
            con.query(sql, [user_id], function (err, result){
            if (err) throw err;
                
                var list = result
                if(result[0].user_img !="" && result[0].user_img != undefined && result[0].user_img != null){
                    var dataImg = result[0].user_img ? result[0].user_img.toString() : null;
                    list[0]["user_img"] = dataImg; 
                    list[0]["status"] = 1;
                    res.send(list);
                    console.log(list);
                    con.end();
                }
                else{
                    list[0]["user_img"] = `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`; 
                    list[0]["status"] = 1;
                    res.send(list);
                    con.end();
                }
            
            });
              
        }
        else{
            res.send([{status:0}]);
            con.end();
        }
        
                               
    });
}

// สมัครสมาชิกทั่วไป
exports.Register = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });
    

    var user_username = req.body.user_username
    var user_password = req.body.user_password
    var user_name = req.body.user_name
    var user_sex = req.body.user_sex
    var user_email = req.body.user_email
    var user_phonenumber = req.body.user_phonenumber
    var user_personalid = req.body.user_personalid
    var user_status = req.body.user_status
    var user_statusOnOff = 0 // 0 off 1 on 
    //req.body.user_imgcard = `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`;

    //req.body.user_imgcard = `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`;
    let user_imgcard = req.body.user_imgcard

    if(req.body.user_imgcard != undefined && req.body.user_imgcard != null && req.body.user_imgcard != "")
    {
        //ตรวจสอบการใช้ซ้ำ username
        sql = "SELECT * FROM users where user_username = ? ";
        con.query(sql, [user_username], function (err, result){if (err) throw err;

            if(result!="")
            {
                //have this username
                res.send([{Alert:0}]); 
                con.end();   
            }
            else{

                sql = `INSERT INTO users(user_username,user_password,user_name,
                    user_phonenumber,user_status,user_statusOnOff,user_email,user_personalID,user_imgcard,user_sex) 
                VALUES( ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)`;
                con.query(sql, [user_username,user_password,user_name,user_phonenumber,user_status,user_statusOnOff,user_email,user_personalid,user_imgcard,user_sex], function (err, result){if (err) throw err;
                    res.send([{Alert:1}]);   
                    con.end();                           
                });                        
        
            }                      
        });
    }
    else
    {
        //บังคับให้ใส่รูป
        res.send([{Alert: -1}]); 
        con.end(); 
    }
                           
}

// ตรวจสอบฟังก์ชั่นร้านค้า
exports.goStore = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });
    

    var user_id = req.body.user_id

    // เพิ่มวันที่จากวันปัจจุบัน
    //store_modifydate.setDate(store_modifydate.getDate() + 60);

    
    //ตรวจสอบว่ามีร้านค้าแล้วหรือยัง
        sql = "SELECT * FROM users where user_id = ? ";
        con.query(sql, [user_id], function (err, result){
            if (err) throw err;
            if(result != ""){
                var checkstore = result[0].user_store_id
                console.log(checkstore)
                //ตรวจสอบ user_store_id หากไม่เท่ากับ 0 แสดงว่าเปิดร้านค้าแล้วให้ทำเงื่อน หากไม่ใช่ให้ส่งค่า 0 กลับเพื่อทำการเปิดร้าน
                if(checkstore != 0)
                {
                    //ตรวจค่า id_store ของ user
                    sql = ` SELECT * FROM store where store_user_id = ? `;
                    con.query(sql, [user_id], function (err, result){
                        if (err) throw err;
                        if(result != ""){
                            // ตรวจสอบ IsActive ว่าถูกระงับหรือมั้ย 
                            var IsActive = result[0].store_IsActive
                            if(IsActive == 1){
                                res.send([{Alert: -2}]); 
                                con.end();
                            }
                            else{
                                // query วันหมดอายุมาตรวจสอบกับวันปัจจุบัน
                                sql = ` SELECT * FROM store WHERE store_user_id = ? `;
                                con.query(sql, [user_id], function (err, result){if (err) throw err;
                                    //if(result != ""){
                                        // query modifydate มาเช็คกับวันปัจจุบัน
                                        //console.log(result[0].store_user_id)
                                        //console.log(result[0].store_modifydate)
                                        var datecurrent = new Date();
                                        if(datecurrent >= result[0].store_modifydate){
                                            //หมดอายุ
                                            console.log(-1)
                                            res.send([{Alert: -1}]);
                                            con.end(); 
                                        }
                                        else{
                                            //ยังไม่หมดอายุ
                                            sql = ` SELECT * FROM users WHERE user_id = ? `;
                                            con.query(sql, [user_id], function (err, result){if (err) throw err;
                                                res.send(result); 
                                                con.end();
                                            });
                                        }
                                   // }
                                });
                                //res.send([{Alert:1}]);  
                            } 
                        }                          
                    });
                }
                else{
                    //ยังไม่ได้เปิดร้านส่งค่า 0 กลับไป
                    res.send([{Alert:0}]); 
                    con.end();
                } 
            }
                                
        });                    
}

// สมัครเพื่อเปิดร้าน
exports.doRegisterstore = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });
    
      var user_id = req.body.user_id
      var store_name  = req.body.store_name
      var store_address = req.body.store_address
      var store_Subarea = req.body.store_Subarea
      var store_area = req.body.store_area
      var store_Province = req.body.store_Province
      var store_contact = req.body.store_contact
      var store_img = req.body.store_img
      var store_createdate = req.body.store_createdate
      var store_modifydate = new Date();
    // เพิ่มวันที่จากวันปัจจุบัน
      store_modifydate.setDate(store_modifydate.getDate() + 61);
      var store_IsActive = 0
      var store_status = 0 
    //console.log(store_modifydate)
    

    sql = `INSERT INTO store(store_name,store_address,store_Subarea,store_Area,store_Province,store_contact,store_createdate,store_modifydate,store_img,store_user_id,store_IsActive,store_status) 
    VALUES( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)`;
    con.query(sql, [store_name,store_address,store_Subarea,store_area,store_Province,store_contact,store_createdate,store_modifydate,store_img,user_id,store_IsActive,store_status], function (err, result){
        if (err) throw err;
            sql = `SELECT * FROM store where store_user_id = ?`;
            con.query(sql, [user_id], function (err, result){
            if (err) throw err;
                if(result != ""){
                    var id = result[0].store_id
                    var newuser_status = 2
                    sql = `UPDATE users SET user_store_id = ? , user_status = ? where user_id = ?`;
                    con.query(sql, [id,newuser_status,user_id], function (err, result){
                    if (err) throw err;
                        res.send([{Alert:1}]);   
                        con.end();  
                    });
                } 
            }); 
    }); 
}

exports.UpdateNews = function (req, res) 
{  
    var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var news_topic = req.body.news_topic
    var news_story = req.body.news_story
    var news_date = req.body.news_date 
    var news_user_id = req.body.user_id
    //req.body.news_img = `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`;
    let news_img = req.body.news_img

    if(req.body.news_img != undefined && req.body.news_img != null && req.body.news_img != "")
    {
        sql = `INSERT INTO news(news_topic,news_story,news_date,news_img,news_user_id) 
        VALUES( ? , ? , ? , ? , ?)`;
        con.query(sql, [news_topic,news_story,news_date,news_img,news_user_id], function (err, result){if (err) throw err;
            res.send([{Alert:1}]);   
            con.end();                           
        });  
    }
    else{
        res.send([{Alert:0}]);   
        con.end(); 
    }                                           

}

exports.getNews = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var user_status = req.body.user_status
    
    if(user_status == 3){
        sql = `SELECT * FROM news ORDER BY news_id DESC `;
        con.query(sql, [], function (err, result){if (err) throw err;
            res.send(result);
            con.end();                             
        });
    }
    else{

    }
                   
}

exports.DeleteNews = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

        var news_id = req.body.news_id
    
        sql = 'DELETE FROM news where news_id = ?';
        con.query(sql, [news_id], function (err, result){if (err) throw err;
            res.send([{Alert:1}]);
            con.end();    
        });
                        
}

exports.DeleteMember = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

        var user_id = req.body.user_id
    
        sql = 'DELETE FROM users where user_id = ?';
        con.query(sql, [user_id], function (err, result){if (err) throw err;
            res.send([{Alert:1}]);
            con.end();    
        });
                        
}

exports.getNewsHomepage = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

        sql = `SELECT * FROM news ORDER BY news_id DESC `;
        con.query(sql, [], function (err, result){if (err) throw err;

            var list = result;
            var database = 'data:image/jpeg;base64,'
            var iarray = 0;
            for (var i = 0; i < result.length; i++){
                var dataImg = result[iarray].news_img ? result[iarray].news_img.toString() : null; 
                list[iarray]["news_imgshow"] = database + dataImg
                list[iarray].news_img = "";
                iarray++;
            }
            res.send(list);
            con.end();                             
        });                     
}

exports.getStore = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var user_id = req.body.user_id

        sql = `SELECT * FROM store WHERE store_user_id = ? `;
        con.query(sql, [user_id], function (err, result){if (err) throw err;
            var list = result
                if(result[0].store_img !="" && result[0].store_img != undefined && result[0].store_img != null){
                    var dataImg = result[0].store_img ? result[0].store_img.toString() : null;
                    list[0]["img"] = dataImg; 
                    res.send(list);
                    console.log(list);
                    con.end();
                }
                else{
                    list[0]["img"] = `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`; 
                    res.send(list);
                    con.end();
                }                             
        });                     
}

exports.EditAccount = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

        var user_id = req.body.user_id
        var user_name = req.body.user_name
        var user_sex = req.body.user_sex
        var user_email = req.body.user_Email
        var user_personalID = req.body.user_personalID
        var user_phonenumber = req.body.user_phone 
        var user_img = req.body.user_img
        

            sql = `UPDATE users SET user_name = ? , user_sex =  ? , user_email = ? , user_personalID = ? , user_phonenumber = ? , user_img = ?  where user_id = ?`;
            con.query(sql, [user_name,user_sex,user_email,user_personalID,user_phonenumber,user_img,user_id], function (err, result){if (err) throw err;
                res.send([{Alert:1,Comment:'ดำเนินการสำเร็จ'}]);
                con.end(); 
            });                                  
}

exports.EditMystore = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

        var user_id = req.body.user_id
        var store_name = req.body.store_name
        var store_address = req.body.store_address
        var store_Subarea = req.body.store_Subarea
        var store_Area = req.body.store_area
        var store_Province = req.body.store_Province 
        var store_contact = req.body.store_contact
        var store_status = req.body.store_status
        var store_img = req.body.store_img
        

            sql = `UPDATE store SET store_name = ? , store_address =  ? , store_Subarea = ? , store_Area = ? , store_Province = ? , store_contact = ? , store_status = ? , store_img = ?  where store_user_id = ?`;
            con.query(sql, [store_name,store_address,store_Subarea,store_Area,store_Province,store_contact,store_status,store_img,user_id], function (err, result){if (err) throw err;
                res.send([{Alert:1,Comment:'ดำเนินการสำเร็จ'}]);
                con.end(); 
            });                                  
}

exports.EditAccountFormAdmin = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

        var user_id = req.body.user_id
        var user_name = req.body.user_name
        var user_sex = req.body.user_sex
        var user_email = req.body.user_Email
        var user_personalID = req.body.user_personalID
        var user_phonenumber = req.body.user_phone 

        var user_store_id = req.body.user_store_id
        var user_status = req.body.user_status
        var user_username = req.body.user_username
        var user_password = req.body.user_password 
        var store_IsActive = req.body.store_IsActive
        
        

            sql = `UPDATE users u ,store s SET u.user_name = ? , u.user_sex =  ? , u.user_email = ? , u.user_personalID = ? , u.user_phonenumber = ? , u.user_store_id = ? , u.user_status = ? , u.user_username = ? , u.user_password = ? ,s.store_IsActive = ? where u.user_id = ? and s.store_user_id = ?`;
            con.query(sql, [user_name,user_sex,user_email,user_personalID,user_phonenumber,user_store_id,user_status,user_username,user_password,store_IsActive,user_id,user_id], function (err, result){if (err) throw err;
                res.send([{Alert:1,Comment:'ดำเนินการสำเร็จ'}]);
                con.end(); 
            });                                  
}

exports.getMember = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var user_status = req.body.user_status
    var selectItems = req.body.selectItems
    console.log(selectItems);

    if(user_status == 3){
        sql = `SELECT * FROM users ORDER BY user_id ASC `;
        con.query(sql, [], function (err, result){if (err) throw err;
            res.send(result);
            con.end();                             
        });
    }
    else{
        
    }
                   
}

//เรียกค่า user สำหรับ admin
exports.getMemberaccount = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var user_id = req.body.user_id

    console.log(user_id);

        sql = ` SELECT s.store_id,s.store_user_id,s.store_IsActive,u.user_id,u.user_store_id,u.user_username,u.user_password,
        u.user_email,u.user_phonenumber,u.user_status,u.user_sex,u.user_personalID,u.user_name,u.user_imgcard
        FROM users u JOIN store s ON u.user_store_id = s.store_id WHERE u.user_id = ?`;
        con.query(sql, [user_id], function (err, result){if (err) throw err;
            var list = result
            if(result != ""){
                if(result[0].user_imgcard !="" && result[0].user_imgcard != null){
                    var dataImg = result[0].user_imgcard ? result[0].user_imgcard.toString() : null;
                    list[0]["img"] = dataImg; 
                    res.send(list);
                    con.end();
                }
                else{
                    list[0]["img"] = `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`; 
                    res.send(list);
                    con.end();
                }   
            }                           
        });         
}

//ค้นหาสมาชิกสำหรับ Admin
exports.SearchItems = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var user_status = req.body.user_status
    var selectItems = req.body.selectItems
    
    console.log(selectItems);

    if(selectItems == 'user_id'){
        var SearchItems = req.body.search
        console.log(SearchItems);
        sql = `SELECT * FROM users where user_id = ? `;
        con.query(sql, [SearchItems], function (err, result){if (err) throw err;
            res.send(result);
            con.end();                             
        });
    }
    else if(selectItems == 'user_store_id'){
        var SearchItems = req.body.search
        console.log(SearchItems);
        sql = `SELECT * FROM users where user_store_id = ? `;
        con.query(sql, [SearchItems], function (err, result){if (err) throw err;
            res.send(result);
            con.end();                             
        });
    }
    else if(selectItems == 'user_phonenumber'){
        var SearchItems = req.body.search
        console.log(SearchItems);
        sql = `SELECT * FROM users where user_phonenumber = ? `;
        con.query(sql, [SearchItems], function (err, result){if (err) throw err;
            res.send(result);
            con.end();                             
        });
    }
    else if(selectItems == 'user_personalID'){
        var SearchItems = req.body.search
        console.log(SearchItems);
        sql = `SELECT * FROM users where user_personalID = ? `;
        con.query(sql, [SearchItems], function (err, result){if (err) throw err;
            res.send(result);
            con.end();                             
        });
    }
    else if(selectItems == '1'){
        var SearchItems = 1
        console.log(SearchItems);
        sql = `SELECT * FROM users where user_status = ? `;
        con.query(sql, [SearchItems], function (err, result){if (err) throw err;
            res.send(result);
            con.end();                             
        });
    }

    else if(selectItems == '2'){
        var SearchItems = 2
        console.log(SearchItems);
        sql = ` SELECT * FROM users where user_status = ? `;
        con.query(sql, [SearchItems], function (err, result){if (err) throw err;
            if(result != "0"){
                res.send(result);
                con.end(); 
            }                           
        });
    }

    else if(selectItems == '3'){
        var SearchItems = 3
        console.log(SearchItems);
        sql = `SELECT * FROM users where user_status = ? `;
        con.query(sql, [SearchItems], function (err, result){if (err) throw err;
            res.send(result);
            con.end();                             
        });
    }
                   
}

exports.addPayment = function (req, res) 
{  
    var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var store_id = req.body.store_id
    var PayChannel_detail = req.body.PayChannel_detail
  
     sql = `INSERT INTO PayChannel(PayChannel_detail,PayChannel_store_id) 
        VALUES( ? , ? )`;
        con.query(sql, [PayChannel_detail,store_id], function (err, result){if (err) throw err;
            res.send([{Alert:1}]);   
            con.end();                           
        });  
  
}

exports.getPaymentCh = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var user_id = req.body.user_id

        sql = `SELECT p.PayChannel_id, p.PayChannel_store_id, p.PayChannel_detail, s.store_id, s.store_user_id
        FROM PayChannel p JOIN store s ON p.PayChannel_store_id = s.store_id WHERE s.store_user_id = ? `;
        con.query(sql, [user_id], function (err, result){if (err) throw err;
            res.send(result);   
            con.end();                                
        });                     
}

exports.DeletePayCh = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

        var PayChannel_id = req.body.Payid_delect
    
        sql = 'DELETE FROM PayChannel where PayChannel_id = ?';
        con.query(sql, [PayChannel_id], function (err, result){if (err) throw err;
            res.send([{Alert:1}]);
            con.end();    
        });
                        
}

exports.AddMenu = function (req, res) 
{  
    var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var menu_name = req.body.menu_name
    var menu_amount = req.body.menu_amount
    var menu_price = req.body.menu_price
    var menu_createdate = req.body.menu_createdate
    var menu_store_id = req.body.store_id
    var menu_status = 'กำลังเปิดขาย'
    //req.body.menu_img = `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`;
    let menu_img = req.body.menu_img

        sql = `INSERT INTO menu(menu_name,menu_amount,menu_price,menu_createdate,menu_img,menu_status,menu_store_id) 
        VALUES( ? , ? , ? , ? , ? , ? , ?)`;
        con.query(sql, [menu_name,menu_amount,menu_price,menu_createdate,menu_img,menu_status,menu_store_id], function (err, result){if (err) throw err;
            res.send([{Alert:1}]);   
            con.end();                           
        });  
                                          

}

exports.getMenu = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var user_id = req.body.user_id

        sql = `SELECT m.menu_id, m.menu_name, m.menu_createdate, m.menu_amount , m.menu_price, m.menu_store_id, m.menu_status , s.store_id, s.store_user_id
        FROM menu m JOIN store s ON m.menu_store_id = s.store_id WHERE s.store_user_id = ? `;
        con.query(sql, [user_id], function (err, result){if (err) throw err;  
            res.send(result);
            con.end();                                     
        });                     
}

exports.DeleteMenu = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

        var menu_id = req.body.menu_id
    
        sql = 'DELETE FROM menu where menu_id = ?';
        con.query(sql, [menu_id], function (err, result){if (err) throw err;
            res.send([{Alert:1}]);
            con.end();    
        });
                        
}

exports.getMenuforEdit = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var menu_id = req.body.menu_id

    console.log(menu_id);

        sql = `SELECT * FROM menu where menu_id = ? `;
        con.query(sql, [menu_id], function (err, result){if (err) throw err;
            var list = result
                if(result[0].menu_img !="" && result[0].menu_img != undefined && result[0].menu_img != null){
                    var dataImg = result[0].menu_img ? result[0].menu_img.toString() : null;
                    list[0]["menu_img"] = dataImg; 
                    res.send(list);
                    console.log(list);
                    con.end();
                }
                else{
                    list[0]["menu_img"] = `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`; 
                    res.send(list);
                    con.end();
                }                             
        });                    
}

exports.EditMenu = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

        var menu_id = req.body.menu_id
        var menu_name = req.body.menu_name
        var menu_amount = req.body.menu_amount
        var menu_price = req.body.menu_price
        var menu_createdate = req.body.menu_createdate
        var menu_status = req.body.menu_status
        //req.body.menu_img = `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`;
        let menu_img = req.body.menu_img

            sql = `UPDATE menu SET menu_name = ? ,menu_amount = ? ,menu_price = ? ,menu_createdate = ?,menu_img = ? , menu_status = ? where menu_id = ?`;
            con.query(sql, [menu_name,menu_amount,menu_price,menu_createdate,menu_img,menu_status,menu_id], function (err, result){if (err) throw err;
                res.send([{Alert:1,Comment:'ดำเนินการสำเร็จ'}]);
                con.end(); 
            });                                  
}

exports.updateLocation = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

        var user_id = req.body.user_id
        var store_latitude = req.body.store_latitude
        var store_longitude = req.body.store_longitude

            sql = `UPDATE store SET store_longitude = ? , store_latitude =  ? where store_user_id = ?`;
            con.query(sql, [store_longitude,store_latitude,user_id], function (err, result){if (err) throw err;
                res.send([{Alert:1}]);
                con.end(); 
            });                                  
}

exports.getDataMenu = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var user_status = req.body.user_status
    var selectItems = req.body.selectItems
    console.log(selectItems);

        sql = `SELECT * FROM menu ORDER BY menu_createdate DESC `;
        con.query(sql, [], function (err, result){if (err) throw err;
            var list = result;
            var database = 'data:image/jpeg;base64,'
            var iarray = 0;
            for (var i = 0; i < result.length; i++){
                if(result[iarray].menu_img !="" && result[iarray].menu_img != undefined && result[iarray].menu_img != null){
                    var dataImg = result[iarray].menu_img ? result[iarray].menu_img.toString() : null; 
                    list[iarray]["menu_imgshow"] = database + dataImg 
                    list[iarray].menu_img = "";
                    iarray++;
                }
                else{
                    list[iarray]["menu_imgshow"] = database + `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`; 
                    list[iarray].menu_img = "";
                    iarray++;
                } 
            } 
            res.send(list);
            con.end();                        
        });
                   
}

// ค้นหาเมนูอาหาร
exports.SearchMenu = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });


    var selectItems = req.body.selectItems
    var SearchName = req.body.search
    console.log(selectItems);

    if(SearchName !="" && SearchName != undefined && SearchName != null){
        var selectItems = req.body.selectItems
        var SearchName = req.body.search
        sql = `SELECT m.menu_id, m.menu_name, m.menu_createdate, m.menu_amount, m.menu_price, m.menu_img, m.menu_store_id, s.store_id, s.store_Province
        FROM menu m JOIN store s ON m.menu_store_id = s.store_id WHERE s.store_Province = ? and m.menu_name = ?`;
        con.query(sql, [selectItems,SearchName], function (err, result){if (err) throw err;
            var list = result;
            var database = 'data:image/jpeg;base64,'
            var iarray = 0;
            for (var i = 0; i < result.length; i++){
                if(result[0].menu_img !="" && result[0].menu_img != undefined && result[0].menu_img != null){
                    var dataImg = result[iarray].menu_img ? result[iarray].menu_img.toString() : null; 
                    list[iarray]["menu_imgshow"] = database + dataImg 
                    list[iarray].menu_img = "";
                    iarray++;
                }
                else{
                    list[iarray]["menu_imgshow"] = database + `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`; 
                    list[iarray].menu_img = "";
                    iarray++;
                } 
            } 
            res.send(list);
            con.end();                                             
        }); 
    }  
    else{
        var selectItems = req.body.selectItems
        sql = `SELECT m.menu_id, m.menu_name, m.menu_createdate, m.menu_amount, m.menu_price, m.menu_img, m.menu_store_id, s.store_id, s.store_Province
        FROM menu m JOIN store s ON m.menu_store_id = s.store_id WHERE s.store_Province = ?`;
        con.query(sql, [selectItems], function (err, result){if (err) throw err;
            var list = result;
            var database = 'data:image/jpeg;base64,'
            var iarray = 0;
            for (var i = 0; i < result.length; i++){
                if(result[0].menu_img !="" && result[0].menu_img != undefined && result[0].menu_img != null){
                    var dataImg = result[iarray].menu_img ? result[iarray].menu_img.toString() : null; 
                    list[iarray]["menu_imgshow"] = database + dataImg 
                    list[iarray].menu_img = "";
                    iarray++;
                }
                else{
                    list[iarray]["menu_imgshow"] = database + `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`; 
                    list[iarray].menu_img = "";
                    iarray++;
                } 
            } 
            res.send(list);
            con.end();                                             
        }); 
    }  
                   
}

exports.getPayAdmin = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

        sql = `SELECT * FROM payAdmin ORDER BY pay_id DESC `;
        con.query(sql, [], function (err, result){if (err) throw err;
            res.send(result);
            con.end();                             
        });
                   
}

exports.AddPayAdmin = function (req, res) 
{  
    var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var pay_adminID = req.body.user_id
    var pay_detail = req.body.pay_detail

        sql = `INSERT INTO payAdmin(pay_detail,pay_adminID) 
        VALUES( ? , ?)`;
        con.query(sql, [pay_detail,pay_adminID], function (err, result){if (err) throw err;
            res.send([{Alert:1}]);   
            con.end();                           
        });                                            

}

exports.DeletePayAdmin = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

        var pay_id = req.body.pay_id
    
        sql = 'DELETE FROM payAdmin where pay_id = ?';
        con.query(sql, [pay_id], function (err, result){if (err) throw err;
            res.send([{Alert:1}]);
            con.end();    
        });
                        
}

exports.addLease = function (req, res) 
{  
    var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var user_id = req.body.user_id
    var lease_addtime = req.body.lease_addtime
    var lease_img = req.body.lease_img

        sql = `INSERT INTO lease(lease_addtime,lease_img,lease_user_id) 
        VALUES( ? , ? , ?)`;
        con.query(sql, [lease_addtime,lease_img,user_id], function (err, result){if (err) throw err;
            res.send([{Alert:1}]);   
            con.end();                           
        });                                            

}

exports.getLeaseAdmin = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

        sql = `SELECT * FROM lease ORDER BY lease_id DESC `;
        con.query(sql, [], function (err, result){if (err) throw err;
            res.send(result);
            con.end();                             
        });
                   
}

exports.getLeaseforAddTime = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var lease_id = req.body.lease_id

        sql = `SELECT * FROM lease WHERE lease_id = ? `;
        con.query(sql, [lease_id], function (err, result){if (err) throw err;
            var list = result
            var dataImg = result[0].lease_img ? result[0].lease_img.toString() : null;
            list[0]["lease_imgshow"] = dataImg; 
            res.send(list);
            con.end();                              
        });                     
}

exports.AddLeaseforTime = function (req, res) 
{  
    var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var lease_user_id = req.body.lease_user_id
    // เพิ่มวันที่จากวันปัจจุบัน
    //store_modifydate.setDate(store_modifydate.getDate() + 60);
    sql = ` SELECT * FROM store WHERE store_user_id = ? `;
    con.query(sql, [lease_user_id], function (err, result){
        if (err) throw err;
            if(result != ""){
            // query modifydate มาเช็คกับวันปัจจุบัน
            //console.log(result[0].store_user_id)
            //console.log(result[0].store_modifydate)
            var datecurrent = new Date();
                    if(datecurrent >= result[0].store_modifydate){
                        //หมดอายุ
                        var lease_addtime = req.body.lease_addtime // valuse Time
                        console.log(lease_addtime)
                        if(lease_addtime == 1){
                            var user_id = req.body.lease_user_id
                            var newTime = new Date();
                            newTime.setDate(newTime.getDate() + 61);
                            sql = `UPDATE store SET store_modifydate = ? where store_user_id = ?`;
                            con.query(sql, [newTime,user_id], function (err, result){if (err) throw err;
                                if(result != ""){
                                    var lease_addtimeNew = 0
                                    var user_idNew = req.body.lease_user_id
                                    sql = `UPDATE lease SET lease_addtime = ? where lease_user_id = ?`;
                                    con.query(sql, [lease_addtimeNew,user_idNew], function (err, result){
                                        if (err) throw err;
                                        res.send([{Alert:1}]);
                                        con.end(); 
                                    });
                                }  
                            }); 
                        }
                        else if(lease_addtime == 2){
                            var user_id = req.body.lease_user_id
                            var newTime = new Date();
                            newTime.setDate(newTime.getDate() + 91);
                            sql = `UPDATE store SET store_modifydate = ? where store_user_id = ?`;
                            con.query(sql, [newTime,user_id], function (err, result){if (err) throw err;
                                if(result != ""){
                                    var lease_addtimeNew = 0
                                    var user_idNew = req.body.lease_user_id
                                    sql = `UPDATE lease SET lease_addtime = ? where lease_user_id = ?`;
                                    con.query(sql, [lease_addtimeNew,user_idNew], function (err, result){
                                        if (err) throw err;
                                        res.send([{Alert:1}]);
                                        con.end(); 
                                    });
                                }
                            }); 
                        } 
                        else if(lease_addtime == 3){
                            var user_id = req.body.lease_user_id
                            var newTime = new Date();
                            newTime.setDate(newTime.getDate() + 181);
                            sql = `UPDATE store SET store_modifydate = ? where store_user_id = ?`;
                            con.query(sql, [newTime,user_id], function (err, result){if (err) throw err;
                                if(result != ""){
                                    var lease_addtimeNew = 0
                                    var user_idNew = req.body.lease_user_id
                                    sql = `UPDATE lease SET lease_addtime = ? where lease_user_id = ?`;
                                    con.query(sql, [lease_addtimeNew,user_idNew], function (err, result){
                                        if (err) throw err;
                                        res.send([{Alert:1}]);
                                        con.end(); 
                                    });
                                } 
                            }); 
                        } 
                        else if(lease_addtime == 4){
                            var user_id = req.body.lease_user_id
                            var newTime = new Date();
                            newTime.setDate(newTime.getDate() + 366);
                            sql = `UPDATE store SET store_modifydate = ? where store_user_id = ?`;
                            con.query(sql, [newTime,user_id], function (err, result){if (err) throw err;
                                if(result != ""){
                                    var lease_addtimeNew = 0
                                    var user_idNew = req.body.lease_user_id
                                    sql = `UPDATE lease SET lease_addtime = ? where lease_user_id = ?`;
                                    con.query(sql, [lease_addtimeNew,user_idNew], function (err, result){
                                        if (err) throw err;
                                        res.send([{Alert:1}]);
                                        con.end(); 
                                    });
                                }
                            }); 
                        } 
                    }
                    else{
                        //ยังไม่หมดอายุ
                        var lease_addtime = req.body.lease_addtime // valuse Time
                        console.log(lease_addtime)
                        if(lease_addtime == 1){
                            var user_id = req.body.lease_user_id
                            var newTime = result[0].store_modifydate
                            newTime.setDate(newTime.getDate() + 61);
                            sql = `UPDATE store SET store_modifydate = ? where store_user_id = ?`;
                            con.query(sql, [newTime,user_id], function (err, result){if (err) throw err;
                                if(result != ""){
                                    var lease_addtimeNew = 0
                                    var user_idNew = req.body.lease_user_id
                                    sql = `UPDATE lease SET lease_addtime = ? where lease_user_id = ?`;
                                    con.query(sql, [lease_addtimeNew,user_idNew], function (err, result){
                                        if (err) throw err;
                                        res.send([{Alert:1}]);
                                        con.end(); 
                                    });
                                }   
                            }); 
                        }
                        else if(lease_addtime == 2){
                            var user_id = req.body.lease_user_id
                            var newTime = result[0].store_modifydate
                            newTime.setDate(newTime.getDate() + 91);
                            sql = `UPDATE store SET store_modifydate = ? where store_user_id = ?`;
                            con.query(sql, [newTime,user_id], function (err, result){if (err) throw err;
                                if(result != ""){
                                    var lease_addtimeNew = 0
                                    var user_idNew = req.body.lease_user_id
                                    sql = `UPDATE lease SET lease_addtime = ? where lease_user_id = ?`;
                                    con.query(sql, [lease_addtimeNew,user_idNew], function (err, result){
                                        if (err) throw err;
                                        res.send([{Alert:1}]);
                                        con.end(); 
                                    });
                                } 
                            }); 
                        } 
                        else if(lease_addtime == 3){
                            var user_id = req.body.lease_user_id
                            var newTime = result[0].store_modifydate
                            newTime.setDate(newTime.getDate() + 181);
                            sql = `UPDATE store SET store_modifydate = ? where store_user_id = ?`;
                            con.query(sql, [newTime,user_id], function (err, result){if (err) throw err;
                                if(result != ""){
                                    var lease_addtimeNew = 0
                                    var user_idNew = req.body.lease_user_id
                                    sql = `UPDATE lease SET lease_addtime = ? where lease_user_id = ?`;
                                    con.query(sql, [lease_addtimeNew,user_idNew], function (err, result){
                                        if (err) throw err;
                                        res.send([{Alert:1}]);
                                        con.end(); 
                                    });
                                }
                            }); 
                        } 
                        else if(lease_addtime == 4){
                            var user_id = req.body.lease_user_id
                            var newTime = result[0].store_modifydate
                            newTime.setDate(newTime.getDate() + 366);
                            sql = `UPDATE store SET store_modifydate = ? where store_user_id = ?`;
                            con.query(sql, [newTime,user_id], function (err, result){if (err) throw err;
                                if(result != ""){
                                    var lease_addtimeNew = 0
                                    var user_idNew = req.body.lease_user_id
                                    sql = `UPDATE lease SET lease_addtime = ? where lease_user_id = ?`;
                                    con.query(sql, [lease_addtimeNew,user_idNew], function (err, result){
                                        if (err) throw err;
                                        res.send([{Alert:1}]);
                                        con.end(); 
                                    });
                                } 
                            }); 
                        } 
                    } 
            }      
    });                                          

}

exports.getStoreOfmenu = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var menu_id = req.body.menu_id
    console.log(menu_id)

    sql = `SELECT m.menu_id, m.menu_name, m.menu_createdate, m.menu_amount , m.menu_price, m.menu_store_id, m.menu_img,m.menu_status, s.store_id, s.store_user_id,s.store_name, s.store_address, s.store_contact, s.store_img, s.store_longitude, s.store_latitude, s.store_status, s.store_Subarea,
    s.store_Area ,s.store_Province,s.store_IsActive FROM store s JOIN menu m ON s.store_id = m.menu_store_id WHERE m.menu_id = ? `;
    con.query(sql, [menu_id], function (err, result){if (err) throw err;
        var list = result
        if(result[0].store_img !="" && result[0].store_img != undefined && result[0].store_img != null && result[0].menu_img !="" && result[0].menu_img != undefined && result[0].menu_img != null){
            var dataImg = result[0].store_img ? result[0].store_img.toString() : null;
            var menudataImg = result[0].menu_img ? result[0].menu_img.toString() : null;
            list[0]["store_img"] = dataImg;
            list[0]["menu_img"] = menudataImg;  
            res.send(list);
            console.log(list);
            con.end();
        }
        else if(result[0].store_img =="" && result[0].store_img == undefined && result[0].store_img == null || result[0].menu_img !="" && result[0].menu_img != undefined && result[0].menu_img != null){
            var dataImg = result[0].menu_img ? result[0].menu_img.toString() : null;
            list[0]["store_img"] =  list[0]["store_img"] = `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`; 
            list[0]["menu_img"] = dataImg; 
            res.send(list);
            console.log(list);
            con.end();
        }
        else if(result[0].menu_img =="" && result[0].menu_img == undefined && result[0].menu_img == null || result[0].store_img !="" && result[0].store_img != undefined && result[0].store_img != null){
            var dataImg = result[0].store_img ? result[0].store_img.toString() : null;
            list[0]["store_img"] = dataImg; 
            list[0]["menu_img"] = `iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAUJ0lEQVR4Xu2dB7AsRRWG/zOPnJMKYg5YWmihGDEnTCgYUFSMmLUwlDmCATGiomJGxSyiIiiglqCYs4AZUZAkSUAy28f61m5ruezM9IaZ3b07XbV173t3Zqe7z98nnzOmbiz1DthSr75bvDoALDkIOgB0AFjyHVjy5XccoAPAku/Aki+/4wAdAJZ8B5Z8+R0H6ACw5Duw5MvvOEAHgCXfgSVffscBOgAs+Q4s+fI7DtABYMl3YMmX33GADgBLvgNLvvyOA3QAWPIdWPLldxygA8CS78CSL7/jAB0AlnwHlnz5HQfoAND4Dqwn6aaS1pHkNU8DkFdIOiX+bHxyy/6ApjnAIyS9TtLNJRWZAAiS/iLpjZKOXHYCNb3+JgFwf0lflQQHuCoSv44DsF7mtLakyyTtJunYpjdhmb+/KQBw2r8u6SGRkADgygiEnP0GKBtLOlrS4zM4R853dtcM2YGmALCRpJ9F2X+JmV0o6VJJsPfcARf4p7vvGkGUe1933Qg70BQANokA2NbMzpF00RineC1Jf3f3x3YAGIGiI17aJAB+K+l6ZnZGZP8jTk0A4BR3Rw9AH+hGAzvQFAA2kHSApE2KorhAUm+Mua+RdHYI4a1jAmiMRy7fLU0BYPl2ckFX3AFgQQk3rWl3AJjWTi7o90wCANy7d5N0W0nbSFp3DE1/QbdtZtOGXpjSF0d3+S+itcW/xxrjAOCOkl4o6QGStsp08Y41ue6m0h2AbnxwruE2/4ykj0o6f9Q9GwUABHNeKelFkjaVdHlEI147UMmH33PcvaPOs7v+2juQQABd1pf0O0kvkfS9UTYrFwAbSvqQpCdGmxxiY9rh4gUIV5rZ1SN6+kaZZ3ft8B0o3B1zGRBwKKHHCyR9IXfDcgDAAz4o6VmSLolEJmSLixf3Lg8dxcWbO7fuuvwdIPaytrvjggcMT5Z0TM7tOQB4mqSPxPg8hE6+fU5+x+5zdrm9a6Dnxu6O8+3hks6se3QdAK4j6YeSbhQVjovN7N+dZ65uW2f+983c/VOS9qmbSR0AkCfvjZE8Tj5aJuy/G/O9A4iES939UXVcoAoAfAly5F6S/iPpPDPjZzcWYwfWc/fXSvpK1XSrAHADST+RtLmkC+LpHyeosxjbtfpmuZ6ZHRZCeM24ALirpO9ELf8cM8MCmKcBeOdVCcVygoNOa7BOzOxRxjpm9osQwlOr9qmKA+Dp+wZux5jUgdep7cH82EhyA1JSafJB8JO/s9l8kpsULsVnFuBgjnxONTM08akMd8fGRxFnjblceC0z+0MI4QlV4KkDwOGR/Z83woMnXXRKCu0rMigxZvY3SX8LIWDWnBv/H/8DhCfpdIuiKLaWdBN3v5kkxBebxmjLT5EUr3dE3WmaHBNP373N7FWSNsukBYfmj+5OTmUp98gBwLlR/jd9othAnBhYG78LIXxf0s9JC4sOqFxgkUu4raQdiqK4l7sTu8CcZRNGZaO5z+S6dd39bZIwv5oau5rZmzPXMRUAkNkLAGBnTQEgEf5sM/tWCAGx84cpPg8w7GxmpJbdMp6eaQMhnf7dSWRtivoo5GYGTXK4wEIAgBDyhWZ2aAjh85LIH2xq4CbdxcxwkxLKxp8xLVADgAvc/TFRRDW1BlLlv2NmAADxWDXmGgB9xc7Mjg0hvE/Sn5rasSHfu2VRFHu5+x5R5KAjTDoSAOAAZEE3NdBrfoR+Y2boQlUAnlsAIKMvcfcDJX1uhoGkncwMGxmlkbjGJKMtAJBu/1NJW5rZ2TW6wFwCAJZPrj/1gr+cZMendO/WRVHs4+73nhAEbQNgKzM7a9EAsK6ZnRhCeCl28ogEJM0cuY0Sh4lHJlKqOSQ4dbqkk+Nn1KyY9YqieF30m4+rF3QAqCEoxMe0I5UM1pUzIDpxCCqMd4qOEBS55PRB/iUzFucIbJxT8atYVXyUpH/lPAh9pCiK17r748bkBB0AKjYa2/5kd39OppYPkfFePUPS7WKlMIoaRB5MO1uZhAIRAAdiBmD8I+oY5MrlcJy1i6LYz913GQMEHQBKAABBLnT3Z+KVyjiNVBMTw95xIOWMkw7xsd0BAp+UfpZAkPLjeB7KD4om3jO4CHb5uyV9OCOPYeOiKA5y9zuMGPYGABe5+6NH4DoZ23GtS1ACcY5tsQg6QN9P7+4kktY1eoBQEP75kXhJFkNofr/MzIhFJLMnsf6UhJriA0ksAARSpOAGcBTsZ0Lbe8d06qrNv5mZfTLT2TL4PayV72+ynwFp+JTMXxrjM1UOrZlbAYQjvxRCeEMN1K8n6eOSHjqQcMrCKAjFLZyCH+S+n25mnGhsYGQ+iyRcfQN3Rznkd0CQAlf9uIK7ozDiDj5NEtwIW7p0rFmz5pEhhLeMyAWYy1/dncxcWtxMe9wwpn8TpT0/+gHmFgBsxpnuThZxlWPk+pK+GJU8PFsQD8ISgeyzejM7ycyO7vV6pKYh14fZ7DyPYNCORVE82N3vEq2ElL2UgLBFvJ8Q6XEVFCqKoni/u993RH0A0XOxu8OmUUinNTgkiMcbD6TmcQiqIoMz5QAERjj5X67YAbxah0q630DziP+YWapyIZKFAkdOwqhpaHcoiuKZ7o4VMZiujqze1N35PjT+31TM79ZmhqOKe0bJeiYTh0opxE5dyl0uQBJXYy0QHQ5Q13NhZgDgFEC8PStOD5tKpvHTY6SPRXHqIX7P3YkLfAAFMneHhlzHM3Y3MwpZIMagyxcQIEpQ2qo41JvMDJfxqKlw68cYfrJIJljGNW5lnxCLEL8uoDUzAHD6yUU7rGLVT5H0sXiyWchFkfhXxpBqdmFDxs7uaGaEaRERgyDY3N2JrAGQMp/6dmZGTl2qfMp43P8v4SDwmVZmULKG0G9yONJMAID2fXp0qIDSYQNljVg/bJLFcPI56Ve7O63hKpMYR6HAwLW3MTOKW7YcODmw5w3d/XmSvl3xvR82MzqejV2AOeacJ71tJgBA8z84hPD2itmTMYOmTMYM5kzfdevusHw+TY17mBmRx8F+hbBoxBWOp7KAEMoXIGCe0wofN7XGwe9tHQB9hcfd96oI9NwkFppgrmHbs6lXmdlPQgh4CpvOO3yRmfGcwZ5DyGsA+c0SqhB7/7aZUR85qjLaBqHLntE6AHjgP2JXr7JkhVdI2i8qVSSCwPqvcHeUQapbmx6bmBn6BQmWSR8gTvGjEAK1j2Wy9UNm9rCGkz2mvfbWAQD7PzyEAJGHDWICeMlw86ZMYzezI0IIL5/26iu+b08zw+uYZHq/zj4miJB8OmygtL4zdjzLUcBaXE7po9oHAMGUXq93SMmUCOyg/KEoUmjST5t292fHApS2Ng1F8Egzw0WcuAC2Owoo5uewcXtERBRZTYupae1D6wDAFw4xf1yyAnQDbH9YP16sflfwaDG03QfwQDMj6kcuAQMxcGQI4WUlcyf/4HgzY1MXxRpoFQCwUWQ5TpMyPzgaOMEeqowAQBFLl/AZtD3Q+t8d06pg6WzWn2IO/bAcQf5O5w0CRTiOFsEaaBUAmFbnuTtJkRSRDBsUmTyIhJDI/tdxdwIu9Ldpe8DSEQOIIVh6TlYvjq17LpAe0CoAkOunRQtgWEUMf0f+72BmVPfARonSkSH03bapH9PKjo/BJuYCB7s8coAyDkaIeDczI6JY54adwZKu9chWAcDDyPpBBAxzqJCcQTTvFvEEIfPRGQjNkuXa9sAPwXOxXFIOIZ5I4hdliSsklDzRzIhILoIiOJcAQIZS/IECOGsA0M5+wwGZngMATEjSyyZNI28D8K0CIFcE4JMngxdFCx0AEUC4t+1BPAIOsMbMSBxFEUQEwMGoRRw2qPkjuggA2rZaxtmfVgGAEnV+LI0qUwKJvFHhShgWAGB70wn80+OsbsJ7cEah1afUKgBQN/+vSXpg1AE6AKwgQDIDKUUu86a9R9JeUYb2AWBmXw0hvHpCYo5zO/WBnyCBM5qkzL+qlJrT9ANJ20cO1gFgyK6vFVO/UfaGDfz9740sFCUKsXFqTexgHOLm3APxnxQBAMeiThE3NgmswwaOIHQGqnNJ9ep0gCG7RIXN/r1er6w+fvtY2Yr3LZ0gFEHi8ZhkbY3rRtczeXap9D2lsH2pZBJJZNARFZ1hEaKCreoA7FudO5XsmGPMjBKv1D6Fe44OIby4LepLAnB4JUnzAgD8rFMAcWNjBtIpDU/gNCqKm15y6wCoswRYMIR+ZXQGpRx+j/4AWp83PcgKRpbzIksikrikg5kdF0LATV3m4sUJhI8AL2ab7XIm2Y/WAcBkaV6Mcwd5OWyQ236UWT93JDlT6GZF3SA6QtPK1f6SCPjgrSQPEScQc67ySCanEZ1Gmu6WMgnBV947EwCg2R8SQiDpo2y8wcwg9mAV7waxtWnVfZNuDu8f/Gx0+yLDISbZSL8KIcDiy7x73IduQAYTHKOLBlZQAjFwVtTsU6h15eVk5x5mZtS5JVkKSwAE5BKSLTztQUkVNQiIAJ7J6UcPCe7+3JpKITKIaP1CDgPyfxEUQPZvJhyAB+PgIeOGip+y8Sgzgx2naiCuwyIgSYPexHymNXaOoEL755RfHuW4UfgRQiARpGxguVBBlHoZLYr8nykAUo0cZWFluYGceIoueCvoYPQQXwI2N17DfesaHdcghBQ0ml2Tb0DxaXp/MScZ1n9CCAF9par4hFRyklxg+1gA/FyEXICZAiBxgbpY/4ZFURzo7jR/GFT+CBNjo9NIAu8h8resxmAYBhBDdDmlE8l94qnH1cvpJxsJJ84ZkfXzvp2ysUMMVXP6k8t4EaKAaT0zEwF9dh5967iGq15aQMeuA9z9zitAACdAXpOSDZF4DT3l3YRqh7VgTS1k6PVDuRcVtPgdUpk5P5H7EJCiVaqBqrKQmT8FKmQCw8X+Hd+TsCgJoTPnAEyAfPsj4kms4tabF0Wxr7sjqwffQoJOAGEBArV9/ZMbK4ThDjhwOJ2IDNK8MTEpOE2nPZVScXqT5k7aF+7e39eID6wU3pEEcNAZUjn6tPSScb8H0ZlbbwgH+H3sfTR2q9hJO4UCgtdHNl616HWKoni2u1O2TS3/YH0/YWOAwIfEEmT7YJ+gROjBFjIsmO+gkLLfK9jMjonvIa7rUYTiRxMGgAcA0BnQE2Yt+/tZS3RTzexFSM7lub1eDxFayrnqegVPCgAIRbUv/X5y2sLdqSiKvWOLFgAzrNEDAIC9JxCktvGppToEvyI2luBvZB5jWpLTV8fCITqtapNISm9JmQfZT7yCsrqDx2Ufw+5rGgBJIYSFUlxRFioenBsE3rkoij3cndOY2sGlZgipRXxqzZ7uTe1i+H+u/XuM8GH/l+UoDD6X5xDIQodAKSXww33T7Po9Ce3ghFg1I70XsO6BbQCAOWzk7mTSIFvJqcsZyDA6ftNAYkd3R8bjJ+D/V84bgkO0s6JbGdud+oRcrx1y9aAIUpQ+vg/FD9ZfxzVy1jKNawhZ02cRLoAiXFd23s/RiE2ySsVXWwBgA1JTBuxquoGPMiA65eSkcm2zZs0avotI4tW9Xg9lELlOphHpZnVNlFc+F48kVclYLICo/27e6Cmct+xf9oFqKgpV+VQNxOQJ0SQujV62CQAmy+vMIBhm2CzSwVduGKFpwrxwmUR85H6qFxgFpG1di58EywduWAeA30q6e1X4um0AgF5MNeTtAdHlOysFixcrviu2oE3vQYb4xDDm1d8PvdCRiJtgFVWJgcQBaHQ1NxwgIRadAN886WM0k6KrVlsDMYIvgDeiYkmkLqQ0qELmzwqQdeuH+D0zQ7eBQzH3qsHfzwwh0JW9tJtY6xwgzrjv0IggQObSjQs5/Oe6XZjg75h4JIOiScP6YfkoRwAgNaia50wf9gtFFYJObcwKAGkByDOUMGQarJfUa2oFSSiZlgK2XQznktHD74OtZlNPwvRS7KltbANfhBlIdxMymqY2Zg0AFkJGDjoBugG+f1gw/fvwxmHzYjGM8go2ZCMvgUD5ob8PuQAAjO8FVOnUI+8h/Lgt4qdGhMwvWtvMfhi9mQTH6sxAvpb1Vnox5wEAaf0EgHD1ot3yARScUEw7AkJ8KNwkK7ffTzD6AzCHaPpAPID3CXDK+R3Okhospi7jnH5YP/GBpPVn7v9cXIYZSAJraoRdZwWcFN8iPndKYNnEASRAwDHDIgEBv6P59m3gIT37kmcw/S29ODIRnX+zAYCJtC5OfO7LF+eC6ismgS5A32M4XdUBxgr4dWzDO1YwCH84dXupnUvbwZB+x+9YQ5j8/4BgMAaQNiDNjZ+pc3g/IBRDwIn9z4tXbxJgpfS5OjOQPaMpNjmNY3kCaeTMy6NJncIn3jYABjcpvQwivSYWvSEBoX+dmaVunokDzPIVspMQOOdeQJA+Zdenbu2VHViqWAibTp//28dyqFkCYNgih8193uaYQ8ymrkFU4O+gM0vpqAIAN+G33y9W9K4G9tnUZs/b98IdadlDzmXlewzrAIB2TSEHGTlNF23M2yYu8nxwFRPj4FU5laMOANz82Nhtex6yYurW0/39fxYT72bE61mbB5EDAK7Z18wIl47aN78jSLs7gJV0WUwcKSvPu8aMcgDADesWRfH6+FYs7OhOH2iXsDlP6xevxHc1ZIfacwHABFAsnmpm5PdRMNkBIYcszV7Td5zFBhcU2FJbWfUanGvNZhQApJtxtdIujRx8PFIAozO/miV0mRmMd5P2fATRSHodOX9xHACkyRDPv62kWxVFARCSq7b9rViyJ4YQIDQxkhNjjcPYCSyTAGDJtn11LrcDwOqka/aqOgBkb9XqvLADwOqka/aqOgBkb9XqvLADwOqka/aqOgBkb9XqvLADwOqka/aqOgBkb9XqvLADwOqka/aqOgBkb9XqvPC/0AZ7+ejlPE4AAAAASUVORK5CYII=`; 
            res.send(list);
            console.log(list);
            con.end();
        }
        else{
            list[0]["store_img"] = `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`; 
            list[0]["menu_img"] = `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`; 
            res.send(list);
            con.end();
        }                                                
    });                    
}

exports.doneReport = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var report_toid = req.body.report_toid
    var report_comment = req.body.report_comment
    var report_fromeid = req.body.user_id
    var report_date = req.body.report_date



    sql = `INSERT INTO report(report_toid,report_comment,report_fromeid,report_date) 
        VALUES( ? , ? , ? , ? )`;
        con.query(sql, [report_toid,report_comment,report_fromeid,report_date], function (err, result){if (err) throw err;
            res.send([{Alert:1}]);   
            con.end();                           
        });
       
}

exports.getDataReport = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var user_id = req.body.user_id

    sql = `SELECT * FROM report ORDER BY repor_id DESC`;
    con.query(sql, [], function (err, result){if (err) throw err;
        res.send(result);
        con.end();                             
    }); 
       
}

exports.doneComment = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var comment_text = req.body.comment_text
    var comment_store_id = req.body.comment_store_id
    var comment_user_id = req.body.comment_user_id

    sql = `INSERT INTO comment(comment_text,comment_store_id,comment_user_id) 
        VALUES( ? , ? , ? )`;
        con.query(sql, [comment_text,comment_store_id,comment_user_id], function (err, result){if (err) throw err;
            res.send([{Alert:1}]);   
            con.end();                           
        });
       
}

exports.getComment = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var store_id = req.body.NewStoreid

    sql = `SELECT * FROM comment WHERE comment_store_id = ? `;
    con.query(sql, [store_id], function (err, result){if (err) throw err;
        res.send(result);
        con.end();                             
    }); 
       
}

exports.doneBooking = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });
  
}

exports.sendOrder = function (req, res) 
{  
    var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });
      
    var order_user_id = req.body.user_id//id customer
    var order_store_id = req.body.store_id//id store
    var order_user_store_id = req.body.user_store_id//id store of user
    var order_datetime = req.body.order_date
    var order_payment_id = 0
    //Select table menu
    var detailMenu = req.body.detail
        //บันทึกรายละเอียดอาหารลง table
        
        var iarray = 0;
        for (var i = 0; i < detailMenu.length; i++){
            var amountcal = parseInt(detailMenu[iarray].amount)
            console.log(amountcal)
            sql = `SELECT * FROM menu WHERE menu_id = ?`;
            con.query(sql, [detailMenu[iarray].menuid], function (err, result){
            if (err) throw err;
                if(result != ""){
                    var amountforcal = result[0].menu_amount
                    if(amountforcal >= amountcal){
                        var calamonut = amountforcal - amountcal
                        sql = `UPDATE menu SET menu_amount = ? where menu_id = ?`;
                        con.query(sql, [calamonut,result[0].menu_id], function (err, result){
                        if (err) throw err;
                            console.log('A')
                        });
                    }
                    else{
                        //หากพร้อมกันจะลบออกจาก array แล้วไม่ทำรายการนั้น ๆ
                        detailMenu.splice(iarray, 1);
                        con.end(); 
                    }
                } 
            }); 
            iarray++;
        }
    //เพิ่มใบสั่งรายการอาหาร
        sql = `INSERT INTO orders(order_store_id,order_datetime,order_payment_id,order_user_id,order_user_store_id) 
        VALUES( ? , ? , ? , ? , ? )`;
        con.query(sql, [order_store_id,order_datetime,order_payment_id,order_user_id,order_user_store_id], function (err, result){if (err) throw err;
            //เลือก ใบสั่งอาหารจาก user_id & store_id ที่เวลาล่า
            sql = `SELECT * FROM orders WHERE order_datetime = (SELECT MAX(order_datetime) FROM orders WHERE order_store_id = ? and order_user_id = ?) `;
            con.query(sql, [order_store_id,order_user_id], function (err, result){if (err) throw err;
                var Neworders_id = result[0].order_id //order_id current
                console.log(Neworders_id)    
                // insert detail and order_id


                
                var detail = detailMenu
                //บันทึกรายละเอียดอาหารลง table
                var iarray = 0;
                    for (var i = 0; i < detail.length; i++){
                        var amount = parseInt(detail[iarray].amount)
                        var detail_totalcost = amount * detail[iarray].menuprice
                        var Newmenu_id = detail[iarray].menuid
                            sql = `INSERT INTO details(detai_menu_name,detail_menu_price,detail_menu_amount,detail_totalcost,detail_order_id,detail_menu_id) 
                            VALUES( ? , ? , ? , ? , ? , ?)`;
                            con.query(sql, [detail[iarray].menuname,detail[iarray].menuprice,amount,detail_totalcost,Neworders_id,detail[iarray].menuid], function (err, result){
                                if (err) throw err;
                                console.log('สำเร็จ') 
                            });
                        iarray++;
                    } 
                    res.send([{Alert:1}]);
                    con.end(); 
            }); 
        });
        
        
        
}

exports.getbookingList = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var order_user_id = req.body.user_id
    
    sql = `SELECT * FROM orders WHERE order_user_id = ? ORDER BY order_id DESC `;
    con.query(sql, [order_user_id], function (err, result){if (err) throw err;
        res.send(result);
        con.end();                             
    });    
}

exports.getbookingListforpayment = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var order_id = req.body.order_id
    console.log(order_id)
    sql = `SELECT o.order_id, o.order_store_id,o.order_payment_id,o.order_datetime, d.detai_menu_name,d.detail_menu_price,d.detail_menu_amount,
    d.detail_totalcost,d.detail_order_id
        FROM orders o JOIN details d ON o.order_id = d.detail_order_id WHERE o.order_id = ? `;
        con.query(sql, [order_id], function (err, result){if (err) throw err;  
            res.send(result);
            con.end();                                     
        });  
       
}

exports.sendOrderpayment = function (req, res) 
{  
    var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    //req.body.payment_img = `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…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`;
    var payment_order_id = req.body.payment_order_id
    var payment_img = req.body.payment_img
    var payment_total = req.body.payment_total
    var payment_store_id = req.body.store_id
    var payment_status = 0

        sql = `INSERT INTO payment(payment_order_id,payment_img,payment_total,payment_store_id,payment_status) 
        VALUES( ? , ? , ? , ? , ?)`;
        con.query(sql, [payment_order_id,payment_img,payment_total,payment_store_id,payment_status], function (err, result){if (err) throw err;  
            sql = `SELECT * FROM payment WHERE payment_order_id = ? `;
            con.query(sql, [payment_order_id], function (err, result){if (err) throw err;
                var payment_id = result[0].payment_id  
                var order_id = result[0].payment_order_id  
                sql = `UPDATE orders SET order_payment_id = ? where order_id = ?`;
                con.query(sql, [payment_id,order_id], function (err, result){if (err) throw err;
                    res.send([{Alert:1}]);   
                    con.end();
                });  
            });                         
        });                                            
}

exports.getbookingListOrder = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var store_id = req.body.store_id
    console.log(store_id)
    sql = `SELECT o.order_id, o.order_store_id,o.order_payment_id,o.order_datetime,p.payment_id,p.payment_order_id,p.payment_status,
        p.payment_total,p.payment_img,p.payment_store_id
        FROM orders o JOIN payment p ON o.order_id = p.payment_order_id WHERE o.order_store_id = ? `;
        con.query(sql, [store_id], function (err, result){if (err) throw err;  
            res.send(result);
            con.end();                                     
        });  
       
}

exports.getPaymentOrder = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var order_id = req.body.order_id
    sql = `SELECT * FROM payment WHERE payment_order_id = ? `;
        con.query(sql, [order_id], function (err, result){if (err) throw err;
            var list = result
            var dataImg = result[0].payment_img ? result[0].payment_img.toString() : null;
            list[0]["payment_img"] = dataImg; 
            res.send(list);
            con.end();                              
        });   
       
}

exports.confirm = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

        var payment_id = req.body.payment_id
        var payment_status = 1
            sql = `UPDATE payment SET payment_status = ? where payment_id = ?`;
            con.query(sql, [payment_status,payment_id], function (err, result){if (err) throw err;
                res.send([{Alert:1,Comment:'ดำเนินการสำเร็จ'}]);
                con.end(); 
            });                                  
}

exports.getPaymentconfirm = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var payment_id = req.body.order_id
    sql = `SELECT * FROM payment WHERE payment_order_id = ? `;
        con.query(sql, [payment_id], function (err, result){if (err) throw err;
            res.send(result);
            con.end();                              
        });   
       
}