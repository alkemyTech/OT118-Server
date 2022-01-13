const chai = require("chai");
const sinon = require("sinon");
const usersRepository = require("../repositories/users");
const userService = require("../services/users")
const bcrypt = require("bcryptjs");
const rolesRepository = require("../repositories/roles")
const jwt = require("../modules/auth");
const expect = chai.expect


describe( "auth endpoints",
  function(){
    describe("auth service", function(){
      let userMockRepository;

      const userToPost = {
        firstName: 'Emilio',
        lastName: 'Baudracco',
        email: 'baudraccoemi@gmail.com',
        password: 'Emilio2301@',
      }
      const userCreated = {
        id:25,
        firstName: 'Emilio',
        lastName: 'Baudracco',
        email: 'baudraccoemi@gmail.com',
        password: '$2a$10$qnoJ57oxVZ/Yjh/UwFIEOutRWvB3fwqfd8vuV0V6aKp43O9SBgkPu',
        roleId: 2
      }
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImlhdCI6MTY0MTg0ODA1MSwiZXhwIjoxNjQxOTM0NDUxfQ._vvoAz2wDTTjBGyXzH5_J3LTijzBrUGcbEuhw2XItGY"
      beforeEach(()=>{
        userMockRepository= sinon.mock(usersRepository)
      })
      describe("create user", function(){
        let bcryptMock;
        let rolesMockRepository;
        let jwtMock;
        const methodToCall = "create";
        const methodToCallRol = "findByName"
        const methodBcrypt = "hashSync"
        const roleId = 2
        const methodJwt = "generateToken"
        const paramsGenerateToken = {
           id : userToPost.id
          }
        const resultJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImlhdCI6MTY0MTg0ODA1MSwiZXhwIjoxNjQxOTM0NDUxfQ._vvoAz2wDTTjBGyXzH5_J3LTijzBrUGcbEuhw2XItGY"
        const mockBcryptResponse = {
            passwordHash : "$2a$10$qnoJ57oxVZ/Yjh/UwFIEOutRWvB3fwqfd8vuV0V6aKp43O9SBgkPu"
        }
        beforeEach(()=>{
          bcryptMock= sinon.mock(bcrypt)
          rolesMockRepository=sinon.mock(rolesRepository)
          jwtMock = sinon.mock(jwt)
        })
          it("Should register a new user", async function(){

            bcryptMock.expects(methodBcrypt).withExactArgs(userToPost.password,10).returns(mockBcryptResponse)
            rolesMockRepository.expects(methodToCallRol).withExactArgs("Standard").returns(roleId)
            jwtMock.expects(methodJwt).withExactArgs(paramsGenerateToken).returns(resultJwt)
            userMockRepository.expects(methodToCall).withExactArgs(userToPost).returns(token)
            //me falta hacer mock de organizationRepository,createWecolmeEmailTemplate y send por ahora lo tengo comentado
            const responseService = await userService.create(userToPost);
            expect(responseService).equal(token);
        })
      })
    })

})




