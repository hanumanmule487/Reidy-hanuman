//**************************************************************************************** UI Team Code *****************************************************************************************************/
//====================================== Show Hide password icon ============================//
var passshow = document.getElementById('show-pass');
var hideshow = document.getElementById('hide-pass');
var textType = document.getElementById('passwordinput');

var showforgot = document.getElementById('show-passforgot');
var hideforgot = document.getElementById('hide-passforgot');

var showconfirm = document.getElementById('show-passconfirm');
var hideconfirm = document.getElementById('hide-passconfirm');
var textTypepas = document.getElementById('passwordfield');

var showreconfirm = document.getElementById('show-repassconfirm');
var hidereconfirm = document.getElementById('hide-repassconfirm');
var retextTypepas = document.getElementById('passwordfields');

var showreset = document.getElementById('show-passreset');
var hidereset = document.getElementById('hide-passreset');
var textResPass = document.getElementById('passwordinput');

var showresetconfirm = document.getElementById('show-passconfirmreset');
var hideresetconfirm = document.getElementById('hide-passconfirmreset');
var textResPassConfirm = document.getElementById('passwordfield1');



// login pop up
function passicon() {
    if (textType.type == 'password') {
        hideshow.classList.toggle("d-none");
        passshow.classList.toggle("d-none");
        textType.type = "text";
    }
    else {
        passshow.classList.toggle("d-none");
        hideshow.classList.toggle("d-none");
        textType.type = "password";
    }
}
function passicon2() {
    if (textType.type == 'password') {
        hideshow.classList.toggle("d-none");
        passshow.classList.toggle("d-none");
        textType.type = "text";
    }
    else {
        passshow.classList.toggle("d-none");
        hideshow.classList.toggle("d-none");
        textType.type = "password";
    }
}
function passiconfogot1() {
    showforgot.classList.toggle("d-none");
    hideforgot.classList.toggle("d-none");
}
// sign up
function passiconfogot2() {
    hideforgot.classList.toggle("d-none");
    showforgot.classList.toggle("d-none");
}
//password type hide and show
function passiconconfirm1() {
    if (textTypepas.type == 'password') {
        hideconfirm.classList.toggle("d-none");
        showconfirm.classList.toggle("d-none");
        textTypepas.type = "text";
    }
    else {
        showconfirm.classList.toggle("d-none");
        hideconfirm.classList.toggle("d-none");
        textTypepas.type = "password";
    }
}
function passiconconfirm() {

    if (textTypepas.type == 'password') {
        hideconfirm.classList.toggle("d-none");
        showconfirm.classList.toggle("d-none");
        textTypepas.type = "text";
    }
    else {
        showconfirm.classList.toggle("d-none");
        hideconfirm.classList.toggle("d-none");
        textTypepas.type = "password";
    }
}
//repassword type password hide and show
function repassiconconfirm2() {
    debugger
    if (retextTypepas.type == 'password') {
        hidereconfirm.classList.toggle("d-none");
        retextTypepas.type = "text";
    }
    else {
        hidereconfirm.classList.toggle("d-none");
        retextTypepas.type = "password";
    }
}
function repassiconconfirm() {

    if (retextTypepas.type == 'password') {
        hidereconfirm.classList.toggle("d-none");
        showreconfirm.classList.toggle("d-none");
        retextTypepas.type = "text";
    }
    else {
        showconfirm.classList.toggle("d-none");
        hidereconfirm.classList.toggle("d-none");
        retextTypepas.type = "password";
    }

}

/* reset password screen*/
function passiconreset1() {
    showreset.classList.toggle("d-none");
    hidereset.classList.toggle("d-none");
    textResPass.type = "password";

}
function passiconreset2() {
    hidereset.classList.toggle("d-none");
    showreset.classList.toggle("d-none");
    textResPass.type = "text";
}

function passiconconfirmreset1() {
    showresetconfirm.classList.toggle("d-none");
    hideresetconfirm.classList.toggle("d-none");
    textResPassConfirm.type = "password";

}
function passiconconfirmreset2() {
    hideresetconfirm.classList.toggle("d-none");
    showresetconfirm.classList.toggle("d-none");
    textResPassConfirm.type = "text";
}


// Step Wizard Form
var currentStep = 1;
var updateProgressBar;

function displayStep(stepNumber) {
    if (stepNumber >= 1 && stepNumber <= 3) {
        $(".step-" + currentStep).hide();
        $(".step-" + stepNumber).show();
        currentStep = stepNumber;
        updateProgressBar();
    };
}

$(document).ready(function () {
    document.getElementById("divLoader").style.visibility = "visible";
    $('#multi-step-form').find('.step').slice(1).hide();

    $(".next-step").click(function () {
        if (currentStep < 3) {
            $(".step-" + currentStep).addClass("animate__animated animate__fadeOutLeft");
            currentStep++;
            setTimeout(function () {
                $(".step").removeClass("animate__animated animate__fadeOutLeft").hide();
                $(".step-" + currentStep).show().addClass("animate__animated animate__fadeInRight");
                updateProgressBar();
            }, 500);
        }
    });

    $(".prev-step").click(function () {
        if (currentStep > 1) {
            $(".step-" + currentStep).addClass("animate__animated animate__fadeOutRight");
            currentStep--;
            setTimeout(function () {
                $(".step").removeClass("animate__animated animate__fadeOutRight").hide();
                $(".step-" + currentStep).show().addClass("animate__animated animate__fadeInLeft");
                updateProgressBar();
            }, 500);
        }
    });

    updateProgressBar = function () {
        var progressPercentage = ((currentStep - 1) / 2) * 100;
        $(".progress-bar").css("width", progressPercentage + "%");
    }
    document.getElementById("divLoader").style.visibility = "hidden";
});

//Sub menu
jQuery(document).ready(function ($) {
    $('li.dropdown-submenu a[data-toggle="dropdown"]').on('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        $('li.dropdown-submenu').not($(this).parent()).removeClass('open');
        $(this).parent().toggleClass('open');
    });
});




// Multi Select dropdown 2-----
$(document).ready(function () {
    $(".js-select2").select2({
        closeOnSelect: false,
        placeholder: "Placeholder",
        allowClear: true,
        tags: true,
        placeholder: "Select",
        allowClear: true
    });
});


//**************************************************************************Dev Team Code*****************************************************************************************************************/

function goToHome() {
    // You can replace the URL with your home page URL
    window.location.href = "https://localhost:7220/";
}

function goToBrokerSignup() {
    window.location.pathname = "SignUp"
}

function goToLenderSignup() {
    window.location.href = "https://localhost:7220/Lender/LenderSignUp/6fc47cb2-4aec-42c7-a590-f5e6d0fc2424"
}

function GoToSanmore() {
    window.location.href ="https://www.sanmore.com/"
}