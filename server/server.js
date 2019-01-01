const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;
const myPath = path.join(__dirname, "..", "public");
const app = express();

app.use(express.static(myPath));
app.listen(port, ()=>{
  console.log('The system start on port', port);
})
