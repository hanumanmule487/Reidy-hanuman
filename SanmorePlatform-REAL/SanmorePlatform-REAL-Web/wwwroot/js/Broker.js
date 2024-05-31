function RemoveUploadIdentification() {
    $('#errstateIssuedId').text('');
}

function RemoveUploadIdentification() {
    $('#errstateIssuedId').text('');
}


//Format All numeric fields into comma seperated 
//Function for Validate File Formate/extention

function CheckInspectionFileFormat() {

    var ext = $('#fileForm1').val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['pdf', 'gif', 'png', 'jpg', 'jpeg', 'tiff', 'tif', 'bmp', 'eps', 'svg', 'webp']) == -1) {
        ShowValidationForInspection("Please upload valid file format.");
        //$('#spanUploadInspectionFile').text("Invalid file format");
    } else {
        $('#spanUploadInspectionFile').text('');
    }
}


// Check Identification File Formate

function CheckIdentificationFileFormat() {
    debugger
    var ext = $('#stateIssuedId').val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['pdf', 'gif', 'png', 'jpg', 'jpeg', 'tiff', 'tif', 'bmp', 'eps', 'svg', 'webp']) == -1) {
        var fileInput = document.getElementById('stateIssuedId');
        if (fileInput.files.length == 1) {
            ShowValidationForIdentification("Please upload valid file format.");
        }
    }
    else {
        $('#spanUploadIdentityFile').text('');
    }
}

function fileFormatOnchange() {
    CheckIdentificationFileFormat();
    RemoveUploadIdentification();
}

//New code for preview 

$(document).ready(function () {
    ImgUpload();
});

