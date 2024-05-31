var chkbox;
var signUpStep = 1;
$(document).ready(function () {
    if (LayoutJs.Success != "") {
        toastr.success(LayoutJs.Success);
    }
    if (LayoutJs.Error != "") {
        toastr.error(LayoutJs.Error);
    }
});

function SignupSubmitBtn() {
    var intrestedIn = [];
    $('[name="intrestedIn"]:checked').each(function (i) {
        intrestedIn[i] = $(this).val();
    });
    var firstname = $('#inputFname').val();
    var lastname = $('#inputLname').val();
    var email = $('#emailAddressId').val();
    var password = $('#passwordfield').val();
    var confirmpassword = $('#passwordfields').val();
    var phonenumber = $('#phoneId').val();
    var intrestedIn = intrestedIn.join();
    var companyname = $('#companyId').val();
    var hearaboutus = $('#inputhearAbout').val();
    var usermodel = {
        FirstName: firstname,
        LastName: lastname,
        Email: email,
        Password: password,
        ConfirmPassword: confirmpassword,
        PhoneNumber: phonenumber,
        IntrestedIn: intrestedIn,
        CompanyName: companyname,
        HearAboutUs: hearaboutus
    }
    document.getElementById("divLoader").style.visibility = "visible";
    document.getElementById("SignUpId").style.visibility = "hidden";
    $.ajax({
        url: '/Account/Register',
        type: "POST",
        data: usermodel,
        cache: false,
        success: function (res) {
            if (res == "Exists") {
                $('#cpassword').text('Email already exists');
                document.getElementById("divLoader").style.visibility = "hidden";
                document.getElementById("SignUpId").style.visibility = "visible";
            }
            if (res == "Some Error occour") {
                toastr.error('Some error occure');
                document.getElementById("divLoader").style.visibility = "hidden";
                document.getElementById("SignUpId").style.visibility = "visible";
            }
            if (res == "Success") {
                $("#SignUpId").modal("hide");
                $("#SignInId2").modal("show");
                toastr.success('Registration completed successfully.');
                document.getElementById("divLoader").style.visibility = "hidden";
            }
        },
        error: function (err) {
            toastr.error('Some error occure');
            console.log(err);
        }
    })
}

$("#nextSignUp").on("click", function (e) {
    e.preventDefault();
    var isValidate = false;
    switch (signUpStep) {
        case 1:
            isValidate=SignInValidateStep1();
            break;
        case 2:
            isValidate=SignInValidateStep2();
            break;
        case 3:
            isValidate=SignInValidateStep3();
            break;
        case 4:
            isValidate=SignInValidateStep4();
            break;
        default:
            isValidate = false;
    }
    if (isValidate == true && signUpStep == 4) {
        SignupSubmitBtn();
    }
    else if (isValidate) {
        $(".step" + signUpStep).hide();
        signUpStep += 1;
        $(".step" + signUpStep).show();
        $("#backSignUp").show();
        console.info(signUpStep);
        if (signUpStep == 4) {
            $(".modal-signin .social-footer").show();
            $(this).text("Submit");
        }
        else {
            $(".modal-signin .social-footer").hide();
            $(this).text("Next");
        }
    }
});
$("#backSignUp").on("click", function (e) {
    e.preventDefault();
    $(".step" + signUpStep).hide();
    signUpStep = signUpStep - 1;
    $(".step" + signUpStep).show();
    if (signUpStep === 1) {
        $("#backSignUp").hide();
    }
    if (signUpStep == 4) {
        $(".modal-signin .social-footer").show();
        $("#nextSignUp").text("Submit");
    }
    else {
        $(".modal-signin .social-footer").hide();
        $("#nextSignUp").text("Next");
    }
});

$('[name="intrestedIn"]').on('change', function () {
    SignInValidateStep1();
});
$('#inputFname').on('change', function () {
    $('.lblFirstName').text($('#inputFname').val());
});

