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
        .expect(200,done)
    })
})

describe("login",function(){
    it("give login page",function (done) {
        request(app).get('/#/login')
        .expect(200,done);
    })
})

describe("register",function () {
    it("give sign up page", function(done){
        request(app).get('/#/registerUser')
        .expect(200,done);
    })   
})