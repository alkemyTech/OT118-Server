const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const contactsRepo = require("../repositories/contacts");
const contactsService = require("../services/contacts");

// Common errors




describe("Contacts Endpoint",
    function () {
        let contactsMockedRepo;
        beforeEach(() => {
            contactsMockedRepo = sinon.mock(contactsRepo);
        })
        afterEach(() => {
            contactsMockedRepo.verify();
        });
        describe("Contacts Service", function () {
            const validRepositoryResponse = {
                id: 1,
                name: " santiago desimoni",
                phone: "3794-924556",
                email: "sandes@gmail.com",
                message: " necesito ayuda  con la ong",
                updatedAt: "2022-01-12T19:49:55.030Z",
                createdAt: "2022-01-12T19:49:55.030Z"
            };

            const validContact = {
                id: 1,
                name: " santiago desimoni",
                phone: "3794-924556",
                email: "sandes@gmail.com",
                message: " necesito ayuda  con la ong",
                updatedAt: "2022-01-12T19:49:55.030Z",
                createdAt: "2022-01-12T19:49:55.030Z"
            };
            const contactToPost = {
                name: validContact.name,
                phone: validContact.phone,
                email: validContact.email,
                message: validContact.message
            };
            describe("Get All ", function (){
                const methodToCall = "getAll"
                it('should return a list of contacts', async function () {
                    contactsMockedRepo.expects(methodToCall).returns(validRepositoryResponse);
                    const contact = await contactsService.getAll()
                    expect(contact).equal(validRepositoryResponse);
                });
               
            })
            describe("create a new Contact", function() {
                const methodToCall = "create" ; 
                it('should create a new contact', async function (){
                    const actualContactToCreate = {...contactToPost}
                    contactsMockedRepo.expects(methodToCall).withExactArgs(actualContactToCreate).returns(validContact);
                    const contact = await contactsService.create(contactToPost);
                    expect(contact).equal(validContact);
                });

                })




            })
      
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