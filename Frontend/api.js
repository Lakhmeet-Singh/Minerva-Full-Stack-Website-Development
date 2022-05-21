var Link = "http://localhost:3000" || "https://backendminerva.herokuapp.com"; // Link got localhost when the backend is hosted in local
var selectedCourse = 0;
$(function () {
  // CREATE/POST
  $("#register").on("submit", function (event) {
    event.preventDefault(); // to not follow the event, blocking post method of the submitting form

    // console.log('succ');

    // retrieve data from text inputs
    var firstname = $("#firstname");
    var lastname = $("#lastname");
    var email = $("#email");
    var password = $("#password");

    //ajax call
    $.ajax({
      url: Link + "/account",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        fname: firstname.val(), // values that need to be posted
        lname: lastname.val(),
        mail: email.val(),
        pass: password.val(),
      }),
      success: function (response) {
        // "response" is what we get from the back-end, it could be a JSON
        // alert("Register succeded!");

        alert(
          "Thank you " +
            firstname.val() +
            ", your registration has been successfully completed, now you can login."
        );
        document.location.href = "signin.html";
      },
    });
  });

  $("#signin").on("submit", function (event) {
    event.preventDefault(); // to not follow the event, blocking post method of the submitting form

    // console.log('succ');

    // retrieve data from text inputs

    var email = $("#email");
    var password = $("#password");

    //ajax call
    $.ajax({
      url: Link + "/login",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        mail: email.val(), // values that need to be posted
        pass: password.val(),
      }),
      success: function (response) {
        // "response" is what we get from the back-end, it could be a JSON

        if (response.length != 0) {
          sessionStorage.setItem("SessionID", response[0].id);
          sessionStorage.setItem("SessionName", response[0].firstName);
          // setting session variable into memory
          alert("login success " + response[0].firstName);
          document.location.href = "./index.html";
        } else alert("wrong email or password"); // printing the value for testing
      },
    });
  });

  $("#changeInfo").on("submit", function (event) {
    event.preventDefault(); // to not follow the event, blocking post method of the submitting form

    // console.log('succ');

    // retrieve data from text inputs

    //ajax call
    $.ajax({
      url: Link + "/changeInfo",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        id: sessionStorage.getItem("SessionID"),
        email: emptyToNull($("#emailU").val()),
        pass: emptyToNull($("#passU").val()),
        firstName: emptyToNull($("#firstNameI").val()),
        lastName: emptyToNull($("#lastNameI").val()),
        phoneNumber: emptyToNull($("#phoneNumberU").val()),
        dateBirth: emptyToNull($("#dateBirthU").val()),
        gender: emptyToNull($("#genderU").val()),
        country: emptyToNull($("#countryU").val()),
      }),
      success: function (response) {
        // "response" is what we get from the back-end, it could be a JSON

        alert("Information successfully changed!");
      },
    });
  });
});
function generateCourses(courses) {
  // Sessionstate
  $.ajax({
    url: Link + "/sendCourses",
    method: "GET",
    data: JSON.stringify({
      id: sessionStorage.getItem("SessionID"),
    }),
    contentType: "application/json",
    success: function (response) {
      // "response" is what we get from the back-end, it could be a JSON
      courses[0].innerHTML += '<section class="course_section">';
      response.forEach((element) => {
        courses[0].innerHTML +=
          '<div class="row"><div class="course-column maths">' +
          '<div class="content">' +
          "<h3>" +
          element.courseName +
          "</h3>" +
          "<p> <b> Description: </b> " +
          element.description +
          "</p> <br>" +
          '<div class="btn">' +
          '<a id="course' +
          element.id +
          '"' +
          'class="button"> <b>' +
          "</b></a>";
        courseButtonName(element.id);
      });
      courses[0].innerHTML += "</section>";
    },
  });
}
function sendResults(percentage) {
  // Sessionstate
  $.ajax({
    url: Link + "/sendTest",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      percentage: percentage, // values that need to be posted
    }),
    success: function (response) {
      // "response" is what we get from the back-end, it could be a JSON
      $("#quizContainer")[0].innerHTML =
        '<h3 class="title"> Percentage: ' +
        response.percentage +
        "%</h3> <br> <br>" +
        '<h3 class="title"> Outcome: ' +
        getOutcome(response.outcome) +
        "</h3> <br> <br>" +
        '<a  href="tests.html" ><button class="backbtn btn">Back to Test</button></a>';
    },
  });
}
function generateTests(tests) {
  $.ajax({
    url: Link + "/sendCourses",
    method: "POST",
    contentType: "application/json",
    success: function (response) {
      // "response" is what we get from the back-end, it could be a JSON
      let x = 1;
      response.forEach((element) => {
        courses[0].innerHTML +=
          '<button class="button' + x + '">' + element.courseName + "</button>";
        x++;
      });
    },
  });
}
function getTestAttempts() {
  $.ajax({
    url: Link + "/getTestAttempts",
    method: "POST",
    data: JSON.stringify({
      session: sessionStorage.getItem("SessionID"), // values that need to be posted
    }),
    contentType: "application/json",

    success: function (response) {
      // "response" is what we get from the back-end, it could be a JSON

      response;
    },
  });
}
function getUserInfo() {
  // Sessionstate
  $.ajax({
    url: Link + "/getUserInfo",
    method: "POST",
    data: JSON.stringify({
      session: sessionStorage.getItem("SessionID"), // values that need to be posted
    }),
    contentType: "application/json",

    success: function (response) {
      // "response" is what we get from the back-end, it could be a JSON

      $("#emailU")[0].value = response[0].email;
      $("#passU")[0].value = response[0].pass;
      $("#firstNameI")[0].value = response[0].firstName;
      $("#lastNameI")[0].value = response[0].lastName;
      $("#phoneNumberU")[0].value = response[0].phoneNumber;
      $("#dateBirthU")[0].value = response[0].dateBirth;
      $("#genderU")[0].value = response[0].gender;
      $("#countryU")[0].value = response[0].country;
    },
  });
}

