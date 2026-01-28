const express = require("express");
const mongodb = require("./data/database");
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept, Z-key');
    res.setHeader('Access-Control-Allow-Method', 'GET,POST,PUT,DELETE,OPTIONS');
    next();
  })
  

app.use("/", require("./routes"));
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Web Server is listening at port ${port}`);
    });
  }
});
