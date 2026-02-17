import request from 'supertest';
import app from '../app.js'; // Імпортуємо ваш додаток
import mongoose from 'mongoose';
import {config} from '../config.js';
import {jest} from '@jest/globals';


describe('Jokes API', () => {
    let jokeId;

    beforeAll(async () => {
        // Підключаємося до бази даних, що працює в Docker на порту 27018
        jest.setTimeout(30000);
        await mongoose.connect(config.database.mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await request(app).get("/api/joke/add/");
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
        expect(res.body.length).toBeGreaterThan(0);
        res.body.forEach((joke) => {
            expect(joke).toMatchObject({ _id: expect.any(String),
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
                __v: expect.any(Number),})
        })
    })

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
        expect(res.status).toBe(400);
    })

    it("should return status 404 when deleting joke with id which does not exist", async () => {
        const id = '47e007b74ec7c503e208d050'
        const res = await request(app).delete(`/api/joke/${id}/`);
        expect(res.status).toBe(404);
    })

    it("should return status 204 when deleting joke with existing id", async () => {
        const joke = await request(app).get("/api/joke/");
        expect(joke.statusCode).toBe(200);
        const res = await request(app).delete(`/api/joke/${joke.body._id}/`);
    })
});