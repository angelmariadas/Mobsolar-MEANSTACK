angular.module('solarApp',['appRoutes','loginController','authServices','ngAnimate','regControllers','managementController','userServices'])

.config(function($httpProvider){

$httpProvider.interceptors.push('AuthInterceptors');

});



