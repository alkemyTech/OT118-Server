const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const { validator } = require("../middlewares/pagination");
const { asyncValidation, getSpecificError } = require("./middleware-utils");

describe("Pagination Middleware", () => {
  let params;
  beforeEach(() => {
    params = {
      req: {},
      res: {},
      next: sinon.spy((err) => {
        if (err) throw err;
      }),
    };
  });
  it("should validate and call next without args", async () => {
    params.req.query = {};
    const error = await asyncValidation(params, validator);
    expect(params.next.threw("BadRequestError")).to.be.false;
    expect(params.next.alwaysCalledWith()).to.be.true;
    expect(error).to.be.null;
  });
  it("should throw page is not integer", async () => {
    params.req.query = { page: "aa" };
    const error = await asyncValidation(params, validator);
    expect(params.next.threw("BadRequestError")).to.be.true;
    expect(error.errors).to.be.an("array");
    const nameError = getSpecificError(error, "page");
    expect(nameError).to.be.an("object");
    expect(nameError.msg).to.equal(
      "Parameter 'page' must be an integer greater than zero"
    );
  });
  it("should throw page is not greater than zero", async () => {
    params.req.query = { page: 0 };
    const error = await asyncValidation(params, validator);
    expect(params.next.threw("BadRequestError")).to.be.true;
    expect(error.errors).to.be.an("array");
    const nameError = getSpecificError(error, "page");
    expect(nameError).to.be.an("object");
    expect(nameError.msg).to.equal(
      "Parameter 'page' must be an integer greater than zero"
    );
  });
});
