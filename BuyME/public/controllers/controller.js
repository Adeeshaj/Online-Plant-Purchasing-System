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
        $routeProvider.when('/buyer/buyProduct', {
            templateUrl : 'buyer/buy_product/index.html',
            controller : 'buyProductCtrl'
        })
        $routeProvider.when('/buyer/buy_product/cash', {
            templateUrl : 'buyer/payCash/index.html',
            controller : 'payCashCtrl'
        })
        $routeProvider.when('/buyer/buy_product/payPal', {
            templateUrl : ' buyer/paypal/index.html',
            controller : 'payPalCtrl'
        })
        $routeProvider.when('/home/flowers', {
            templateUrl : ' home_page/flowers.html',
            controller : 'flowerCtrl'
        })
        $routeProvider.when('/home/plants', {
            templateUrl : ' home_page/plants.html',
            controller : 'plantCtrl'
        })
        $routeProvider.when('/home/seeds', {
            templateUrl : ' home_page/seeds.html',
            controller : 'seedCtrl'
        })      
        .otherwise({
            redirectTo : 'error.html'
        });
     //   $locationProvider.html5Mode(true); //Remove the '#' from URL.
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
                window.alert("User Successfuly registered");
                $location.path("/login");
             }, function errorCallback(response) {
                console.log("Err in post");
                console.log(response);
 
            });
            console.log($scope.user);
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
                     window.alert("successfuly login to your profile");
                     $window.localStorage.setItem('id_token',angular.toJson(token));
                     $window.localStorage.setItem('user',angular.toJson(response.data.user));
                     $location.path("/dashboard");
                },function errorCallback(response) {
                    window.alert(response);
                    console.log("ERr in get");
                    console.log(response);
                });
             }, function errorCallback(response) {
                console.log("Err in post");
                console.log(response);
                window.alert(response);
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
    $scope.notifications = null;
        

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
        console.log("no user logged in");
        alert("you have not logged in");
        $window.location.href = '/#/login';
    });
    
    $http({
        mehtod: 'GET',
        url: 'users/getOrders',
       params: {user:angular.fromJson($window.localStorage.getItem('user'))._id, user_role:angular.fromJson($window.localStorage.getItem('user')).user_role }
     }).then(function successCallback(response){
        
        console.log({name: "order",res:response});
        $scope.orders = response.data;
        
    },function errorCallback(response){
        console.log(response);
        
    });
    
    if(angular.fromJson($window.localStorage.getItem('user')).user_role == 'admin'){
        $http({
        mehtod: 'GET',
        url: 'admins/getReqProducts',
       params: {user:angular.fromJson($window.localStorage.getItem('user'))._id, user_role:angular.fromJson($window.localStorage.getItem('user')).user_role }
     }).then(function successCallback(response){
        
        console.log({name: "products",res:response});
        $scope.notifications = response.data;
    },function errorCallback(response){
        console.log(response);       
    });
    }
    else{
        $scope.notifications = null;   
    }
    
    if(angular.fromJson($window.localStorage.getItem('user')).user_role == 'transport_provider'){
        $http({
        mehtod: 'GET',
        url: 'home/getSellerProducts'
     }).then(function successCallback(response){
        
        console.log({name: "products new",res:response});
        $scope.notifications = response.data.data;
    },function errorCallback(response){
        console.log(response);
        
    });
    }
    else{
        $scope.notifications = null;   
    }
    // $scope.verify = function(product){
    //      $http({
    //         method: 'POST',
    //         url: 'admins/verifyProduct',
    //         data: {product}
    //     }).then(function successCallback(response) {
           
    //         console.log(response);
    //         $window.location.href = '/#/dashboard';
    //     },function errorCallback(response) {
            
    //         console.log("ERr in product post");
    //         console.log(response);
            
    //     });
    // }
    
    // $scope.reject = function(product){
    //      $http({
    //         method: 'POST',
    //         url: 'admins/rejectProduct',
    //         data: {product}
    //     }).then(function successCallback(response) {
     
    //         console.log(response);
    //         $window.location.href = '/#/dashboard';
    //     },function errorCallback(response) {
            
    //         console.log("ERr in product post");
    //         console.log(response);
            
    //     });
    // }
        
    
}]);

