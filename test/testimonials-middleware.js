const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const { inputValidation } = require("../middlewares/testimonials");
const { asyncValidation, getSpecificError } = require("./middleware-utils");
const longText = require('./longtext')

describe("Testimonials Middleware", () => {
  let params;
  const baseTestimonial = {
    name: "Testimonial",
    content: "Content",
    image: "https://image.url.com",
  };

  beforeEach(() => {
    params = {
      req: {},
      res: {},
      next: sinon.spy((err) => {
        if (err) throw err;
      }),
    };
  });
  it("should validate and call next without args", async function () {
    params.req.body = { ...baseTestimonial };
    const error = await asyncValidation(params, inputValidation);
    expect(params.next.threw("BadRequestError")).to.be.false;
    expect(params.next.alwaysCalledWith()).to.be.true;

    expect(error).to.be.null;
  });
  it("should throw validation errors", async function () {
    params.req.body = {};
    const error = await asyncValidation(params, inputValidation);
    expect(params.next.threw("BadRequestError")).to.be.true;
    expect(error.msg).to.equal("Input validation error");
  });
  it("should throw name length is too short", async function () {
    params.req.body = { ...baseTestimonial };
    params.req.body.name = "No";

    const error = await asyncValidation(params, inputValidation);

    expect(params.next.threw("BadRequestError")).to.be.true;
    expect(error.errors).to.be.an("array");

    const nameError = getSpecificError(error, "name");
    expect(nameError).to.be.an("object");
    expect(nameError.msg).to.equal(
      "name must be between 3 to 255 characters long"
    );
  });
  it("should throw name length is too long", async function () {
    params.req.body = { ...baseTestimonial };
    params.req.body.name = longText.longtext_1240;

    const error = await asyncValidation(params, inputValidation);

    expect(params.next.threw("BadRequestError")).to.be.true;
    expect(error.errors).to.be.an("array");

    const nameError = getSpecificError(error, "name");
    expect(nameError).to.be.an("object");
    expect(nameError.msg).to.equal(
      "name must be between 3 to 255 characters long"
    );
  });
  it("should throw content length is too short", async function () {
    params.req.body = { ...baseTestimonial };
    params.req.body.content = "Cont";

    const error = await asyncValidation(params, inputValidation);

    expect(params.next.threw("BadRequestError")).to.be.true;
    expect(error.errors).to.be.an("array");

    const nameError = getSpecificError(error, "content");
    expect(nameError).to.be.an("object");
    expect(nameError.msg).to.equal("content must at least 5 characters long");
  });
  it("should throw image length is too short", async function () {
    params.req.body = { ...baseTestimonial };
    params.req.body.image = "ht";

    const error = await asyncValidation(params, inputValidation);

    expect(params.next.threw("BadRequestError")).to.be.true;
    expect(error.errors).to.be.an("array");

    const nameError = getSpecificError(error, "image");
    expect(nameError).to.be.an("object");
    expect(nameError.msg).to.equal(
      "image must be between 3 to 1234 characters long"
    );
  });
  it("should throw image length is too long", async function () {
    params.req.body = { ...baseTestimonial };
    params.req.body.image = longText.longtext_1240

    const error = await asyncValidation(params, inputValidation);

    expect(params.next.threw("BadRequestError")).to.be.true;
    expect(error.errors).to.be.an("array");

    const nameError = getSpecificError(error, "image");
    expect(nameError).to.be.an("object");
    expect(nameError.msg).to.equal(
      "image must be between 3 to 1234 characters long"
    );
  });
});
