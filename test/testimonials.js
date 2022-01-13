const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const testimonialRepository = require("../repositories/testimonials");

const testimonialsService = require("../services/testimonials");

const expectedErrors = {
  testimonialNotFound: { msg: "Testimonial not found.", status: 404 },
  paginationRange: { msg: "Parameter 'page' is out of range", status: 400 },
};

describe("Testimonials endpoint", () => {
  describe("Testimonials service", () => {
    let testimonialMockRepository;
    const validTestimonial = {
      id: 7,
      name: "Testimonial",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur tempore a veniam?",
      image: "https://image.url.com",
      updatedAt: "2022-01-12T21:41:24.148Z",
      createdAt: "2022-01-12T21:41:24.148Z",
    };
    const validTestimonialToPost = {
      name: validTestimonial.name,
      content: validTestimonial.content,
      image: validTestimonial.image,
    };
    beforeEach(() => {
      testimonialMockRepository = sinon.mock(testimonialRepository);
    });
    afterEach(() => {
      testimonialMockRepository.verify();
    });
    describe("Get testimonial by id", () => {
      const methodToCall = "getById";
      it("should return a testimonial", async () => {
        testimonialMockRepository
          .expects(methodToCall)
          .withExactArgs(validTestimonial.id)
          .returns(validTestimonial);
        const testimonial = await testimonialsService.getById(
          validTestimonial.id
        );
        expect(testimonial).equal(validTestimonial);
      });
      it("should throw testimonial not found error", async () => {
        const stubResponse = undefined;
        const testimonialId = 12;
        testimonialMockRepository
          .expects(methodToCall)
          .once()
          .withExactArgs(testimonialId)
          .returns(stubResponse);
        await asyncErrorExpect(
          () => testimonialsService.getById(testimonialId),
          { msg: "Testimonial not found.", status: 404 }
        );
      });
    });
    describe("Get all testimonials with pagination", () => {
      const params = {
          baseUrl: "http:/localhost:3000/testimonials",
          page: 1,
        },
        limit = 10,
        maxPage = 3;
      let testimonialsCount = 30;
      it("should return the first page", async () => {
        const offset = (params.page - 1) * limit;
        testimonialMockRepository.expects("count").returns(testimonialsCount);
        testimonialMockRepository
          .expects("getAll")
          .withExactArgs(limit, offset)
          .returns([validTestimonial]);

        const testimonial = await testimonialsService.getAll(params);

        expect(testimonial.pages).to.be.greaterThan(1);
        expect(testimonial.data).to.be.an("Array");
        expect(testimonial.data).to.be.not.empty;
        expect(testimonial.prev).to.equal(null);
        expect(testimonial.next).to.equal(
          `${params.baseUrl}?page=${params.page + 1}`
        );
        expect(testimonial.pages).to.equal(maxPage);
      });
      it("should return paginated testimonial data", async () => {
        params.page = 2;
        const offset = (params.page - 1) * limit;
        testimonialMockRepository.expects("count").returns(testimonialsCount);
        testimonialMockRepository
          .expects("getAll")
          .withExactArgs(limit, offset)
          .returns([validTestimonial]);

        const testimonial = await testimonialsService.getAll(params);

        expect(testimonial.pages).to.be.greaterThan(1);
        expect(testimonial.data).to.be.an("Array");
        expect(testimonial.data).to.be.not.empty;
        expect(testimonial.prev).to.equal(
          `${params.baseUrl}?page=${params.page - 1}`
        );
        expect(testimonial.next).to.equal(
          `${params.baseUrl}?page=${params.page + 1}`
        );
        expect(testimonial.pages).to.equal(maxPage);
      });
      it("should return the last page", async () => {
        params.page = 3;
        const offset = (params.page - 1) * limit;
        testimonialMockRepository.expects("count").returns(testimonialsCount);
        testimonialMockRepository
          .expects("getAll")
          .withExactArgs(limit, offset)
          .returns([validTestimonial]);

        const testimonial = await testimonialsService.getAll(params);

        expect(testimonial.pages).to.be.greaterThan(1);
        expect(testimonial.data).to.be.an("Array");
        expect(testimonial.data).to.be.not.empty;
        expect(testimonial.prev).to.equal(
          `${params.baseUrl}?page=${params.page - 1}`
        );
        expect(testimonial.next).to.equal(null);
        expect(testimonial.pages).to.equal(maxPage);
      });
      it("should throw a invalid page error", async () => {
        params.page = 4;
        testimonialMockRepository.expects("count").returns(testimonialsCount);
        await asyncErrorExpect(() => testimonialsService.getAll(params), {
          msg: "Parameter 'page' is out of range",
          status: 400,
        });
      });
    });
    describe("Create testimonial", () => {
      const methodToCall = "create";
      it("should create a new testimonial", async () => {
        testimonialMockRepository
          .expects(methodToCall)
          .withExactArgs(validTestimonialToPost)
          .returns(validTestimonial);
        const testimonial = await testimonialsService.create(
          validTestimonialToPost
        );
        expect(testimonial).equal(validTestimonial);
      });
    });
    describe("Update testimonial", () => {
      const methodToCall = "update";
      validTestimonialToPost.content = "Testimonial updated";
      validTestimonial.content = "Testimonial updated";
      it("should update a testimonial", async () => {
        testimonialMockRepository
          .expects("getById")
          .twice()
          .returns(validTestimonial);
        testimonialMockRepository
          .expects(methodToCall)
          .withExactArgs(validTestimonial.id, validTestimonialToPost)
          .returns(validTestimonial);
        const testimonial = await testimonialsService.update(
          validTestimonial.id,
          validTestimonialToPost
        );
        expect(testimonial).equal(validTestimonial);
      });
      it("should throw testimonial not found error", async () => {
        const stubResponse = undefined;
        const testimonialId = 12;
        testimonialMockRepository
          .expects("getById")
          .once()
          .withExactArgs(testimonialId)
          .returns(stubResponse);
        await asyncErrorExpect(
          () =>
            testimonialsService.update(testimonialId, validTestimonialToPost),
          expectedErrors.testimonialNotFound
        );
      });
    });
    describe("Delete testimonial", () => {
      const methodToCall = "remove";
      it("should delete a testimonial", async () => {
        testimonialMockRepository
          .expects(methodToCall)
          .withExactArgs(validTestimonial.id)
          .returns(1);
        await testimonialsService.remove(validTestimonial.id);
      });
      it("should throw testimonial not found error", async () => {
        testimonialMockRepository
          .expects(methodToCall)
          .withExactArgs(validTestimonial.id)
          .returns(0);
        await asyncErrorExpect(
          () => testimonialsService.remove(validTestimonial.id),
          expectedErrors.testimonialNotFound
        );
      });
    });
  });
});

const asyncErrorExpect = async (method, expectedError) => {
  let error = null;
  try {
    await method();
  } catch (err) {
    error = err;
  }
  expect(error).to.be.an("Error");
  if (expectedError) {
    if (error.msg) expect(error.msg).to.equal(expectedError.msg);
    else expect(error.message).to.equal(expectedError.msg);
    if (error.status) {
      expect(error.status).to.be.equal(expectedError.status);
    }
  }
};
