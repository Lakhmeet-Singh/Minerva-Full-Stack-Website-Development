var student = require("./db"); // db object
var bodyParser = require("body-parser"); // handling json
const express = require("express"); // server
const cors = require("cors"); // infrastructure allowing request from/to different domains

const app = express(); // instance of the server

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

var PORT = process.env.PORT || 3000; // server port

// testing
app.get("/test", function (req, res) {
  res.json({
    x: {},
  });
});

//api post, retrieves data from the call and creates a new account inside of the database
app.post("/account", function (req, res) {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var mail = req.body.mail;
  var pass = req.body.pass;

  student.newUser(fname, lname, mail, pass); // calls the method from db obj

  res.json({
    x: 3, // give response from registration
  });
});

app.post("/login", function (req, res) {
  //
  student.login(req.body.mail, req.body.pass).then((session) => {
    res.json(session);
  });
});

app.post("/sendTest", function (req, res) {
  student.sendTest(req.body.percentage).then((outcome) => {
    res.json(outcome);
  });
});

app.get("/sendCourses", function (req, res) {
  student.sendCourses().then((courses) => {
    res.json(courses);
  });
});

app.post("/getUserInfo", function (req, res) {
  student.getUserInfo(req.body.session).then((userinfo) => {
    res.json(userinfo);
  });
});

app.post("/changeInfo", function (req, res) {
  student.changeInfo(req.body).then((flag) => {
    res.json(flag);
  });
});

app.post("/enrollmentCheck", function (req, res) {
  student.enrollmentCheck(req.body.session, req.body.courseID).then((id) => {
    res.json(id);
  });
});
app.post("/enrollment", function (req, res) {
  student.enrollment(req.body.session, req.body.courseID).then((id) => {
    res.json(id);
  });
});
app.post("/generateResults", function (req, res) {
  student.generateResults(req.body.session).then((results) => {
    res.json(results);
  });
});

app.post("/generateCertificate", function (req, res) {
  student.generateCertificate(req.body.session).then((results) => {
    res.json(results);
  });
});
app.post("/generateTopics", function (req, res) {
  student.generateTopics(req.body.courseID).then((results) => {
    res.json(results);
  });
});

app.post("/getTopic", function (req, res) {
  student.getTopic(req.body.lectureID).then((results) => {
    res.json(results);
  });
});

// server is listening
app.listen(PORT, function () {
  console.log("Server listening on " + PORT);
});
