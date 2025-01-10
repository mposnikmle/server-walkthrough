// localhost:4000/jobs
const router = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const DB_PATH = "./assets/job-details.db.json";

/* 
endpoint: localhost:4000/jobs/add
request type: POST
description: adds a new job to the database
message: "Job added successfully"
*/

// POST
// http://localhost:4000/jobs/add
router.post("/add", (req, res) => {
    const { dateApplied, companyName, jobTitle, contact, status } = req.body;
    let jobArray = read();
    let newJob = {
        id: uuidv4(),
        dateApplied: dateApplied,
        companyName: companyName,
        jobTitle: jobTitle,
        contact: contact,
        status: status,
    };

    jobArray.push(newJob);
    save(jobArray);
    res.json({
        message: "Job added successfully",
        jobs: jobArray,
        recordCount: jobArray.length,
    });
})

/* 
endpoint: localhost:4000/jobs/all
request type: GET
description: returns all jobs
*/

// GET
// http://localhost:4000/jobs/all
router.get("/all", (req, res) => {
    let jobArray = read();
    res.json({ message: "All jobs success", jobs: jobArray})
});

/* 
endpoint: localhost:4000/jobs/get-by-id/:id
request: GET
description: returns a job by id
*/

// GET
// http://localhost:4000/:id
router.get("/:id", (req, res) => {
    try {
        console.log(req.params);

        let jobArray = read();

        let job = jobArray.find((jobObject) => jobObject.id === req.params.id);

        if (!job) {
            throw new Error("Job Not Found");
        }

        res.json({ message: "Job by id success", job: job})
        

    } catch (err) {
        res.status(500).json({
            message: "error",
            errorMessage: err.message,
        });
    }
})

router.delete("/delete/:id", (req, res) => {
    try {
        console.log(req.params);

        let jobArray = read();

        let filteredJobArray = jobArray.filter( (jobObject) => jobObject.id !== req.params.id);

        if (jobArray.length === filteredJobArray.length) {
            throw new Error("Job not found")
        }

        res.json({
            message: "job deleted",
            jobs: filteredJobArray,
            recordCount: filteredJobArray.length,
        })

        save(filteredJobArray);
    } catch (error) {
        res.status(500).json({
            message: "error",
            errorMessage: error.message,
        });
    }
})






//! Helper Functions

/* 
Read Function for reading a file.
*/
function read() {
    const file = fs.readFileSync(DB_PATH);
    return JSON.parse(file);
}

function save(data) {
const file = fs.writeFileSync(DB_PATH, JSON.stringify(data));
}


module.exports = router;