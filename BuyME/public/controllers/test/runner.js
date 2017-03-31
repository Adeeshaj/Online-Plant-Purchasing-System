
var config = require('../../../config/database');
var mongoose = require('mongoose');
var User = require('../../../models/user');
var should = require('should');
var testUtils = require('../../../test/utils');

describe("User API", function () {
    var dummyUser, id;
    before(function (done) {
        mongoose.connect(config.testDB,function () {
            console.log('Connected to: '+ config.testDB);
        });
        
        dummyUser = new User({
            'username': 'User',
            'password' : '1234',
            'user_role' : 'buyer'
        });
            dummyUser.save(function (err,post) {
            if(err){
                
                console.log(err);
            }
            id = post._id;
        });
        done()
       
       
        
    });
    
    describe("Create User", function(){
        it("should create a new user", function(done){
             newUser = new User({
                'username': 'blaher',
                'password': '1234',
                'user_role': 'dummy'
            });
            
            var res = testUtils.responseValidator(200, function(user){
                user.should.have.property('username');
                user.username.should.equal('blaher');
                user.should.have.property('user_role');
                user.user_role.should.equal('dummy');
                user.should.have.property('password');
                console.log("Create user Describe");
                done();
            });
           
            User.addUser(newUser,res);       
        });
    });
    
    after(function(done){
        User.remove({},function(err){
            if(err){console.log(err)}
        })
        mongoose.disconnect(done);
    })
    
});

