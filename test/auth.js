const chai = require("chai");
const sinon = require("sinon");
const usersRepository = require("../repositories/users");
const userService = require("../services/users")
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
        password: '$2a$10$qnoJ57oxVZ/Yjh/UwFIEOutRWvB3fwqfd8vuV0V6aKp43O9SBgkPu'
      }
      const token = '$2a$10$qnoJ57oxVZ/Yjh/UwFIEOutRWvB3fwqfd8vuV0V6aKp43O9SBgkPu'
      beforeEach(()=>{
        userMockRepository= sinon.mock(usersRepository)
      })
      // afterEach(()=>{
      //   userMockRepository.verify()
      // })
      describe("create user", function(){
        const methodToCall = "create"
        it("Should register a new user", async function(){
          userMockRepository.expects(methodToCall).withExactArgs(userToPost).returns(userCreated)
          const responseService = await userService.create(userToPost);
          console.log("este es la respuesta " + responseService)
          expect(responseService).equal(userCreated);
        })
      })
    })

})




