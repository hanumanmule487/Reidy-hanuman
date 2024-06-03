
//function for cancel the lendr signup page.

$(document).ready(function () {

    GetPropertyStateList();
   
});
function CancelLenderSignup() {
    debugger
    var UserId = $("#hdnUserId").val();
    window.location.href = '/Lender/LenderProfile/UserId';
}
var count = 1;
function LenderSignup() {
    debugger
    if (count == 1) {
        var IsEmtpty = ValidateAddListing1();
        if (IsEmtpty == true) {
            debugger

            var formData = new FormData();
            formData.append('FirstName', $('#firstNameInput').val());
            formData.append('LastName', $('#lastNameInput').val());
            formData.append('Email', $('#emaillenderInput').val());
            formData.append('Id', $('#idInput').val());
            formData.append('PhoneNumber', $('#phoneNumberInput').val());
            formData.append('RoleInLendingCompany', $('#roleLendingInput').val());
            formData.append('LenderCompanyName', $('#lenderCompanyNameInput').val());
            formData.append('EntityType', $('#enrityType').val());
            formData.append('LenderPhoneNo', $('#phoneLenderInput').val());
            formData.append('Address1', $('#address1').val());
            formData.append('Address2', $('#address2').val());
            formData.append('City', $('#CityField').val());
            formData.append('StateId', $('#stateField').val());
            formData.append('ZipCode', $('#zipCode').val());
            formData.append('Country', $('#countryField :selected').text());
            formData.append('YearsInBusiness', $('#yearsInBusiness').val());
            formData.append('EstimatedLoansDonePerYear', $('#estimatedNumberLoanDone').val());
            formData.append('PreferredAttorneyForDocDrafting', $('#preferredAttorneyDoc').val());
            formData.append('PreferredAttorneyPhone', $('#preferredAttorneyPhone').val());
            formData.append('InterestedInServeLoansRightHereWithInReidy', $('#servicingLoanReidy').val());
            formData.append('IdentificationType', $('#identificationform1').val());
            formData.append('Disclosure', $('#chkbx3').is(':checked'));
            formData.append('IsSignupCompleted', '1');
            formData.append('AttorneyEmail', $('#preferredAttorneyemail').val());
            formData.append('ProofType', $('#proofType').val());
            // Handle multiple UploadLenderFile uploads
            var filesInput = document.getElementById('uploadFileLender');
            for (var i = 0; i < filesInput.files.length; i++) {
                formData.append('UploadLenderFile', filesInput.files[i]);
            }
            // Handle multiple UploadLenderLicense file
            var filesInput = document.getElementById('uploadLenderLicense');
            for (var i = 0; i < filesInput.files.length; i++) {
                formData.append('UploadLendingLicense', filesInput.files[i]);
            }
            //Handle Lender Identification file  upload
            var fileInput = document.getElementById('stateIssuedId');
            if (fileInput.files.length > 0) {
                var file = fileInput.files[0];
                if (/\.(gif|jpe?g|tiff?|png|jfif|webp|bmp|heic|pdf)$/i.test(file.name)) {
                    formData.append('UploadLenderIdentity', file);
                } else {                 
                    filesInput.value = '';
                    return; 
                }
            }
            document.getElementById("divLoader").style.visibility = "visible";           
            var flagValue = formData.get('Flag');
            $.ajax({

                url: '/Lender/LenderSignup',  
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    $("#submitLenderSignup").modal("show");
                    document.getElementById("divLoader").style.visibility = "hidden";
                },
                error: function (error) {
                    // Handle error
                    console.error(error);
                }
            });
        }
        else {
            return false;
        }
    } else {
        AlreadyRegistered();
    }
    count++;
}

/***************************Create function to save lender signup as a draft*********************************/
 
