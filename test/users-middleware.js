const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const {loginValidation, registerValidation} = require("../middlewares/users");
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
        it('should validate and call next without args', async function () {
            params.req.body = {
                email: 'email@gmail.com',
                password: 'contrasela123Q!'
            }
    
            const error = await asyncValidation(params, loginValidation)
            expect(params.next.threw('badRequestError')).to.be.false
            expect(params.next.alwaysCalledWith()).to.be.true
    
            expect(error).to.be.null
    
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
    describe('register validator', () => {
        it('should validate and call next without args', async function () {
            params.req.body = {
                firstName: 'pepe',
                lastName: 'pepito',
                email: 'email@gmail.com',
                password: 'contrasela123Q!'
            }
    
            const error = await asyncValidation(params, registerValidation)
            expect(params.next.threw('badRequestError')).to.be.false
            expect(params.next.alwaysCalledWith()).to.be.true
    
            expect(error).to.be.null
    
        })
        it('should throw first name is required error', async function() {
            params.req.body = {
                
                lastName: 'pepito',
                email: 'email@gmail.com',
                password: 'contrasela123Q!'
            }

            const error = await asyncValidation(params, registerValidation);

            
            expect(params.next.threw('BadRequestError')).to.be.true;
            expect(error.errors).to.be.an('array');

            const nameError = getSpecificError(error, "firstName");
            expect(nameError).to.be.an('object');
            expect(nameError.msg).to.be.equal('first name is required');

        })
        it('should throw last name is required error', async function() {
            params.req.body = {
                firstName: 'pepe',
                email: 'email@gmail.com',
                password: 'contrasela123Q!'
            }

            const error = await asyncValidation(params, registerValidation);

            
            expect(params.next.threw('BadRequestError')).to.be.true;
            expect(error.errors).to.be.an('array');

            const lastNameError = getSpecificError(error, "lastName");
            expect(lastNameError).to.be.an('object');
            expect(lastNameError.msg).to.be.equal('last name is required');

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
    });
})