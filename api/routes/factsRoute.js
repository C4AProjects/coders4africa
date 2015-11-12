/**
 * Project: coders4africa
 * Created by Haythem Horbit on 12/11/2015.
 */



var factsCtrl=require("../controllers/factsCtrl")
//var authCtrl=require("../controllers/authController")
module.exports = function (app) {

    app.post(APP.APIPATH+"/facts", function(req, res){
        console.log("facts route post")
        factsCtrl.add(req.body,function(err,doc){
            if (err)
                res.send({success:false,error:err})
            else{
                res.send({success:true,result:doc})
            }
        })

    });


    app.get(APP.APIPATH + '/facts', function (req, res) {

        factsCtrl.getAll(req,function(err, doc){
            if(err)
                res.send({success: false, error: err})
            else
                res.send({success: true, result: doc})
        });


    });
    app.get(APP.APIPATH + '/facts/:userId', function (req, res, next) {
        factsCtrl.getById(req.params.userId, function(err, doc){
            if(err)
                res.send({success: false, error: err})
            else
                res.send({success: true, result: doc})
        });

    });

    app.put(APP.APIPATH + '/facts/:userId', function (req, res) {
        console.log(req.body)
        factsCtrl.update(req.params.userId, req.body, function (err, doc) {
            if (err)
                res.send({success: false, error: err})
            else {
                res.send({success: true, result: doc})
            }
        });

    });

    app.delete(APP.APIPATH + '/facts/:userId', function (req, res) {
        factsCtrl.delete(req.params.userId, function (err, doc) {
            if (err)
                res.send({success: false, error: err})
            else {
                res.send({success: true})
            }
        });

    });

}