function SaveProgress() {

    debugger
    var IsEmtpty = ValidateAddListing1();
    if (IsEmtpty == true) {
        debugger
        var formData = new FormData();
        formData.append('FirstName', $('#firstNameInput').val());
        formData.append('LastName', $('#lastNameInput').val());
        formData.append('Email', $('#emaillenderInput').val());
        formData.append('Id', $('#idInput').val());
        formData.append('PhoneNumber', $('#phoneNumberInput').val());
        formData.append('RoleInLendingCompany', $('#roleLendingInput').val());
        formData.append('LenderCompanyName', $('#lenderCompanyNameInput').val());
        formData.append('EntityType', $('#enrityType :selected').text());
        formData.append('LenderPhoneNo', $('#phoneLenderInput').val());
        formData.append('Address1', $('#address1').val());
        formData.append('Address2', $('#address2').val());
        formData.append('City', $('#CityField').val());
        formData.append('State', $('#stateField').val());
        formData.append('ZipCode', $('#zipCode').val());
        formData.append('Country', $('#countryField :selected').text());
        formData.append('YearsInBusiness', $('#yearsInBusiness').val());
        formData.append('EstimatedLoansDonePerYear', $('#estimatedNumberLoanDone').val());
        formData.append('PreferredAttorneyForDocDrafting', $('#preferredAttorneyDoc').val());
        formData.append('PreferredAttorneyPhone', $('#preferredAttorneyPhone').val());
        formData.append('InterestedInServeLoansRightHereWithInReidy', $('#servicingLoanReidy :selected').text());
        formData.append('IdentificationType', $('#identificationform1 :selected').text());
        formData.append('Disclosure', $('#chkbx3').is(':checked'));
        formData.append('IsSignupCompleted', '0');
        formData.append('AttorneyEmail', $('#preferredAttorneyemail').val());
        formData.append('ProofType', $('#proofType').val());
        // Handle multiple UploadLenderFile uploads
        var filesInput = document.getElementById('uploadFileLender');
        for (var i = 0; i < filesInput.files.length; i++) {
            formData.append('UploadLenderFile', filesInput.files[i]);
        }
        // Handle multiple UploadLenderLicense file
        var filesInput = document.getElementById('uploadLenderLicense');
        for (var i = 0; i < filesInput.files.length; i++) {
            formData.append('UploadLendingLicense', filesInput.files[i]);
        }
        //Handle Lender Identification file  upload
        var fileInput = document.getElementById('stateIssuedId');
        if (fileInput.files.length > 0) {
            var file = fileInput.files[0];
            if (/\.(gif|jpe?g|tiff?|png|jfif|webp|bmp|heic|pdf)$/i.test(file.name)) {
                formData.append('UploadLenderIdentity', file);
            } else {            
                filesInput.value = '';
                return; // Exit the loop if an invalid file is found
            }
        }
        debugger
        document.getElementById("divLoader").style.visibility = "visible";
        $.ajax({
            url: '/Lender/SaveProgress',  // Update with your server endpoint
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                document.getElementById("divLoader").style.visibility = "hidden";
                toastr.success('Lender Profile updated successfully.');
            },
            error: function (error) {           
                console.error(error);
            }
        });
    }
    else {
        return false;
    }

}

//Validate Lender SignUp Fields start