function SignInValidateStep1() {
    var isValidate = false;
    var intrestedIn = [];
    $('[name="intrestedIn"]:checked').each(function (i) {
        intrestedIn[i] = $(this).val();
    });
    if (intrestedIn.length > 0) {
        $('#errintrestedIn').text('')
        isValidate = true;
    }
    else {
        $('#errintrestedIn').text('Please select atleast one option');
    }
    return isValidate;
}
function SignInValidateStep2() {
    var isValidate = true;
    var firstname = $('#inputFname').val().trim();
    var lastname = $('#inputLname').val().trim();
    var email = $('#emailAddressId').val();
    var phonenumber = $('#phoneId').val().trim();
    var pattern = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    var phoneInput = $('#phoneId').val();
    var phonePattern = /^(\d{3}-){2}\d{4}$/;

    if (IsNullOrEmpty(firstname)) {
        $('#errName').text('Please enter first name');
        isValidate = false;
    }
    else {
        $('#errName').text('');
    }
    if (IsNullOrEmpty(lastname)) {
        $('#errLName').text('Please enter last name');
        isValidate = false;
    }
    else {
        $('#errLName').text('');
    }
    if (IsNullOrEmpty(email)) {
        $('#errEmailAddressId').text('Please enter email address');
        isValidate = false;
    }
    else if (!pattern.test(email)) {
        $('#errEmailAddressId').text('Please enter valid email address');
        isValidate = false;
    }
    else {
        $('#errEmailAddressId').text('');
    }
    if (IsNullOrEmpty(phonenumber)) {
        $('#errPNumber').text('Please enter phone number');
        isValidate = false;
    }
    else if (phonenumber.length < 12 || !phonePattern.test(phoneInput)) {
        $('#errPNumber').text('Invalid phone number');
        isValidate = false;
    }
    else {
        $('#errPNumber').text('');
    }
    return isValidate;
}
function SignInValidateStep3() {
    var isValidate = true;
    var hearaboutus = $('#inputhearAbout').val();
    if (IsNullOrEmpty(hearaboutus)) {
        $('#errinputhearAbout').text('Please select an option');
        isValidate = false;
    }
    else {
        $('#errinputhearAbout').text('');
    }
    return isValidate;
}
function SignInValidateStep4() {
    var isValidate = true;
    var password = $('#passwordfield').val().trim();
    var confirmpassword = $('#passwordfields').val().trim();
    if (IsNullOrEmpty(password)) {
        $('#errPassword').text('Please enter password');
        isValidate = false
    }
    else {
        $('#errPassword').text('');
    }
    if (IsNullOrEmpty(confirmpassword)) {
        $('#cpassword').text('Please enter confirm password');
        isValidate = false
    }
    else {
        $('#cpassword').text('');
    }
    if (!IsNullOrEmpty(password) && !IsNullOrEmpty(confirmpassword)) {
        var passwordCheck = checkPassword(password)
        if (!passwordCheck) {
            $('#errPassword').text('Password must be contain 8 character including special character, upper character & number');
            isValidate = false
        }
        else {
            $('#errPassword').text('');
        }
        if (password != confirmpassword) {
            $('#cpassword').text('Password or confirm password do not match');
            isValidate = false;
        }
        else {
            $('#cpassword').text('');
        }
    }
    return isValidate;
}

function SignInBtn() {
    var validatFields = ValidateSignInForm()
    if (validatFields) {
        var email = $('#emailfield1').val();
        var password = $('#passwordinput').val();
        var Model = {
            Email: email,
            Password: password,
        }
        document.getElementById("SignInId2").style.visibility = "hidden";
        document.getElementById("divLoader").style.visibility = "visible";
        $.ajax({
            url: "/Account/Login",
            type: "POST",
            data: { loginModel: Model },
            dataType: "json",
            success: function (response) {
                if (response == "User Not Found") {
                    $('#emailErr').text('Email does not exists');
                    document.getElementById("SignInId2").style.visibility = "visible";
                    document.getElementById("divLoader").style.visibility = "hidden";
                }
                if (response == "Incorrect password") {
                    $('#password').text(response);
                    document.getElementById("SignInId2").style.visibility = "visible";
                    document.getElementById("divLoader").style.visibility = "hidden";
                }
                if (response.success == true) {
                    $('#SignInId2').modal('hide');
                    window.location.href = "/";
                    document.getElementById("divLoader").style.visibility = "hidden";
                }
            },
            error: function () {
                alert("There was an error. Try again please!");
            }
        });
    }
}

