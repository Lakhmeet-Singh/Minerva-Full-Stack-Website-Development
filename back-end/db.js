const mysql = require("mysql");
// query that inserts user registration data inside of a new row
const newuserquery =
  "insert into sys.Student (firstName, lastName, email, pass)" +
  "values (?, ?, ?, ?);";

// testing query
const testquery =
  "insert into sys.Student (firstName, lastName)" +
  "values ('yahya', 'elyamine');";

const loginquery =
  "select id, firstName from sys.Student where email = ? and pass = ?;";

const sendtestquery =
  "insert into sys.testAttempt (percentage, outcome )" + "values (?, ?);";
const sendCoursesQuery = "select id, courseName, description from sys.Course;";

const getUserInfoQuery = "select * from sys.Student where id = ?";

const changeInfoQuery =
  "replace into sys.Student (username, email, pass, firstName, lastName, phoneNumber, dateBirth, age, gender, country )" +
  "values (?) where id = ?;";
const enrollmentCheckQuery =
  "select id from sys.Enrollment where studentID = ? and CourseID = ?;";
const enrollmentQuery =
  "insert into sys.Enrollment (studentID, CourseID) values(?, ?);";
const generateResultsQuery =
  "select courseName, percentage, outcome from sys.testAttempt inner join sys.Enrollment on sys.Enrollment.id = EnrollmentID inner join sys.Course on sys.Course.id = CourseID where studentID = ?;";
const generateCertificateQuery =
  "select firstName, lastName, courseName, percentage, outcome from sys.testAttempt inner join sys.Enrollment on sys.Enrollment.id = EnrollmentID inner join sys.Course on sys.Course.id = courseID inner join sys.Student on sys.Student.id = studentID where studentID = ?;";
const changeInfoQuery2 = "UPDATE sys.Student SET ? where sys.Student.id = ?";
const generateTopicsQuery =
  "select sys.Lecture.id, lectureName, courseName from sys.Lecture inner join sys.Course on sys.Course.id = courseID where courseID = ?;";
const getTopicQuery =
  "select payload, lectureName from sys.Lecture where sys.Lecture.id = ?;";
// db connection
const pool = mysql.createPool({
  connectionLimit: 10,
  user: "sgroot",
  password: "2oSQ,u6saD7uRJM3",
  database: "",
  host: "SG-minerva-5874-mysql-master.servers.mongodirector.com",
  port: "3306",
});

// new obj
let students = {};

// create new account
students.newUser = (fname, lname, mail, pass) => {
  // promise allowing asynchrony
  return new Promise((resolve, reject) => {
    pool.query(newuserquery, [fname, lname, mail, pass], (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
};

students.login = (email, pass) => {
  // promise allowing asynchrony
  return new Promise((resolve, reject) => {
    pool.query(loginquery, [email, pass], (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
};
students.sendTest = (percentage) => {
  return new Promise((resolve, reject) => {
    pool.query(
      sendtestquery,
      [parseInt(percentage), percentage > 49],
      (err, results) => {
        if (err) return reject(err);

        return resolve({
          percentage: parseInt(percentage),
          outcome: percentage > 49,
        });
      }
    );
  });
};

students.sendCourses = () => {
  return new Promise((resolve, reject) => {
    pool.query(sendCoursesQuery, (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
};

students.getUserInfo = (session) => {
  return new Promise((resolve, reject) => {
    pool.query(getUserInfoQuery, session, (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
};

students.changeInfo = (infos) => {
  return new Promise((resolve, reject) => {
    try {
      var id = infos.id;
      delete infos["id"];
      pool.query(changeInfoQuery2, [infos, parseInt(id)], (err, results) => {
        if (err) return reject(err);

        return resolve(true);
      });
    } catch (error) {
      return resolve(false);
    }
  });
};

students.enrollmentCheck = (userid, courseid) => {
  return new Promise((resolve, reject) => {
    pool.query(enrollmentCheckQuery, [userid, courseid], (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
};

students.enrollment = (userid, courseid) => {
  return new Promise((resolve, reject) => {
    pool.query(enrollmentQuery, [userid, courseid], (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

students.generateResults = (userid) => {
  return new Promise((resolve, reject) => {
    pool.query(generateResultsQuery, userid, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

students.generateCertificate = (userid) => {
  return new Promise((resolve, reject) => {
    pool.query(generateCertificateQuery, userid, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

students.generateTopics = (courseID) => {
  return new Promise((resolve, reject) => {
    pool.query(generateTopicsQuery, courseID, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

students.getTopic = (lectureID) => {
  return new Promise((resolve, reject) => {
    pool.query(getTopicQuery, lectureID, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};
// exporting students obj
module.exports = students;
