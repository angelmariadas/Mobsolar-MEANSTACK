var Admin = require('../models/user');
var Machine = require('../models/machine');
var jwt	  = require('jsonwebtoken');
var secret = 'cryptography'

module.exports = function(router) {
//post - entering data into DB
//http://localhost:3030/admin
//ADMIN REGISTRATION - only backend is implemented
	router.post('/admin',function(req,res) {
		// console.log('entered login');
		var admin = new Admin(); //saving instance in variable admin
		admin.adminname = req.body.adminname;
		admin.password = req.body.password;
		if(req.body.adminname == null || req.body.adminname == '' || req.body.password == null || req.body.password == ''){
			res.send('Ensure username and password were provided');

		} else {

			admin.save(function(err){
			if(err){
				res.send('Admin name already exists!!');
			} else {
				res.send('Admin Created');
			}

		});
		}

		});

	//registration of machine
	//http://localhost:3030/machine
		router.post('/register',function(req,res) {
			// console.log('entered machine');
		var machine 		= new Machine(); //saving instance in variable machine
		machine.email 		= req.body.email;
		machine.address		= req.body.address;
		machine.installdate = req.body.installdate;
		machine.countrycode = req.body.countrycode;
		machine.userid		= req.body.userid;
		machine.inverter	= req.body.inverter;
		machine.nameplate	= req.body.nameplate;
		machine.latitude	= req.body.latitude;
		machine.longtitude	= req.body.longtitude;
		if(req.body.email == null || req.body.email == '' || req.body.address == null || req.body.address == '' || req.body.installdate == null || req.body.installdate == '' || req.body.countrycode == null || req.body.countrycode == '' || req.body.userid == null || req.body.userid == '' || req.body.inverter == null || req.body.inverter == '' || req.body.nameplate == null || req.body.nameplate == '' || req.body.latitude == null || req.body.latitude == '' || req.body.longtitude == null || req.body.longtitude == '')
		{
			res.send('Ensure username and password were provided');
			res.json({ success: false, message : 'Ensure fields are filled'});

		} else {

			machine.save(function(err){
			if(err){
				res.json({success:false, message: 'Duplication of fields'});
			} else {
				res.json({success :true, message: 'Registration Successfully Completed!'});
			}

		});
		}

		});




	//ADMIN LOGIN ROUTE
	//http://localhost:3030/api/authenticate
	router.post('/authenticate',function(req,res){

		Admin.findOne({adminname: req.body.adminname }).select('adminname password').exec(function(err,admin){
			if(err) throw err;

			if(!admin){
				res.json({success: false,message: 'Could not authenticate admin'});
			} else if(admin){

				//if(req.body.password) {
					var validPassword = admin.comparePassword(req.body.password);
				//} else {
			//		res.json({success: false, message: 'No password provided'});
				//}
				
				if(!validPassword) {
					res.json({success: false, message: 'Could not authenticate password'});
				} else {
					var token = jwt.sign({ adminname: admin.adminname},secret, { expiresIn: '24h'});
					res.json({success: true, message: 'Authenticated Successfully!', token: token});
				}
			}
		}); 

	});

	router.use(function(req,res,next){
		var token = req.body.token || req.body.query || req.headers['x-access-token'];
	if(token){

	//verify token
	jwt.verify(token,secret,function(err,decoded){

		if(err) {
			res.json({success: false, message: 'Token Invalid'});
		}else{
			req.decoded = decoded;
			next();
		}
	});

}else {
			res.json({success: false,message: "No token provided"});
		}
	});

	router.post('/me', function(req,res){
		res.send(req.decoded);
	});


	router.get('/management',function(req,res){

		Machine.find({},function(err,users){
			if(err) throw err;
			if(!users) {
				res.json({success: false,message: 'Data not found'});
			}  else {
				res.json({success:true,users: users});
			}


		});

	});




	router.delete('/management/:userid',function(req,res){

		var deletedUser = req.params.userid;
		// console.log('value');
		// console.log(req.params.userid);
		Machine.findOne({ userid: req.decoded.userid},function(err,userr){
			if(err) throw err;
			
				Machine.findOneAndRemove({ userid: deletedUser},function(err,user){

					// console.log('inside find andremove');

					if(err) throw err; 
					res.json({success :true});
				});
			

		});


	});

	router.post('/location/:id',function(req,res){

		var locuser = req.params.id;

		Machine.findOne({_id: locuser},function(err,user){

			if (err) throw err;
			// console.log('entered new route to locate');
			res.json({success:true,user:user});
		});

		
		// console.log(locuser);



	});



	router.get('/edit/:id',function(req,res){

		var editUser = req.params.id;
				Machine.findOne({userid: req.decoded.userid }, function(err,userr){

					if (err) throw err;

					Machine.findOne({_id: editUser}, function(err,user){

						if (err) throw err;

						if (!user) {

							res.json({success: false, message:'No user found'});
						} else{

							res.json({success:true, user:user});
						}
					});
				});


	});


	router.put('/edit',function(req,res){

		// console.log('Inside /edit routes api');
		var editUser	=	req.body._id;
		// console.log(req.body.mail);
		// console.log(req.body._id);
		if(req.body.mail) var newmail 				=	req.body.mail;
		if (req.body.address) var newaddress		= 	req.body.address;
		if (req.body.installdate) var newdate		=	req.body.installdate;
		if (req.body.countrycode) var newcountry	=	req.body.countrycode;
		if(req.body.userid) var newuserid			=	req.body.userid;
		if(req.body.inverter) var newinverter		=	req.body.inverter;
		if(req.body.nameplate) var newcapacity		=	req.body.nameplate;
		if(req.body.latitude) var newlatitude		=	req.body.latitude;
		if(req.body.longtitude) var newlongtitude 	=	req.body.longtitude;

		Machine.findOne({ userid : req.decoded.userid}, function(err,userr){
			// console.log(req.decoded.userid);
			if (err) throw err;

			if(newmail){
					// console.log('Inside newmail');

					Machine.findOne({_id : editUser},function(err,user){

						if (err) throw err;

						if (!user) {
								// console.log('sdsdsdsdsd');
								res.json({ success: false, message: 'No usereeee found'});
					} else {

						// console.log('Data upppppdateedddd');
						user.email = newmail;
						user.save(function(err){
							if (err){
								res.json({ success: false, message: 'Please enter valid email'});
								 // console.log(err);
							} else {

								res.json({success: true, message:'Mail has been updated'});
							}
						});
					}

					});
				}


				//address

				if(newaddress) {


					Machine.findOne({_id : editUser},function(err,user){

						if (err) throw err;

						if (!user) {

								res.json({ success: false, message: 'No user found'});
					} else {


						user.address = newaddress;
						user.save(function(err){
							if (err){

								 // console.log(err);
							} else {

								res.json({success: true, message:'Address has been updated'});
							}
						});
					}

					});

				}


				//install date

				if(newdate) {


					Machine.findOne({_id : editUser},function(err,user){

						if (err) throw err;

						if (!user) {

								res.json({ success: false, message: 'No user found'});
					} else {


						user.installdate = newdate;
						user.save(function(err){
							if (err){

								 // console.log(err);
							} else {

								res.json({success: true, message:'Date has been updated'});
							}
						});
					}

					});

				}

				//country code

				if(newcountry) {


					Machine.findOne({_id : editUser},function(err,user){

						if (err) throw err;

						if (!user) {

								res.json({ success: false, message: 'No user found'});
					} else {


						user.countrycode = newcountry;
						user.save(function(err){
							if (err){

								 // console.log(err);
							} else {

								res.json({success: true, message:'Country Code has been updated'});
							}
						});
					}

					});

				}


				//userid

				if(newuserid) {


					Machine.findOne({_id : editUser},function(err,user){

						if (err) throw err;

						if (!user) {

								res.json({ success: false, message: 'No user found'});
					} else {


						user.userid = newuserid;
						user.save(function(err){
							if (err){

								 // console.log(err);
							} else {

								res.json({success: true, message:'User ID has been updated'});
							}
						});
					}

					});

				}



				//INVERTER

				if(newinverter) {


					Machine.findOne({_id : editUser},function(err,user){

						if (err) throw err;

						if (!user) {

								res.json({ success: false, message: 'No user found'});
					} else {


						user.inverter = newinverter;
						user.save(function(err){
							if (err){

								 // console.log(err);
							} else {

								res.json({success: true, message:'Inverter has been updated'});
							}
						});
					}

					});

				}


				//NAME PLATE CAPACITY

				if(newcapacity) {


					Machine.findOne({_id : editUser},function(err,user){

						if (err) throw err;

						if (!user) {

								res.json({ success: false, message: 'No user found'});
					} else {


						user.nameplate = newcapacity;
						user.save(function(err){
							if (err){

								 // console.log(err);
							} else {

								res.json({success: true, message:'Nameplate Capacity has been updated'});
							}
						});
					}

					});

				}


				//LATITUDE

				if(newlatitude) {


					Machine.findOne({_id : editUser},function(err,user){

						if (err) throw err;

						if (!user) {

								res.json({ success: false, message: 'No user found'});
					} else {


						user.latitude = newlatitude;
						user.save(function(err){
							if (err){

								 // console.log(err);
							} else {

								res.json({success: true, message:'Latitude has been updated'});
							}
						});
					}

					});

				}


				//LONGTITUDE
				if(newlongtitude) {


					Machine.findOne({_id : editUser},function(err,user){

						if (err) throw err;

						if (!user) {

								res.json({ success: false, message: 'No user found'});
					} else {


						user.longtitude = newlongtitude;
						user.save(function(err){
							if (err){

								 // console.log(err);
							} else {

								res.json({success: true, message:'Longtitude has been updated'});
							}
						});
					}

					});

				}



			

		});
 
	});

	return router; 
}//importing to server file


