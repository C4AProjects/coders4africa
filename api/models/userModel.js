/**
 * Project: coders4africa
 * Created by Haythem Horbit on 29/10/2015.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var bcrypt    = require('bcryptjs');
var paginator = require("../utils/pagination");
SALT_WORK_FACTOR = 10;
user_schema = new Schema({

    first_name:{ type: String},
    last_name:{ type: String},
    email: { type: String,  index: {unique: true, dropDups: true}},
    job: { type: String },
    country: { type: String },
    password: { type: String },
    gender: { type: String },
    role:{type: String, default: "user",enum:["user","admin"]},

    creation_dt: {type: Date, default: Date.now},
    modif_dt: {type: Date, default: Date.now}

})


user_schema.plugin(paginator);
user_schema.methods.verifyPassword = function verifyPassword(passwd, callback) {
    bcrypt.compare(passwd, this.password, function done(err, isMatch) {
        if(err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};
/*
 crypt Password
 */
user_schema.methods.cryptPassword = function cryptPassword(passwd) {
    var cryptedPass=passwd;
    bcrypt.genSalt(SALT_WORK_FACTOR, function genSalt(err, salt) {
        bcrypt.hash(passwd, salt, function hashPassword(err, hash) {
            cryptedPass = hash;
        });

    });
    return cryptedPass;

}
user_schema.index({ email: 1, unique:true })


user_schema.on('index', function(err) {
    if (err) {
        console.log(err)
    }})
module.exports = function (backend) {
    user_schema.pre('save', function (next) {
        var user = this;
        this.modif_dt = new Date();
        if (!user.isModified('password')) return next();
        // Generate a salt factor
        bcrypt.genSalt(SALT_WORK_FACTOR, function genSalt(err, salt) {

            // Hash the password using the generated salt
            bcrypt.hash(user.password, salt, function hashPassword(err, hash) {
                // Store password as hash instead of plain text
                user.password = hash;
                // set date modifications

                console.log(hash)

                next();

            });

        });
    });
    backend.USER = mongoose.model('user', user_schema, 'user', true);


}