myApp.controller('homeCtrl',['$scope','$http','$window',function($scope,$http,$window){
    $http({
        mehtod: 'GET',
        url: 'home/getproducts',
        params: {type: 'Flowers'}
        }).then(function successCallback(response){
            console.log(response.data);
            $scope.flowers = response.data.data;
            
        },function errorCallback(response){  
            console.log({message: "Error",response: response}); 
    });
    
    $http({
        mehtod: 'GET',
        url: 'home/getproducts',
        params: {type: 'Plants'}
        }).then(function successCallback(response){
            console.log(response.data);
            $scope.plants = response.data.data;
            
        },function errorCallback(response){  
            console.log({message: "Error",response: response}); 
    });
    
    $http({
        mehtod: 'GET',
        url: 'home/getproducts',
        params: {type: 'Seeds'}
        }).then(function successCallback(response){
            console.log(response.data);
            $scope.seeds = response.data.data;
            
        },function errorCallback(response){  
            console.log({message: "Error",response: response}); 
    });
    
    
    $scope.buyProduct = function(sellerProduct){
        $window.localStorage.setItem('seller_product', angular.toJson(sellerProduct));
        $window.location.href = '/#/buyer/buyProduct';
    }
    
    
    

}]);

myApp.controller('flowerCtrl',['$scope','$http','$window',function($scope,$http,$window){
     $http({
        mehtod: 'GET',
        url: 'home/getAllproducts',
        params: {type: 'Flowers'}
        }).then(function successCallback(response){
            console.log(response.data);
            $scope.flowers = response.data.data;
            
        },function errorCallback(response){  
            console.log({message: "Error",response: response}); 
    });
    
     $scope.buyProduct = function(sellerProduct){
        $window.localStorage.setItem('seller_product', angular.toJson(sellerProduct));
        $window.location.href = '/#/buyer/buyProduct';
    }
}]);

myApp.controller('plantCtrl',['$scope','$http','$window',function($scope,$http,$window){
     $http({
        mehtod: 'GET',
        url: 'home/getAllproducts',
        params: {type: 'Plants'}
        }).then(function successCallback(response){
            console.log(response.data);
            $scope.plants = response.data.data;
            
        },function errorCallback(response){  
            console.log({message: "Error",response: response}); 
    });
    
    $scope.buyProduct = function(sellerProduct){
        $window.localStorage.setItem('seller_product', angular.toJson(sellerProduct));
        $window.location.href = '/#/buyer/buyProduct';
    }
}]); 
myApp.controller('seedCtrl',['$scope','$http','$window',function($scope,$http,$window){
    $http({
        mehtod: 'GET',
        url: 'home/getAllproducts',
        params: {type: 'Seeds'}
        }).then(function successCallback(response){
            console.log(response.data);
            $scope.seeds = response.data.data;
            
        },function errorCallback(response){  
            console.log({message: "Error",response: response}); 
    });
    
    $scope.buyProduct = function(sellerProduct){
        $window.localStorage.setItem('seller_product', angular.toJson(sellerProduct));
        $window.location.href = '/#/buyer/buyProduct';
    }
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
        $window.localStorage.removeItem('seller_product');
        $location.path("/login");
    }
    
}]);

myApp.controller('sellerReqCtrl',['$scope','$http',function($scope,$http){
     console.log("hello from seller Req Ctrl");
     
    //drop down details get method
    $scope.selected = "Choose one"
     $http({
        mehtod: 'GET',
        url: 'sellers/getproducttypes'
    }).then(function successCallback(response){
        console.log(response.data);
        
        $scope.types = response.data;
       
        $scope.onClickTab = function (tab) {
            $scope.currentTab = tab.type;
            $scope.selected = tab.type;
            $scope.product.type = tab.type;
        }

        $scope.isActiveTab = function(tabUrl) {
            return tabUrl == $scope.currentTab;
        }
    },function errorCallback(response){
        console.log(response);
    });
    
    
    //submit the product
    $scope.addproduct = function(){
        $http({
            method: 'POST',
            url: 'sellers/requestProduct',
            data: $scope.product
        }).then(function successCallback(response) {
            console.log("success prodcut post");
            window.alert("product type request success");
            console.log(response);
        },function errorCallback(response) {
            
            console.log("ERr in product post");
            console.log(response);
            
        });
    }   
    
}]);

