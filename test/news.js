const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const newsRepo = require("../repositories/news");
const newsService = require("../services/news");

describe("News Endpoint",
    function () {
        describe("GET /news/:id", function () {
            let newsSinonGetById;
            before(() => {
                newsSinonGetById = sinon.stub(newsRepo, "getById");
            })
            after(() => {
                newsSinonGetById.resetBehavior();
            })
            it('should return a novelty', async function () {
                const mockObject = {
                    id: 3,
                    name: "Romario was seen playing football",
                    content: "Something Happen",
                    image: "https://image.url.com",
                    categoryId: 1,
                    createdAt: "2021-12-22T13:44:07.000Z",
                    updatedAt: "2021-12-27T13:39:29.000Z"
                }
                newsSinonGetById.returns(mockObject);
                const novelty = await newsService.getById(mockObject.id)
                expect(newsSinonGetById.calledOnce).to.be.true;
                expect(novelty.id).to.equal(mockObject.id);
                expect(novelty.name).to.equal(mockObject.name);
                expect(novelty.content).to.equal(mockObject.content);
                expect(novelty.categoryId).to.equal(mockObject.categoryId);
                expect(novelty.createdAt).to.equal(mockObject.createdAt);
                expect(novelty.updatedAt).to.equal(mockObject.updatedAt);
            });
            it('should throw not found error', async function () {
                const stub = undefined;
                newsSinonGetById.returns(stub)
                await asyncNotFoundError(() => newsService.getById(), "Novelty not found.", 404)
            });
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
        expect(error.message).to.equal(errorMessage);
    }
    if (statusCode) {
        expect(error.status).to.be.equal(statusCode);
    }
}