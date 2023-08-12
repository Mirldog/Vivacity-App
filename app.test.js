const app = require('./app')
const request = require('supertest');

describe('GET /awesome/applicants/all', () => {
    test('responds with  a list of applicants', async () => {
        const response = await request(app).get('/awesome/applicant');
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});

describe('GET /awesome/applicants', () => {
    test('responds single top applicant', async () => {
        const response = await request(app).get('/awesome/applicant');
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.length).toEqual(1)
    });
});

describe('POST /awesome/applicants', () => {
    test('creates a new applicant', async () => {
        const newUser = {
            name: 'John Doe',
            skills: 'js, ts',
            hobbies: 'hiking, gaming',
            goals: 'learn new tech, improve coding skills',
        };

        const response = await request(app).post('/awesome/applicant').send(newUser);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Applicant created');
    });
});

describe('PUT /awesome/applicants/:id', () => {
    test('updates an existing applicant', async () => {
        const updatedData = {
            name: 'Updated Name',
            skills: 'new skill',
            hobbies: 'new hobby',
            goals: 'new goal',
        };

        const response = await request(app).put('/awesome/applicant/5').send(updatedData);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Applicant updated');
    });

});

describe('DELETE /awesome/applicants/:id', () => {
    test('deletes an existing applicant and responds with the deleted user', async () => {
        const response = await request(app).delete('/awesome/applicant/7');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Applicant deleted');
    });
});

