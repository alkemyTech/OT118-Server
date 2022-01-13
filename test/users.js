const chai = require('chai');
const { Context } = require('express-validator/src/context');
const sinon = require('sinon');
const expect = chai.expect;



const usersRepository = require('../repositories/users');
const usersService = require('../services/users');

const expectedErrors = {
    userNotFound: { msg: "User not found.", status: 404},
    categoryIdNotFound: { msg: "CategoryId not found.", status: 404},
    paginationRange:{ msg: "Parameter 'page' is out of range", status: 400 },
    userNotUpdated: { msg: "User couldn't be updated", status: 400 }
}

describe('Users endpoint', function() {
    let usersMockedRepo;

    beforeEach(() => {
        usersMockedRepo = sinon.mock(usersRepository);
    })

    afterEach(() => {
        usersMockedRepo.verify()
    })

    context('Users service', function() {
        
        const userToGet = {
            firstName : 'pepe',
            email : 'email@gmail.com',
            image : 'image.png'
        }

        const validUser = {
            id: 40,
            fistName: "pepe",
            lastName: "pepito",
            email: "https://image.url.com",
            password: '$2a$10$9GeXoYVeYveqVS15r4VI6.aRwzO1lAWOIlvWTInd7v0N4Ug8qCZ26',
            image: 'image.png',
            roleId: 2,
            createdAt: "2021-12-22T13:44:07.000Z",
            updatedAt: "2021-12-27T13:39:29.000Z"
        };

        describe('get all with pagination', function() {
            const params = {
                baseUrl: 'http://localhost/news',
                page: 2
            }

            it('should return paginated users data', async function() {
                const limit = 10;
                const offset = (params.page-1) * limit

                usersMockedRepo.expects("count").returns(30)
                usersMockedRepo.expects("getAll").withExactArgs(limit,offset).returns([userToGet]);

                const users = await usersService.getAll(params)

                expect(users.pages).to.be.greaterThan(1);
                expect(users.data).to.be.an('Array');
                expect(users.data).to.be.not.empty;
                expect(users.prev).to.equal(`${params.baseUrl}?page=1`);
                expect(users.next).to.equal(`${params.baseUrl}?page=3`);
            })
            
            it('should throw a invalid page error', async function() {
                usersMockedRepo.expects('count').returns(10);
                await asyncErrorExpect(() => usersService.getAll(params), expectedErrors.paginationRange)

            })

        });

        describe('Delete a user', function() {
            const methodToCall = 'remove';

            it('should delete a user', async function() {
                usersMockedRepo.expects('getById').withExactArgs(validUser.id).returns(validUser);
                usersMockedRepo.expects("remove").withExactArgs(validUser.id).returns(true);
                await usersService.remove(validUser.id)
            })
            it('should throw user not found error', async function() {
                usersMockedRepo.expects('getById').withExactArgs(validUser.id).returns(null);
                usersMockedRepo.expects(methodToCall).withExactArgs(validUser.id).returns(undefined);
                await asyncErrorExpect(() => usersService.remove(validUser.id), expectedErrors.usersNotFound)

            }) 

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
        if (error.msg)
            expect(error.msg).to.equal(expectedError.msg);
        else
            expect(error.message).to.equal(expectedError.msg);
        if (error.status) {
            expect(error.status).to.be.equal(expectedError.status);
        }
    }
}