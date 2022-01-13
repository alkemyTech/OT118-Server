const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const {loginValidation} = require("../middlewares/users");
const {asyncValidation, getSpecificError} = require("./middleware-utils");

describe('Users middleware', () => {
    let params;
    beforeEach(() => {
        params = {
            req: {},
            res: {},
            next: sinon.spy((err) => {
                if(err){
                    throw err
                }
            })
        }
    })

    describe('Login validation', () => {
        it('should validate and call next withou args', async function () {
            params.req.body = {
                email: 'email@gmail.com',
                password: 'contrasela123Q!'
            }
    
            const error = await asyncValidation(params, loginValidation)
            expect(params.next.threw('badRequestError')).to.be.false
            expect(params.next.alwaysCalledWith()).to.be.true
    
            expect(error).to.be.null
    
        })
        it('should throw error', async function () {
            params.req.body = {
                email: 'email@gmail.com'
            }
            const error = await asyncValidation(params, loginValidation);

            expect(params.next.threw('BadRequestError')).to.be.true
            //expect(error.msg).to.equal("Input validation error")
        })
        it('Should throw format email error', async function() {
            params.req.body = {
                email: "email",
                password: "contrasela123Q!"
            }

            const error = await asyncValidation(params, loginValidation)

            expect(params.next.threw('BadRequestError')).to.be.true;
            expect(error.errors).to.be.an('array');

            const emailError = getSpecificError(error, "email");
            expect(emailError).to.be.an('object');
            expect(emailError.msg).to.be.equal('email format is required.');
        })
        it('Should throw format password error', async function() {
            params.req.body = {
                email: "email@gmail.com",
                password: ""
            }

            const error = await asyncValidation(params, loginValidation)

            expect(params.next.threw('BadRequestError')).to.be.true;
            expect(error.errors).to.be.an('array');

            const passError = getSpecificError(error, "password");
            expect(passError).to.be.an('object');
            expect(passError.msg).to.be.equal('password format is required.');
        })
        it('Should throw password is not strong error', async function() {
            params.req.body = {
                email: "email@gmail.com",
                password: "contrasela"
            }

            const error = await asyncValidation(params, loginValidation)

            expect(params.next.threw('BadRequestError')).to.be.true;
            expect(error.errors).to.be.an('array');

            const passError = getSpecificError(error, "password");
            expect(passError).to.be.an('object');
            expect(passError.msg).to.be.equal('password is not strong');
        })

    })
    
})