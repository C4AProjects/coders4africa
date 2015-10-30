/**
 * Project: coders4africa
 * Created by Haythem Horbit on 29/10/2015.
 */
process.env.NODE_ENV = 'development';


var dev = require('./env/dev.json'),
    prod = require('./env/prod.json');
module.exports = {
    loadConfig: function () {
        var conf;
        if ('development' == process.env.NODE_ENV) {
            conf = dev;

        } else {

            conf = prod;

        }
        return conf;
    }
};