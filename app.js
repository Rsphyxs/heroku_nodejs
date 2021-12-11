const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { Client } = require('pg');
const { response } = require('express');
const cors = require('cors');
app.use(cors());
const port = process.env.PORT || 210;

const client = new Client({
    // Lengkapi koneksi dengan database
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "",
    database: "pcb_project",
  });

  client.connect((err) =>{
    if (err) {
        console.error(err);
        return;
    }
    console.log('Database Connected');
  });
  
  app.get("/show", async (req, res) => {
    try {
        const allTodos = await client.query("SELECT * FROM pcbTable");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
  });

  app.post('/add', async(req, res) => {
    try {
      const username = req.body.username;
      const email  = req.body.email;
      const password  = req.body.password;

      const todo = await client.query(`INSERT INTO pcbTable VALUES (default, '${username}', '${email}', '${password}')`);
      
      console.log("Berhasil di insert bro");
      res.json({status:'success'});
    } catch (err) {
      // console.log(req.body);
      console.error(err.message);
      console.log("Ga masuk cok");
      res.json({status:'fail'});
    }
  });

  app.post('/verif', function (request, response) {
    const username = request.body.username;
    const email = request.body.email;
    console.log(username);
    console.log(email);
    if (username && email) {
        client.query('SELECT COUNT(username) FROM pcbTable WHERE username = $1 OR email = $2', [username, email], function (error, results, fields) { 
          if (results.rows[0].count == 0) {
                console.log("Username dan password tidak terdaftar");
                response.jsonp({ success: false });
            } else {
                console.log("Username dan password terdaftar");
                response.jsonp({ success: true });
            }
            response.end();
        });
    } else {
        console.log("Ga masuk");
        response.send('Please enter Username and Password!');
        response.end();
    }
  });

  app.post('/login', function (request, response) {
    const password = request.body.password;
    const email = request.body.email;
    console.log("email: " + email);
    console.log("password: " + password);
    if (email && password) {
        client.query('SELECT COUNT(username) FROM pcbTable WHERE email = $1 AND password = $2', [email, password], function (error, results, fields) { 
          if (results.rows[0].count == 0) {
                console.log("Username dan password tidak terdaftar");
                response.jsonp({ success: false });
            } else {
                console.log("Username dan password terdaftar");
                response.jsonp({ success: true });
            }
            response.end();
        });
    } else {
        console.log("Ga masuk");
        response.send('Please enter Username and Password!');
        response.end();
    }
  });

  app.post("/update", async (request, res) => {
    const id = request.body.id;
    const username = request.body.username;
    const email = request.body.email;
    const password = request.body.password;
    try {
        const todo = await client.query(`UPDATE pcbTable SET username = $2, email = $3, password = $4 WHERE id= $1`, [id, username, email, password]);
        res.json({status:'success'});
    } catch (err) {
        console.error(err.message);
        res.json({status:'failed'});
    }
  });
  
  app.post('/username', async(req, res) => {
    try {
      const email  = req.body.email;

      const todo = await client.query(`select * from pcbTable where email = '${email}'`);
      
      console.log("Berhasil di show bro");
      // console.log(todo.rows[0].username);
      // res.json({username: todo.rows[0].username});
      console.log(todo.rows);
      res.json(todo.rows);
    } catch (err) {
      // console.log(req.body);
      console.error(err.message);
      console.log("Ga masuk cok");
      res.json({status:'fail'});
    }
  });

  app.post("/cpu", async (req, res) => {
    try {
        const todo = await client.query("SELECT * FROM CPU");
        console.log(todo.rows);
        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
  });

  app.post("/motherboard", async (req, res) => {
    try {
        const todo = await client.query("SELECT * FROM motherboard");
        console.log(todo.rows);
        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
  });

  app.post("/gpu", async (req, res) => {
    try {
        const todo = await client.query("SELECT * FROM gpu");
        console.log(todo.rows);
        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
  });

  app.post("/ram", async (req, res) => {
    try {
        const todo = await client.query("SELECT * FROM ram");
        console.log(todo.rows);
        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
  });

  app.post("/storage", async (req, res) => {
    try {
        const todo = await client.query("SELECT * FROM storage");
        console.log(todo.rows);
        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
  });

  app.post("/psu", async (req, res) => {
    try {
        const todo = await client.query("SELECT * FROM psu");
        console.log(todo.rows);
        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
  });

  
  app.post("/casing", async (req, res) => {
    try {
        const todo = await client.query("SELECT * FROM casing");
        console.log(todo.rows);
        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
  });

  app.post("/fan", async (req, res) => {
    try {
        const todo = await client.query("SELECT * FROM fan");
        console.log(todo.rows);
        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
  });

  app.post("/rekomendasi", async (req, res) => {
    try {
        const todo = await client.query("SELECT * FROM data_rekomendasi");
        console.log(todo.rows);
        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
  });


  app.listen(port, () => {
    console.log(`Program sudah berjalan pada port ${port}`);
  });