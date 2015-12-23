var app = angular.module('ToWatch', ['ngRoute']);

app.controller('getUserCtrl', ['$routeParams', '$http', function ($routeParams, $http) {
	var ctrl = this;

	this.getUser = function () {
		$http.get('/user')
			.then(function success (res) {

			}, function error (res) {

			});
	};
}]);

app.controller('loginCtrl', ['$routeParams', '$http', function ($routeParams, $http) {
	var ctrl = this;

	this.login = function () {

	};
}]);

app.controller('signupCtrl', ['$routeParams', '$http', function ($routeParams, $http) {
	var ctrl = this;

	this.signup = function () {

	};
}]);

app.controller('searchCtrl', ['$routeParams', '$http', function ($routeParams, $http) {

}]);

app.controller('userCtrl', ['$routeParams', '$http', function ($routeParams, $http) {

}]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$locationProvider.html5Mod({ enabled: true });
	$routeProvider.
		when('/', {
			templateUrl: '/views/index.html',
			controller: 'getUserCtrl',
			controllerAs: 'ctrl'
		}).
		when('/signup', {
			templateUrl: '/views/signup.html',
			controller: 'signupCtrl',
			controllerAs: 'ctrl'
		}).
		when('/login', {
			templateUrl: '/views/login.html',
			controller: 'loginCtrl',
			controllerAs: 'ctrl'
		}).
		when('/search', {
			templateUrl: '/views/search.html',
			controller: 'searchCtrl',
			controllerAs: 'ctrl'
		}).
		when('/profile', {
			templateUrl: '/views/profile.html',
			controller: 'userCtrl',
			controllerAs: 'ctrl'
		}).
		when('/404', {
			templateUrl: '/views/404.html',
			controller: 'errorCtrl',
			controllerAs: 'ctrl'
		}).
		otherwise ({
			redirectTo: '/404'
		});
}]);