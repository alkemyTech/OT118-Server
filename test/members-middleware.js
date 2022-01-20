const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const {inputValidation} = require("../middlewares/members");
const {asyncValidation, getSpecificError} = require("./middleware-utils");

describe("Members Middleware", () => {
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
            name: "Member name",
            image: "https://image.url.com",
        }
        const error = await asyncValidation(params, inputValidation);
        expect(params.next.threw("BadRequestError")).to.be.false;
        expect(params.next.alwaysCalledWith()).to.be.true;

        expect(error).to.be.null;
    })
    it('should throw error name is required', async function () {
        /// Error case
        params.req.body = {
            image: "https://image.url.com",
        }
        const error = await asyncValidation(params, inputValidation)
        expect(params.next.threw("BadRequestError")).to.be.true
        expect(error.msg).to.equal("Input validation error")
    })
    it('should throw image is required', async function () {
        params.req.body = {
            name: "Member name",
        }
        const error = await asyncValidation(params, inputValidation)

        expect(params.next.threw("BadRequestError")).to.be.true
        expect(error.errors).to.be.an('array')

        const nameError = getSpecificError(error, "image");
        expect(nameError.msg).to.equal("image is required");
    })
})