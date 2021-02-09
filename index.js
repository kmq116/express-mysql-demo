const express = require("express");
const app = express();
const port = 3000;
const router = require("./router/index");

app.use(express.json())

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }
// app.use(requestLogger)
app.use("/", router);

app.listen(port, () => console.log(`Example app listening on port port!`));
