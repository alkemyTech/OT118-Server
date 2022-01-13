const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const activitiesRepo = require('../repositories/activities')
const activitiesService = require('../services/activities')


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

/* const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const newsRepository = require("../repositories/news");
const categoryRepository = require("../repositories/categories");

const newsService = require("../services/news");

const { newsCategoryName } = require('../config/config');

// Common errors
const expectedErrors = {
    newsNotFound: { msg: "Novelty not found.", status: 404 },
    categoryIdNotFound: { msg: "CategoryId not found.", status: 404 },
    paginationRange: { msg: "Parameter 'page' is out of range", status: 400 },
    noveltyNotUpdated: { msg: "Novelty couldn't be updated", status: 400 }
}



describe("News Endpoint",
    function () {
        describe("News Service", function () {
            let newsMockRepository;
            let categoryMockRepository;
            const validNovelty = {
                id: 3,
                name: "Romario was seen playing football",
                content: "Something Happen",
                image: "https://image.url.com",
                categoryId: 1,
                createdAt: "2021-12-22T13:44:07.000Z",
                updatedAt: "2021-12-27T13:39:29.000Z"
            };
            const noveltyToPost = {
                name: validNovelty.name,
                content: validNovelty.content,
                image: validNovelty.image,
                categoryId: validNovelty.categoryId
            };
            beforeEach(() => {
                newsMockRepository = sinon.mock(newsRepository);
            })
            afterEach(() => {
                newsMockRepository.verify();
            });
            describe("Get By ID", function () {
                const methodToCall = "getById"
                it('should return a novelty', async function () {
                    newsMockRepository.expects(methodToCall).withExactArgs(validNovelty.id).returns(validNovelty);
                    const novelty = await newsService.getById(validNovelty.id)
                    expect(novelty).equal(validNovelty);
                });
                it('should throw novelty not found error', async function () {
                    const stubResponse = undefined;
                    const newsId = 12;
                    newsMockRepository.expects(methodToCall).once().withExactArgs(newsId).returns(stubResponse);
                    await asyncErrorExpect(() => newsService.getById(newsId), expectedErrors.newsNotFound)
                });
            })
            describe("Create new novelty", function () {
                const methodToCall = "create";
                const categoryNews = {
                    id: 3,
                    name: "news",
                    image: "http://image.com",
                    description: "Description"
                }
                const getCategoryByName = "getByName";
                beforeEach(() => {
                    categoryMockRepository = sinon.mock(categoryRepository);
                })
                afterEach(() => {
                    categoryMockRepository.verify();
                });
                it('should create a new novelty', async function () {
                    const actualNoveltyToCreate = { ...noveltyToPost };

                    actualNoveltyToCreate.categoryId = categoryNews.id;
                    validNovelty.categoryId = categoryNews.id;

                    newsMockRepository.expects(methodToCall).withExactArgs(actualNoveltyToCreate).returns(validNovelty);
                    categoryMockRepository.expects(getCategoryByName).withExactArgs(newsCategoryName).returns(categoryNews)
                    const novelty = await newsService.create(noveltyToPost);
                    expect(novelty).equal(validNovelty);
                });
                it('should throw categoryId not found error', async function () {
                    categoryMockRepository.expects(getCategoryByName).withExactArgs(newsCategoryName).returns(undefined)
                    await asyncErrorExpect(() => newsService.create(validNovelty.id), expectedErrors.categoryIdNotFound)
                });
            })
            describe("Get all with pagination", function () {
                const params = {
                    baseUrl: "http:/localhost/news",
                    page: 2,
                }
                it('should return paginated novelty data', async function () {
                    const limit = 10;
                    const offset = (params.page - 1) * limit;

                    newsMockRepository.expects("count").returns(30);
                    newsMockRepository.expects("getAll").withExactArgs(limit, offset).returns([validNovelty]);

                    const novelty = await newsService.getAll(params)

                    expect(novelty.pages).to.be.greaterThan(1);
                    expect(novelty.data).to.be.an('Array');
                    expect(novelty.data).to.be.not.empty;
                    expect(novelty.prev).to.equal(`${params.baseUrl}?page=1`);
                    expect(novelty.next).to.equal(`${params.baseUrl}?page=3`);
                });
                it('should throw a invalid page error', async function () {
                    newsMockRepository.expects("count").returns(10);
                    await asyncErrorExpect(() => newsService.getAll(params), expectedErrors.paginationRange)
                });
            })
            describe("Delete Novelty", function () {
                const methodToCall = "remove";
                it('should delete a novelty', async function () {
                    newsMockRepository.expects(methodToCall).withExactArgs(validNovelty.id).returns(true);
                    await newsService.remove(validNovelty.id)
                });
                it('should throw novelty not found error', async function () {
                    newsMockRepository.expects(methodToCall).withExactArgs(validNovelty.id).returns(undefined);
                    await asyncErrorExpect(() => newsService.remove(validNovelty.id), expectedErrors.newsNotFound)
                });
            })
        })
    });


const asyncErrorExpect = async (method, expectedError) => {
    let error = null;
    try {
        await method();
    } catch (err) {
        error = err;
    }
    expect(error).to.be.an('Error');
    if (expectedError) {
        if (error.msg) expect(error.msg).to.equal(expectedError.msg);
        else expect(error.message).to.equal(expectedError.msg);
        if (error.status) {
            expect(error.status).to.be.equal(expectedError.status);
        }
    }
} */

