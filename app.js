import express from 'express';
import students from './data/students.json';
import _ from 'lodash';

const PORT = 3000;
const server = express();
const buildUrl = (version, path) => `/api/${version}/${path}`
const STUDENT_BASE_URL = buildUrl('v1', 'students');

server.get('/', (req, res) => {
  res.send('My first route using express js');
});


server.get(`${STUDENT_BASE_URL}/:id`, (req, res) => {
  const userId = req.params.id;
  const studentf = students.filter((data) => data.id === userId);
  if (studentf) {
    res.json(studentf);
  }
  else {
    res.send(`User ${userId} is not found`);
  }
  //res.end();
});


server.get(STUDENT_BASE_URL, (req, res) => {
  res.json(students);
});


server.post(STUDENT_BASE_URL, (req, res) => {
  console.log("handling POST request");
  res.end();
  //res.json(students);
});


server.put(STUDENT_BASE_URL, (req, res) => {
  console.log("handling PUT request");
  res.end();
  //res.json(students);
});

server.delete(STUDENT_BASE_URL, (req, res) => {
  console.log("handling DELETE request");
  res.end();
  //res.json(students);
});


server.get('/route-handlers', (req,res, next) => {
  res.send('learning route handler is cool');
  next();
}, (req,res,next) => {
  console.log('Second route handler');
  next();
}, (req,res) => {
  console.log('Third route handler');
})


server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});