function SendEmail() {
    var validatFields = ValidateForgetPasswordForm()
    if (validatFields) {
        var email = $('#forgotemail').val();

        document.getElementById("ForgotPassword").style.visibility = "hidden";
        document.getElementById("divLoader").style.visibility = "visible";
        $.ajax({
            url: "/Account/ForgotPassword",
            type: "POST",
            data: { email: email },
            success: function (response) {
                debugger

                if (response.success == true) {
                    toastrSuccessMessage("Email has been sent to your registerd email address");
                    debugger
                    $("#SignInId2").modal("show");
                    document.getElementById("divLoader").style.visibility = "hidden";
                }
            },
            error: function () {
                alert("There was an error. Try again please!");
            }
        });
    }
}



$('#chkbx1').click(function () {
    debugger;
    var status = $("#chkbx1").prop('checked');
    if (status == false) {
        $('#NotAgree').css('color', '#DC3545');
    }
    else {
        $('#NotAgree').css('color', 'black');
    }
});

// Signup validation 
function ValidateSignUpForm() {
    var firstname = $('#inputFname').val().trim();
    var lastname = $('#inputLname').val().trim();
    var email = $('#emailAddressId').val().trim();
    var password = $('#passwordfield').val().trim();
    var confirmpassword = $('#passwordfields').val().trim();
    var phonenumber = $('#phoneId').val().trim();
    //var address = $('#addressId').val().trim();
    var chkbox = $("#chkbx1").prop('checked');
    var isValidate = false;
    if (email != "" || password != "" || confirmpassword != "" || phonenumber != "") {
        var userinput = $('#emailAddressId').val();
        var pattern = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
        var phoneInput = $('#phoneId').val();
        var phonePattern = /^(\d{3}-){2}\d{4}$/;
        if (!pattern.test(userinput)) {
            $('#errEmail').text('Please enter valid email address');
        }
        else {
            $('#errEmail').text('');
        }
        var passwordCheck = checkPassword(password)
        if (!passwordCheck) {
            $('#errPassword').text('Password must be contain 8 character including special character, upper character & number');
        }
        if (email != "" && password != "" && pattern.test(userinput) && passwordCheck) {
        }
        if (password != confirmpassword) {
            $('#cpassword').text('Password or confirm password do not match');
            isValidate = false;
        }
        debugger
        if (phonenumber.length < 12) {
            $('#errPNumber').text('Invalid phone number');
            isValidate = false;
        }
        debugger
        if (!phonePattern.test(phoneInput)) {
            $('#errPNumber').text('Invalid phone number');
            isValidate = false;
        }
        else {
            $('#errPNumber').text('');
        }
    }

    if (chkbox == false) {

        $('#NotAgree').css('color', '#DC3545');
    }
    else {
        $('#NotAgree').css('color', 'black');
    }

    if (firstname == "") {
        $('#errName').text('Please enter first name');
    }
    if (lastname == "") {
        $('#errLName').text('Please enter last name');
    }
    if (email == "") {
        $('#errEmail').text('Please enter email address');
    }
    if (password == "") {
        $('#errPassword').text('Please enter password');
    }
    if (confirmpassword == "") {
        $('#cpassword').text('Please enter confirm password');
    }
    if (phonenumber == "") {
        $('#errPNumber').text('Please enter phone number');
    }
    if (firstname != "" && lastname != "" && email != "" && password != "" && confirmpassword != "" && phonenumber != ""
        && password == confirmpassword) {
        if (!phonePattern.test(phoneInput)) {
            $('#errPNumber').text('Invalid phone number re-enter phone number');
            isValidate = false;
        }
        else {
            isValidate = true;
        }
    }
    return isValidate;
}

// JS for Alphanumeric Value

