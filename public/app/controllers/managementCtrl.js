angular.module('managementController',[])

.controller('managementCtrl',function(Machine){

	var app =this;

	app.loading = true;
	app.errorMsg = false;

	function getUsers(){

		Machine.getdetails().then(function(data){
			// console.log('inside getusers'); 

		if(data.data.success){
			app.users = data.data.users;
			app.loading = false;

		} else {
			app.errorMsg = 'error occured';
			app.loading = false;
		}

	});

	}

	getUsers();

	app.deleteUser = function(userid){

		Machine.deleteUser(userid).then(function(data){
			if(data.data.success) {

				getUsers();

			} else {

				app.errorMsg = data.data.message;
			}

		});

	};


	app.locateUser = function(id){

		Machine.locateUser(id).then(function(data){

			// console.log('Inside Controller');
			// console.log(data);
			var lat = data.data.user.latitude;
			var long = data.data.user.longtitude;
			// console.log(lat);
			// console.log(long);
			var latLng = new google.maps.LatLng(lat, long);
			var map = new google.maps.Map(document.getElementById('locate'), {
							    zoom: 8,
							    center: latLng,
							    mapTypeId: google.maps.MapTypeId.ROADMAP
							  });
			var marker = new google.maps.Marker({
												    position: latLng,
												    map: map,
												    draggable: false
												  });
			marker.setAnimation(google.maps.Animation.BOUNCE);


			// var mapOptions = {
			// 			        zoom: 10,
			// 			        center: new google.maps.LatLng(lat, long),
			// 			        mapTypeId: google.maps.MapTypeId.ROADMAP,

			// 			    };
			 // var map = new google.maps.Map(document.getElementById('locate'), mapOptions)
		});




	};

})
.controller('editCtrl',function($scope,$routeParams,Machine,$timeout){

	var app =this;
	$scope.mailTab = 'active';
	app.phase1	= true;

	 Machine.getUser($routeParams.id).then(function(data){

		 	if (data.data.success) {
		 		
		 		$scope.newmail = data.data.user.email;
		 		$scope.newaddress		=	data.data.user.address;
		 		$scope.newdate			=	data.data.user.installdate;
		 		$scope.newcountry		=	data.data.user.countrycode;
		 		$scope.newuserid		=	data.data.user.userid;
		 		$scope.newinverter		=	data.data.user.inverter;
		 		$scope.newcapacity		=	data.data.user.nameplate;
		 		$scope.newlatitude		=	data.data.user.latitude;
		 		$scope.newlongtitude	=	data.data.user.longtitude;
		 		console.log('scopnewmail');
		 		console.log($scope.newmail);
		 		app.currentUser = data.data.user._id;
		 		
		 	} else {

		 		app.errorMsg = data.data.message;
		 	}

		 });




	app.mailPhase = function(){

		$scope.mailTab 			= 'active';
		$scope.addressTab		= 'default';
		$scope.dateTab 			= 'default';
		$scope.countryTab 		= 'default';
		$scope.useridTab 		= 'default';
		$scope.inverterTab 		= 'default';
		$scope.capacityTab 		= 'default';
		$scope.latitudeTab 		= 'default';
		$scope.longtitudeTab 	= 'default';
		app.phase1	= true;
		app.phase2	= false;
		app.phase3	= false;
		app.phase4	= false;
		app.phase5	= false;
		app.phase6	= false;
		app.phase7	= false;
		app.phase8	= false;
		app.phase9	= false;


	};


	app.addressPhase = function(){

		$scope.mailTab 			= 'default';
		$scope.addressTab 		= 'active';
		$scope.dateTab 			= 'default';
		$scope.countryTab 		= 'default';
		$scope.useridTab 		= 'default';
		$scope.inverterTab 		= 'default';
		$scope.capacityTab 		= 'default';
		$scope.latitudeTab 		= 'default';
		$scope.longtitudeTab 	= 'default';
		app.phase1	= false;
		app.phase2	= true;
		app.phase3	= false;
		app.phase4	= false;
		app.phase5	= false;
		app.phase6	= false;
		app.phase7	= false;
		app.phase8	= false;
		app.phase9	= false;

	};

	app.datePhase = function(){

		$scope.mailTab 			= 'default';
		$scope.addressTab		= 'default';
		$scope.dateTab 			= 'active';
		$scope.countryTab 		= 'default';
		$scope.useridTab 		= 'default';
		$scope.inverterTab 		= 'default';
		$scope.capacityTab 		= 'default';
		$scope.latitudeTab 		= 'default';
		$scope.longtitudeTab 	= 'default';
		app.phase1	= false;
		app.phase2	= false;
		app.phase3	= true;
		app.phase4	= false;
		app.phase5	= false;
		app.phase6	= false;
		app.phase7	= false;
		app.phase8	= false;
		app.phase9	= false;


	};

	app.countryPhase = function(){

		$scope.mailTab 			= 'default';
		$scope.addressTab		= 'default';
		$scope.dateTab 			= 'default';
		$scope.countryTab 		= 'active';
		$scope.useridTab 		= 'default';
		$scope.inverterTab 		= 'default';
		$scope.capacityTab 		= 'default';
		$scope.latitudeTab 		= 'default';
		$scope.longtitudeTab 	= 'default';
		app.phase1	= false;
		app.phase2	= false;
		app.phase3	= false;
		app.phase4	= true;
		app.phase5	= false;
		app.phase6	= false;
		app.phase7	= false;
		app.phase8	= false;
		app.phase9	= false;
	};


	app.useridPhase = function(){

		$scope.mailTab 			= 'default';
		$scope.addressTab		= 'default';
		$scope.dateTab 			= 'default';
		$scope.countryTab 		= 'default';
		$scope.useridTab 		= 'active';
		$scope.inverterTab 		= 'default';
		$scope.capacityTab 		= 'default';
		$scope.latitudeTab 		= 'default';
		$scope.longtitudeTab 	= 'default';
		app.phase1	= false;
		app.phase2	= false;
		app.phase3	= false;
		app.phase4	= false;
		app.phase5	= true;
		app.phase6	= false;
		app.phase7	= false;
		app.phase8	= false;
		app.phase9	= false;
	};

	app.inverterPhase = function(){

		$scope.mailTab 			= 'default';
		$scope.addressTab		= 'default';
		$scope.dateTab 			= 'default';
		$scope.countryTab 		= 'default';
		$scope.useridTab 		= 'default';
		$scope.inverterTab 		= 'active';
		$scope.capacityTab 		= 'default';
		$scope.latitudeTab 		= 'default';
		$scope.longtitudeTab 	= 'default';
		app.phase1	= false;
		app.phase2	= false;
		app.phase3	= false;
		app.phase4	= false;
		app.phase5	= false;
		app.phase6	= true;
		app.phase7	= false;
		app.phase8	= false;
		app.phase9	= false;
	};

	app.capacityPhase = function(){

		$scope.mailTab 			= 'default';
		$scope.addressTab		= 'default';
		$scope.dateTab 			= 'default';
		$scope.countryTab 		= 'default';
		$scope.useridTab 		= 'default';
		$scope.inverterTab 		= 'default';
		$scope.capacityTab 		= 'active';
		$scope.latitudeTab 		= 'default';
		$scope.longtitudeTab 	= 'default';
		app.phase1	= false;
		app.phase2	= false;
		app.phase3	= false;
		app.phase4	= false;
		app.phase5	= false;
		app.phase6	= false;
		app.phase7	= true;
		app.phase8	= false;
		app.phase9	= false;
	};

	app.latitudePhase = function(){

		$scope.mailTab 			= 'default';
		$scope.addressTab		= 'default';
		$scope.dateTab 			= 'default';
		$scope.countryTab 		= 'default';
		$scope.useridTab 		= 'default';
		$scope.inverterTab 		= 'default';
		$scope.capacityTab 		= 'default';
		$scope.latitudeTab 		= 'active';
		$scope.longtitudeTab 	= 'default';
		app.phase1	= false;
		app.phase2	= false;
		app.phase3	= false;
		app.phase4	= false;
		app.phase5	= false;
		app.phase6	= false;
		app.phase7	= false;
		app.phase8	= true;
		app.phase9	= false;
	};

	app.longtitudePhase = function(){

		$scope.mailTab 			= 'default';
		$scope.addressTab		= 'default';
		$scope.dateTab 			= 'default';
		$scope.countryTab 		= 'default';
		$scope.useridTab 		= 'default';
		$scope.inverterTab 		= 'default';
		$scope.capacityTab 		= 'default';
		$scope.latitudeTab 		= 'default';
		$scope.longtitudeTab 	= 'active';
		app.phase1	= false;
		app.phase2	= false;
		app.phase3	= false;
		app.phase4	= false;
		app.phase5	= false;
		app.phase6	= false;
		app.phase7	= false;
		app.phase8	= false;
		app.phase9	= true;

	};



	 app.updateMail	= function(newmail){

		//console.log('Inside update function');
		app.errorMsg = false;

		var userObject = {};

		if($scope.newmail== '' || $scope.newmail == null){

			$timeout(function(){
					app.errorMsg = 'Please ensure form is filled properly';

				},2000);

			

		
	} else{
		

		userObject._id = app.currentUser;
		userObject.mail = $scope.newmail;
		// console.log('scopnewmailooobjct');
		// console.log(userObject.mail);
		Machine.editUser(userObject).then(function(data){

			if(data.data.success){

					// console.log('sucess');
				app.mailForm.email.$setPristine();
				app.mailForm.email.$setUntouched();
				app.successMsg = data.data.message;
				$timeout(function(){
					app.successMsg =false;

				},2000);
			}else {
				app.errorMsg = data.data.message;
			}


		}); 
	}
		

	};



	//address

	app.updateAddress	= function(newaddress){

		// console.log('Inside update function');
		app.errorMsg = false;

		var userObject = {};

		if($scope.newaddress== '' || $scope.newaddress == null){

			$timeout(function(){
					app.errorMsg = 'Please ensure form is filled properly';

				},2000);

			

		
	} else{
		

		userObject._id = app.currentUser;
		userObject.address = $scope.newaddress;
		// console.log('scopnewmailooobjct');
		// console.log(userObject.address);
		Machine.editUser(userObject).then(function(data){

			if(data.data.success){

					// console.log('success');
				app.addressForm.address.$setPristine();
				app.addressForm.address.$setUntouched();
				app.successMsg = data.data.message;
				$timeout(function(){
					app.successMsg =false;

				},2000);
			}else {
				app.errorMsg = data.data.message;
			}


		}); 
	}
		

	};


//install date

app.updateDate	= function(newdate){

		console.log('Inside update function');
		app.errorMsg = false;

		var userObject = {};

		if($scope.newdate== '' || $scope.newdate == null){

			$timeout(function(){
					app.errorMsg = 'Please ensure form is filled properly';

				},2000);

			

		
	} else{
		

		userObject._id = app.currentUser;
		userObject.installdate = $scope.newdate;
		console.log('scopnewmailooobjct');
		console.log(userObject.installdate);
		Machine.editUser(userObject).then(function(data){

			if(data.data.success){

					console.log('success');
				// app.dateForm.installdate.$setPristine();
				// app.dateForm.installdate.$setUntouched();
				app.successMsg = data.data.message;
				$timeout(function(){
					app.successMsg =false;

				},2000);
			}else {
				app.errorMsg = data.data.message;
			}


		}); 
	}
		

	};


	//country code

app.updateCountry	= function(newcountry){

		console.log('Inside update function');
		app.errorMsg = false;

		var userObject = {};

		if($scope.newcountry== '' || $scope.newcountry == null){

			$timeout(function(){
					app.errorMsg = 'Please ensure form is filled properly';

				},2000);

			

		
	} else{
		

		userObject._id = app.currentUser;
		userObject.countrycode = $scope.newcountry;
		console.log('scopnewmailooobjct');
		console.log(userObject.countrycode);
		Machine.editUser(userObject).then(function(data){

			if(data.data.success){

					console.log('success');
				app.countryForm.countrycode.$setPristine();
				app.countryForm.countrycode.$setUntouched();
				app.successMsg = data.data.message;
				$timeout(function(){
					app.successMsg =false;

				},2000);
			}else {
				app.errorMsg = data.data.message;
			}


		}); 
	}
		

	};
	


	//userid

app.updateUserid	= function(newuserid){

		console.log('Inside update function');
		app.errorMsg = false;

		var userObject = {};

		if($scope.newuserid== '' || $scope.newuserid == null){

			$timeout(function(){
					app.errorMsg = 'Please ensure form is filled properly';

				},2000);

			

		
	} else{
		

		userObject._id = app.currentUser;
		userObject.userid = $scope.newuserid;
		console.log('scopnewmailooobjct');
		console.log(userObject.userid);
		Machine.editUser(userObject).then(function(data){

			if(data.data.success){

					console.log('success');
				app.useridForm.userid.$setPristine();
				app.useridForm.userid.$setUntouched();
				app.successMsg = data.data.message;
				$timeout(function(){
					app.successMsg =false;

				},2000);
			}else {
				app.errorMsg = data.data.message;
			}


		}); 
	}
		

	};




	//inverter

app.updateInverter	= function(newinverter){

		console.log('Inside update function');
		app.errorMsg = false;

		var userObject = {};

		if($scope.newinverter== '' || $scope.newinverter== null){

			$timeout(function(){
					app.errorMsg = 'Please ensure form is filled properly';

				},2000);

			

		
	} else{
		

		userObject._id = app.currentUser;
		userObject.inverter = $scope.newinverter;
		console.log('scopnewmailooobjct');
		console.log(userObject.inverter);
		Machine.editUser(userObject).then(function(data){

			if(data.data.success){

					console.log('success');
				app.inverterForm.inverter.$setPristine();
				app.inverterForm.inverter.$setUntouched();
				app.successMsg = data.data.message;
				$timeout(function(){
					app.successMsg =false;

				},2000);
			}else {
				app.errorMsg = data.data.message;
			}


		}); 
	}
		

	};




	//Nameplate Capacity

app.updateCapacity	= function(newcapacity){

		console.log('Inside update function');
		app.errorMsg = false;

		var userObject = {};

		if($scope.newcapacity== '' || $scope.newcapacity== null){

			$timeout(function(){
					app.errorMsg = 'Please ensure form is filled properly';

				},2000);

			

		
	} else{
		

		userObject._id = app.currentUser;
		userObject.nameplate = $scope.newcapacity;
		console.log('scopnewmailooobjct');
		console.log(userObject.nameplate);
		Machine.editUser(userObject).then(function(data){

			if(data.data.success){

					console.log('success');
				app.capacityForm.nameplate.$setPristine();
				app.capacityForm.nameplate.$setUntouched();
				app.successMsg = data.data.message;
				$timeout(function(){
					app.successMsg =false;

				},2000);
			}else {
				app.errorMsg = data.data.message;
			}


		}); 
	}
		

	};


	//Latitude

app.updateLatitude	= function(newlatitude){

		console.log('Inside update function');
		app.errorMsg = false;

		var userObject = {};

		if($scope.newlatitude == '' || $scope.newlatitude== null){

			$timeout(function(){
					app.errorMsg = 'Please ensure form is filled properly';

				},2000);

			

		
	} else{
		

		userObject._id = app.currentUser;
		userObject.latitude = $scope.newlatitude;
		console.log('scopnewmailooobjct');
		console.log(userObject.latitude);
		Machine.editUser(userObject).then(function(data){

			if(data.data.success){

					console.log('success');
				app.latitudeForm.latitude.$setPristine();
				app.latitudeForm.latitude.$setUntouched();
				app.successMsg = data.data.message;
				$timeout(function(){
					app.successMsg =false;

				},2000);
			}else {
				app.errorMsg = data.data.message;
			}


		}); 
	}
		

	};


	//Longtitude

app.updateLongtitude	= function(newlongtitude){

		console.log('Inside update function');
		app.errorMsg = false;

		var userObject = {};

		if($scope.newlongtitude == '' || $scope.newlongtitude== null){

			$timeout(function(){
					app.errorMsg = 'Please ensure form is filled properly';

				},2000);

			

		
	} else{
		

		userObject._id = app.currentUser;
		userObject.longtitude = $scope.newlongtitude;
		console.log('scopnewmailooobjct');
		console.log(userObject.longtitude);
		Machine.editUser(userObject).then(function(data){

			if(data.data.success){

					console.log('success');
				app.longtitudeForm.longtitude.$setPristine();
				app.longtitudeForm.longtitude.$setUntouched();
				app.successMsg = data.data.message;
				$timeout(function(){
					app.successMsg =false;

				},2000);
			}else {
				app.errorMsg = data.data.message;
			}


		}); 
	}
		

	};

});
