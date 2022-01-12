const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const newsRepo = require("../repositories/news");
const newsService = require("../services/news");

// Common errors
const expectedErrors = {
    newsNotFound: { msg: "Novelty not found.", status: 404},
    categoryIdNotFound: { msg: "CategoryId not found.", status: 404},
    paginationRange:{ msg: "Parameter 'page' is out of range", status: 400 },
    noveltyNotUpdated: { msg: "Novelty couldn't be updated", status: 400 }
}



describe("News Endpoint",
    function () {
        let newsMockedRepo;
        beforeEach(() => {
            newsMockedRepo = sinon.mock(newsRepo);
        })
        afterEach(() => {
            newsMockedRepo.verify();
        });
        describe("News Service", function () {
            const validRepositoryResponse = {
                id: 3,
                name: "Romario was seen playing football",
                content: "Something Happen",
                image: "https://image.url.com",
                categoryId: 1,
                createdAt: "2021-12-22T13:44:07.000Z",
                updatedAt: "2021-12-27T13:39:29.000Z"
            };
            describe("Get By ID", function (){
                const methodToCall = "getById"
                it('should return a novelty', async function () {
                    newsMockedRepo.expects(methodToCall).withExactArgs(validRepositoryResponse.id).returns(validRepositoryResponse);
                    const novelty = await newsService.getById(validRepositoryResponse.id)
                    expect(novelty).equal(validRepositoryResponse);
                });
                it('should throw not found error', async function () {
                    const stubResponse = undefined;
                    const newsId = 12;
                    newsMockedRepo.expects(methodToCall).once().withExactArgs(newsId).returns(stubResponse);
                    await asyncErrorExpect(() => newsService.getById(newsId), expectedErrors.newsNotFound)
                });
            })
            describe("Get all with pagination", function (){
                const params = {
                    baseUrl: "http:/localhost/news",
                    page: 2,
                }
                it('should return paginated novelty data', async function () {
                    const limit = 10;
                    const offset = (params.page-1) * limit;

                    newsMockedRepo.expects("count").returns(30);
                    newsMockedRepo.expects("getAll").withExactArgs(limit,offset).returns([validRepositoryResponse]);

                    const novelty = await newsService.getAll(params)

                    expect(novelty.pages).to.be.greaterThan(1);
                    expect(novelty.data).to.be.an('Array');
                    expect(novelty.data).to.be.not.empty;
                    expect(novelty.prev).to.equal(`${params.baseUrl}?page=1`);
                    expect(novelty.next).to.equal(`${params.baseUrl}?page=3`);
                });
                it('should throw a invalid page error', async function () {
                    newsMockedRepo.expects("count").returns(10);
                    await asyncErrorExpect(() => newsService.getAll(params), expectedErrors.paginationRange)
                });
            })
            describe("Delete Novelty", function (){
                const methodToCall = "remove";
                it('should delete a novelty', async function () {
                    newsMockedRepo.expects(methodToCall).withExactArgs(validRepositoryResponse.id).returns(true);
                    await newsService.remove(validRepositoryResponse.id)
                });
                it('should throw not found error', async function () {
                    newsMockedRepo.expects(methodToCall).withExactArgs(validRepositoryResponse.id).returns(undefined);
                    await asyncErrorExpect(() => newsService.remove(validRepositoryResponse.id), expectedErrors.newsNotFound)
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
        if (error.msg)
            expect(error.msg).to.equal(expectedError.msg);
        else
            expect(error.message).to.equal(expectedError.msg);
        if (error.status) {
            expect(error.status).to.be.equal(expectedError.status);
        }
    }
}