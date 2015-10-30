


var userCtrl=require("../controllers/userCtrl")
//var authCtrl=require("../controllers/authController")
module.exports = function (app) {

    app.post(APP.APIPATH+"/user", function(req, res){
        userCtrl.add(req.body,function(err,doc){
            if (err)
                res.send({success:false,error:err})
            else{
                res.send({success:true,result:doc})
            }
        })

    });


    app.get(APP.APIPATH + '/user', function (req, res) {

        userCtrl.getAll(function(err, doc){
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