//################# Modèle #################
let passport = require('passport');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let passportLocalMongoose = require('passport-local-mongoose');

let Account = new Schema({
    username: String,
    password: String
});

Account.plugin(passportLocalMongoose);
module.exports = mongoose.model('Account', Account);

// ################# mongoose #################

//Vérification connection. 
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Succès, vous vous êtes authentifier ! ");
});