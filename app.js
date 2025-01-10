const express = require("express"); // importing express to our project
const app = express(); // invoke the express method
const jobsController = require("./controllers/jobs.controller");

const PORT = 4000; // the port number our server will listen on


app.use(express.json());

app.use(express.static(`${__dirname}/public`)); // Serve static files from the server

app.get("/test", (req, res) => {
    res.send("Hello World!");
});

app.use("/jobs", jobsController);



app.listen(PORT, () => {
    console.log("server is running on port: ", PORT);
});