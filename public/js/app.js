var app = angular.module('ToWatch', ['ngRoute', 'ngStorage']);

app.controller('storageCtrl', ['$scope', '$rootScope', '$localStorage', function ($scope, $rootScope, $localStorage, $sessionStorage) {
		$rootScope.$storage = $localStorage.$default({
			loggedIn: ""
		});
}]);

app.controller('getUserCtrl', ['$routeParams', '$http', function ($routeParams, $http) {
	var ctrl = this;

	$http.get('/users')
		.success(function (data) {
			ctrl.users = data.users;
		});
}]);

app.controller('loginCtrl', ['$routeParams', '$http', '$location', function ($routeParams, $http, $location) {
	var ctrl = this;

	this.login = function () {
		$http.post('/sessions', { user: ctrl.user })
			.success(function (data) {
				ctrl.loggedInUser = data.loggedInUser;
				console.log(ctrl.loggedInUser);
				$location.path('/users/' + ctrl.loggedInUser);
			});
	};
}]);

app.controller('signupCtrl', ['$routeParams', '$http', function ($routeParams, $http) {
	var ctrl = this;

	this.signup = function () {
		$http.post('/users', { user: ctrl.user })
			.success(function (data) {
				data.user;
			});
	};
}]);

app.controller('searchCtrl', ['$routeParams', '$http', '$scope', function ($routeParams, $http, $scope) {
	var ctrl = this;
	var searchResults;

	this.search = function () {
		$http({
		  method: 'GET',
		  url: 'http://www.omdbapi.com/?s=' + ctrl.searchString
		}).then(function successCallback(res) {
			    ctrl.searchResults = res.data.Search;
				console.log(ctrl.searchResults);
		  }, function errorCallback(res) {
		    	res.json({ message: "Search Error"});
		  });
	}

	this.addMovie = function (itemTitle, itemID, itemYear, itemImg) {
		var newItem = {};
		newItem.title = itemTitle;
		newItem.imdb = itemID;
		newItem.year = itemYear;
		newItem.img = itemImg;
		console.log(newItem);
	}
}]);

app.controller('userCtrl', ['$routeParams', '$http', '$scope', function ($routeParams, $http, $scope) {
	var ctrl = this;
	var userProfile = $routeParams.username;
	$http.get('/users/' + userProfile)
		.success(function (data) {
			ctrl.user = data.currentUser;
			console.log("User: ", data.currentUser);
		});
}]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$locationProvider.html5Mode({ enabled: true });
	$routeProvider.
		when('/', {
			templateUrl: 'views/index.html',
			controller: 'getUserCtrl',
			controllerAs: 'ctrl'
		}).
		when('/signup', {
			templateUrl: 'views/signup.html',
			controller: 'signupCtrl',
			controllerAs: 'ctrl'
		}).
		when('/login', {
			templateUrl: 'views/login.html',
			controller: 'loginCtrl',
			controllerAs: 'ctrl'
		}).
		when('/search', {
			templateUrl: 'views/search.html',
			controller: 'searchCtrl',
			controllerAs: 'ctrl'
		}).
		when('/users/:username', {
			templateUrl: 'views/profile.html',
			controller: 'userCtrl',
			controllerAs: 'ctrl'
		}).
		when('/404', {
			templateUrl: 'views/404.html',
			controller: 'errorCtrl',
			controllerAs: 'ctrl'
		}).
		otherwise ({
			redirectTo: '/404'
		});
}]);