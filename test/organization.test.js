const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const orgRepository = require('../repositories/organizations');
const orgService = require('../services/organizations');

const expectedErrors = {
    OrganizationNotFound: { msg: "Organization not found.", status: 404},
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

        it("Should return an organization", async function ()  {
            orgMockedRepo.expects("get").returns(validOrgResponse);
            const org = await orgService.getPublicInfo();
            expect(org).equal(validOrgResponse);
        })
    })
});