const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

const port = process.env.PORT || 2000;

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./api'));

// where the static files are
app.use(express.static(path.join(__dirname, '../public')));


app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});


app.listen(port, () => {
  console.log(`Serving it all on PORT ${port}`)
})