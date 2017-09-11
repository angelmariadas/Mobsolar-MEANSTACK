var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MachineSchema = new Schema({
  email: {type: String, required: true,unique: true},
  address: {type: String,required: true},
  installdate: {type:String, required:true},
  countrycode: {type:String,required:true},
  userid: {type:String,required:true},
  inverter: {type:String,required:true},
  nameplate: {type:String,required:true},
  latitude: {type:String,required:true},
  longtitude: {type:String,required:true}

});


MachineSchema.pre('save',function(next){

	var machine = this;
	var d = machine.installdate;
	var da = d.substring(0,10);
	machine.installdate = da;
	next();
});

module.exports = mongoose.model('Machine',MachineSchema);
