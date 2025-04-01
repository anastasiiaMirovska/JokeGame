const request = require('supertest');
const app = require('../app'); // Імпортуємо ваш додаток
const mongoose = require('mongoose');
const req = require("express/lib/request");

describe('Jokes API', () => {

    beforeAll(async () => {
        const mongoUri = process.env.MONGO_URI || 'mongodb://user:user@db:27017/my_database?authSource=admin';
        await mongoose.connect(mongoUri);
    });


    afterAll(async () => {
        // Закриваємо підключення до бази даних після завершення тестів
        await mongoose.connection.close();
    });

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
            updatedAt:  expect.any(String),
            __v: expect.any(Number),

        });
    });

    it("should return all jokes and status 200", async () => {
        const res = await request(app).get('/api/joke/all/');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    })

    it("should return 201 if jokes add", async () => {
        const res = await request(app).get("/api/joke/add");
        expect(res.statusCode).toBe(201);
        // expect(res.body.error).toBe("Joke not found");
    });

    // it("should return a joke with +1 vote and status 201", async () => {
    //     const id = '67e00865a5a2ac817e6945e8';
    //     const res = await request(app).post(`/api/joke/${id}/`).send({emoji:"😂"}).expect(201);
    // })

    // it("should return a joke with changed question and answer and status 200", async () => {
    //     const id = '67e007e4a5a2ac817e6945e2';
    //     const res = await request(app).put(`/api/joke/${id}/`).send({question: "Hello, my friend!", answer: "Hello"}).expect(200);
    // })

    it("should return status 400 when deleting joke with invalid id format", async () => {
        const id = 'invalid_id'
        const res = await request(app).delete(`/api/joke/${id}/`);
        expect(400);
    })

    it("should return status 404 when deleting joke with id which does not exist", async () => {
        const id = '47e007b74ec7c503e208d050'
        const res = await request(app).delete(`/api/joke/${id}/`);
        expect(res.status).toBe(404);
    })
    //
    // it("should return status 204 when deleting joke with existing id", async () => {
    //     const id = '67e007b84ec7c503e208d069'
    //     const res = await request(app).delete(`/api/joke/${id}/`);
    //     expect(res.status).toBe(204);
    // })
});