function emptyToNull(x) {
  if (x != "") return x;
  else return null;
}

function getOutcome(x) {
  if (x == 0) return "Failed";
  else return "Passed";
}

function courseButtonName(id) {
  let x;
  $.ajax({
    url: Link + "/enrollmentCheck",
    method: "POST",
    data: JSON.stringify({
      session: sessionStorage.getItem("SessionID"), // values that need to be posted
      courseID: id,
    }),
    contentType: "application/json",

    success: function (response) {
      if (!(response.length != 0)) {
        $("#course" + id)[0].onclick = function () {
          sessionStorage.setItem("SessionCourse", id);
          Enrollment(id);
          alert("User successfully enrolled!");
          document.location.href = "topic.html";
        };

        $("#course" + id)[0].innerHTML = "Enroll now";
      } else {
        $("#course" + id)[0].onclick = function () {
          sessionStorage.setItem("SessionCourse", id);
          document.location.href = "topic.html";
        };

        $("#course" + id)[0].innerHTML = "Enter";
      }
    },
  });
}

function Enrollment(id) {
  $.ajax({
    url: Link + "/enrollment",
    method: "POST",
    data: JSON.stringify({
      session: sessionStorage.getItem("SessionID"), // values that need to be posted
      courseID: id,
    }),
    contentType: "application/json",

    success: function (response) {},
  });
}

function generateResults(results) {
  $.ajax({
    url: Link + "/generateResults",
    method: "POST",
    data: JSON.stringify({
      session: sessionStorage.getItem("SessionID"), // values that need to be posted
    }),
    contentType: "application/json",

    success: function (response) {
      results.innerHTML += '<section class="course_section"><div class="row">';

      response.forEach((element) => {
        results.innerHTML +=
          '<div class="course-column maths"><div class="content">' +
          "<p> <b> Course Name: " +
          element.courseName +
          " </b>  </p> <br>" +
          "<p> <b> Percentage: " +
          element.percentage +
          " </b>  </p> <br>" +
          "<p> <b> Outcome: " +
          getOutcome(element.outcome) +
          "</b>    </p> <br></div></div>";
      });
      results.innerHTML += "</div></section>";
    },
  });
}

function generateCertificate() {
  window.jsPDF = window.jspdf.jsPDF;
  var doc = new jsPDF();

  $.ajax({
    url: Link + "/generateCertificate",
    method: "POST",
    data: JSON.stringify({
      session: sessionStorage.getItem("SessionID"), // values that need to be posted
    }),
    contentType: "application/json",

    success: function (response) {
      doc.text(response[0].firstName + " " + response[0].lastName, 15, 25);
      doc.text("Minerva Administration Staff", 125, 25);
      doc.text(
        "This is a valid certificate showing your results during",
        30,
        50
      );
      doc.text("your journey here in Minerva.", 30, 60);
      let y1 = 80;
      let y2 = 0;
      response.forEach((element) => {
        doc.text("Course Name: ", 15, y1);
        doc.text(element.courseName, 100, y1 + y2);
        y2 = 0;
        y1 += 10;
        doc.text("Percentage: ", 15, y1);
        doc.text(element.percentage + "%", 100, y1);
        y1 += 10;
        doc.text("Outcome: ", 15, y1);
        doc.text(getOutcome(element.outcome), 100, y1);
        y2 = 20;
      });

      doc.save("minervaCertificate.pdf");
    },
  });
}
function generateTopics() {
  $.ajax({
    url: Link + "/generateTopics",
    method: "POST",
    data: JSON.stringify({
      courseID: sessionStorage.getItem("SessionCourse"),
    }),
    contentType: "application/json",

    success: function (response) {
      $("#topicCourseName")[0].innerHTML = response[0].courseName;
      let x = 1;
      response.forEach((element) => {
        $("#topicList")[0].innerHTML +=
          '<li><a onclick="getTopic(this.id)"id="' +
          element.id +
          '"href="#">' +
          x +
          " - " +
          element.lectureName +
          "</a></li>";
        x++;
      });
    },
  });
}

function getTopic(id) {
  $.ajax({
    url: Link + "/getTopic",
    method: "POST",
    data: JSON.stringify({
      lectureID: id,
    }),
    contentType: "application/json",

    success: function (response) {
      $("#lectureName")[0].innerHTML = response[0].lectureName;
      $("#payload")[0].innerHTML = response[0].payload;
    },
  });
}
function hashCode() {
  var hash = 0;
  for (var i = 0; i < this.length; i++) {
    var char = this.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}
