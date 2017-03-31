var request = require('supertest');
var app = require('../server.js');

describe("user profile page", function () {
    it("not give profile page details unless logged", function (done) {
        request(app).get('/users/profile')
        .expect(401)
        .expect("Unauthorized",done);
        
    })
})

describe("home page", function(){
    it("give home page details",function (done) {
        request(app).get('/')
        .expect(200)
        .expect('<html ng-app=\'myApp\'>\r\n<head>\r\n    <meta charset="utf-8">\r\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\r\n    <title>buy plant</title>\r\n    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">\r\n    \r\n</head>\r\n\r\n<body>\r\n    \r\n    <div class="row" ng-controller="headerCtrl">\r\n    <div class="col-md-12">\r\n        <nav class="navbar navbar-inverse">\r\n            <div class="container-fluid">\r\n                <div class="navbar-header">\r\n                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navcol-1">\r\n                        <span class="sr-only">Toggle navigation</span>\r\n                        <span class="icon-bar"></span>\r\n                        <span class="icon-bar"></span>\r\n                        <span class="icon-bar"></span>\r\n                    </button><a class="navbar-brand navbar-link" ng-click="gethome()">Buy Plant</a></div>\r\n                <div class="collapse navbar-collapse" id="navcol-1">\r\n                    <ul class="nav navbar-nav">\r\n                        <li role="presentation"><a ng-click="getlogin()">login </a></li>\r\n                        <li role="presentation"><a ng-click="getprofile()">profile</a></li>\r\n                        <li role="presentation"><a href="#">about us</a></li>\r\n                    </ul>\r\n                    <ul class="nav navbar-nav navbar-right">\r\n                        <li role="presentation"><a ng-click="logout()"> logout</a></li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </nav>\r\n        \r\n    </div>\r\n</div>\r\n    \r\n    <div ng-view></div>\r\n    \r\n    <script src="assets/js/jquery.min.js"></script>\r\n    <script src="assets/bootstrap/js/bootstrap.min.js"></script>\r\n    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.32/angular.min.js"> </script>\r\n    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular-route.js"></script>\r\n\r\n    <script src="controllers/controller.js"> </script>\r\n</body>\r\n</html>',done)
    })
})

