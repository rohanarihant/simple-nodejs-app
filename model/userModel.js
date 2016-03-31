var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: String,
	phone: String,
	gender: String,
	hobbies: String,
	email:{type:String, unique: true , required: true},
	password:{type: String, unique: true, required: true}

})
var User = mongoose.model('user',userSchema);

module.exports = User;
