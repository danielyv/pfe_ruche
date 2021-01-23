var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rucheSchema= new Schema({
   records:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Record'
    }]
});


module.exports = mongoose.model('Ruche', rucheSchema);