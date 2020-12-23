const express = require('express');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');

const logger = require('./middlewares/logger');
const auth = require('./middlewares/auth');

const courses = require('./routes/courses');
const home = require('./routes/home');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled...');
}
app.use(helmet());

// CONFIGURATION
console.log(`Application Name : ${config.get('name')}`);

console.log(`Mail Server : ${config.get('mail.host')}`);

app.use(logger);
app.use(auth);

app.use('/', home);
app.use('/api/courses', courses);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));
