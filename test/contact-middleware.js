stubReq = require('req').stubForValidation
validateContact = require('../middlewares/contacts') 
const chai = require("chai");
const sinon = require("sinon");


 
        describe("Contacts validator", function () {
            req = null;

            beforeEach((done) => {
                function stubReq(r){
                    req = r;
                    done();

                }
                
            })            
            it('is invalid without name', async function (){

                    validateContact(req).should.be.false
                    req.validationErrors(true).email.msg.should.eql("you must complete the name")
            } )
            it('is invalid without email', async function (){

                validateContact(req).should.be.false
                req.validationErrors(true).email.msg.should.eql("you must complete the email")
            } )
            it('is valid with name and email', async function (){
                req.body.name = ' new contact name';
                req.body.email = ' new contact email';
                validateContact(req).should.be.true;

            } )


        
            
               
            })
        
      
        
    


const asyncErrorExpect = async (method, expectedError) => {
    let error = null;
    try {
        await method();
    } catch (err) {
        error = err;
    }
    expect(error).to.be.an('Error');
    if (expectedError) {
        if (error.msg)
            expect(error.msg).to.equal(expectedError.msg);
        else
            expect(error.message).to.equal(expectedError.msg);
        if (error.status) {
            expect(error.status).to.be.equal(expectedError.status);
        }
    }
}
