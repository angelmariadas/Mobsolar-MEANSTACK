angular.module('appRoutes',['ngRoute'])


.config(function($routeProvider,$locationProvider){
	
	$routeProvider

	.when('/',{
		templateUrl:'app/views/pages/home.html'
	})

	.when('/profile',{
		templateUrl:'app/views/pages/profile.html'
	})

	.when('/register',{
		templateUrl:'app/views/pages/register.html',
		controller: 'regCtrl',
		controllerAs: 'register'
	})


	.when('/management',{
		templateUrl : 'app/views/pages/medit.html',
		controller :'managementCtrl',
		controllerAs:'management',
		authenticated : true,
		permission: true

	})


	.when('/edit/:id',{
		templateUrl : 'app/views/pages/edit.html',
		controller :'editCtrl',
		controllerAs:'edit',
		authenticated : true,
		permission: true

	})

	.when('/location',{

		templateUrl : 'app/views/pages/location.html',
		controller :'managementCtrl',
		controllerAs:'management'
	})

	.when('/logout',{

		templateUrl: 'app/views/pages/logout.html'
	})

	.otherwise({ redirectTo: '/'});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase:false
	});


});
