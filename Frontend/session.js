$(document).ready(function () {
  if (sessionStorage.getItem("SessionName") !== null) {
    $("#rightButton")[0].textContent = "LOG OUT";
    $("#rightButton")[0].href = "index.html";
    $("#rightButton")[0].onclick = function () {
      sessionEmpty();
      stop;
    };
    $("#leftButton")[0].textContent = sessionStorage
      .getItem("SessionName")
      .toUpperCase();
    $("#leftButton")[0].href = "user.html";

    $("#courseBt")[0].hidden = false;
    $("#testBt")[0].hidden = false;
    $("#overviewBt")[0].hidden = false;
  } else {
    $("#courseBt")[0].hidden = true;
    $("#testBt")[0].hidden = true;
    $("#overviewBt")[0].hidden = true;
  }
});

function sessionEmpty() {
  sessionStorage.removeItem("SessionName");
  sessionStorage.removeItem("SessionID");
  document.location.reload();
}