function ValidateAddListing1() {
    debugger
    var IsEmtpty = true;

    var phoneNumber = $("#phoneNumberInput").val().trim();
    var phonePattern = /^(\d{3}-){2}\d{4}$/;
    var phoneInput = $('#phoneNumberInput').val();
    if (phoneNumber == "") {
        debugger
        $('#errPhoneNo').text("Please enter phone number.").css("color", "Red");
        IsEmtpty = false;
    }
    if (!phonePattern.test(phoneInput) && phoneNumber != "") {
        debugger
        $('#errPhoneNo').text('Invalid phone number');
        IsEmtpty = false;
    }
    var roleInCompany = $("#roleLendingInput").val().trim();
    if (roleInCompany == "") {
        $('#errRoleInCompany').text("Please enter role in company").css("color", "Red");
        IsEmtpty = false;
    }
    else if (roleInCompany != "") {
        $('#errRoleInCompany').text(" ");
    }

    var companyName = $("#lenderCompanyNameInput").val().trim();
    if (companyName == "") {
        $('#errComapanyName').text("Please enter company name").css("color", "Red");
        IsEmtpty = false;
    }
    else if (companyName != "") {
        $('#errComapanyName').text(" ");
    }

    var entityType = $("#enrityType").val().trim();
    if (entityType == "Select") {
        $('#errEntityType').text("Entity type is required").css("color", "Red");
        IsEmtpty = false;
    }
    else if (entityType != "") {
        $('#errEntityType').text(" ");
    }

    var lenderNumber = $("#phoneLenderInput").val().trim();
    var lenderPhonePattern = /^(\d{3}-){2}\d{4}$/;
    var lenderPhoneInput = $('#phoneLenderInput').val();
    if (lenderNumber == "") {
        debugger
        $('#errLenderPhone').text("Please enter phone number").css("color", "Red");
        IsEmtpty = false;
    }
    if (!lenderPhonePattern.test(lenderPhoneInput) && lenderNumber != "") {
        debugger
        $('#errLenderPhone').text('Invalid phone number');
        IsEmtpty = false;
    }

    var address1 = $("#address1").val().trim();
    if (address1 == "") {
        $('#errAddress1').text("Address 1 is required").css("color", "Red");
        IsEmtpty = false;
    }
    else if (address1 != "") {
        $('#errAddress1').text(" ");
    }

    var city = $("#CityField").val().trim();
    if (city == "") {
        $('#errLenderCity').text("City is required").css("color", "Red");
        IsEmtpty = false;
    }
    else if (city != "") {
        $('#errAddress1').text(" ");
    }

    var State = $("#stateField").val().trim();
    if ($('#stateField').val() == 0 || $('#stateField').val() == 'Select') {
        $('#errstateField').text('State is required');
        IsEmtpty = false;
    }
    else {
        debugger
        $('#errstateField').text('');
    }


    var zipCode = $("#zipCode").val().trim();
    var zipCodeLimit = $("#zipCode").val().length;
    if (zipCode == "") {
        $('#errZipCode').text("Enter zip code").css("color", "Red");
        IsEmtpty = false;
    }
    var yearInBusiness = $("#yearsInBusiness").val().trim();
    if (yearInBusiness == "") {
        $('#errYearInBusiness').text("Enter year in business").css("color", "Red");
        IsEmtpty = false;
    }
    else if (yearInBusiness != "") {
        $('#errYearInBusiness').text(" ");
    }

    var estimatedNumberLoanDone = $("#estimatedNumberLoanDone").val().trim();
    if (estimatedNumberLoanDone == "") {
        $('#errEstimatedNumberLoanDone').text("Enter est. number of loans done per year").css("color", "Red");
        IsEmtpty = false;
    }
    else if (estimatedNumberLoanDone != "") {
        $('#errEstimatedNumberLoanDone').text(" ");
    }

    var attorneyPhone = $("#preferredAttorneyPhone").val().trim();
    var attorneyPhonePattern = /^(\d{3}-){2}\d{4}$/;
    var attorneyPhoneInput = $('#preferredAttorneyPhone').val();
    if (!attorneyPhonePattern.test(attorneyPhoneInput) && attorneyPhone != "") {
        debugger
        $('#errAttorneyPhone').text('Invalid phone number');
        IsEmtpty = false;
    }

    var proofType = $("#proofType").val().trim();
    if (proofType == "Select") {
        $('#errProofType').text("Select proof of lendable funds type").css("color", "Red");
        IsEmtpty = false;
    }
    else if (proofType != "") {
        $('#errProofType').text(" ");
    }

    var UploadIdentification = $("#uploadFileLender").val().trim();
    if (UploadIdentification == "") {
        $('#errUploadLenderFile').text("Please upload file").css("color", "Red");
        IsEmtpty = false;
    }
    else if (UploadIdentification != "") {
        $('#errUploadLenderFile').text(" ");
    }

    var status = $("#chkbx3").prop('checked');
    if (status == false) {
        $('#txtAcceptLenderUser').css('color', '#DC3545');
        IsEmtpty = false;
    }
    else {
        $('#txtAcceptLenderUser').css('color', 'black');
    }

    return IsEmtpty;

}

//Validate Lender SignUp Fields end

// Check Property Pictures File Formate start
function fileFormatOnchange() {
    CheckLenderUploadFileFormat();
    RemoveUploadFile();
}
function CheckLenderUploadFileFormat() {
    debugger
    var ext = $('#uploadFileLender').val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg', 'tiff', 'tif', 'bmp', 'eps', 'svg', 'webp', 'heif', 'avif', 'heic',]) == -1) {

        ShowValidationForLenderUploadFile("Please upload valid file format.");      
    }
    else {
        $('#spanUploadLenderFile').text('');
    }
}

