const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const inputValidation = require("../middlewares/news");
const {asyncValidation, getSpecificError} = require("./middleware-utils");

describe("News Middleware", () => {
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
    it('should validate and call next without args', async function () {
        // Correct Case
        params.req.body = {
            name: "NoveltyTitle",
            content: "Something Happen",
            categoryId: 1,
        }
        const error = await asyncValidation(params, inputValidation.inputValidation)
        expect(params.next.threw("BadRequestError")).to.be.false
        expect(params.next.alwaysCalledWith()).to.be.true

        expect(error).to.be.null
    })
    it('should throw error', async function () {
        /// Error case
        params.req.body = {
            content: "Something Happen",
            categoryId: 1,
        }
        const error = await asyncValidation(params, inputValidation.inputValidation)
        expect(params.next.threw("BadRequestError")).to.be.true
        expect(error.msg).to.equal("Input validation error")
    })
    it('should throw name length is too short error', async function () {
        params.req.body = {
            name: "No",
            content: "Something Happen",
            categoryId: 1,
        }
        const error = await asyncValidation(params, inputValidation.inputValidation)

        expect(params.next.threw("BadRequestError")).to.be.true
        expect(error.errors).to.be.an('array')

        const nameError = getSpecificError(error, "name");
        expect(nameError).to.be.an('object');
        expect(nameError.msg).to.equal("name must be between 3 to 255 characters long");
    })
})