function ImgUpload() {
    debugger
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
            debugger
            fileControlId = $(this)[0].id;
            imgWrap = $(this).closest('.upload__box').find('.upload__img-wrap');
            var maxLength = $(this).attr('data-max_length');
            const maxAllowedSize = 5 * maxLength;
            var files = e.target.files;
            var filesArr = Array.prototype.slice.call(files);
            var iterator = 0;
            if (fileControlId == "fileForm") {

                filesArr.forEach(function (f, index) {

                    if (!f.type.match('image.*')) {
                        return;
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
                debugger
                UpdateCount(imgArrayApp, fileControlId);

            }
            else if (fileControlId == "fileForm1") {

                filesArr.forEach(function (f, index) {

                    if (!f.type.match('image.*')) {
                        return;
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
                debugger
                UpdateCount(imgArrayIns, fileControlId);

            }
            else if (fileControlId == "fileForm2") {

                filesArr.forEach(function (f, index) {

                    if (!f.type.match('image.*')) {
                        return;
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
                debugger
                UpdateCount(imgArraySur, fileControlId);
            }
            else if (fileControlId == "fileForm3") {

                filesArr.forEach(function (f, index) {

                    if (!f.type.match('image.*')) {
                        return;
                    }

                    if (imgArrayEnv.length > maxAllowedSize) {
                        return false
                    } else {
                        var len = 0;
                        for (var i = 0; i < imgArrayEnv.length; i++) {
                            if (imgArrayEnv[i] !== undefined) {
                                len++;
                            }
                        }
                        if (len > maxAllowedSize) {
                            return false;
                        } else {
                            imgArrayEnv.push(f);
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
                debugger
                UpdateCount(imgArrayEnv, fileControlId);
            }

            else if (fileControlId == "upload-img") {

                filesArr.forEach(function (f, index) {

                    if (!f.type.match('image.*')) {
                        return;
                    }

                    if (imgArrayPropPic.length > maxAllowedSize) {
                        return false
                    } else {
                        var len = 0;
                        for (var i = 0; i < imgArrayPropPic.length; i++) {
                            if (imgArrayPropPic[i] !== undefined) {
                                len++;
                            }
                        }
                        if (len > maxAllowedSize) {
                            return false;
                        } else {
                            imgArrayPropPic.push(f);
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
                debugger
                UpdateCount(imgArrayPropPic, fileControlId);
            }

            else if (fileControlId == "stateIssuedId") {

                filesArr.forEach(function (f, index) {

                    if (!f.type.match('image.*')) {
                        return;
                    }

                    if (imgArrayIdent.length > maxAllowedSize) {
                        return false
                    } else {
                        var len = 0;
                        for (var i = 0; i < imgArrayIdent.length; i++) {
                            if (imgArrayIdent[i] !== undefined) {
                                len++;
                            }
                        }
                        if (len > maxAllowedSize) {
                            return false;
                        } else {
                            imgArrayIdent.push(f);
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
                debugger
                UpdateCount(imgArrayIdent, fileControlId);
            }
        });


    });

    $('body').on('click', ".upload__img-close", function (e) {
        debugger
        var file = $(this).parent().data("file");
        demo = $(this).parent().parent().parent().parent().find(".demo");
        var fileControl = $(this).parent().parent().parent().parent().find(".upload__inputfile");
        fileControlId = fileControl[0].id;

        if (fileControlId == "fileForm") {
            for (var i = 0; i < imgArrayApp.length; i++) {
                totalFiles = imgArrayApp.length - 1;
                if (imgArrayApp[i].name === file) {
                    imgArrayApp.splice(i, 1);
                    break;
                }
            }

            UpdateCount(imgArrayApp, fileControlId);
        }
        else if (fileControlId == "fileForm1") {
            for (var i = 0; i < imgArrayIns.length; i++) {
                totalFiles = imgArrayIns.length - 1;
                if (imgArrayIns[i].name === file) {
                    imgArrayIns.splice(i, 1);
                    break;
                }
            }

            UpdateCount(imgArrayIns, fileControlId);
        }
        else if (fileControlId == "fileForm2") {
            for (var i = 0; i < imgArraySur.length; i++) {
                totalFiles = imgArraySur.length - 1;
                if (imgArraySur[i].name === file) {
                    imgArraySur.splice(i, 1);
                    break;
                }
            }

            UpdateCount(imgArraySur, fileControlId);
        }
        else if (fileControlId == "fileForm3") {
            for (var i = 0; i < imgArrayEnv.length; i++) {
                totalFiles = imgArrayEnv.length - 1;
                if (imgArrayEnv[i].name === file) {
                    imgArrayEnv.splice(i, 1);
                    break;
                }
            }

            UpdateCount(imgArrayEnv, fileControlId);
        }
        else if (fileControlId == "upload-img") {
            for (var i = 0; i < imgArrayPropPic.length; i++) {
                totalFiles = imgArrayPropPic.length - 1;
                if (imgArrayPropPic[i].name === file) {
                    imgArrayPropPic.splice(i, 1);
                    break;
                }
            }

            UpdateCount(imgArrayPropPic, fileControlId);
        }
        else if (fileControlId == "stateIssuedId") {
            for (var i = 0; i < imgArrayIdent.length; i++) {
                totalFiles = imgArrayIdent.length - 1;
                if (imgArrayIdent[i].name === file) {
                    imgArrayIdent.splice(i, 1);
                    break;
                }
            }
            UpdateCount(imgArrayIdent, fileControlId);
        }
        $(this).parent().parent().remove();

    })
}

function UpdateCount(imgArray, fileControlId) {
    debugger
    const dt = new DataTransfer()
    for (var i = 0; i < imgArray.length; i++) {

        dt.items.add(imgArray[i])
    }
    if (fileControlId != null && fileControlId != undefined) {
        $("#" + fileControlId)[0].files = dt.files;
    }
}

// Function to show the validation message
function ShowValidationForIdentification(message) {

    $('#spanUploadIdentityFile').text(message);
    $('#spanUploadIdentityFile').fadeIn();
    // Set a timer to hide the validation message after 3 seconds (3000 milliseconds)
    setTimeout(function () {
        $('#spanUploadIdentityFile').fadeOut();
    }, 3000);
}

// // Function for Will you collect escrows of option other dropdown section

var brokerrole = document.getElementById("primaryRolebroker");
var otheresc = document.getElementById('chnagerole1');
var newEle = document.createElement("div");
newEle.setAttribute("class", "modal-backdrop fade show");
brokerrole.addEventListener("change", rolechnage);

var closebtn = document.getElementById("closechnagerole");

function rolechnage() {

    if (brokerrole.value == "3") {
        document.body.appendChild(newEle)
        otheresc.classList.add("show");
        otheresc.classList.add("d-block");
        body.classList.add("modal-open");
    }
    else {
        otheresc.classList.remove("show");
        body.classList.remove("modal-open");
    }
}
