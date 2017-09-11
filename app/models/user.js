var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

//1.create schema
var AdminSchema = new Schema({
  adminname: {type: String, lowercase: true,required: true,unique: true},
  password: {type: String,required: true}
});

//encrypting password before saving it to schema
AdminSchema.pre('save', function(next) {
  var admin = this;
  bcrypt.hash(admin.password,null,null,function(err,hash){
    if(err) return next(err);
    admin.password = hash;
    next();
  });
  
});


//validating password

AdminSchema.methods.comparePassword = function(password){

	return bcrypt.compareSync(password,this.password);

};


//2.exporting schema - model name is 'Admin' and schema variable is 'AdminSchema'
module.exports = mongoose.model('Admin',AdminSchema);

//3. Define Admin in server.js