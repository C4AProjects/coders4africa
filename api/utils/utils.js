/**
 * Project: ngiaxess
 * Created by Haythem Horbit on 05/07/15.
 */
var _ = require('underscore');
module.exports.query = function (req, callback, model) {

    console.log("QUERY from " + model.collection.name)

    var page = req.query.page || 1;
    var limit = req.query.limit || 10;


    var opts = {
        page: page,
        limit: limit
    }

    var query = {};
    if (req.body.query) query = req.body.query

    var options = {limit: limit, page: page}
    if (req.body.options) {
        if (req.body.options.limit) options.limit = req.body.options.limit
        if (req.body.options.page) options.page = req.body.options.page
        if (req.body.options.columns) options.columns = req.body.options.columns
        if (req.body.options.sortBy) options.sortBy = req.body.options.sortBy
        if (req.body.options.populate) options.populate = req.body.options.populate
    }


    model.paginate(query, options, function (err, pageCount, totalCount, results) {
        if (err) {
            DEBUG(err)
            return callback(err);
        }
        else
            callback(null, pageCount, totalCount, results);

    });


}

module.exports.delete = function (id, callback, model) {
    console.log("DELETE from " + model.collection.name + " by ID: " + id)
    model.findByIdAndRemove(id, function (err, result) {
        if (err) {
            callback("Erreur interne xx:" + err);
        } else {
            if (_.size(result) > 0) {
                callback(null, result);
            } else {
                callback("Erreur: " + model.collection.name + " with ID: " + id + " does not exist");

            }
        }
    });
}

module.exports.update = function (id, data, callback, model) {
    console.log("UPDATE " + model.collection.name + " by ID: " + id)


    model.findOne({_id: id}, function (err, doc) {

        if (err) {
            callback("Erreur interne: " + err)
        } else {

            if (doc) {

                doc = _.extend(doc, data);
                doc.save(function (er) {
                    if (er) {callback("Erreur Updating " + model.collection.name + " with ID: " + id + " : " + er);}
                    else  callback(null, model.collection.name + " with ID: " + id + " updated");
                });

            } else {
                callback("Erreur: " + model.collection.name + " with ID: " + id + " does not exist");

            }
        }
    });
}

module.exports.getById = function (id, callback, model) {
    console.log("GET from " + model.collection.name + " by ID: " + id)
    var query=  model.findById(id).select("-password")
    query.exec(function (err, user) {
        if (err) {
            callback("Erreur: Recherche user par id" + err);
        } else {
            if (_.size(user) > 0) {
                callback(null, user);
            } else {
                callback("Erreur: " + model.collection.name + " with ID: " + id + " does not exist");
            }

        }


    });
}
module.exports.getAll = function ( callback, model) {
    console.log("GET ALL from " + model.collection.name )
    var query=  model.find({}).select("-password")
    query.exec(function (err, user) {
        if (err) {
            callback("Erreur: Recherche user par id" + err);
        } else {
            if (_.size(user) > 0) {
                callback(null, user);
            } else {
                // callback("Erreur: " + model.collection.name + " with ID: " + id + " does not exist");
            }

        }


    });
}