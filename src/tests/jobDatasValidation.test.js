// TESTS JOB DATAS VALIDATION

import express from 'express';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import { verifyJobDatas } from "../middlewares/jobDatasValidation";

// TEST ROUTES
// Routes update and create job

// Create a fake routes to test middleware
const app = express();


beforeAll(() => {
    function nextToCall(req, res) {
        res.status(200).json({ "message": "next() have been called" });
    };
    app.use(express.json());
    app.post('/test', verifyJobDatas, nextToCall);
});

// GLOBAL TESTS
describe('global test', () => {
    // control test
    test('control test', async () => {
        const response = await request(app)
            .post('/test')
            .send({
                "job": faker.person.jobTitle(),
                "companyName": faker.company.buzzNoun(),
                "place": faker.location.city(),
                "status": "application sent",
                "source": faker.internet.url(),
                "contact": faker.internet.email(),
                "dispatchDate": "2020-06-14",
                "note": faker.hacker.phrase(),
                "opinion": faker.number.int({ min: 0, max: 5 }),
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "next() have been called");
    });

    // Test with only the job's name
    test('test with only job', async () => {
        const response = await request(app)
            .post('/test')
            .send({ "job": faker.person.jobTitle() });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "next() have been called");
    });

    // Test changing fields order
    test('test changing fields order', async () => {
        const response = await request(app)
            .post('/test')
            .send({
                "place": faker.location.city(),
                "companyName": faker.company.buzzNoun(),
                "status": "application sent",
                "job": faker.person.jobTitle(),
                "opinion": faker.number.int({ min: 0, max: 5 }),
                "source": faker.internet.url(),
                "dispatchDate": "2020-06-14",
                "contact": faker.internet.email(),
                "note": faker.hacker.phrase(),
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "next() have been called");
    });

    // Test adding other fields
    /**
     * Test fails
     */
    test('test adding invalid field', async () => {
        const response = await request(app)
            .post('/test')
            .send({
                "job": faker.person.jobTitle(),
                "companyName": faker.company.buzzNoun(),
                "place": faker.location.city(),
                "status": "application sent",
                "source": faker.internet.url(),
                "contact": faker.internet.email(),
                "dispatchDate": "2020-06-14",
                "note": faker.hacker.phrase(),
                "opinion": faker.number.int({ min: 0, max: 5 }),
                "random field": "I should not be here"
            });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "random field is not a valid field");
    });

    // Test with no fields at all
    /**
     * Test fails
     */
    test('test with no fields at all', async () => {
        const response = await request(app)
            .post('/test')
            .send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "job is required");
    });


});

// TEST STATUS
describe('testing status', () => {
    // Test all correct status
    {
        test("test 'application sent'", async () => {
            const response = await request(app)
                .post('/test')
                .send({
                    "job": faker.person.jobTitle(),
                    "status": "application sent",
                });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("message", "next() have been called");
        });

        test("test 'first interview'", async () => {
            const response = await request(app)
                .post('/test')
                .send({
                    "job": faker.person.jobTitle(),
                    "status": "first interview",
                });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("message", "next() have been called");
        });

        test("test 'refused'", async () => {
            const response = await request(app)
                .post('/test')
                .send({
                    "job": faker.person.jobTitle(),
                    "status": "refused",
                });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("message", "next() have been called");
        });

        test("test 'no response'", async () => {
            const response = await request(app)
                .post('/test')
                .send({
                    "job": faker.person.jobTitle(),
                    "status": "no response",
                });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("message", "next() have been called");
        });
    }

    // Test adding spaces arround status
    /**
     * This fails
     */
    test("test with spaces arround", async () => {
        const response = await request(app)
            .post('/test')
            .send({
                "job": faker.person.jobTitle(),
                "status": " application sent ",
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "next() have been called");
    });

    // Test incorrect status
    test("test invalid status", async () => {
        const response = await request(app)
            .post('/test')
            .send({
                "job": faker.person.jobTitle(),
                "status": "random status",
            });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "incorrect status");
    });
});

