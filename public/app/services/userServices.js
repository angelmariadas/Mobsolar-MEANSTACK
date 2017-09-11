angular.module('userServices',[])

.factory('Machine',function($http){

userFactory = {};

userFactory.getdetails = function(){

return $http.get('/api/management/');
};

userFactory.getUser = function(id){

	return $http.get('/api/edit/' + id);

};


userFactory.deleteUser = function(userid){
	console.log('yess');
	console.log(userid); 

	return $http.delete('/api/management/' + userid);
};

userFactory.locateUser = function(id){

 console.log('enteres factory');
 return $http.post('/api/location/' + id);
};


userFactory.editUser = function(id){
	console.log('Inside factory');

	return $http.put('/api/edit', id);
};

return userFactory;


});