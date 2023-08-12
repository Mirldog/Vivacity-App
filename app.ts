import express from 'express';
import { Pool } from 'pg'

const app = express()
const port = 3000

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'viv-applicant',
    password: '',
    port: 5432
})

app.use(express.json())

app.get('/awesome/applicant', async (req, res) => {
    try {
        const query = 'SELECT id, name, skills, hobbies, goals FROM public.applicant WHERE id = 1';
        const result = await pool.query(query);
    
        res.json(result.rows);
      } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
})

app.get('/awesome/applicant/all', async (req, res) => {
    try {
        const query = 'SELECT id, name, skills, hobbies, goals FROM public.applicant';
        const result = await pool.query(query);
    
        res.json(result.rows);
      } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
})

app.post('/awesome/applicant', async (req, res) =>{

    const data = req.body

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ message: 'No data provided' });
        }
    try {

        const {skills, hobbies, goals } = data || ""

        const query = `INSERT INTO public.applicant (name, skills, hobbies, goals) VALUES ('${data.name}','${skills}','${hobbies}','${goals}' )`
        const result = await pool.query(query);
        res.json({message: "Applicant created"})
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.put('/awesome/applicant/:id', async (req, res) => {

    const data = req.body
    const id = req.params.id

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ message: 'No data provided' });
    }
    try {

        const {skills, hobbies, goals } = data || ""

        const query = `UPDATE public.applicant SET name ='${data.name}', skills = '${skills}', hobbies = '${hobbies}', goals='${goals}' WHERE id = ${id}`
        const result = await pool.query(query);
        res.json({message: "Applicant updated", applicant: result.rows[0]})
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.delete('/awesome/applicant/:id', async (req, res) => {
    const id = req.params.id

    try {

        const query = `DELETE FROM public.applicant WHERE id = ${id}`
        const result = await pool.query(query);

        res.json({message: "Applicant deleted", applicant: result.rows[0]})
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})

module.exports = app
