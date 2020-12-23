const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

app.use((req, res, next) => {
  console.log('Logging...');
  next();
});

app.use((req, res, next) => {
  console.log('Authenticating...');
  next();
});

const courses = [
  { id: 1, name: 'React' },
  { id: 2, name: 'Node' },
  { id: 3, name: 'mongoDB' },
];

app.get('/', (req, res) => {
  res.send('Hello world from express');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course)
    return res.status(404).send('Course with the provided ID was not found');

  res.send(course);
});

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);

  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
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

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course)
    return res.status(404).send('Course with the provided ID was not found');

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));
