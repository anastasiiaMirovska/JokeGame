const request = require('supertest');
const app = require('../app');
const setupTestDB = require('./setup');

describe('Jokes API', () => {
    setupTestDB();

    describe('GET /api/joke/', () => {
        it("should return a joke and status 200", async () => {
            const res = await request(app).get("/api/joke/");
            expect(res.statusCode).toBe(200);
            expect(res.body).toMatchObject({
                _id: expect.any(String),
                question: expect.any(String),
                answer: expect.any(String),
                votes: expect.arrayContaining([
                    expect.objectContaining({
                        value: expect.any(Number),
                        label: expect.any(String)
                    })
                ]),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                __v: expect.any(Number),
            });
        });
    });

    describe('GET /api/joke/all/', () => {
        it("should return all jokes and status 200", async () => {
            const res = await request(app).get('/api/joke/all/');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('GET /api/joke/add', () => {
        it("should return 201 if joke is added", async () => {
            const res = await request(app).get("/api/joke/add");
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('question');
            expect(res.body).toHaveProperty('answer');
        });
    });

    describe('POST /api/joke/:id', () => {
        it("should return 201 when voting on a joke", async () => {
            // First create a joke
            const createRes = await request(app).get("/api/joke/add");
            const jokeId = createRes.body._id;

            // Then vote on it
            const res = await request(app)
                .post(`/api/joke/${jokeId}/`)
                .send({ emoji: "😂" });

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('votes');
        });

        it("should return 404 when voting on non-existent joke", async () => {
            const res = await request(app)
                .post("/api/joke/507f1f77bcf86cd799439011/")
                .send({ emoji: "😂" });

            expect(res.statusCode).toBe(404);
        });
    });

    describe('PUT /api/joke/:id', () => {
        it("should update joke question and answer", async () => {
            // First create a joke
            const createRes = await request(app).get("/api/joke/add");
            const jokeId = createRes.body._id;

            const updateData = {
                question: "Updated question?",
                answer: "Updated answer!"
            };

            const res = await request(app)
                .put(`/api/joke/${jokeId}/`)
                .send(updateData);

            expect(res.statusCode).toBe(200);
            expect(res.body.question).toBe(updateData.question);
            expect(res.body.answer).toBe(updateData.answer);
        });
    });

    describe('DELETE /api/joke/:id', () => {
        it("should return 400 when deleting joke with invalid id format", async () => {
            const res = await request(app).delete("/api/joke/invalid_id/");
            expect(res.statusCode).toBe(400);
        });

        it("should return 404 when deleting non-existent joke", async () => {
            const res = await request(app).delete("/api/joke/507f1f77bcf86cd799439011/");
            expect(res.statusCode).toBe(404);
        });

        it("should return 204 when deleting existing joke", async () => {
            // First create a joke
            const createRes = await request(app).get("/api/joke/add");
            const jokeId = createRes.body._id;

            const res = await request(app).delete(`/api/joke/${jokeId}/`);
            expect(res.statusCode).toBe(204);
        });
    });
});


// const request = require('supertest');
// const app = require('../app'); // Імпортуємо ваш додаток
// const mongoose = require('mongoose');
// const req = require("express/lib/request");
//
// describe('Jokes API', () => {
//
//     beforeAll(async () => {
//         // Підключаємося до бази даних, що працює в Docker на порту 27018
//         await mongoose.connect('mongodb://user:user@localhost:27018/my_database?authSource=admin', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//     });
//
//     afterAll(async () => {
//         // Закриваємо підключення до бази даних після завершення тестів
//         await mongoose.connection.close();
//     });
//
//     it("should return a joke and status 200", async () => {
//         const res = await request(app).get("/api/joke/");
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toMatchObject({
//             _id: expect.any(String),
//             question: expect.any(String),
//             answer: expect.any(String),
//             votes: expect.arrayContaining([
//                 expect.objectContaining({
//                     value: expect.any(Number),
//                     label: expect.any(String)
//                 })
//             ]),
//             createdAt: expect.any(String),
//             updatedAt:  expect.any(String),
//             __v: expect.any(Number),
//
//         });
//     });
//
//     it("should return all jokes and status 200", async () => {
//         const res = await request(app).get('/api/joke/all/');
//         expect(res.statusCode).toBe(200);
//         expect(Array.isArray(res.body)).toBe(true);
//     })
//
//     it("should return 201 if jokes add", async () => {
//         const res = await request(app).get("/api/joke/add");
//         expect(res.statusCode).toBe(201);
//         // expect(res.body.error).toBe("Joke not found");
//     });
//
//     // it("should return a joke with +1 vote and status 201", async () => {
//     //     const id = '67e00865a5a2ac817e6945e8';
//     //     const res = await request(app).post(`/api/joke/${id}/`).send({emoji:"😂"}).expect(201);
//     // })
//
//     // it("should return a joke with changed question and answer and status 200", async () => {
//     //     const id = '67e007e4a5a2ac817e6945e2';
//     //     const res = await request(app).put(`/api/joke/${id}/`).send({question: "Hello, my friend!", answer: "Hello"}).expect(200);
//     // })
//
//     it("should return status 400 when deleting joke with invalid id format", async () => {
//         const id = 'invalid_id'
//         const res = await request(app).delete(`/api/joke/${id}/`);
//         expect(400);
//     })
//
//     it("should return status 404 when deleting joke with id which does not exist", async () => {
//         const id = '47e007b74ec7c503e208d050'
//         const res = await request(app).delete(`/api/joke/${id}/`);
//         expect(res.status).toBe(404);
//     })
//     //
//     // it("should return status 204 when deleting joke with existing id", async () => {
//     //     const id = '67e007b84ec7c503e208d069'
//     //     const res = await request(app).delete(`/api/joke/${id}/`);
//     //     expect(res.status).toBe(204);
//     // })
// });