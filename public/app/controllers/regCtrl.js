angular.module('regControllers',[])

.controller('regCtrl',function($http,$timeout,$location){

	var app = this;
	this.regMachine = function(regData){
		app.errorMsg = false;
		console.log('dsdasd');
		//console.log(this.regData);
		$http.post('api/register',this.regData).then(function(data){

			console.log(data.data.success);
			console.log(data.data.message);

			if(data.data.success){

	//app.loading = false;
	//create sucess msg
	app.successMsg = data.data.message;

	//Redirect to home page

	$timeout(function(){//just for page delay after creating user

		$location.path('/profile');

	},2000);
	
}
else{

	//app.loading = false;
	//create an error msg

	app.errorMsg = data.data.message;
}
		});
	};
});


