const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const newsRepo = require("../repositories/news");
const newsService = require("../services/news");

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
            const methodToCall = "getById"
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
                it('should return a novelty', async function () {
                    newsMockedRepo.expects(methodToCall).withExactArgs(validRepositoryResponse.id).returns(validRepositoryResponse);
                    const novelty = await newsService.getById(validRepositoryResponse.id)
                    expect(novelty).equal(validRepositoryResponse);
                });
                it('should throw not found error', async function () {
                    const stubResponse = undefined;
                    const newsId = 12;
                    newsMockedRepo.expects(methodToCall).once().withExactArgs(newsId).returns(stubResponse);
                    await asyncNotFoundError(() => newsService.getById(newsId), "Novelty not found.", 404)
                });
            })
            describe("Get all with pagination", function (){
                it('should return paginated novelty data', async function () {
                    const params = {
                        baseUrl: "http:/localhost/news",
                        page: 2,
                    }
                    newsMockedRepo.expects("count").returns(25);
                    newsMockedRepo.expects("getAll").returns([validRepositoryResponse]);
                    const novelty = await newsService.getAll(params)
                    expect(novelty.pages).to.be.greaterThan(1);
                    expect(novelty.data).to.be.an('Array');
                    expect(novelty.data).to.be.not.empty;
                    expect(novelty.prev).to.equal(`${params.baseUrl}?page=1`);
                    expect(novelty.next).to.equal(`${params.baseUrl}?page=3`);
                });
                it('should throw a invalid page error', async function () {
                    const params = {
                        baseUrl: "http:/localhost/news",
                        page: 2,
                    }
                    newsMockedRepo.expects("count").returns(10);
                    await asyncNotFoundError(() => newsService.getAll(params), "Parameter 'page' is out of range", 400)
                });
            })
        })
    });


const asyncNotFoundError = async (method, errorMessage, statusCode) => {
    let error = null;
    try {
        await method();
    } catch (err) {
        error = err;
    }
    expect(error).to.be.an('Error');
    if (errorMessage) {
        if (error.msg)
            expect(error.msg).to.equal(errorMessage);
        else
            expect(error.message).to.equal(errorMessage);
    }
    if (statusCode) {
        expect(error.status).to.be.equal(statusCode);
    }
}