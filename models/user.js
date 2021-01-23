var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;


var User = new Schema({
    firstname: {
      type: String,
        default: ''
    },
    lastname: {
      type: String,
        default: ''
    }
    ,
   facebookId:{
     type:String,
     default:''
   },
   googleId:{
     type:String,
     default:''
   },
   username:{
     type:String,
     required:true
   }, 
    admin:   {
        type: Boolean,
        default: false
    },
    ruche:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ruche'
    }]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);