function CheckUploadLendingLicenseFileFormat() {
    debugger
    var ext = $('#uploadLenderLicense').val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg', 'tiff', 'tif', 'bmp', 'eps', 'svg', 'webp', 'heif', 'avif', 'heic',]) == -1) {

        ShowValidationForLenderLicense("Please upload valid file format.");       
    }
    else {
        $('#spanUploadLenderLicenseFile').text('');
    }
}
function CheckUploadIdentityFileFormat() {
    debugger
    var ext = $('#stateIssuedId').val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg', 'tiff', 'tif', 'bmp', 'eps', 'svg', 'webp', 'heif', 'avif', 'heic',]) == -1) {

        ShowValidationForIdenity("Please upload valid file format.");       
    }
    else {
        $('#spanUploadIdentityFile').text('');
    }
}
// Check Property Pictures File Formate end

// Function to show the validation message for file format start
function ShowValidationForLenderUploadFile(message) {

    $('#spanUploadLenderFile').text(message);
    $('#spanUploadLenderFile').fadeIn();

    // Set a timer to hide the validation message after 3 seconds (3000 milliseconds)
    setTimeout(function () {      
        $('#spanUploadLenderFile').fadeOut();
    }, 3000);
}

function ShowValidationForLenderLicense(message) {

    $('#spanUploadLenderLicenseFile').text(message);
    /* $('#spanUploadPropertyImage').show();*/
    $('#spanUploadLenderLicenseFile').fadeIn();

    // Set a timer to hide the validation message after 3 seconds (3000 milliseconds)
    setTimeout(function () {     
        $('#spanUploadLenderLicenseFile').fadeOut();
    }, 3000);
}
function ShowValidationForIdenity(message) {

    $('#spanUploadIdentityFile').text(message);   
    $('#spanUploadIdentityFile').fadeIn();

    // Set a timer to hide the validation message after 3 seconds (3000 milliseconds)
    setTimeout(function () {       
        $('#spanUploadIdentityFile').fadeOut();
    }, 3000);
}
// Function to show the validation message for file format start

//remove validation start

function RemoveEmail() {
    $('#errAttorneyemail').text('');
}

function RemovePhoneNumber() {
    $('#errPhoneNo').text('');
}

function RemoveRoleInCompany() {
    $('#errRoleInCompany').text('');
}

function RemoveCompanyName() {
    $('#errComapanyName').text('');
}

function RemoveEntityType() {
    $('#errEntityType').text('');
}

function RemoveLenderPhoneNumber() {
    $('#errLenderPhone').text('');
}

function RemoveAddress1() {
    $('#errAddress1').text('');
}

function RemoveCity() {
    $('#errLenderCity').text('');
}

function RemoveState() {
    $('#errstateField').text('');
}

function RemoveZipCode() {
    $('#errZipCode').text('');
}

function RemoveCountry() {
    $('#errCountry').text('');
}


function RemoveYearInBusiness() {
    $('#errYearInBusiness').text('');
}

function RemoveEstimatedNumberLoanDone() {
    $('#errEstimatedNumberLoanDone').text('');
}

function RemoveProofType() {
    $('#errProofType').text('');
}
function RemoveUploadFile() {
    $('#errUploadLenderFile').text('');
}
function RemoveAttorneyPhoneNumber() {
    $('#errAttorneyPhone').text('');
}


//function for not allowed negative value from keyboard

$('#zipCode').on('keydown', function (e) {
    if (e.key === '-') {
        e.preventDefault();
    }
});

