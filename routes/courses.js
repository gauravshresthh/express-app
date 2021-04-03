const express = require('express');
const router = express.Router();
const Joi = require('joi');

const courses = [
  { id: 1, name: 'React', sex: 'M' },
  { id: 2, name: 'Node', sex: 'F' },
  {
    id: 3,
    name: 'mongoDB',
    sex: 'N/A',
    uri:
      'https://images.unsplash.com/photo-1608585269273-5cacd36870f5?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8dG93SlpGc2twR2d8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
];

router.get('/', (req, res) => {
  res.send(courses);
});

router.get('/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course)
    return res.status(404).send('Course with the provided ID was not found');

  res.send(course);
});

router.post('/', (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);

  res.send(course);
});

router.put('/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course)
    return res.status(404).send('Course with the provided ID was not found');

  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;

  res.send(course);
});

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
};

router.delete('/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course)
    return res.status(404).send('Course with the provided ID was not found');

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

module.exports = router;