function FirstNameAlphanumeric() {
    var regex = new RegExp("^[0-9a-zA-Z_\. ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
}

// Sign in Validation

function ValidateSignInForm() {
    var email = $('#emailfield1').val();
    var password = $('#passwordinput').val();
    var isValidate = false;
    if (email == "" && password == "") {
        $('#emailErr').text('Please enter email address');
        $('#password').text('Please enter a password');
        return isValidate;
    }
    if (email == "") {
        $('#emailErr').text('Please enter email address');
    }
    else if (password == "") {
        $('#password').text('Please enter a password');
    }
    var userinput = $('#emailfield1').val();
    var pattern = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;

    if (!pattern.test(userinput)) {
        $('#emailErr').text('Please enter valid email address');
    }
    else {
        $('#emailErr').text('');
    }
    debugger
    var passwordCheck = checkPassword(password)
    if (!passwordCheck) {
        debugger
        $('#password').text('Please enter valid password');
    }
    if (email != "" && password != "" && passwordCheck) {
        isValidate = true;
    }
    return isValidate;
}

//Forget password validation
function ValidateForgetPasswordForm() {
    var email = $('#forgotemail').val();
    var isValidate = false;
    if (email == "") {
        $('#emailErrReset').text('Please enter email address');
        return isValidate;
    }
    if (email == "") {
        $('#emailErrReset').text('Please enter email address');
    }

    var userinput = $('#forgotemail').val();
    var pattern = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;

    if (!pattern.test(userinput)) {
        $('#emailErrReset').text('Please enter valid email address');
    }
    else {
        $('#emailErrReset').text('');
    }

    if (!pattern.test(userinput) || email == "") {
        $('#emailErrReset').text('Please enter valid email address');
        isValidate = false;
    }
    else {
        isValidate = true;
    }
    return isValidate;
}


//Sign In validation Remove
function RemovePasswordValidation(event) {
    $('#password').text('');
    if (event.keyCode === 13) {
        SignInBtn();
    }
}
function RemoveEmailValidation(event) {
    $('#emailErr').text('');
    if (event.keyCode === 13) {
        SignInBtn();
    }
}
function RemoveEmailValidationForget() {
    $('#emailErrReset').text('');
}

//Sign Up validation Remove
function RemoveFNameValidation() {
    $('#errName').text('');
}
function RemoveLNameValidation() {
    $('#errLName').text('');
}
function RemoveEValidation() {
    $('#errEmail').text('');
}
function RemovePhoneValidation() {
    $('#errPNumber').text('');
}
function RemoveAValidation() {
    $('#errAddress').text('');
}
function RemoveCValidation() {
    $('#errCity').text('');
}
function RemoveSValidation() {
    $('#errState').text('');
}
function RemoveZipCodeValidation() {
    $('#errZip').text('');
}
function RemovePValidation() {
    $('#errPassword').text('');
}
function RemoveCPValidation() {
    $('#cpassword').text('');
}
$('#txtClose').click(function () {
    $('#errName').text('');
    $('#errLName').text('');
    $('#errEmail').text('');
    $('#errPNumber').text('');
    $('#errAddress').text('');
    $('#errCity').text('');
    $('#errCity').text('');
    $('#errState').text('');
    $('#errZip').text('');
    $('#errPassword').text('');
    $('#cpassword').text('');
    $('#chkbx1').prop('checked', false);
});
$('#txtSignClose').click(function () {
    $('#emailErr').text('');
    $('#password').text('');
    $('#chkbx').prop('checked', false);
});

function EnableSignUpButton() {

}

function myclearData() {
    $("#inputFname").val('');
    $("#inputLname").val('');
    $('#emailAddressId').val('');
    $('#passwordfield').val('');
    $('#passwordfield1').val('');
    $('#phoneId').val('');
    $('#inputcity').val('');
    $('#inputstate').val('');
    $('#inputzipcode').val('');
    $('#companyId').val('');
    $('#inputhearAbout').val('');
    $('#chkbxSend').val('');
    $(".modal-signin .social-footer").hide();
    $('#nextSignUp').text("Next");
    signUpStep = 1;
    $(".step1").show();
    $(".step2").hide();
    $(".step3").hide();
    $(".step4").hide();
}
function myclearData1() {
    $('#emailfield1').val('');
    $('#passwordinput').val('');
}
function checkPassword(str) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
}

// Navigate to the logout action
function performLogout() {
    window.location.href = '/Account/SignOut';
}

$(function () {

    $('.myPhoneclass').keydown(function (e) {
        var key = e.charCode || e.keyCode || 0;
        $text = $(this);
        if (key !== 8 && key !== 9) {
            if ($text.val().length === 3) {
                $text.val($text.val() + '-');
            }
            if ($text.val().length === 7) {
                $text.val($text.val() + '-');
            }
        }

        return (key == 8 || key == 9 || key == 46 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));
    })

    //MDC//FillCity(); //Fill City with autocomplete
    //MDC//FillCounty();   //Fill County with autocomplete
    FillSearchProperty();
});

function toastrErrorMessage(message) {
    toastr.error(message);
}
function toastrSuccessMessage(message) {
    toastr.success(message);
}

