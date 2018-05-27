import express from 'express';
import students from '../data/students.json';
import _ from 'lodash';
import mongoose from 'mongoose';


const DB_USER = 'amigo';
const DB_PASSWORD = 'Qwerty';
const DB_URL = `mongodb://${DB_USER}:${DB_PASSWORD}@ds237620.mlab.com:37620/sandboxprabhu`
const router = express.Router();

let studentsArray = students;

mongoose.connect(DB_URL);
mongoose.connection.once('open', () => console.log('We are connected to the database...'));
//const Cat = mongoose.model('Cat', { name: String });

const StudentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  course: String
});

const StudentModel = mongoose.model('Student', StudentSchema);

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));



router.get('/:id', (req, res) => {
  const userId = req.params.id;
  // const studentf = studentsArray.filter((data) => data.id === userId);
  // if (studentf) {
  //   res.json(studentf);
  // }
  // else {
  //   res.send(`User ${userId} is not found`);
  // }
  //res.end();
  StudentModel.findById(userId, (err, student) => {
    if (err) res.status(500).send(err);
    if (student) {
      res.json(student);
    }
    else {
      res.status(404).send(`User ${userId} is not found`);
    }
    //res.end();

  })

});


router.get('/', (req, res) => {
  //res.json(studentsArray);
  StudentModel.find((err, students) => {
    if (err) res.status(500).send(err);
    res.json(students);
  })
});


router.post('/', (req, res) => {
  /*console.log("handling POST request");
  studentsArray.push(req.body);
  res.status(200).send("OK");
  //res.json(students);*/
  const id = mongoose.Types.ObjectId();
  const studentToPersist = Object.assign({ _id: id }, req.body);
  const student = new StudentModel(studentToPersist);
  student.save().then((err, student) => {
    if (err) res.status(500).send(err);
    res.json(student);
  })
});


router.put('/:id', (req, res) => {
  StudentModel.findById(req.params.id,(err,student)=>
  {
    if (err)  res.status(500).send(err);
    if (student){
      student.name = req.body.name;
      student.course = req.body.course;
      student.save().then((err, student)=>{
        if (err) res.status(500).send(err);
        res.json(student);
      })   
    }
    else{
      res.send(404).send("User is not found");
    }
  })
  // console.log("handling PUT request");
  // res.end();
  //res.json(students);
});

router.delete('/:id', (req, res) => {
  StudentModel.findByIdAndRemove(req.params.id,(err,student)=>
  {
    if (err)  res.status(500).send(err);
    if (student){ 
        res.status(200).send('Student was deleted');
    }
    else
    {
      res.status(404).send('Not Found');
    }
  })
  // console.log("handling DELETE request");
  // res.end();
  //res.json(students);
});


//Implement the logic to validate the id passed as the url parameter
// router.param('id', (req, res, next, id) => {
//   if (isNaN(id)) {
//     next(`${id} is not a number`);
//   }
//   next();
// })

module.exports = router;