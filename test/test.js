// Requiring module
const assert = require('assert');
const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
process.env.NODE_ENV = 'test'
const app = require('../server');
const config = require("../config/config.json");
const db = require("../config/db.js");

// We can group similar test inside a describe block
describe("test routes", () => {
    before(() => {
        console.log( "This part executes once before all test" );
    });

    after(async () => {
        const database = config.test.database;
        await db.execute(`DROP DATABASE ${database};`);
        console.log( "This part executes once after all test" );
    });

    describe('post /checkin', () => {
        let body = {
            "user": "Bob",
            "task": "Task test"
        }
        it('checkin ok', (done) => {
            request(app)
                .post(`/checkin`)
                .send(body)
                .end((err, res) => {
                    console.log(res);
                    expect(res.status).to.eq(200);
                    done();
                })
        })
        it('checkin fail', (done) => {
            request(app)
                .post(`/checkin`)
                .send(body)
                .end((err, res) => {
                    console.log(res);
                    expect(res.status).to.eq(400);
                    done();
                })
        })
        it('checkout ok', (done) => {
            request(app)
                .post(`/checkout/bob`)
                .end((err, res) => {
                    console.log(res);
                    expect(res.status).to.eq(200);
                    done();
                })
        })
        it('checkout fail', (done) => {
            request(app)
                .post(`/checkout/bob`)
                .end((err, res) => {
                    console.log(res);
                    expect(res.status).to.eq(400);
                    done();
                })
        })
        it('report ok', (done) => {
            request(app)
                .get(`/report`)
                .end((err, res) => {
                    expect(res.status).to.eq(200)
                    expect( {"bob": ["task test: 0.00 hours"]})
                    done();
                })
        })
    })
});
