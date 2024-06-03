
function getUserIdFromUrl() {

    var urlParts = window.location.href.split('/');
    var userId = urlParts[urlParts.length - 1];
    return userId;
}
//$(document).ready(function () {

//    GetPropertyStateList();
   
//});

function UpdateLenderProfile() {

    debugger
    var userId = getUserIdFromUrl();

    var IsEmtpty = ValidateAddListing1();
    if (IsEmtpty == true) {
        debugger

        var formData = new FormData();
        formData.append('FirstName', $('#fName').val());
        formData.append('LastName', $('#lastName').val());
        formData.append('Title', $('#principalBroker').val());
        formData.append('Email', $('#emailProfile').val());
        formData.append('PhoneNumber', $('#mobilePhoneId').val());
        formData.append('OfficePhone', $('#officePhoneId').val());
        formData.append('RoleInLendingCompany', $('#roleLending').val());
        formData.append('LenderCompanyName', $('#lenderCompanyName1').val());
        formData.append('EntityType', $('#enrityType').val());
        formData.append('LenderPhoneNo', $('#phoneLenderInput').val());
        formData.append('Address1', $('#addressfield3').val());
        formData.append('Address2', $('#address2field').val());
        formData.append('City', $('#CityField1').val());
        formData.append('StateId', $('#stateField1').val());
        formData.append('ZipCode', $('#zipCode1').val());
      /*  formData.append('Country', $('#countryField :selected').text());*/
        formData.append('YearsInBusiness', $('#yearsInBusiness').val());
        formData.append('EstimatedLoansDonePerYear', $('#estimatedNumberLoanDone').val());
        formData.append('PreferredAttorneyForDocDrafting', $('#preferredAttorneyDoc').val());
        formData.append('PreferredAttorneyPhone', $('#preferredAttorneyPhone').val());
        formData.append('InterestedInServeLoansRightHereWithInReidy', $('#servicingLoanReidy').val());
        formData.append('IdentificationType', $('#identificationform1').val());
       
        formData.append('IsSignupCompleted', '1');
        /*  formData.append('ProofType', $('#proofType').val());*/
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
                /*$('#spanUploadIdentityFile').html('Identification File should be in image or pdf format');*/
                // Clear the file input to remove the invalid file
                filesInput.value = '';
                return; // Exit the loop if an invalid file is found
            }
        }
        formData.append('Id', userId);
        document.getElementById("divLoader").style.visibility = "visible";
        // Assuming formData is your FormData object
      /*  var flagValue = formData.get('Flag');*/
        $.ajax({
            url: '/Lender/UpdateLenderProfile',  // Update with your server endpoint
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {

                document.getElementById("divLoader").style.visibility = "hidden";
                toastr.success('Lender Profile updated successfully.');
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

}

//Validate Lender SignUp Fields start

function ValidateAddListing1() {
    debugger
    var IsEmtpty = true;

    var phoneNumber = $("#mobilePhoneId").val().trim();
    var phonePattern = /^(\d{3}-){2}\d{4}$/;
    var phoneInput = $('#mobilePhoneId').val();
    if (phoneNumber == "") {
        debugger
        $('#errMobileNo').text("Please enter mobile number").css("color", "Red");
        IsEmtpty = false;
    }
    if (!phonePattern.test(phoneInput) && phoneNumber != "" && phoneNumber.length!=12) {
        debugger
        $('#errMobileNo').text('Invalid mobile number');
        IsEmtpty = false;
    }

    var phoneNumber = $("#officePhoneId").val().trim();
    var phonePattern = /^(\d{3}-){2}\d{4}$/;
    var phoneInput = $('#officePhoneId').val();
   
    if (!phonePattern.test(phoneInput) && phoneNumber.length != 12 && phoneNumber != "") {
        debugger
        $('#errOfficePhone').text('Invalid mobile number');
        IsEmtpty = false;
    }

    var phoneNumber = $("#phoneLenderInput").val().trim();
    var phonePattern = /^(\d{3}-){2}\d{4}$/;
    var phoneInput = $('#phoneLenderInput').val();
    if (phoneNumber == "") {
        debugger
        $('#errPhoneLenderInput').text("Please enter mobile number").css("color", "Red");
        IsEmtpty = false;
    }
    if (!phonePattern.test(phoneInput) && phoneNumber.length != 12 && phoneNumber != "") {
        debugger
        $('#errPhoneLenderInput').text('Invalid mobile number');
        IsEmtpty = false;
    }

    var phoneNumber = $("#preferredAttorneyPhone").val().trim();
    var phonePattern = /^(\d{3}-){2}\d{4}$/;
    var phoneInput = $('#preferredAttorneyPhone').val();

    if (!phonePattern.test(phoneInput) && phoneNumber.length != 12 && phoneNumber != "") {
        debugger
        $('#errPreferredAttorneyPhone').text('Invalid mobile number');
        IsEmtpty = false;
    }

    var roleInCompany = $("#roleLending").val().trim();
    if (roleInCompany == "") {
        $('#errRoleLending').text("Please enter role in company").css("color", "Red");
        IsEmtpty = false;
    }
    else if (roleInCompany != "") {
        $('#errRoleLending').text(" ");
    }

    var companyName = $("#lenderCompanyName1").val().trim();
    if (companyName == "") {
        $('#errLenderCompanyName1').text("Please enter company name").css("color", "Red");
        IsEmtpty = false;
    }
    else if (companyName != "") {
        $('#errLenderCompanyName1').text(" ");
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
        $('#errPhoneLenderInput').text("Please enter phone number").css("color", "Red");
        IsEmtpty = false;
    }
    if (!lenderPhonePattern.test(lenderPhoneInput) && lenderNumber != "") {
        debugger
        $('#errPhoneLenderInput').text('Invalid phone number');
        IsEmtpty = false;
    }

    var address1 = $("#addressfield3").val().trim();
    if (address1 == "") {
        $('#errAddressfield3').text("Address 1 is required").css("color", "Red");
        IsEmtpty = false;
    }
    else if (address1 != "") {
        $('#errAddressfield3').text(" ");
    }

    var city = $("#CityField1").val().trim();
    if (city == "") {
        $('#errCityField1').text("City is required").css("color", "Red");
        IsEmtpty = false;
    }
    else if (city != "") {
        $('#errCityField1').text(" ");
    }

    var State = $("#stateField1").val().trim();
    if ($('#stateField1').val() == 0) {
        $('#errStateField1').text('State is required');
        IsEmtpty = false;
    }
    else {
        debugger
        $('#errStateField1').text('');
    }


    var zipCode = $("#zipCode1").val().trim();
    var zipCodeLimit = $("#zipCode1").val().length;
    if (zipCode == "") {
        $('#errZipCode1').text("Enter zip code").css("color", "Red");
        IsEmtpty = false;
    }
    else if (zipCode != "") {
        if (zipCode.length >= 5) {
            $('#errZipCode1').text(" ");
        } else {
            $('#errZipCode1').text("Please enter 5 digit").css("color", "Red");
            IsEmtpty = false;
        }
    }

    var yearInBusiness = $("#yearsInBusiness").val().trim();
    if (yearInBusiness == "") {
        $('#errYearsInBusiness').text("Enter year in business").css("color", "Red");
        IsEmtpty = false;
    }
    else if (yearInBusiness != "") {
        $('#errYearsInBusiness').text(" ");
    }

    var estimatedNumberLoanDone = $("#estimatedNumberLoanDone").val().trim();
    if (estimatedNumberLoanDone == "") {
        $('#errEstimatedNumberLoanDone').text("Enter estimated number of loans done per year").css("color", "Red");
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
        $('#errPreferredAttorneyPhone').text('Invalid phone number');
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

    //var UploadIdentification = $("#uploadFileLender").val().trim();
    //if (UploadIdentification == "") {
    //    $('#errUploadLenderFile').text("Please upload file").css("color", "Red");
    //    IsEmtpty = false;
    //}
    //else if (UploadIdentification != "") {
    //    $('#errUploadLenderFile').text(" ");
    //}

    //var status = $("#chkbx3").prop('checked');
    //if (status == false) {
    //    $('#txtAcceptLenderUser').css('color', '#DC3545');
    //    IsEmtpty = false;
    //}
    //else {
    //    $('#txtAcceptLenderUser').css('color', 'black');
    //}

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
        /*  $('#spanUploadPropertyImage').text("Invalid file format");*/
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
        /*  $('#spanUploadPropertyImage').text("Invalid file format");*/
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
        /*  $('#spanUploadPropertyImage').text("Invalid file format");*/
    }
    else {
        $('#spanUploadIdentityFile').text('');

    }
}
// Check Property Pictures File Formate end

// Function to show the validation message for file format start
function ShowValidationForLenderUploadFile(message) {

    $('#spanUploadLenderFile').text(message);
    /* $('#spanUploadPropertyImage').show();*/
    $('#spanUploadLenderFile').fadeIn();

    // Set a timer to hide the validation message after 3 seconds (3000 milliseconds)
    setTimeout(function () {
        /*    $('#spanUploadPropertyImage').hide();*/
        $('#spanUploadLenderFile').fadeOut();
    }, 3000);
}

function ShowValidationForLenderLicense(message) {

    $('#spanUploadLenderLicenseFile').text(message);
    /* $('#spanUploadPropertyImage').show();*/
    $('#spanUploadLenderLicenseFile').fadeIn();

    // Set a timer to hide the validation message after 3 seconds (3000 milliseconds)
    setTimeout(function () {
        /*    $('#spanUploadPropertyImage').hide();*/
        $('#spanUploadLenderLicenseFile').fadeOut();
    }, 3000);
}
function ShowValidationForIdenity(message) {

    $('#spanUploadIdentityFile').text(message);
    /* $('#spanUploadPropertyImage').show();*/
    $('#spanUploadIdentityFile').fadeIn();

    // Set a timer to hide the validation message after 3 seconds (3000 milliseconds)
    setTimeout(function () {
        /*    $('#spanUploadPropertyImage').hide();*/
        $('#spanUploadIdentityFile').fadeOut();
    }, 3000);
}
// Function to show the validation message for file format start

//remove validation start
function RemoveMobileNumber() {
    $('#errMobileNo').text('');
}

function RemoveOfficePhone() {
    $('#errOfficePhone').text(''); 
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
    $('#errPhoneLenderInput').text('');
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
function RemoveAttorneyPhone() {
    $('#errPreferredAttorneyPhone').text('');
}


//remove validation end

//Validate ZipCode max length 5
$('#zipCode').on("keyup", function () {
    debugger;
    var zipCode = $("#zipCode").val().length;//min
    if (zipCode < 5) {
        $('#errZipCode').text("Enter 5 digit only.").css("color", "Red");

    } else {
        $('#errZipCode').text('');
    }
});

//function for not allowed negative value from keyboard

$('#zipCode').on('keydown', function (e) {
    if (e.key === '-') {
        e.preventDefault();
    }
});

$('#estimatedNumberLoanDone').on('keydown', function (e) {
    if (e.key === '-') {
        e.preventDefault();
    }
});

$('#yearsInBusiness').on('keydown', function (e) {
    if (e.key === '-') {
        e.preventDefault();
    }
});

//function for allow two decimal places in input field
$('#estimatedNumberLoanDone').on('input', function () {
    var value = $(this).val();
    var parts = value.split('.');
    if (parts.length > 1) {
        parts[1] = parts[1].slice(0, 2); // Keep only two decimal places
        value = parts.join('.');
        $(this).val(value);
    }
});

$('#yearsInBusiness').on('input', function () {
    var value = $(this).val();
    var parts = value.split('.');
    if (parts.length > 1) {
        parts[1] = parts[1].slice(0, 2); // Keep only two decimal places
        value = parts.join('.');
        $(this).val(value);
    }
});

//function for enter Phonenumber format input fields
$('.myMobilePhone').keydown(function (e) {
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

$('.myOfficePhone').keydown(function (e) {
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

$('.myLenderPhone').keydown(function (e) {
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

$('.myAttorneyPhone').keydown(function (e) {
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


function CancelLenderSignup() {
    debugger
    EditSignup();
    // Navigate to the index page
    /*window.location.href = '/Home/Index';*/
}

//New code for preview 

jQuery(document).ready(function () {
    /* CheckLenderUploadFileFormat();*/

    ImgUpload();
   


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


function GetPropertyStateList() {
    debugger
    $.ajax({
        url: "/Property/GetPropertyStateList",
        success: function (response) {
            var data = '<option value="0">Select State</option>';
            response.forEach(function (item) {

                data += '<option value= ' + item.stateId + '>' + item.longName + '</option>'
            });
            $('#stateField1').html(data);
        }
    });
}

function CancelLenderProfile() {
    window.location.href = '/Home/Index';
}




