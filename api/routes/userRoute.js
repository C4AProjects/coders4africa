

//var simple_recaptcha = require('simple-recaptcha');

var userCtrl=require("../controllers/userCtrl")
//var authCtrl=require("../controllers/authController")
module.exports = function (app) {

    app.post(APP.APIPATH+"/user", function(req, res){


      /*  var privateKey = '6LfA2hATAAAAAPTngTcyX6xb0vX134dL9q25o6UZ'; // your private key here
        var ip = req.ip;
        var challenge = req.body.captcha.challenge;
        var response = req.body.captcha.response;

        simple_recaptcha(privateKey, ip, challenge, response, function(err) {
            if (err)   {res.send({success:false,error:err.message})}
            else{
                userCtrl.add(req.body,function(err1,doc){
                    if (err1)
                        res.send({success:false,error:err1})
                    else{
                        res.send({success:true,result:doc})
                    }
                })
            }


        });*/
        userCtrl.add(req.body,function(err1,doc){
            if (err1)
                res.send({success:false,error:err1})
            else{
                res.send({success:true,result:doc})
            }
        })


    });
    app.post(APP.APIPATH+"/user/query", function(req, res){
        userCtrl.query(req, function (err, pageCount,totalCount, docs) {
            if(err)
                res.send({success:false,error:err})
            else{
                res.send({success:true,page_count:pageCount,total_count:totalCount,result:docs})
            }
        });
    });

    app.get(APP.APIPATH + '/user', function (req, res) {

        userCtrl.getAll(req,function(err, doc){
            if(err)
                res.send({success: false, error: err})
            else
                res.send({success: true, result: doc})
        });


    });
    app.get(APP.APIPATH + '/user/:userId', function (req, res, next) {
        userCtrl.getById(req.params.userId, function(err, doc){
            if(err)
                res.send({success: false, error: err})
            else
                res.send({success: true, result: doc})
        });

    });

    app.put(APP.APIPATH + '/user/:userId', function (req, res) {
        console.log(req.body)
        userCtrl.update(req.params.userId, req.body, function (err, doc) {
            if (err)
                res.send({success: false, error: err})
            else {
                res.send({success: true, result: doc})
            }
        });

    });

    app.delete(APP.APIPATH + '/user/:userId', function (req, res) {
        userCtrl.delete(req.params.userId, function (err, doc) {
            if (err)
                res.send({success: false, error: err})
            else {
                res.send({success: true})
            }
        });

    });

}