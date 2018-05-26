import express from 'express';
import students from '../data/students.json';
import _ from 'lodash';
const router = express.Router();


router.get('/:id', (req, res) => {
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


router.get('/', (req, res) => {
  res.json(students);
});


router.post('/', (req, res) => {
  console.log("handling POST request");
  res.end();
  //res.json(students);
});


router.put('/', (req, res) => {
  console.log("handling PUT request");
  res.end();
  //res.json(students);
});

router.delete('/', (req, res) => {
  console.log("handling DELETE request");
  res.end();
  //res.json(students);
});


//Implement the logic to validate the id passed as the url parameter
router.param('id',(req, res,next,id)=>{
  if (isNaN(id)){
    next(`${id} is not a number`);
  }
  next();
})

module.exports = router;