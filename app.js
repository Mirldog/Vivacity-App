"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const app = (0, express_1.default)();
const port = 3000;
const pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'viv-applicant',
    password: 'M1rley~plus',
    port: 5432
});
app.use(express_1.default.json());
app.get('/awesome/applicant', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'SELECT id, name, skills, hobbies, goals FROM public.applicant WHERE id = 1';
        const result = yield pool.query(query);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.get('/awesome/applicant/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'SELECT id, name, skills, hobbies, goals FROM public.applicant';
        const result = yield pool.query(query);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.post('/awesome/applicant', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ message: 'No data provided' });
    }
    try {
        const { skills, hobbies, goals } = data || "";
        const query = `INSERT INTO public.applicant (name, skills, hobbies, goals) VALUES ('${data.name}','${skills}','${hobbies}','${goals}' )`;
        const result = yield pool.query(query);
        res.json({ message: "Applicant created" });
    }
    catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.put('/awesome/applicant/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const id = req.params.id;
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ message: 'No data provided' });
    }
    try {
        const { skills, hobbies, goals } = data || "";
        const query = `UPDATE public.applicant SET name ='${data.name}', skills = '${skills}', hobbies = '${hobbies}', goals='${goals}' WHERE id = ${id}`;
        const result = yield pool.query(query);
        res.json({ message: "Applicant updated", applicant: result.rows[0] });
    }
    catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.delete('/awesome/applicant/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const query = `DELETE FROM public.applicant WHERE id = ${id}`;
        const result = yield pool.query(query);
        res.json({ message: "Applicant deleted", applicant: result.rows[0] });
    }
    catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
module.exports = app;
