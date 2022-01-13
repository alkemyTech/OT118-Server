const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const {inputValidation} = require("../middlewares/news");
const {asyncValidation, getSpecificError} = require("./middleware-utils");

const errors = [
    {}
]

describe("News Middleware", () => {
    let params;
    const baseNovelty = {
        name: "Novelty",
        content: "Something Happen in day 2",
        categoryId: 1
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
    describe("General Validations", () => {
        it('should pass all validations', async function () {
            // Correct Case
            params.req.body = {...baseNovelty}
            const error = await asyncValidation(params, inputValidation)
            expect(params.next.threw("BadRequestError")).to.be.false
            expect(params.next.alwaysCalledWith()).to.be.true

            expect(error).to.be.null
        })
        it('should throw 3 validation errors', async function () {
            /// Error case
            params.req.body = {}

            const error = await asyncValidation(params, inputValidation)
            expect(params.next.threw("BadRequestError")).to.be.true
            expect(error.msg).to.equal("Input validation error")
            expect(error.errors.length).to.equal(3);
        })
    })
    describe("Name Validations", () => {
        const paramToValidate = "name"
        it(`should throw ${paramToValidate} is required`, async function () {
            params.req.body = {...baseNovelty}
            delete params.req.body.name;

            const error = await asyncValidation(params, inputValidation)
            genericExpectsError(paramToValidate, `${paramToValidate} must be not empty`, error, params.next)
        })
        it(`should throw ${paramToValidate} length is incorrect`, async function () {
            params.req.body = {...baseNovelty}
            params.req.body.name = "No";

            const error = await asyncValidation(params, inputValidation)
            genericExpectsError(paramToValidate, `${paramToValidate} must be between 3 to 255 characters long`, error, params.next)
        })
    });
    describe('Content Validation', function () {
        const paramToValidate = "content"
        it(`should throw ${paramToValidate} is required`, async function () {
            params.req.body = {...baseNovelty}
            delete params.req.body.content;

            const error = await asyncValidation(params, inputValidation)
            genericExpectsError(paramToValidate, `${paramToValidate} must be not empty`, error, params.next)
        })
        it(`should throw ${paramToValidate} length is incorrect`, async function () {
            params.req.body = {...baseNovelty}
            params.req.body.content = "Cont";

            const error = await asyncValidation(params, inputValidation)
            genericExpectsError(paramToValidate, `${paramToValidate} must at least 5 characters long`, error, params.next)
        })
    });
    describe('CategoryId Validation', function () {
        const paramToValidate = "categoryId"
        it(`should throw ${paramToValidate} is required`, async function () {
            params.req.body = {...baseNovelty}
            delete params.req.body.categoryId;

            const error = await asyncValidation(params, inputValidation)
            genericExpectsError(paramToValidate, `${paramToValidate} must be not empty`, error, params.next)
        })
        it(`should throw ${paramToValidate} must be an integer`, async function () {
            params.req.body = {...baseNovelty}
            params.req.body.categoryId = "NotAnNumber";

            const error = await asyncValidation(params, inputValidation)
            genericExpectsError(paramToValidate, `${paramToValidate} must be a valid integer value`, error, params.next)
        })
    });
})


const genericExpectsError = (parameter, msg, error, spy) => {
    expect(spy.threw("BadRequestError")).to.be.true
    expect(error.errors).to.be.an('array')

    const nameError = getSpecificError(error, parameter);
    expect(nameError).to.be.an('object');
    expect(nameError.msg).to.equal(msg);
}