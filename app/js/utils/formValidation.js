// Selecting the form
const form = document.querySelector("form");

// Selecting inputs
const name = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

// Classes to display error
const classes = {
 error: "input-error",
 success: "input-success",
};

// Creating the content of the modal
function createModalSuccess() {
 const modal = document.getElementById("myModal");
 modal.innerHTML = ` <div class="modal-container" role="document">
<div class="modal-body">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <h3>Success</h3>
  </div>
  <div>
    <p>Thanks for contacting me. I will try to get back to you as soon as possible</p>
  </div>
  <div class="modal-footer">
    <a href="index.html" class="btn">Close this message</a>
  </div>
</div>
</div>`;
}

function createModalFail() {
  const modal = document.getElementById("myModal");
  modal.innerHTML = ` <div class="modal-container" role="document">
 <div class="modal-body">
   <div class="modal-header">
     <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
     <h3>Oh no!</h3>
   </div>
   <div>
     <p>Something went wrong when sending the form. Try contacting me by email or phone listed below the form</p>
   </div>
   <div class="modal-footer">
     <a href="index.html" class="btn">Close this message</a>
   </div>
 </div>
 </div>`;
 }

// To check the email is valid
const emailValidation = (email) => {
 const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 return re.test(email);
};

// Returns true if the input argument is empty
const requiredInput = (value) => (value === "" ? false : true);

// Returns false if the length argument is not between the min and max argument
const inputLength = (length, min, max) => (length < min || length > max ? false : true);

// Checking the input value of the names
const checkNameValue = () => {
 const min = 2;
 const max = 20;

 const nameInput = name.value.trim();

 // Setting valid to default as false
 let valid = false;
 // Name value check
 if (!requiredInput(nameInput)) {
  displayError(name, `<i class="fa-solid fa-exclamation"></i> Your name is missing`);
 } else if (!inputLength(nameInput.length, min, max)) {
  displayError(name, `<i class="fa-solid fa-exclamation"></i> Your name have to be more then ${min} characters and less then ${max}`);
 } else {
  displaySuccess(name);
  valid = true;
 }
 return valid;
};

// Checking the input value of the Email
const checkEmailValue = () => {
 const mail = email.value.trim();

 // Setting valid to default as false
 let valid = false;

 // Email value check
 if (!requiredInput(mail)) {
  displayError(email, `<i class="fa-solid fa-exclamation"></i> Email is missing.`);
 } else if (!emailValidation(mail)) {
  displayError(email, `<i class="fa-solid fa-exclamation"></i> Make sure the email is correct.`);
 } else {
  displaySuccess(email);
  valid = true;
 }
 return valid;
};

// Checking the input value of the subject
const checkSubjectValue = () => {
 const min = 5;
 const max = 15;

 const subj = subject.value.trim();

 // Setting valid to default as false
 let valid = false;

 // Subject value check
 if (!requiredInput(subj)) {
  displayError(subject, `<i class="fa-solid fa-exclamation"></i> Subject is missing.`);
 } else if (!inputLength(subj.length, min, max)) {
  displayError(subject, `<i class="fa-solid fa-exclamation"></i> Subject have to be more then ${min} characters and less then ${max}.`);
 } else {
  displaySuccess(subject);
  valid = true;
 }
 return valid;
};

// Checking the input value of the message
const checkMessageValue = () => {
 const min = 25;
 const max = 10000;

 const msg = message.value.trim();

 // Setting valid to default as false
 let valid = false;

 // First name value check
 if (!requiredInput(msg)) {
  displayError(message, `<i class="fa-solid fa-exclamation"></i> This field cant be empty.`);
 } else if (!inputLength(msg.length, min, max)) {
  displayError(message, `<i class="fa-solid fa-exclamation"></i> The message have to be more then ${min} characters and less then ${max}.`);
 } else {
  displaySuccess(message);
  valid = true;
 }
 return valid;
};

// Displaying success
const displaySuccess = (input) => {
 const field = input.parentElement;

 field.classList.remove(`${classes.error}`);
 field.classList.add(`${classes.success}`);

 const susMsg = field.querySelector("small");
 susMsg.innerHTML = `<i class="fa-solid fa-circle-check"></i> Perfect`;
};

// Displaying error message
const displayError = (input, message) => {
 const field = input.parentElement;

 field.classList.add(`${classes.error}`);
 field.classList.remove(`${classes.success}`);

 const errMsg = field.querySelector("small");
 errMsg.innerHTML = message;
};

// Event listener
form.addEventListener("submit", function (e) {
 // prevent the form from submitting
 e.preventDefault();

 // validate fields
 let isNameValid = checkNameValue();
 let isEmailValidation = checkEmailValue();
 let isSubjectValid = checkSubjectValue();
 let isMessageValid = checkMessageValue();
 //  let isChecked = checkCheckboxValue();

 let isFormValid = isNameValid && isEmailValidation && isSubjectValid && isMessageValid;

 // submit to the server if the form is valid
 ajax({
  type: "POST",
  url: "",
  success: function() {
    if (isFormValid) {
      createModalSuccess();
     }else{
      createModalFail();
    }
    }
});


});

// Setting up delay for error handling
const debounce = (fn, delay = 100) => {
 let timeoutId;
 return (...args) => {
  // cancel the previous timer
  if (timeoutId) {
   clearTimeout(timeoutId);
  }
  // setup a new timer
  timeoutId = setTimeout(() => {
   fn.apply(null, args);
  }, delay);
 };
};

// This is the event listener for the form
form.addEventListener(
 "input",
 debounce(function (e) {
  switch (e.target.id) {
   case "name":
    checkNameValue();
    break;

   case "email":
    checkEmailValue();
    break;

   case "subject":
    checkSubjectValue();
    break;

   case "message":
    checkMessageValue();
    break;

   case "checkbox":
    checkCheckboxValue();
    break;
  }
 })
);
