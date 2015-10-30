

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


 var connectionUtils=  function connectionUtils (backend) {
    var isConnected = false;


    backend.connect = function connect   (opt) {
        console.log('[DB]: Connecting to '+opt.url);
        if (opt)

            mongoose.connect(opt.url,opt.auth);

        else
        {

            console.log("Please configure DB Connexion Settings")


        }

    }
    backend.disconnect = function (cb) {
        console.log('[DB]: discnnecting...');
        mongoose.disconnect(function () {
            console.log('[DB]: discnnected');
            isConnected = true;
        });


    }
    backend.getConnectionStatus = function getConnectionStatus() {
        return isConnected;
    }
    backend.connection = mongoose.connection;
    backend.connection.on('open', function () {
        console.log('[DB]: Connected OK');
        isConnected = true;

    });

    /** Open and close your Jacket. */
    backend.connection.on('error', function (err) {
        isConnected = false;
        console.log('MongoDB error: %s', err);
    });

}
module.exports=connectionUtils;