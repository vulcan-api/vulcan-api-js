const Vulcan = require('../lib');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, "../.env") });
const CERT = JSON.parse(process.env.CERT);
if (CERT === undefined) {
    throw Error("Couldn't find cert!");
}

describe("Vulcan", function(){
    this.timeout(5000);
    var vulcan;
    describe("Init", () => {
        it("Vulcan class inits properly", (done) => {
            expect(() => {
                vulcan = new Vulcan.Vulcan(CERT);
            }).to.not.throw("Vulcan class failed initialization");
            done();
        });
    });
    describe("getStudents", () => {
        it("getStudents resolves and returns at least single element", async () => {
            await expect(vulcan.getStudents()).not.to.be.rejected.and.be.an.instanceOf(Error);
            await expect(vulcan.getStudents()).to.eventually.be.instanceOf(Array).and.to.have.length.greaterThan(0);
        });
    });
    describe("setStudent", () => {
        it("setStudent resolves", async () => {
            let students = await vulcan.getStudents();
            await expect(vulcan.setStudent(students[0])).not.to.be.rejected.and.be.an.instanceOf(Error);
        });
    });
    describe("getGrades", () => {
        it("getGrades resolves and returns array", async () => {
            await expect(vulcan.getGrades()).not.to.be.rejected.and.be.an.instanceOf(Error);
            await expect(vulcan.getGrades()).to.eventually.be.instanceOf(Array);
        });
    });
    describe("getLessons", () => {
        it("getLessons (without the date) resolves and returns array", async () => {
            await expect(vulcan.getLessons()).not.to.be.rejected.and.be.an.instanceOf(Error);
            await expect(vulcan.getLessons()).to.eventually.be.instanceOf(Array);
        });
        it("getLessons (with the date) resolves and returns array", async () => {
            await expect(vulcan.getLessons(new Date("2020-05-05"))).not.to.be.rejected.and.be.an.instanceOf(Error);
            await expect(vulcan.getLessons(new Date("2020-05-05"))).to.eventually.be.instanceOf(Array);
        });
    });
    describe("getExams", () => {
        it("getExams (without the date) resolves and returns array", async () => {
            await expect(vulcan.getExams()).not.to.be.rejected.and.be.an.instanceOf(Error);
            await expect(vulcan.getExams()).to.eventually.be.instanceOf(Array);
        });
        it("getExams (with the date) resolves and returns array", async () => {
            await expect(vulcan.getExams(new Date("2020-05-05"))).not.to.be.rejected.and.be.an.instanceOf(Error);
            await expect(vulcan.getExams(new Date("2020-05-05"))).to.eventually.be.instanceOf(Array);
        });
    });
    describe("getHomework", () => {
        it("getHomework (without the date) resolves and returns array", async () => {
            await expect(vulcan.getHomework()).not.to.be.rejected.and.be.an.instanceOf(Error);
            await expect(vulcan.getHomework()).to.eventually.be.instanceOf(Array);
        });
        it("getHomework (with the date) resolves and returns array", async () => {
            await expect(vulcan.getHomework(new Date("2020-05-05"))).not.to.be.rejected.and.be.an.instanceOf(Error);
            await expect(vulcan.getHomework(new Date("2020-05-05"))).to.eventually.be.instanceOf(Array);
        });
    });
    describe("getMessages", () => {
        it("getMessages (without the date) resolves and returns array", async () => {
            await expect(vulcan.getMessages()).not.to.be.rejected.and.be.an.instanceOf(Error);
            await expect(vulcan.getMessages()).to.eventually.be.instanceOf(Array);
        });
        it("getHomework (with dateFrom and dateTo) resolves and returns array", async () => {
            await expect(vulcan.getMessages(new Date("2020-05-05"), new Date("2020-05-05"))).not.to.be.rejected.and.be.an.instanceOf(Error);
            await expect(vulcan.getMessages(new Date("2020-05-05"), new Date("2020-05-05"))).to.eventually.be.instanceOf(Array);
        });
    });
});