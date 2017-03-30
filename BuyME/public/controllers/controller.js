var myApp = angular.module("myApp", ['ngRoute']);

myApp.config([ '$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {  
        $routeProvider.when('/', {
            templateUrl : 'home_page/index.html',
            controller : 'homeCtrl'
        }) 
        $routeProvider.when('/login', {
            templateUrl : 'login/login.html',
            controller : 'loginCtrl'
        })
       $routeProvider.when('/dashboard', {
            templateUrl : 'user_profile/index.html',
            controller : 'profileCtrl'
        })
        $routeProvider.when('/registerUser',{
            templateUrl : 'register_form/index.html',
            controller: 'registerCtrl'
        })
        $routeProvider.when('/seller/reqproduct', {
            templateUrl : 'seller_request_products/index.html',
            controller : 'sellerReqCtrl'
        })
        $routeProvider.when('/admin/settings', {
            templateUrl : 'admin/settings/index.html',
            controller : 'adminSettingsTabCtrl'
        })
        $routeProvider.when('/seller/settings', {
            templateUrl : 'seller/settings/index.html',
            controller : 'sellerSettingsTabCtrl'
        })
        $routeProvider.when('/buyer/settings', {
            templateUrl : 'buyer/settings/index.html',
            controller : 'buyerSettingsTabCtrl'
        })
        $routeProvider.when('/transportProvider/settings', {
            templateUrl : 'transport_provider/settings/index.html',
            controller : 'transportProviderSettingsTabCtrl'
        })
        .otherwise({
            redirectTo : 'ind.html'
        });
        //$locationProvider.html5Mode(true); //Remove the '#' from URL.
    } 
]);

myApp.controller('appCtrl',['$scope','$http','$location',function ($scope,$http,$location) {
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
                $location.path("/login");
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
                     $location.path("/dashboard");
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
    
    $scope.getRegister = function(){
         $location.path("/registerUser");
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

myApp.controller('profileCtrl',['$scope','$window','$http',function($scope,$window,$http){
    console.log("hello from profileCtrl");
    
    $http({
        mehtod: 'GET',
        url: 'users/getUser',
        params: {user:angular.fromJson($window.localStorage.getItem('user'))._id, user_role:angular.fromJson($window.localStorage.getItem('user')).user_role }
    }).then(function successCallback(response){
        console.log(response);
        $scope.name = response.data.name;
        $scope.address = response.data.address;
        $scope.mobile_number = response.data.mobile_num;
    },function errorCallback(response){
        console.log(response);
    })
    
}]);

myApp.controller('homeCtrl',['$scope',function($scope){
    
}]);

myApp.controller('headerCtrl',['$scope','$location','$window',function($scope,$location,$window){
    $scope.getlogin = function(){
        $location.path("/login");
    }
    $scope.gethome = function(){
        $location.path("/");
    }
    $scope.getprofile = function(){
        $location.path("/dashboard");
    }
    
    $scope.logout = function(){
        $window.localStorage.removeItem('user');
        $window.localStorage.removeItem('id_token');
        $location.path("/login");
    }
    
}]);

myApp.controller('sellerReqCtrl',['$scope','$http',function($scope,$http){
  
    $scope.addproduct = function(){
        $http({
            method: 'POST',
            url: '/users/auth',
            data: $scope.product
        }).then(function successCallback(response) {
            console.log("success prodcut post");
        },function errorCallback(response) {
            
            console.log("ERr in product post");
            console.log(response);

        });
    }   
    
}]);

myApp.controller('adminAddTypeCtrl',['$scope','$http',function($scope,$http){
    $scope.type = {
        addproductType:function(){
        $http({
            method: 'POST',
            url: '/admins/addProductType',
            data: $scope.type
        }).then(function successCallback(response) {
            console.log("success prodcut post");
        },function errorCallback(response) {
            
            console.log("ERr in product post");
            console.log(response);

        });
    }   
    }
    
    
}]);

myApp.controller('userTabCtrl',['$scope','$window','$location',function($scope,$window,$location){
    if(angular.fromJson($window.localStorage.getItem('user')).user_role == 'admin'){
        $scope.onClickTab = function () {
            $location.path("/admin/settings");
        }
    }
    if(angular.fromJson($window.localStorage.getItem('user')).user_role == 'seller'){
        $scope.onClickTab = function () {
            $location.path("/seller/settings");
        }
    }
    if(angular.fromJson($window.localStorage.getItem('user')).user_role == 'buyer'){
        $scope.onClickTab = function () {
            $location.path("/buyer/settings");
        }
    }
    if(angular.fromJson($window.localStorage.getItem('user')).user_role == 'transport_provider'){
        $scope.onClickTab = function () {
            $location.path("/transportProvider/settings");
        }
    }
    
}]);

myApp.controller('adminSettingsTabCtrl',['$scope',function($scope){
     $scope.tabs = [{
            title: 'Add Product Types',
            url: 'addProductType.tpl.html'
        }, {
            title: 'Edit profile',
            url: 'Editprofile.tpl.html'
        
    }];

    $scope.currentTab = 'addProductType.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
}]);

myApp.controller('sellerSettingsTabCtrl',['$scope',function($scope){
     $scope.tabs = [{
            title: 'Add products',
            url: 'addProduct.tpl.html'
        }, {
            title: 'Edit profile',
            url: 'Editprofile.tpl.html'
        
    }];

    $scope.currentTab = 'addProduct.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
}]);

myApp.controller('buyerSettingsTabCtrl',['$scope',function($scope){
     $scope.tabs = [{
            
            title: 'Edit profile',
            url: 'EditProfile.tpl.html'
        
    }];

    $scope.currentTab = 'EditProfile.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
}]);

myApp.controller('transportProviderSettingsTabCtrl',['$scope',function($scope){
     $scope.tabs = [{
            
            title: 'Edit profile',
            url: 'EditProfile.tpl.html'
        
    }];

    $scope.currentTab = 'EditProfile.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
}]);