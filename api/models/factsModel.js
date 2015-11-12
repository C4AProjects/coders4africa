/**
 * Project: coders4africa
 * Created by Haythem Horbit on 12/11/2015.
 */
/**
 * Project: coders4africa
 * Created by Haythem Horbit on 29/10/2015.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


facts_schema = new Schema({

    members:{ type: String},
    countries:{ type: String},

    professional:{ type: String},
    events:{ type: String},
    projects:{ type: String},
    clients:{ type: String},

    students:{ type: String},
    followers:{ type: String},



})



module.exports = function (backend) {

    backend.FACTS = mongoose.model('facts', facts_schema, 'facts', true);


}