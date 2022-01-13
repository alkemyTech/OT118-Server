const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const inputValidation = require("../middlewares/contacts");
const{ asyncValidation, getSpecificError }= require("./middleware-utils");


 
        describe("Contacts validator", function () {
            let params;
            beforeEach(() => {
                params = {
                    req: {},
                    res: {},
                    next: sinon.spy((err) => {
                        if (err)
                            throw err
                    })
                }
            })

           
            it('is invalid without name', async function (){
                params.req.body = {
                    email:"sandesi@gmail.com",
                    phone: "3777-434344",
                    message: "message from contact name"
                    
                }
                const error = await asyncValidation(params, inputValidation)
                expect(params.next.threw("BadRequestError")).to.be.true
                expect(error.errors).to.be.an('array')
                
                const nameError = getSpecificError(error, "name");
                expect(nameError).to.be.an('object');
   
                expect(nameError.msg).to.equal("you must complete the name")
            } )
            it('is invalid without email', async function (){
                params.req.body = {
                    name: "contactName",
                    phone: "3777-434344",
                    message: "message from contact name"
                    
                }
                const error = await asyncValidation(params, inputValidation)
                expect(params.next.threw("BadRequestError")).to.be.true
                expect(error.errors).to.be.an('array')
                
                const namError = getSpecificError(error, "email");
                expect(namError).to.be.an('object');
                expect(namError.msg).to.equal("you must complete the email")
                
            } )
            it('is valid with name and email and call next', async function (){
                // Correct Case
                params.req.body = {
                    name: "contactName",
                    email: "Something@gmail.com",
                    phone: "3777-434344",
                    message: "message from contact name"
                    
                }
                    
                const error = await asyncValidation(params, inputValidation)
                expect(params.next.threw("BadRequestError")).to.be.false
                expect(params.next.alwaysCalledWith()).to.be.true
                expect(error).to.be.null
            } )


        
            
               
            })
        
      
        
    



