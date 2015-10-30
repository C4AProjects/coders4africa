

//var userCtrl=require("../controllers/userController")
var authCtrl=require("../controllers/authCtrl")
module.exports = function (app) {

    app.post(APP.APIPATH+"/login", function(req, res){
        authCtrl.authenticate(req.body,function(err,doc){
            if (err)
                res.send({success:false,error:err})
            else{
                res.send({success:true,result:doc})
            }
        })
       // res.send({success:false,error:{}})

    });




}