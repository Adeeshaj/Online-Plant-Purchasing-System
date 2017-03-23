var myApp = angular.module("myApp", []);

myApp.controller('appCtrl',['$scope','$http',function ($scope,$http) {
    console.log("hello from controller");
    
    $scope.user = {
        addUser: function () {
            $http({
                method: 'POST',
                url: '/users/register',
                data: $scope.user
            }).then(function successCallback(response) {
                console.log(response);
                console.log("post /users/register success");
             }, function errorCallback(response) {
                console.log("Err in post");
                console.log(response);
            });
        }
    }
}]);

myApp.controller('loginCtrl',['$scope','$http',function($scope,$http){
    console.log("hello login");
    $scope.user = {
        login: function () {
            $http({
                method: 'POST',
                url: '/users/auth',
                data: $scope.user
            }).then(function successCallback(response) {
                console.log(response);
                console.log("post /users/auth success");
             }, function errorCallback(response) {
                console.log("Err in post");
                console.log(response);
            });
        }
    }
}])