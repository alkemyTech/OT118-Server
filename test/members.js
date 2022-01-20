const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const membersRepository = require("../repositories/members");
const membersService = require("../services/members");

const expectedErrors = {
    memberNotFound: { msg: "Member not found", status: 404},
    paginationRange:{ msg: "Parameter 'page' is out of range", status: 400 },
}

describe("Members Endpoint",
    function () {
        describe("Members Service", function () {
            let memberssMockRepository;
            let categoryMockRepository;
            const validMember = {
                id: 3,
                name: "Member",
                facebookUrl: "https://www.facebook.com/",
                instagramUrl: "https://www.instagram.com/",
                linkedinUrl: "https://www.linkedin.com/",
                image: "https://image.url.com",
                description: "Description",
                createdAt: "2021-12-22T13:44:07.000Z",
                updatedAt: "2021-12-27T13:39:29.000Z"
            };
            const memberToPost = {
                name: "Member",
                facebookUrl: "https://www.facebook.com/",
                instagramUrl: "https://www.instagram.com/",
                linkedinUrl: "https://www.linkedin.com/",
                image: "https://image.url.com",
                description: "Description"
            };
            const categoryNews = {
                id: 3,
                name: "news",
                image: "http://image.com",
                description: "Description"
            };
            const memberToUpdate = 3;
            const memberBody = {...memberToPost};
            const getMemberById = "getById";
            beforeEach(() => {
                membersMockRepository = sinon.mock(membersRepository);
            })
            afterEach(() => {
                membersMockRepository.verify();
            });
            describe("Create new member", function (){
                const methodToCall = "create";

                beforeEach( () => {
                    membersMockRepository = sinon.mock(membersRepository);
                })
                afterEach(() => {
                    membersMockRepository.verify();
                });
                it('should create a new member', async function () {
                    const actualMemberToCreate = {...memberToPost};

                    membersMockRepository.expects(methodToCall).withExactArgs(actualMemberToCreate).returns(validMember);
                    const member = await membersService.create(memberToPost);
                    expect(member).equal(validMember);
                });
            })
            describe("Update a member", function (){
                const methodToCall = "update";

                beforeEach( () => {
                    membersMockRepository = sinon.mock(membersRepository);
                })
                afterEach(() => {
                    membersMockRepository.verify();
                });
                it('should update a member', async function () {

                    membersMockRepository.expects(methodToCall).withExactArgs(memberToUpdate, memberBody).returns([1]);
                    membersMockRepository.expects(getMemberById).twice().withExactArgs(memberToUpdate).returns(validMember);
                    const member = await membersService.update(memberToUpdate, memberBody);
                    expect(member).equal(validMember);
                });
                it('should throw member not found error', async function () {
                    membersMockRepository.expects(getMemberById).once().withExactArgs(memberToUpdate).returns(undefined);
                    await asyncErrorExpect(() => membersService.update(memberToUpdate, memberBody), expectedErrors.memberNotFound);
                });
            })
            describe("Get all with pagination", function (){
                const params = {
                    baseUrl: "http:/localhost/members",
                    page: 1,
                };
                const limit = 10;
                const maxPage = 3
                let membersCount = 30;
                it('should return the first page', async function () {
                    const offset = (params.page-1) * limit;
                    membersMockRepository.expects("count").returns(membersCount);
                    membersMockRepository.expects("getAll").withExactArgs(limit,offset).returns([validMember]);

                    const member = await membersService.getAll(params)

                    expect(member.pages).to.be.greaterThan(1);
                    expect(member.data).to.be.an('Array');
                    expect(member.data).to.be.not.empty;
                    expect(member.prev).to.equal(null);
                    expect(member.next).to.equal(`${params.baseUrl}?page=${params.page+1}`);
                    expect(member.pages).to.equal(maxPage);
                });
                it('should return paginated member data', async function () {
                    params.page = 2;
                    const offset = (params.page-1) * limit;
                    membersMockRepository.expects("count").returns(membersCount);
                    membersMockRepository.expects("getAll").withExactArgs(limit,offset).returns([validMember]);

                    const member = await membersService.getAll(params)

                    expect(member.pages).to.be.greaterThan(1);
                    expect(member.data).to.be.an('Array');
                    expect(member.data).to.be.not.empty;
                    expect(member.prev).to.equal(`${params.baseUrl}?page=${params.page-1}`);
                    expect(member.next).to.equal(`${params.baseUrl}?page=${params.page+1}`);
                    expect(member.pages).to.equal(maxPage);
                });

                it('should return the last page', async function () {
                    params.page = 3;
                    const offset = (params.page-1) * limit;
                    membersMockRepository.expects("count").returns(membersCount);
                    membersMockRepository.expects("getAll").withExactArgs(limit,offset).returns([validMember]);

                    const member = await membersService.getAll(params)

                    expect(member.pages).to.be.greaterThan(1);
                    expect(member.data).to.be.an('Array');
                    expect(member.data).to.be.not.empty;
                    expect(member.prev).to.equal(`${params.baseUrl}?page=${params.page-1}`);
                    expect(member.next).to.equal(null);
                    expect(member.pages).to.equal(maxPage);
                });
                it('should throw a invalid page error', async function (){
                    params.page = 90;
                    membersMockRepository.expects("count").returns(membersCount);
                    await asyncErrorExpect(() => membersService.getAll(params), expectedErrors.paginationRange)
                });
            })
            describe("Delete Member", function (){
                const methodToCall = "remove";
                it('should delete a member', async function () {
                    membersMockRepository.expects(methodToCall).withExactArgs(validMember.id).returns(true);
                    await membersService.remove(validMember.id)
                });
                it('should throw member not found error', async function () {
                    membersMockRepository.expects(methodToCall).withExactArgs(validMember.id).returns(undefined);
                    await asyncErrorExpect(() => membersService.remove(validMember.id), expectedErrors.memberNotFound)
                });
            });
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
