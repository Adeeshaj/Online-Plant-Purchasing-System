var myApp = angular.module("myApp", ['ngRoute']);

myApp.config([ '$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {   
        $routeProvider.when('/', {
            templateUrl : 'login.html',
            controller : 'loginCtrl'
        })
       $routeProvider.when('/users/profile', {
            templateUrl : 'user_profile/index.html',
            controller : 'profileCtrl'
        }).otherwise({
            redirectTo : 'ind.html'
        });
        //$locationProvider.html5Mode(true); //Remove the '#' from URL.
    } 
]);

myApp.controller('appCtrl',['$scope','$http',function ($scope,$http) {
    console.log("hello from app controller");
    
    $scope.user = {
        addUser: function (user_role) {
            $scope.user.user_role = user_role;
            $http({
                method: 'POST',
                url: '/users/register',
                data: $scope.user
            }).then(function successCallback(response) {
                console.log(response);
   
             }, function errorCallback(response) {
                console.log("Err in post");
                console.log(response);
            });
            console.log($scope.user)
        }
    }
}]);

myApp.controller('loginCtrl',['$scope','$http','$window','$location',function($scope,$http,$window,$location){
    console.log("hello from loginCtrl");
    $scope.user = {
        login: function () {
            $http({
                method: 'POST',
                url: '/users/auth',
                data: $scope.user
            }).then(function successCallback(response) {
                console.log(response);
                var token = response.data.token;
                 $http({
                    method: 'GET',
                    url: '/users/profile',
                    headers:{
                        Content_Type: 'application/json',
                        Authorization: response.data.token
                    }
                }).then(function successCallback(response) {
                     console.log("success user get");
                     $window.localStorage.setItem('id_token',angular.toJson(token));
                     $window.localStorage.setItem('user',angular.toJson(response.data.user));
                     $location.path("/users/profile" );
                },function errorCallback(response) {
                    
                    console.log("ERr in get");
                    console.log(response);
                });
             }, function errorCallback(response) {
                console.log("Err in post");
                console.log(response);
            });
        }
    }
}]);

myApp.controller('registerCtrl',['$scope',function($scope){
    console.log("hello from registerCtrl");
    $scope.tabs = [{
            title: 'Buyer',
            url: 'buyer.tpl.html'
        }, {
            title: 'Seller',
            url: 'seller.tpl.html'
        }, {
            title: 'Transport provider',
            url: 'transport_provider.tpl.html'
        },{
            title: 'Admin',
            url: 'admin.tpl.html'
    }];

    $scope.currentTab = 'buyer.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
}]);

myApp.controller('profileCtrl',['$scope',function($scope){
    console.log("hello from profileCtrl");
    
    
}]);

