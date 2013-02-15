//Imports
//-------


//BDD style test support
var should = require('should');
//Rest framework for both server and client
//For this framework the client will be used
var restify = require('restify');
//Logging framework
var bunyan = require('bunyan');

//This creates a default json rest client
var client = restify.createJsonClient({
    //Base url for the client
    url: 'https://api.twitter.com',
    //this is specified by default from the `createJsonClient`
    accept: 'application/json',
    //this specifies the custom logger to use for the rest client
    log: bunyan.createLogger({
        name: 'restClient',
        stream: process.stdout
    })
});

//This is a test group that is called `test group a`
describe('Twitter profile tests', function() {
    //This is a sub test that is named get
    //It is preceded by a hash to indicate a sub test
    //This looks much beter when the test running prints out
    //its log.
    describe('#get user_timeline', function() {
        //The callback function `done` is added for asynchronous 
        //execution.  When this test is finished, `done` should be
        //called.  Mocha will wait until it is complete before moving 
        //onto the next test.
        it('should get a value back from a resource', function(done) {
            
            //makes a GET against the base url and the provided path
            //The callback `err` will be null if the call fails, not if
            //the status code is returned indicating failure
            //The obj defaults to `{}` unless something is returned from
            //the resource.
            client.get('/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=jpgreenwald&count=1', function(err, req, res, obj) {
                //Using should we test the existence of `err`.
                //If it exists an error will be thrown
                should.not.exist(err);

                //The assertion is made that the response status 
                //equals `200`
                res.statusCode.should.equal(200);
                
                //This asserts that obj is defined
                should.exist(obj);

                //This asserts that obj is not the default response
                obj.should.not.equal({});
                //we call done because the call is finished
                done();
            });
        })
    });
});
