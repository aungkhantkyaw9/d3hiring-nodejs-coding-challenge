const request = require("supertest");
const app = require("../app");

jest.setTimeout(60000);

describe("POST /register", () => {
    it("response teacher email required error", () => {
        return request(app)
            .post('/api/register')
            .send({
                "students":
                    [
                        "studentj@gmail.com",
                        "studenth@gmail.com"
                    ]
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual(400);
                expect(response.body.message).toEqual("Teacher email is required.");
            })
    });

    it("response invalid teacher email", () => {
        return request(app)
            .post('/api/register')
            .send({
                "teacher": "teacher",
                "students":
                    [
                        "studentj@gmail.com",
                        "studenth@gmail.com"
                    ]
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual(400);
                expect(response.body.message).toEqual("Invalid teacher email.");
            })
    });

    it("response student email required error for student email null", () => {
        return request(app)
            .post('/api/register')
            .send({
                "teacher": "teacherjoe@gmail.com"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual(400);
                expect(response.body.message).toEqual("Student email is required.");
            })
    });

    it("response student email required error for student email not array", () => {
        return request(app)
            .post('/api/register')
            .send({
                "teacher": "teacherjoe@gmail.com",
                "students": "studenth@gmail.com"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual(400);
                expect(response.body.message).toEqual("Student email is required.");
            })
    });

    it("response student email required error for student email length 0", () => {
        return request(app)
            .post('/api/register')
            .send({
                "teacher": "teacherjoe@gmail.com",
                "students": []
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual(400);
                expect(response.body.message).toEqual("Student email is required.");
            })
    });

    it("response invalid student email", () => {
        return request(app)
            .post('/api/register')
            .send({
                "teacher": "teacherjoe@gmail.com",
                "students": ["student"]
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual(400);
                expect(response.body.message).toEqual("Invalid student email.");
            })
    });

    it("response register success with new teacher", () => {
        return request(app)
            .post('/api/register')
            .send({
                "teacher": "teacherjohn@gmail.com",
                "students": [
                    "studentk@gmail.com",
                    "studentla@gmail.com"
                ]
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual(204);
                expect(response.body.message).toEqual("Successfully registered");
            })
    });

    it("response register success with existing teacher", () => {
        return request(app)
            .post('/api/register')
            .send({
                "teacher": "teacherjoe@gmail.com",
                "students": [
                    "studentj@gmail.com",
                    "studenth@gmail.com"
                ]
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual(204);
                expect(response.body.message).toEqual("Successfully registered");
            })
    });
});

describe("GET /commonstudents", () => {
    it("response teacher email required error", () => {
        return request(app)
            .get('/api/commonstudents')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual(400);
                expect(response.body.message).toEqual("Teacher email is required.");
            })
    });

    it("response invalid teacher email for string type", () => {
        return request(app)
            .get('/api/commonstudents?teacher=teacherzengmail.com')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual(400);
                expect(response.body.message).toEqual("Invalid teacher email.");
            })
    });

    it("response invalid teacher email for object type", () => {
        return request(app)
            .get('/api/commonstudents?teacher=teacherzengmail.com&teacher=teachersgmail.com')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual(400);
                expect(response.body.message).toEqual("Invalid teacher email.");
            })
    });

    it("response common student list json", () => {
        return request(app)
            .get('/api/commonstudents?teacher=teacherjoe%40gmail.com&teacher=teacherken%40gmail.com')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual(200);
                expect(response.body.students).toEqual(['studenthon@gmail.com']);
            })
    });
});

describe("POST /suspend", () => {
    it("response student email required error for student email null", () => {
        return request(app)
            .post('/api/suspend')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual(400);
                expect(response.body.message).toEqual("Student email is required.");
            })
    });

    it("response invalid student email", () => {
        return request(app)
            .post('/api/suspend')
            .send({
                "student": "studentjongmail.com"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual(400);
                expect(response.body.message).toEqual("Invalid student email.");
            })
    });

    it("response suspend success", () => {
        return request(app)
            .post('/api/suspend')
            .send({
                "student": "studentjon@gmail.com"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual(204);
                expect(response.body.message).toEqual("Successfully suspended");
            })
    });
});

describe("POST /retrievefornotifications", () => {
    it("response teacher email required error", () => {
        return request(app)
            .post('/api/retrievefornotifications')
            .send({
                "notification": "Hello students! @studentjon@gmail.com @studenthon@gmail.com"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual(400);
                expect(response.body.message).toEqual("Teacher email is required.");
            })
    });

    it("response invalid teacher email", () => {
        return request(app)
            .post('/api/retrievefornotifications')
            .send({
                "teacher":  "teacherkengmail.com",
                "notification": "Hello students! @studentjon@gmail.com @studenthon@gmail.com"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual(400);
                expect(response.body.message).toEqual("Invalid teacher email.");
            })
    });

    it("response notification message required error", () => {
        return request(app)
            .post('/api/retrievefornotifications')
            .send({
                "teacher": "teacherken@gmail.com"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual(400);
                expect(response.body.message).toEqual("Notification message is required.");
            })
    });

    it("response invalid notification type error", () => {
        return request(app)
            .post('/api/retrievefornotifications')
            .send({
                "teacher": "teacherken@gmail.com",
                "notification": ["Hello students! @studentjon@gmail.com @studenthon@gmail.com"]
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual(400);
                expect(response.body.message).toEqual("Invalid notification string.");
            })
    });

    it("response student list for notification", () => {
        return request(app)
            .post('/api/retrievefornotifications')
            .send({
                "teacher":  "teacherjoe@gmail.com",
                "notification": "Hello students! @studentjon@gmail.com @studenthon@gmail.com"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual(200);
                expect(response.body.recipent).toEqual(["studenthon@gmail.com", "studentj@gmail.com", "studenth@gmail.com"]);
            })
    });
});
