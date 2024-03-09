const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');
const { Pool } = require('pg');
const pgp = require('pg-promise')();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'caremaster',
  password: 'admin',
  port: 5432,
};

const db = pgp(dbConfig);

app.prepare()
    .then(() => {
        const server = express();
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({ extended: true }));

        server.get('/api/v1/users', async (req, res) => {
           /*
            try {
                const users = [
                    { id: 1, name: "John Doe 1" },
                    { id: 2, name: "Jane Doe 2" },
                ];

                return res.status(200).json(users);
            } catch (error) {
                throw error;
            }
            */
            try {
              const users = await db.any('SELECT * FROM users');
              res.setHeader('Cache-Control', 'no-store');
              return res.status(200).json(users);
            } catch (error) {
              console.error('Error fetching users:', error);
              return res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(3000, (err) => {
            if (err) throw err;
            console.log('> Ready on http://localhost:3000');
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
