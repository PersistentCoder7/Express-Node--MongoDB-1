import express from 'express';
import morgan from 'morgan';
import _ from 'lodash';
import studentRoute from './routes/studentroute';
import bodyParser  from 'body-parser';

const PORT = 3000;
const server = express();
const buildUrl = (version, path) => `/api/${version}/${path}`
const STUDENT_BASE_URL = buildUrl('v1', 'students');


server.use(express.static('public'));


server.get('/download/images/:imageName', (req,res) =>{
  console.log(__dirname + '/public/images/'+req.params.imageName);
  res.sendfile(__dirname + '/public/images/'+req.params.imageName);
} )

server.use(bodyParser.urlencoded({
  extended: true 
}));
server.use(bodyParser.json());
server.use(morgan('combined'));


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