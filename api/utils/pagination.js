/**
 * Project: ngiaxess
 * Created by Haythem Horbit on 03/07/15.
 */
'use strict';
/*
 * @list dependencies
 */

var async = require('async');

/*
 * @method paginate
 * @param {Object} query Mongoose Query Object
 * @param {Object} pagination options
 * Extend Mongoose Models to paginate queries
 */

function paginate(q, options, callback) {
    /*jshint validthis:true */
    var query, skipFrom, sortBy, columns, populate, model = this;
    columns = options.columns || null;
    sortBy = options.sortBy || null;
    populate = options.populate || null;
    callback = callback || function() {};
    var pageNumber = options.page || 1;
    var resultsPerPage = options.limit || 0;
    skipFrom = (pageNumber * resultsPerPage) - resultsPerPage;
    query = model.find(q);
    if (columns !== null) {
        query = query.select(options.columns);
    }
    console.log(options.limit)
   // query.select("-password")
    query = query.skip(skipFrom).limit(resultsPerPage);
    if (sortBy !== null) {
        query.sort(sortBy);
    }
    if (populate) {
        if (Array.isArray(populate)) {
            populate.forEach(function(field) {
                query = query.populate(field);
            });
        } else {
            query = query.populate(populate);
        }
    }
    async.parallel({
        results: function(callback) {

            query.exec(callback);
        },
        count: function(callback) {
            model.count(q, function(err, count) {
                callback(err, count);
            });
        }
    }, function(error, data) {
        if (error) {
            return callback(error);
        }


console.log(data.results.length)

        callback(null,  Math.ceil(data.count / resultsPerPage) || 1,data.count, data.results);
        //callback(null,  data.count,Math.ceil(data.count / resultsPerPage) || 1, data.results);
    });
}
//(err, pageCount,totalCount,results)
module.exports = function(schema) {
    schema.statics.paginate = paginate;
};
