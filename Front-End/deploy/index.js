const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {
  console.log("middle called")
  next()
})
app.use(express.static(__dirname + '/dist/HalifaxFoodie'));

app.get('/*', function (req, res) {
  console.log("called")
  res.sendFile(path.join(__dirname, '/dist/HalifaxFoodie/index.html'));
});

const port = process.env.PORT || 5000
app.listen(port, "0.0.0.0", () => {
  console.log("App is running on " + port)
});