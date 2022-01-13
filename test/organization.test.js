const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const orgRepository = require('../repositories/organizations');
const orgService = require('../services/organizations');
const Config = require('../config/config')

const expectedErrors = {
    OrganizationNotFound: { msg: "Public information not found", status: 404},
    OrganizationNotUpdated: { msg: "Organization couldn't be updated", status: 400 }
}

describe("Organization endpoint", function () {

    let orgMockedRepo;
    beforeEach(() => {
        orgMockedRepo = sinon.mock(orgRepository)
    })
    afterEach(() => {
        orgMockedRepo.verify();
    });
    
    describe("Get public info",  function () {

        const validOrgResponse = {
            name: "Somos Mas",
            image: "URL Image",
            address: "Address Org",
            phone: 1234567890,
            welcomeText: "Welcome!",
            aboutUsText: "About org",
            urlFacebook: "URL Facebook",
            urlLinkedin: "URL Linkedin",
            urlInstagram: "URL Instagram",
            Slides: [{
                imageUrl: "imagen1.jpg",
                text: "esta es la imagen 1",
                order: 1,
                organizationId: 1
            }]
        };

        it("Should return an organization", async function () {
            orgMockedRepo.expects("getPublicInfo").returns(validOrgResponse);
            const org = await orgService.getPublicInfo(Config.organizationId);
            expect(org).equal(validOrgResponse);
        })
        it("Should return public info not found", async function () {
            const orgId = 2;
            orgMockedRepo.expects("getPublicInfo").returns(null);
            await asyncErrorExpect(() => 
                orgService.getPublicInfo(orgId)
            , expectedErrors.OrganizationNotFound)
        })
    })

    describe("Organization Updated")
})

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