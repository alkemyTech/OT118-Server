const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const newsRepository = require("../repositories/news");
const categoryRepository = require("../repositories/categories");
const newsService = require("../services/news");
const aws3 = require("../modules/s3");
const {newsCategoryName} = require('../config/config');

// Common errors

const expectedErrors = {
    newsNotFound: { msg: "Novelty not found.", status: 404},
    categoryIdNotFound: { msg: "CategoryId not found.", status: 404},
    paginationRange:{ msg: "Parameter 'page' is out of range", status: 400 },
    noveltyNotUpdated: { msg: "Novelty couldn't be updated", status: 400 },
    fileIsNotAValidImage: { msg: "File must be a valid image", status: 400 }
}

describe("News Endpoint",
    function () {
        describe("News Service", function () {
            let newsMockRepository;
            let categoryMockRepository;
            const validNovelty = {
                id: 3,
                name: "Romario was seen playing football",
                content: "Something Happen",
                image: "https://image.url.com",
                categoryId: 1,
                createdAt: "2021-12-22T13:44:07.000Z",
                updatedAt: "2021-12-27T13:39:29.000Z"
            };
            const noveltyToPost = {
                name: validNovelty.name,
                content: validNovelty.content,
                categoryId: validNovelty.categoryId
            };
            beforeEach(() => {
                newsMockRepository = sinon.mock(newsRepository);
            })
            afterEach(() => {
                newsMockRepository.verify();
            });
            describe("Get By ID", function (){
                const methodToCall = "getById"
                it('should return a novelty', async function () {
                    newsMockRepository.expects(methodToCall).withExactArgs(validNovelty.id).returns(validNovelty);
                    const novelty = await newsService.getById(validNovelty.id)
                    expect(novelty).equal(validNovelty);
                });
                it('should throw novelty not found error', async function () {
                    const stubResponse = undefined;
                    const newsId = 12;
                    newsMockRepository.expects(methodToCall).once().withExactArgs(newsId).returns(stubResponse);
                    await asyncErrorExpect(() => newsService.getById(newsId), expectedErrors.newsNotFound)
                });
            })
            describe("Create new novelty", function (){
                let awsS3Mock;
                const methodToCall = "create";
                const methodToCallAws = "uploadToBucket";
                const categoryNews = {
                    id: 3,
                    name: "news",
                    image: "http://image.com",
                    description: "Description"
                }
                const getCategoryByName = "getByName";
                const mockUploadResponse = {
                    Location: "https://fake-upload/imagen.png"
                }
                const file = {
                    name: "validImage.png"
                }

                beforeEach( () => {
                    categoryMockRepository = sinon.mock(categoryRepository);
                    awsS3Mock = sinon.mock(aws3);
                })
                afterEach(() => {
                    categoryMockRepository.verify();
                    awsS3Mock.verify();
                });
                it('should create a new novelty', async function () {
                    awsS3Mock.expects(methodToCallAws).returns(mockUploadResponse);
                    const actualNoveltyToCreate = {...noveltyToPost};
                    actualNoveltyToCreate.categoryId = categoryNews.id;

                    actualNoveltyToCreate.image = mockUploadResponse.Location;
                    validNovelty.categoryId = categoryNews.id;
                    validNovelty.image = mockUploadResponse.Location;

                    newsMockRepository.expects(methodToCall).withExactArgs(actualNoveltyToCreate).returns(validNovelty);
                    categoryMockRepository.expects(getCategoryByName).withExactArgs(newsCategoryName).returns(categoryNews)
                    const novelty = await newsService.create(file,noveltyToPost);
                    expect(novelty).equal(validNovelty);
                });
                it('should throw categoryId not found error', async function () {
                    awsS3Mock.expects(methodToCallAws).returns(mockUploadResponse);
                    categoryMockRepository.expects(getCategoryByName).withExactArgs(newsCategoryName).returns(undefined)
                    await asyncErrorExpect(() => newsService.create(file,noveltyToPost), expectedErrors.categoryIdNotFound)
                });
                it('should throw file is not a valid image', async function () {
                    file.name = "invalidImage.pdf";
                    await asyncErrorExpect(() => newsService.create(file,noveltyToPost), expectedErrors.fileIsNotAValidImage)
                });
                it('should throw file is undefined error', async function () {
                    await asyncErrorExpect(() => newsService.create(undefined,noveltyToPost))
                });
            })
            describe("Get all with pagination", function (){
                const params = {
                    baseUrl: "http:/localhost/news",
                    page: 1,
                };
                const limit = 10;
                const maxPage = 3
                let newsCount = 30;
                it('should return the first page', async function () {
                    const offset = (params.page-1) * limit;
                    newsMockRepository.expects("count").returns(newsCount);
                    newsMockRepository.expects("getAll").withExactArgs(limit,offset).returns([validNovelty]);

                    const novelty = await newsService.getAll(params)

                    expect(novelty.pages).to.be.greaterThan(1);
                    expect(novelty.data).to.be.an('Array');
                    expect(novelty.data).to.be.not.empty;
                    expect(novelty.prev).to.equal(null);
                    expect(novelty.next).to.equal(`${params.baseUrl}?page=${params.page+1}`);
                    expect(novelty.pages).to.equal(maxPage);
                });
                it('should return paginated novelty data', async function () {
                    params.page = 2;
                    const offset = (params.page-1) * limit;
                    newsMockRepository.expects("count").returns(newsCount);
                    newsMockRepository.expects("getAll").withExactArgs(limit,offset).returns([validNovelty]);

                    const novelty = await newsService.getAll(params)

                    expect(novelty.pages).to.be.greaterThan(1);
                    expect(novelty.data).to.be.an('Array');
                    expect(novelty.data).to.be.not.empty;
                    expect(novelty.prev).to.equal(`${params.baseUrl}?page=${params.page-1}`);
                    expect(novelty.next).to.equal(`${params.baseUrl}?page=${params.page+1}`);
                    expect(novelty.pages).to.equal(maxPage);
                });

                it('should return the last page', async function () {
                    params.page = 3;
                    const offset = (params.page-1) * limit;
                    newsMockRepository.expects("count").returns(newsCount);
                    newsMockRepository.expects("getAll").withExactArgs(limit,offset).returns([validNovelty]);

                    const novelty = await newsService.getAll(params)

                    expect(novelty.pages).to.be.greaterThan(1);
                    expect(novelty.data).to.be.an('Array');
                    expect(novelty.data).to.be.not.empty;
                    expect(novelty.prev).to.equal(`${params.baseUrl}?page=${params.page-1}`);
                    expect(novelty.next).to.equal(null);
                    expect(novelty.pages).to.equal(maxPage);
                });
                it('should throw a invalid page error', async function (){
                    params.page = 4;
                    newsMockRepository.expects("count").returns(newsCount);
                    await asyncErrorExpect(() => newsService.getAll(params), expectedErrors.paginationRange)
                });
            })
            describe("Delete Novelty", function (){
                const methodToCall = "remove";
                it('should delete a novelty', async function () {
                    newsMockRepository.expects(methodToCall).withExactArgs(validNovelty.id).returns(true);
                    await newsService.remove(validNovelty.id)
                });
                it('should throw novelty not found error', async function () {
                    newsMockRepository.expects(methodToCall).withExactArgs(validNovelty.id).returns(undefined);
                    await asyncErrorExpect(() => newsService.remove(validNovelty.id), expectedErrors.newsNotFound)
                });
            });
            describe("Update Novelty",function (){
                const methodToCall = "remove";
                it('should delete a novelty', async function () {
                    newsMockRepository.expects(methodToCall).withExactArgs(validNovelty.id).returns(true);
                    await newsService.remove(validNovelty.id)
                });
                it('should throw novelty not found error', async function () {
                    newsMockRepository.expects(methodToCall).withExactArgs(validNovelty.id).returns(undefined);
                    await asyncErrorExpect(() => newsService.remove(validNovelty.id), expectedErrors.newsNotFound)
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
        if (error.msg) expect(error.msg).to.equal(expectedError.msg);
        else expect(error.message).to.equal(expectedError.msg);
        if (error.status) {
            expect(error.status).to.be.equal(expectedError.status);
        }
    }
}