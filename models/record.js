var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recordSchema = new Schema({
    temperature:  {
        type: Number,
        default:null,
        required:false
    },
    humiditee:  {
        type: Number,
        min:0,
        default:null,
        required:false
    },
    poid: {
        type: Number,
        min:0 ,
        default:null,
        required:false
    },
    flux:{
        type:Number,
        min:0,
        default:null,
        required:false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Record', recordSchema);