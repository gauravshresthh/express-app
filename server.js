const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

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

app.post('/api/courses', (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);

  res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );

  if (!course) {
    res.status(404).send('Course with the provided ID was not found');
  }
  res.send(course);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));