myApp.controller('sellerAddproductCtrl',['$scope','$http','$window',function($scope,$http,$window){
    //drop down details of product types get method
    $scope.selected = "Choose One"
    $http({
        mehtod: 'GET',
        url: 'sellers/getproducttypes'
    }).then(function successCallback(response){
        console.log(response.data);
        $scope.types = response.data;
       
        $scope.onClickTab = function (tab) {
            $scope.currentTab = tab.type;
            $scope.selected = tab.type;
            $scope.product = {type:tab.type};
        }

        $scope.isActiveTab = function(tabUrl) {
            return tabUrl == $scope.currentTab;
        }
    },function errorCallback(response){
        console.log(response);
    });
    //when click type combobox choose one appear in name combo box
    $scope.clickTypeBtn = function(){
        $scope.selectedName = "Choose One";
    }
    //drop down details of product names get method
    $scope.selectedName = "Choose One"
    $scope.clickNameBtn = function(){
        
        $http({
        mehtod: 'GET',
        url: 'sellers/getproductnames',
        params: {type:$scope.selected}
        }).then(function successCallback(response){
            console.log(response.data);
            $scope.names = response.data;
            
            $scope.onClickNamesTab = function(tab){
                $scope.currentNameTab = tab.name;
                $scope.selectedName = tab.name;
                $scope.product.name = tab.name;
            }
            
            $scope.isActiveNamesTab = function(tabUrl){
                return tabUrl == $scope.currentNameTab;
            }
        },function errorCallback(response){
            console.log(response);
        });

    }
      
    
    
    angular.fromJson($window.localStorage.getItem('user'))._id;
    //submit the product
    $scope.addproduct = function(){
        $http({
            method: 'POST',
            url: 'sellers/addProduct',
            data: {products:$scope.product,seller:angular.fromJson($window.localStorage.getItem('user'))._id}

        }).then(function successCallback(response) {
            console.log("success prodcut post");
            window.alert("your product added to the system");
            console.log(response);
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


// tab controlers in user settings 
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
        },{
            title: 'Request new Product',
            url: 'ReqeustNew.tpl.html'
       
        
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

myApp.controller('buyProductCtrl',['$scope','$window',function($scope,$window){
    $scope.product = angular.fromJson($window.localStorage.getItem('seller_product'));
    $scope.selected = "Choose one";
    $scope.methods=['Cash','Pay by Card'];
    
    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab;
        $scope.selected = tab;
        $scope.product.payment = tab;
    }

    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
    $scope.clickMethodBtn = function(){
        
    
    }
    
    $scope.buyNowbtn = function(quantity){

        if(angular.fromJson($window.localStorage.getItem('user')).user_role == 'buyer'){
            if(quantity < $scope.product.quantity){
                $scope.product.buyerQuantity = quantity;
                if($scope.selected == 'Cash'){
                    $window.localStorage.setItem('buyer_product',angular.toJson($scope.product));
                    $window.location.href = '/#/buyer/buy_product/cash';
                } 
                else if ($scope.selected == 'Pay by Card'){
                    $window.localStorage.setItem('buyer_product',angular.toJson($scope.product));
                    $window.location.href = '/#/buyer/buy_product/payPal';
                }
                else{
                    window.alert("Please add payment method");
                }
            }
            else{
                window.alert("seller have not enough stock");
            }
        }
        else{
            window.alert("you have to login as buyer for purchase");
            $window.location.href = '/#/login';
        }   
        
       
    }
}]);

myApp.controller('payCashCtrl',['$scope','$window','$http',function($scope,$window,$http){
    
    $scope.payment = angular.fromJson($window.localStorage.getItem('buyer_product')).buyerQuantity * angular.fromJson($window.localStorage.getItem('buyer_product')).price;
    var buyerProduct = angular.fromJson($window.localStorage.getItem('buyer_product'));
    var buyer = {
        buyerId: null,
        name: null,
        district: null,
        address: null,
        mobile_num: null
    }
    var seller = {
        sellerId: null,
        name: null,
        district: null,
        address: null,
        mobile_num: null
    }
    var product = {
        productId : buyerProduct._id,
        name: buyerProduct.name,
        type: buyerProduct.type,
        quantity: buyerProduct.buyerQuantity,
        price: buyerProduct.price
    }
    //get buyer info
     $http({
        mehtod: 'GET',
        url: 'users/getUser',
        params: {user:angular.fromJson($window.localStorage.getItem('user'))._id, user_role:'buyer' }
    }).then(function successCallback(response){
        buyer.buyerId = angular.fromJson($window.localStorage.getItem('user'))._id
        buyer.name = response.data.name
        buyer.district = response.data.district
        buyer.address = response.data.address
        buyer.mobile_num = response.data.mobile_num
       
    },function errorCallback(response){
        console.log(response);
        console.log("no user logged in");
        alert("you have not logged in");
    });
   
   //get seller info 
    $http({
        mehtod: 'GET',
        url: 'users/getUser',
        params: {user:buyerProduct.sellerID, user_role:'seller' }
    }).then(function successCallback(response){
        seller.sellerId = buyerProduct.sellerID
        seller.name = response.data.name
        seller.district = response.data.district
        seller.address = response.data.address
        seller.mobile_num = response.data.mobile_num
       
    },function errorCallback(response){
        console.log(response);
        console.log("no user logged in");
        alert("you have not logged in");
    });
    
    
    $scope.buy = function(){
        
        var order = {
           buyer: buyer,
           seller: seller,
           product: product
        }
        console.log(order);
        $http({
            method: 'POST',
            url: '/buyers/addOrder',
            data: {order}

        }).then(function successCallback(response) {
            console.log("success prodcut post");
            window.alert("your product added to the system");
            console.log(response);
        },function errorCallback(response) {
            
            console.log("ERr in product post");
            console.log(response);
            
        });
    }
}]);

myApp.controller('payPalCtrl',['$scope','$window',function($scope,$window){
    
}]);