//function for enter Phonenumber format input fields
$('.myPhoneClass').keydown(function (e) {
    debugger
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

$('.myLenderPhoneClass').keydown(function (e) {
    debugger
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

$('.myAttorneyPhoneClass').keydown(function (e) {
    debugger
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

//function for change text color of Accept user agreement on click on check and uncheck.
$('#chkbx3').click(function () {
    debugger;
    var status = $("#chkbx3").prop('checked');
    if (status == false) {
        $('#txtAcceptLenderUser').css('color', '#DC3545');
    }
    else {
        $('#txtAcceptLenderUser').css('color', 'black');
    }
});

//New code for preview 

jQuery(document).ready(function () {
    ImgUpload();   
    GetCountryList();
});

function ImgUpload() {

    var imgWrap = "";
    var imgArrayApp = [];
    var imgArrayIns = [];
    var imgArraySur = [];
    var imgArrayEnv = [];
    var imgArrayPropPic = [];
    var imgArrayIdent = [];
    var fileControlId;
    var totalFiles = 0;
    $('.upload__inputfile').each(function () {

        $(this).on('change', function (e) {

            fileControlId = $(this)[0].id;
            imgWrap = $(this).closest('.upload__box').find('.upload__img-wrap');
            var maxLength = $(this).attr('data-max_length');
            const maxAllowedSize = 5 * maxLength;
            var files = e.target.files;
            var filesArr = Array.prototype.slice.call(files);
            var iterator = 0;
            if (fileControlId == "uploadFileLender") {

                filesArr.forEach(function (f, index) {

                    if (f.type === 'image/heic' || f.name.toLowerCase().endsWith('.heic')) {
                        // Allow the upload of .heic files

                    } else if (f.type.match('image/.*')) {
                        // Handle other image file types for uploading

                    }

                    if (imgArrayApp.length > maxAllowedSize) {
                        return false
                    } else {
                        var len = 0;
                        for (var i = 0; i < imgArrayApp.length; i++) {
                            if (imgArrayApp[i] !== undefined) {
                                len++;
                            }
                        }
                        if (len > maxAllowedSize) {
                            return false;
                        } else {
                            imgArrayApp.push(f);
                            var reader = new FileReader();
                            reader.onload = function (e) {
                                var html = "<div class='upload__img-box'><div style='background-image: url(" + e.target.result + ")' data-number='" + $(".upload__img-close").length + "' data-file='" + f.name + "' class='img-bg'><div class='upload__img-close'></div></div></div>";
                                imgWrap.append(html);
                                iterator++;
                            }
                            reader.readAsDataURL(f);
                        }
                    }

                });

                UpdateCount(imgArrayApp, fileControlId);

            }
            else if (fileControlId == "uploadLenderLicense") {

                filesArr.forEach(function (f, index) {

                    if (f.type === 'image/heic' || f.name.toLowerCase().endsWith('.heic')) {
                        // Allow the upload of .heic files

                    } else if (f.type.match('image/.*')) {
                        // Handle other image file types for uploading

                    }

                    if (imgArrayIns.length > maxAllowedSize) {
                        return false
                    } else {
                        var len = 0;
                        for (var i = 0; i < imgArrayIns.length; i++) {
                            if (imgArrayIns[i] !== undefined) {
                                len++;
                            }
                        }
                        if (len > maxAllowedSize) {
                            return false;
                        } else {
                            imgArrayIns.push(f);
                            var reader = new FileReader();
                            reader.onload = function (e) {
                                var html = "<div class='upload__img-box'><div style='background-image: url(" + e.target.result + ")' data-number='" + $(".upload__img-close").length + "' data-file='" + f.name + "' class='img-bg'><div class='upload__img-close'></div></div></div>";
                                imgWrap.append(html);
                                iterator++;
                            }
                            reader.readAsDataURL(f);
                        }
                    }

                });

                UpdateCount(imgArrayIns, fileControlId);

            }
            else if (fileControlId == "stateIssuedId") {

                filesArr.forEach(function (f, index) {

                    if (f.type === 'image/heic' || f.name.toLowerCase().endsWith('.heic')) {
                        // Allow the upload of .heic files

                    } else if (f.type.match('image/.*')) {
                        // Handle other image file types for uploading

                    }

                    if (imgArraySur.length > maxAllowedSize) {
                        return false
                    } else {
                        var len = 0;
                        for (var i = 0; i < imgArraySur.length; i++) {
                            if (imgArraySur[i] !== undefined) {
                                len++;
                            }
                        }
                        if (len > maxAllowedSize) {
                            return false;
                        } else {
                            imgArraySur.push(f);
                            var reader = new FileReader();
                            reader.onload = function (e) {
                                var html = "<div class='upload__img-box'><div style='background-image: url(" + e.target.result + ")' data-number='" + $(".upload__img-close").length + "' data-file='" + f.name + "' class='img-bg'><div class='upload__img-close'></div></div></div>";
                                imgWrap.append(html);
                                iterator++;
                            }
                            reader.readAsDataURL(f);
                        }
                    }

                });

                UpdateCount(imgArraySur, fileControlId);
            }

        });


    });

    $('body').on('click', ".upload__img-close", function (e) {

        var file = $(this).parent().data("file");
        demo = $(this).parent().parent().parent().parent().find(".demo");
        var fileControl = $(this).parent().parent().parent().parent().find(".upload__inputfile");
        fileControlId = fileControl[0].id;

        if (fileControlId == "uploadFileLender") {
            for (var i = 0; i < imgArrayApp.length; i++) {
                totalFiles = imgArrayApp.length - 1;
                if (imgArrayApp[i].name === file) {
                    imgArrayApp.splice(i, 1);
                    break;
                }
            }

            UpdateCount(imgArrayApp, fileControlId);
        }
        else if (fileControlId == "uploadLenderLicense") {
            for (var i = 0; i < imgArrayIns.length; i++) {
                totalFiles = imgArrayIns.length - 1;
                if (imgArrayIns[i].name === file) {
                    imgArrayIns.splice(i, 1);
                    break;
                }
            }

            UpdateCount(imgArrayIns, fileControlId);
        }
        else if (fileControlId == "stateIssuedId") {
            for (var i = 0; i < imgArraySur.length; i++) {
                totalFiles = imgArraySur.length - 1;
                if (imgArraySur[i].name === file) {
                    imgArraySur.splice(i, 1);
                    break;
                }
            }

            UpdateCount(imgArraySur, fileControlId);
        }
        $(this).parent().parent().remove();

    })
}

function UpdateCount(imgArray, fileControlId) {

    const dt = new DataTransfer()
    for (var i = 0; i < imgArray.length; i++) {
        dt.items.add(imgArray[i])
    }
    if (fileControlId != null && fileControlId != undefined) {
        $("#" + fileControlId)[0].files = dt.files;
    }
}

function GetCountryList() {
    debugger
    $.ajax({
        url: "/Lender/GetCountryList",
        success: function (response) {
            var data = '<option value="0">USA</option>';
            response.forEach(function (item) {
                data += '<option value= ' + item.countryID + '>' + item.countryName + '</option>'
            });
            $('#countryField').html(data);
        }
    });
}

$("#zipCode").keyup(function () {
    debugger
    var zipValue = $(this).val();

    if (zipValue !== "" && !$.isNumeric(zipValue)) {    
        $('#errZipCode').text("Enter a valid zip code").css("color", "Red");
    } else if (zipValue == "") {
        $('#errZipCode').text("Enter zip code ").css("color", "Red");
        IsEmtpty = false;
    } else if ($("#zipCode").val().length < 5) {
        $('#errZipCode').text("Enter five digit").css("color", "Red");
    }
    else {
        $('#errZipCode').text('');
    }
})

$("#yearsInBusiness").keyup(function () {
    debugger
    var yearInBusiness = $(this).val();

    if (yearInBusiness !== "" && !$.isNumeric(yearInBusiness)) {       
        $('#errYearInBusiness').text("please enter a valid year count").css("color", "Red");
    } else if (yearInBusiness == "") {
        $('#errYearInBusiness').text("Enter year in business").css("color", "Red");
        IsEmtpty = false;
    }
    else {
        $('#errYearInBusiness').text('');
    }
})

$("#estimatedNumberLoanDone").keyup(function () {
    debugger
    var estLoanValue = $(this).val();
    var regex = /^(0|[1-9]\d*)$/;
    if (estLoanValue !== "" && !regex.test(estLoanValue)) {      
        $('#errEstimatedNumberLoanDone').text("please enter valid number of loans").css("color", "Red");
    } else if (estLoanValue == "") {
        $('#errEstimatedNumberLoanDone').text("Enter est. number of loans done per year").css("color", "Red");
        IsEmtpty = false;
    }
    else {
        $('#errEstimatedNumberLoanDone').text('');
    }
})

$("#preferredAttorneyemail").keyup(function () {
    debugger
    var userinput = $(this).val();
    var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i

    if (!pattern.test(userinput) && userinput != "") {     
        $('#errAttorneyemail').text('Please enter valid e-mail address');
        IsEmtpty = false;
    }
    else {
        $('#errAttorneyemail').text('');
    }  
    return IsEmtpty;
})

function GetPropertyStateList() {
    debugger
    $.ajax({
        url: "/Property/GetPropertyStateList",
        success: function (response) {
            var data = '<option value="0">Select State</option>';
            response.forEach(function (item) {

                data += '<option value= ' + item.stateId + '>' + item.longName + '</option>'
            });
            $('#stateField').html(data);
        }
    });
}

