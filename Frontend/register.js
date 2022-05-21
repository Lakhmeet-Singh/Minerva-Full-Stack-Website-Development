//formValid - is the form valid
//formInput - different inputs entered by user
var formValid=false;
var formInput = 
{
    firstname:null,
    lastname:null,
    email:null,
    password:null,
    retypePassword:null,
    tc_CheckBox:null
}

//Read form input by finding the elements in HTML document
function FormRead(){
    formInput.firstname = document.getElementById("firstname");
    formInput.lastname = document.getElementById("lastname");
    formInput.email = document.getElementById("email");
    formInput.password = document.getElementById("password");
    formInput.retypePassword = document.getElementById("repeatPassword");
    formInput. tc_CheckBox = document.getElementById("t&c");
}

// Form input checks
function FormValidate() {
    if (formInput.firstname.validity.valueMissing 
        || formInput.lastname.validity.valueMissing 
        || formInput.email.validity.valueMissing 
        || formInput.password.validity.valueMissing
        || formInput.retypePassword.validity.valueMissing){
            alert("Please fill in all required fields.");
    } else if (formInput.email.validity.typeMismatch){
        alert("Please use a valid email address.");
    } else if (formInput.password.validity.tooShort){
        alert("Password needs to be minimum of 8 characters.");
    } else if(formInput.password.value !== repeatPassword.value) {
        alert("Passwords do not match. Please retry");
    } else if (formInput.tc_CheckBox.validity.valueMissing){
        alert("Please agree to the Terms and Conditions, and Privacy Policy.")
    }else {
        formValid = true;
    }
}

// Creating a newParagraph
function NewParagraph(content){
    var message = document.createTextNode(content);
    var para = document.createElement("p");
    para.appendChild(message);

    var box = document.getElementById("messageHidden");
    box.appendChild(para);
}

