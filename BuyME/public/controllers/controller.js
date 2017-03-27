var myApp = angular.module("myApp", []);

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
                console.log("post /users/register success");
             }, function errorCallback(response) {
                console.log("Err in post");
                console.log(response);
            });
            console.log($scope.user)
        }
    }
}]);

myApp.controller('loginCtrl',['$scope','$http',function($scope,$http){
    console.log("hello from loginCtrl");
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