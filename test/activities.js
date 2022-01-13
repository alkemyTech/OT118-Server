const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const activitiesRepo = require('../repositories/activities')


const expectedErrors = {
    activitiesNotFound: {msg: "Activity not found.", status: 404},
    paginationRange: {msg: "Parameter 'page' is out of range", status: 400},
    activitiesNotUpdated: {msg: "Activity couldn't be updated", status: 400}
}

describe("Activities Endpoint", function (){
    describe("Activities Service", function(){
        let activitiesMockRepository;
        const validActivity = {
            id: 1,
            name: "Nodesesperen is a team of developers backend",
            content: "Something Happen",
            image: "https://image.url.com",
            createdAt: "2021-12-22T13:44:07.000Z",
            updatedAt: "2021-12-27T13:39:29.000Z"
        };
        const activityToPost = {
            name: validActivity.name,
            content: validActivity.content,
            image: validActivity.image
        }
        beforeEach(() => {
            activitiesMockRepository = sinon.mock(activitiesRepo);
        })
        afterEach(() => {
            activitiesMockRepository.verify();
        });
        describe("Get By ID", function (){
            const methodToCall = "getById"
            it('should return a activity', async function () {
                activitiesMockRepository.expects(methodToCall).withExactArgs(validActivity.id).returns(validActivity);
                const activity = await activitiesRepo.getById(validActivity.id)
                expect(activity).equal(validActivity);
            });
            it('should throw activity not found error', async function () {
                const stubResponse = undefined;
                const activitiesId = 12;
                activitiesMockRepository.expects(methodToCall).once().withExactArgs(activitiesId).returns(stubResponse);
                asyncErrorExpect(() => activitiesRepo.getById(activitiesId), expectedErrors.activitiesNotFound)
            });
        })
        describe("Get all activities", function (){            
            it('should return all activities', async function(){
                activitiesMockRepository.expects("getAll").withExactArgs().returns(validActivity);
                asyncErrorExpect(() => activitiesRepo.getAll(),expectedErrors.activitiesNotFound)
            })
        })
        describe("Create new activity", function (){
            const methodToCall = "create";
            it("should create a new activity", function (){
                const actualActivityToCreate = {...activityToPost}
                activitiesMockRepository.expects(methodToCall).withExactArgs(actualActivityToCreate).returns(validActivity)
                const activity = activitiesRepo.create(activityToPost);
                expect(activity).equal(validActivity)
            })
        })        
        describe("Update Activity", function(){
            const methodToCall = "update";
            it("Should update a activity", async function (){
                activitiesMockRepository.expects(methodToCall).withExactArgs(validActivity.id).returns(true);
                await activitiesRepo.update(validActivity.id)
            })
            it("Should throw activity not found error", async function (){
                activitiesMockRepository.expects(methodToCall).withExactArgs(validActivity.id).returns(undefined);
                asyncErrorExpect(() => activitiesRepo.update(validActivity.id), expectedErrors.activitiesNotFound)
            })
        })
        
    })
})

const asyncErrorExpect = async(method, expectedError) => {
    let error = null
    try {
        await method()
    } catch(err) {
        error = err
    }
    expect(error).to.be.an('Error');
    if (expectedError) {
        if (error.msg) {
            expect(error.msg).to.equal(expectedError.msg);
        }else{
            expect(error.message).to.equal(expectedError.msg)
        }
        if (error.status){
            expect(error.status).to.be.equal(expectedError.status)
        }
    }
}