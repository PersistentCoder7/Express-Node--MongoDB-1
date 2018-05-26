import express from 'express';

import _ from 'lodash';
import studentRoute from './routes/studentroute';

const PORT = 3000;
const server = express();
const buildUrl = (version, path) => `/api/${version}/${path}`
const STUDENT_BASE_URL = buildUrl('v1', 'students');


server.use(STUDENT_BASE_URL,studentRoute);

server.get('/', (req, res) => {
  res.send('My first route using express js');
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