// TEST OPINION
describe('testing opinion', () => {

    // Change opinion validation

    // Test all valid integers
    {
        test('test 0', async () => {
            const response = await request(app)
                .post('/test')
                .send({
                    "job": faker.person.jobTitle(),
                    "opinion": 0
                });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("message", "next() have been called");
        });

        test('test 1', async () => {
            const response = await request(app)
                .post('/test')
                .send({
                    "job": faker.person.jobTitle(),
                    "opinion": 1
                });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("message", "next() have been called");
        });

        test('test 2', async () => {
            const response = await request(app)
                .post('/test')
                .send({
                    "job": faker.person.jobTitle(),
                    "opinion": 2
                });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("message", "next() have been called");
        });

        test('test 3', async () => {
            const response = await request(app)
                .post('/test')
                .send({
                    "job": faker.person.jobTitle(),
                    "opinion": 3
                });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("message", "next() have been called");
        });

        test('test 4', async () => {
            const response = await request(app)
                .post('/test')
                .send({
                    "job": faker.person.jobTitle(),
                    "opinion": 4
                });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("message", "next() have been called");
        });

        test('test 5', async () => {
            const response = await request(app)
                .post('/test')
                .send({
                    "job": faker.person.jobTitle(),
                    "opinion": 5
                });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("message", "next() have been called");
        });
    }

    // Test float
    test('test float', async () => {
        const response = await request(app)
            .post('/test')
            .send({
                "job": faker.person.jobTitle(),
                "opinion": Number(faker.number.float())
            });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "opinion is not a valid integer");
    });

    // Test string
    test('test string', async () => {
        const response = await request(app)
            .post('/test')
            .send({
                "job": faker.person.jobTitle(),
                "opinion": "string"
            });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "opinion is not a valid integer");
    });

    /**
     * Should this pass
     */
    // Test int as string
    test('test int as string', async () => {
        const response = await request(app)
            .post('/test')
            .send({
                "job": faker.person.jobTitle(),
                "opinion": "0"
            });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "opinion is not a valid integer");
    });


    // Test integer below 0
    test('test below 0', async () => {
        const response = await request(app)
            .post('/test')
            .send({
                "job": faker.person.jobTitle(),
                "opinion": -Number(faker.number.int())
            });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "opinion must be between 0 and 5");
    });


    // Test integer above 5
    test('test above 5', async () => {
        const response = await request(app)
            .post('/test')
            .send({
                "job": faker.person.jobTitle(),
                "opinion": Number(faker.number.int({ min: 5 }))
            });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "opinion must be between 0 and 5");
    });
});

// TEST SOURCE
describe('testing source', () => {
    // Test http & https
    test('test http', async () => {
        const response = await request(app)
            .post('/test')
            .send({
                "job": faker.person.jobTitle(),
                "source": 'http://' + faker.internet.domainName(),
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "next() have been called");
    });

    test('test https', async () => {
        const response = await request(app)
            .post('/test')
            .send({
                "job": faker.person.jobTitle(),
                "source": 'https://' + faker.internet.domainName(),
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "next() have been called");
    });

    // Test without protocol
    test('test without protocol', async () => {
        const response = await request(app)
            .post('/test')
            .send({
                "job": faker.person.jobTitle(),
                "source": faker.internet.domainName(),
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "next() have been called");
    });

    // Test without extension
    test('test without protocol', async () => {
        const response = await request(app)
            .post('/test')
            .send({
                "job": faker.person.jobTitle(),
                "source": faker.internet.protocol() + "://" + faker.internet.domainWord(),
            });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "invalid source url");
    });

})

// TEST DATE
describe('test date', () => {
    // Test valid date
    test('test valid date', async () => {
        const response = await request(app)
            .post('/test')
            .send({
                "job": faker.person.jobTitle(),
                "dispatchDate": "2020-06-14",
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "next() have been called");
    });

    // Test with js datetime
    test('test js datetime', async () => {
        const response = await request(app)
            .post('/test')
            .send({
                "job": faker.person.jobTitle(),
                "dispatchDate": "1995-12-17T03:24:00",
            });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "date must be in format YYYY-MM-DD");
    });

    // Test partial date
    test('test datetime', async () => {
        const response = await request(app)
            .post('/test')
            .send({
                "job": faker.person.jobTitle(),
                "dispatchDate": "1995-12",
            });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "date must be in format YYYY-MM-DD");
    });

    // Test different format date (like YYYY:MM:DD)
    test('test other format', async () => {
        const response = await request(app)
            .post('/test')
            .send({
                "job": faker.person.jobTitle(),
                "dispatchDate": "1995:12:18",
            });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "date must be in format YYYY-MM-DD");
    });
});

// TEST CONTACT
describe('test contact', () => {
    // test email
    test('test email', async () => {
        const response = await request(app)
            .post('/test')
            .send({
                "job": faker.person.jobTitle(),
                "contact": faker.internet.email(),
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "next() have been called");
    });

    test('test email without @', async () => {
        const response = await request(app)
            .post('/test')
            .send({
                "job": faker.person.jobTitle(),
                "contact": faker.internet.email().replace("@", ""),
            });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "contact must be a valid phone or email");
    });

    // Test phone number formats
    {
        test('test international style number', async () => {
            const response = await request(app)
                .post('/test')
                .send({
                    "job": faker.person.jobTitle(),
                    "contact": faker.phone.number({ style: 'international' }),
                });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("message", "next() have been called");
        });

        test('test national style number', async () => {
            const response = await request(app)
                .post('/test')
                .send({
                    "job": faker.person.jobTitle(),
                    "contact": faker.phone.number({ style: 'national' }),
                });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("message", "next() have been called");
        });

        test('test dot style number', async () => {
            const response = await request(app)
                .post('/test')
                .send({
                    "job": faker.person.jobTitle(),
                    "contact": "01.99.99.99.99"
                });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("message", "next() have been called");
        });

        test('test space style number', async () => {
            const response = await request(app)
                .post('/test')
                .send({
                    "job": faker.person.jobTitle(),
                    "contact": "01 99 99 99 99"
                });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("message", "next() have been called");
        });
    }
});