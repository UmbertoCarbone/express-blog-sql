const express = require("express");
const app = express();
const port = 3041;
const blogrouter = require("./routes/posts");

const notFound = require("./middlewares/notFoundError")
const serverError = require("./middlewares/errorHandler")





//Middleware option 2 //function 
/* app.use((req, res, next) => {
  console.log("I am a middleware");
  next();
}); */

app.use(express.static("public"));
//funzione post
app.use(express.json());

app.use("/blog", blogrouter);
app.use(serverError);
app.use(notFound);
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
