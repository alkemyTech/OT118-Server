const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const {validationFields} = require("../middlewares/activities");
const {asyncValidation, getSpecificError} = require("./middleware-utils");

describe("Activities middleware", () => {
    let params;
    const baseActivity = {
            name: "Activity name",
            content: "Something Happen in day 2"
        }
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
        params.req.body = {...baseActivity}
        const error = await asyncValidation(params, validationFields);
        expect(params.next.threw("BadRequestError")).to.be.false;
        expect(params.next.alwaysCalledWith()).to.be.true;

        expect(error).to.be.null;
    })
    it('should throw error name is required', async function () {
        params.req.body = {
            image: "https://image.url.com",
        }
        const error = await asyncValidation(params, validationFields)
        expect(params.next.threw("BadRequestError")).to.be.true
        expect(error.msg).to.equal("Input validation error")
    })
})