//Edit profile picture
var loadFile = function (event) {
    var image = document.getElementById("output");
    image.src = URL.createObjectURL(event.target.files[0]);
};


$(document).ready(function () {
    $('#offerContractForm').submit(function (event) {

        debugger
        event.preventDefault(); // Prevent default form submission
        if ($(this).valid()) { // Check if the form is valid
            // Display the confirmation modal
            $('#Warningownfinancing').modal('show');
        }
        else {
            $('#offerContractForm').addClass('was-validated'); // Add was-validated class to trigger validation messages
        }
    });

    // Handle the submit button inside the confirmation modal
    $('#confirmSubmitBtn').click(function () {
        $('#offerContractForm').off('submit').submit(); // Remove previous submit event handler and submit the form
    });
});



function LoginFirst() {
    toastr.error('Become Broker to add a listing');
}


function BecomeLenderFirst() {
    toastr.error('Become Lender to add a product');
}


function AlreadyRegistered() {
    toastr.error('The user has already registered');

}

//Code to Autocomplete the Search Property on Landing page
function FillSearchProperty() {
    const input = document.getElementById('txtSearchProperty');

    var options = {
        types: ['(cities)'],
        componentRestrictions: { country: "us" }
    };

    var autocomplete = new google.maps.places.Autocomplete(input, options);
}

//Code to Autocomplete the City search
function FillCity() {
    const input = document.getElementById('city');

    var options = {
        types: ['(cities)'],
        componentRestrictions: { country: "us" }
    };

    var autocomplete = new google.maps.places.Autocomplete(input, options);
}

//Code to Autocomplete the County/Region search
function FillCounty() {
    const input = document.getElementById('county');

    var options = {
        types: ['(regions)'],
        componentRestrictions: { country: "us" }
    };

    var autocomplete = new google.maps.places.Autocomplete(input, options);
}

function toggleSubMenu(element) {
    element.classList.toggle('active');
    var subMenu = element.querySelector('ul');
    if (subMenu.style.display === 'block') {
        subMenu.style.display = 'none';
    } else {
        subMenu.style.display = 'block';
    }
}


function toggleSubMenu(element) {
    var listing = element.querySelector('.listing');
    if (listing) {
        listing.classList.toggle('hidden');
        element.classList.toggle('active'); // Add or remove 'active' class to parent element
    }
}

//let slideIndex = 1;
//showSlides(slideIndex);

//function plusSlides(n) {
//    showSlides(slideIndex += n);
//}
function closeContainer() {
     document.querySelector('.container').style.display = 'none';
}
function IsNullOrEmpty(data) {
    if (data === undefined || data === null || data === "")
        return true;
    else
        return false;
}

// Function to handle key press event
function handleKeyPress(event) {
    // Check if the pressed key is Enter (key code 13)
    if (event.keyCode === 13) {
        // Trigger the login action
        SignInBtn();
    }
}

// Attach key press event listener to the document
document.addEventListener("keypress", handleKeyPress);

// Function to handle key press event
function handleKeyPress(event) {
    // Check if the pressed key is Enter (key code 13)
    if (event.keyCode === 13) {
        // Prevent the default behavior of the Enter key
        event.preventDefault();
        // Trigger the submitForm function
        submitForm();
    }
}

// Attach key press event listener to the document
document.addEventListener("keypress", handleKeyPress);

// Function to handle form submission
function submitForm() {
    // Perform form submission or any other action here
    // For example:
    document.getElementById("nextSignUp").click(); // This line clicks the button
}

const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");

let formStepsNum = 0;

nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        formStepsNum++;
        updateFormSteps();
        updateProgressbar();
    });
});

prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        formStepsNum--;
        updateFormSteps();
        updateProgressbar();
    });
});

function updateFormSteps() {
    formSteps.forEach((formStep) => {
        formStep.classList.contains("form-step-active") &&
            formStep.classList.remove("form-step-active");
    });

    formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressbar() {
    progressSteps.forEach((progressStep, idx) => {
        if (idx < formStepsNum + 1) {
            progressStep.classList.add("progress-step-active");
        } else {
            progressStep.classList.remove("progress-step-active");
        }
    });

    const progressActive = document.querySelectorAll(".progress-step-active");

    progress.style.width =
        ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}