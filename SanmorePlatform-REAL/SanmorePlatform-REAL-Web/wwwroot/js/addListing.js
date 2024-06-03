//==========================================================Arshad new code====================================
var imgArrayVideo = [];
//Property Videos preview and upload
var videoUpload = document.getElementById('upload-video')
    , videoPreview = document.getElementById('video-preview')
    , videoUploadForm = document.getElementById('form-upload')
    , totalFiles
    , previewTitle
    , previewTitleText
    , video;

videoUpload.addEventListener('change', previewImgvideo, true);

function previewImgvideo(event) {
    debugger
    fileControlId = $(this)[0].id;
    var maxLength = $(this).attr('data-max_length');
    const maxAllowedSize = 5 * maxLength;
    totalFiles = videoUpload.files.length;
    var filesArr = Array.prototype.slice.call(videoUpload.files);

    filesArr.forEach(function (f, index) {

        if (!f.type.match('video.*')) {
            return;
        }

        if (imgArrayVideo.length > maxAllowedSize) {
            return false
        } else {
            var len = 0;
            for (var i = 0; i < imgArrayVideo.length; i++) {
                if (imgArrayVideo[i] !== undefined) {
                    len++;
                }
            }
            if (len > maxAllowedSize) {
                return false;
            } else {
                imgArrayVideo.push(f);
            }
        }

    });

    if (!!totalFiles) {
        videoPreview.classList.remove('img-thumbs-hidden');
    }
    for (var i = 0; i < totalFiles; i++) {
        wrapper = document.createElement('div');
        wrapper.classList.add('wrapper-thumb');
        wrapper.setAttribute("file", filesArr[i].name);
        removeBtn = document.createElement("span");
        nodeRemove = document.createTextNode('x');
        removeBtn.classList.add('remove-btn');
        removeBtn.appendChild(nodeRemove);
        video = document.createElement('video');
        video.src = URL.createObjectURL(event.target.files[i]);
        video.classList.add('img-preview-thumb');
        wrapper.appendChild(video);
        wrapper.appendChild(removeBtn);
        videoPreview.appendChild(wrapper);
        $('.remove-btn').click(function () {
            debugger
            var file = $(this).parent()[0].getAttribute('file');
            var fileControl = $(this).parent().parent().parent().parent().find("#upload-video");
            fileControlId = fileControl[0].id;

            for (var i = 0; i < imgArrayVideo.length; i++) {
                totalFiles = imgArrayVideo.length - 1;
                if (imgArrayVideo[i].name === file) {
                    imgArrayVideo.splice(i, 1);
                    break;
                }

            }
            UpdateCount(imgArrayVideo, fileControlId);
            $(this).parent().remove();
        });
    }

    UpdateCount(imgArrayVideo, fileControlId);

}

//==========================================================End new code====================================

function updateInputFiles(files) {
    // Create a new FileList and set it to the input
    var newFileList = new DataTransfer();
    files.forEach(function (file) {
        newFileList.items.add(file);
    });

    videoUpload.files = newFileList.files;
}


function updateInputFiles(files) {
    // Create a new FileList and set it to the input
    var newFileList = new DataTransfer();
    files.forEach(function (file) {
        newFileList.items.add(file);
    });

    videoUpload.files = newFileList.files;
}

/***************************************************************************Dev Team Code **********************/
$(document).ready(function () {
    debugger;
    GetPropertyTypeList();
    GetPropertyStateList();
    FormatNumericValues();
    var down = document.querySelectorAll('.select2-selection--multiple');
    down.forEach((e) => {
        e.classList.add('form-select');
    });
});



function GetPropertyTypeList() {
    debugger
    $.ajax({
        url: "/Property/GetPropertyTypeList",
        success: function (response) {
            var data = '<option value="0">Property Type</option>';
            response.forEach(function (item) {
                data += '<option value= ' + item.propertyTypeId + '>' + item.propertyTypeName + '</option>'
            });
            $('#propertyType').html(data);
        }
    });
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
            $('#stateField').html(data);
        }
    });
}

//Add Property with  Lat and Long
var latitude;
var longitude;

function SubmitPropertyData() {
    debugger;
    var IsEmtpty = ValidateAddListing();
    if (IsEmtpty == true) {
        var geocoder = new google.maps.Geocoder();
        var status;
        var address = $('#address1').val() + ', ' + $('#address2').val() + ', ' + $('#CityField').val() + ', ' + $('#stateField').val() + ', ' + $('#zipCode').val();

        geocoder.geocode({ 'address': address }, function (results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                debugger
                latitude = results[0].geometry.location.lat();
                longitude = results[0].geometry.location.lng();
                $("#WarningCreateLending").modal("show");
            }
            else {
                if (status != google.maps.GeocoderStatus.OK) {
                    $('#erraddress1').text("Please enter valid USA address").css("color", "Red");
                }
            }
        });
    }
    else {
        return false;
    }
}
$("#txtConformModel").click(function () {
    AddProperty();
})

debugger
var userId = $("#txtUserId").val();


//Method for Add Property  Details
function AddProperty() {
    debugger;
    //Save UnitMix table
    var bedselect = new Array();
    var units = new Array();
    var baths = new Array();
    var unitarea = new Array();
    var askingRent = new Array();
    var arrLength = $("#getAllHtml").children().length;

    for (var i = 1; i <= arrLength; i++) {
        bedselect.push($("#getAllHtml div:nth-child(" + i + ") #bedselect").val());
        units.push($("#getAllHtml").children("div:nth-child(" + i + ")").find("#units").val());
        baths.push($("#getAllHtml").children("div:nth-child(" + i + ")").find("#bathselect").val());
        unitarea.push($("#getAllHtml").children("div:nth-child(" + i + ")").find("#unitsarea").val());
        askingRent.push($("#getAllHtml").children("div:nth-child(" + i + ")").find("#askingRent").val());
    }

    var beditem = bedselect.join(",")
    var unititem = units.join(",")
    var bathitem = baths.join(",")
    var unitareaValue = unitarea.join(",")
    var askingRentValue = askingRent.join(",")
    //Save Link table
    var linkName = new Array();
    var linkLength = $("#getAllHtmlForLink").children().length;

    for (var i = 1; i <= linkLength; i++) {
        linkName.push($("#getAllHtmlForLink div:nth-child(" + i + ") #linkform").val());
    }
    var linkNameValue = linkName.join(",")

    var address = $('#address1').val() + ', ' + $('#address2').val() + ', ' + $('#CityField').val() + ', ' + $('#stateField').val() + ', ' + $('#zipCode').val();

    var formData = new FormData();
    formData.append('PropertyTypeId', $('#propertyType').val());
    if ($('#propertyType').val() === '2') {

        // Include data from the Residential Details div
        formData.append('ResidentialBuildingStatus', $('#residentialBuildingStatus').val());


        var renovated = $('#renovated').val();
        var finalResidentialRenovated = renovated.replace('$', '');
        formData.append('ResidentialRenovated', finalResidentialRenovated.replace(/,/g, ''));


        var afterRepair = $('#afterRepair').val();
        var finalResidentialAfterRepairValue = afterRepair.replace('$', '');
        formData.append('ResidentialAfterRepairValue', finalResidentialAfterRepairValue.replace(/,/g, ''));

        formData.append('ResidentialBedrooms', $('#bedroomsId').val());
        formData.append('ResidentialBathrooms', $('#bathroomId').val());
        formData.append('ResidentialBuiltSquareFootage', $('#builtSquareId').val().replace(/,/g, ''));
        formData.append('ResidentialLotSizeSquareFootage', $('#lotSizeFootage').val().replace(/,/g, ''));
        formData.append('ResidentialBuiltYear', $('#builtYearField').val());
        formData.append('ResidentialRenovatedYear', $('#renovatedYear1').val());
        formData.append('ResidentialParking', $('#parkingResidential').val());
        formData.append('ResidentialParkingSpace', $('#parkingSpaces').val());
        formData.append('ResidentialOccupancy', $('#occupiedField1').val());
        formData.append('ResidentialWillOccupancyStayAfterSale', $('#willOccupantStayAfterSale1').val());
    }
    if ($('#propertyType').val() === '11') {

        // Include data from the Residential Details div
        formData.append('LandSquareFootage', $('#landSquareFootage').val().replace(/,/g, ''));
        formData.append('LandSquareFootageUnit', $('#landSquareFootage2').val());
        formData.append('LotStatus', $('#lotStatus').val());
        formData.append('LotUse', $('#lotUse').val());
        formData.append('Electric', $('#electricField').val());
        formData.append('Gas', $('#gasField').val());
        formData.append('Water', $('#waterrequirement').val());
        formData.append('OpenToPartneringWithBuilders', $('#opentoBuilders').val());
        formData.append('SurveyAvailable', $('#surveyavail').val());
        formData.append('EnvironmentalAvailable', $('#enironmentalAvail').val());
    }
    debugger
    formData.append('RelationshipToProperty', $('#relationshipId1').val());

    var targetPrice = $('#targetPrice').val();
    var finalTargetPrice = targetPrice.replace('$', '');
    formData.append('TargetPrice', finalTargetPrice.replace(/,/g, ''));

    var originaltargetPrice = $('#originaltargetPrice').val();
    var finalOriginalTargetPrice = originaltargetPrice.replace('$', '');
    formData.append('OriginalTargetPrice', finalOriginalTargetPrice.replace(/,/g, ''));

    formData.append('Address1', $('#address1').val());
    formData.append('Address2', $('#address2').val());
    formData.append('City', $('#CityField').val());
    formData.append('StateId', $('#stateField').val());
    formData.append('ZipCode', $('#zipCode').val());

    //Add Latitude and Longitude for the complete address
    formData.append('Latitude', latitude);
    formData.append('Longitude', longitude);

    formData.append('BuildingStatus', $('#buildingStatus').val());
    formData.append('BuildingCount', $('#buildings').val());
    formData.append('Units', $('#units1').val());
    formData.append('BuiltSquareFootage', $('#squareFootage').val().replace(/,/g, ''));
    formData.append('Floors', $('#fFloors').val());
    formData.append('YearBuilt', $('#yearBuilt').val());
    formData.append('YearRenovated', $('#yearRenovated').val());
    formData.append('LandArea', $('#landArea').val().replace(/,/g, ''));
    formData.append('Occupancy', $('#occupiedField').val());
    formData.append('WillOccupantStayAfterSale', $('#willOccupantStayAfterSale').val());
    formData.append('AcceptUserAgreement', $('#chkbx2').is(':checked'));
    formData.append('Construction', $('#constructionmaterial').val());
    formData.append('Elevators', $('#elevators').val());
    formData.append('ParkingCount', $('#parking').val());
    formData.append('Governance', $('#governanceField').val());
    if ($('#governanceField').val().includes('6')) {
        formData.append('OtherGovernance', $('#otherDescription').val());
    }

    formData.append('DeliveryBays', $('#deliveryBays').val());
    formData.append('Description', $('#descTextarea').val());

    formData.append('IsSellerfinancing', $('#isSellerOffered').val() === "1" ? "true" : "false");
    if ($('#isSellerOffered').val() === '1') {
        debugger
        // Include data from the IsSellerfinancing  div
        var downpayValue = $('#downPayment').val();
        var finaldownpayValue = downpayValue.replace('%', ''); // remove the '%' symbol from the value
        formData.append('DownPaymentNeeded', finaldownpayValue); // Append the modified value to the FormData

        var interestValue = $('#interestOffered').val();
        var finalinterestValue = interestValue.replace('%', '');
        formData.append('InterestBeingOffered', finalinterestValue);

        formData.append('TermOfLoanYear', $('#yearLoan').val());
        formData.append('TermOfLoanMonth', $('#monthLoan').val());
        formData.append('Amortized', $('#amortizedId').val());
    }

    formData.append('IsthisaSubjecttoAssumption', $('#subAssup').val() === "1" ? "true" : "false");
    if ($('#subAssup').val() === '1') {

        var cashtoCloseValue = $('#cashToCLoseNeeded').val();
        var finalcashtoCloseValue = cashtoCloseValue.replace('$', '');
        formData.append('CashToCloseNeeded', finalcashtoCloseValue.replace(/,/g, ''));

        var mortageValue = $('#mortgageBalance').val();
        var finalmortageValue = mortageValue.replace('$', '');
        formData.append('MortgageBalance', finalmortageValue.replace(/,/g, ''));

        var monthlyPaymentValue = $('#monthlyPaymentAssumed').val();
        var finalmonthlyPaymentValue = monthlyPaymentValue.replace('$', '');
        formData.append('MonthlyPaymentBeingAssumed', finalmonthlyPaymentValue.replace(/,/g, ''));

        formData.append('EscrowsIncludedInMonthlyPayment', $('#escrowsField').val());
        formData.append('TermLeftOnMortgageYear', $('#yearLoan1').val());
        formData.append('TermLeftOnMortgageMonth', $('#monthLoan1').val());
        formData.append('AmortizationOfMortgage', $('#amortizedmortgageId').val());
    }

    formData.append('DueDiligencePeriodAvailableDays', $('#dueDiligenceAvail').val());
    formData.append('KeyFeature1', $('#feature1').val());
    formData.append('KeyFeature2', $('#feature2').val());
    formData.append('KeyFeature3', $('#feature3').val());
    formData.append('KeyFeature4', $('#feature4').val());


    // Append UnitMix data
    for (var i = 0; i < bedselect.length; i++) {
        formData.append('UnitMix[' + i + '].Beds', bedselect[i]);
        formData.append('UnitMix[' + i + '].Units', units[i]);
        formData.append('UnitMix[' + i + '].Baths', baths[i]);
        formData.append('UnitMix[' + i + '].UnitArea', unitarea[i].replace(/,/g, ''));
        formData.append('UnitMix[' + i + '].AskingRent', askingRent[i].replace('$', '').replace(/,/g, ''));

    }
    //Append Link Dataupload-img
    for (var i = 0; i < linkName.length; i++) {
        formData.append('Link[' + i + '].LinkName', linkName[i]);
    }

    // Handle multiple Imagefile uploads
    var filesInput = document.getElementById('upload-img');
    for (var i = 0; i < filesInput.files.length; i++) {
        var file = filesInput.files[i];
        if (/\.(gif|jpe?g|tiff?|png|jfif|webp|bmp|heic|pdf|avif|heif)$/i.test(file.name)) {
            formData.append('UploadImage', file);
        } else {
            $('#spanUploadPropertyImage').html('All File should be in image or pdf format');

            // Clear the file input to remove the invalid file
            filesInput.value = '';
            return; // Exit the loop if an invalid file is found
        }
    }

    // Handle multiple Videofile uploadsg
    debugger
    var filesInput = document.getElementById('upload-video');
    for (var i = 0; i < filesInput.files.length; i++) {
        var file = filesInput.files[i];
        if (/\.(mp4|avi|mov|flv|wmv|webm|ogg)$/i.test(file.name)) {
            formData.append('UploadVideo', file);
        } else {
            $('#spanUploadPropertyVideo').html('All video files should be in video format');

            // Clear the file input to remove the invalid file
            filesInput.value = '';
            return; // Exit the loop if an invalid file is found
        }
    }

    // Handle multiple Appraisalfile uploads
    var filesInput = document.getElementById('fileForm');
    for (var i = 0; i < filesInput.files.length; i++) {
        formData.append('UploadAppraisal', filesInput.files[i]);
    }
    // Handle multiple Inspectionfile uploads
    var filesInput = document.getElementById('fileForm1');
    for (var i = 0; i < filesInput.files.length; i++) {
        formData.append('UploadlInspection', filesInput.files[i]);
    }
    // Handle multiple Surveyfile uploads
    var filesInput = document.getElementById('fileForm2');
    for (var i = 0; i < filesInput.files.length; i++) {
        formData.append('UploadlSurvey', filesInput.files[i]);
    }
    // Handle multiple Environmentalfile uploads
    var filesInput = document.getElementById('fileForm3');
    for (var i = 0; i < filesInput.files.length; i++) {
        formData.append('UploadlEnvironmental', filesInput.files[i]);
    }
    //Handle identification varification uploads
    formData.append('IdentificationVarificationId', $('#identificationform').val());

    // Handle single file upload
    var fileInput = document.getElementById('stateIssuedId');
    if (fileInput.files.length > 0 && fileInput.files.length > 2) {
        var file = fileInput.files[0];
        if (/\.(gif|jpe?g|tiff?|png|jfif|webp|bmp|heic|pdf)$/i.test(file.name)) {
            formData.append('UploadIdentity', file);
        } else {
            $('#spanUploadIdentityFile').html('Identification File should be in image or pdf format');
            // Clear the file input to remove the invalid file
            filesInput.value = '';
            return; // Exit the loop if an invalid file is found
        }
    }

    formData.append('UserId', userId);


    debugger
    document.getElementById("divLoader").style.visibility = "visible";
    $.ajax({
        url: '/Property/AddProperty',  // Update with your server endpoint
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {

            $("#WarningCreateLending2").modal("show");
            document.getElementById("divLoader").style.visibility = "hidden";

        },
        error: function (error) {
            // Handle error
            console.error(error);
        }
    });
}

//Method for Create Original Target Price text box after clicking Wholesaler RelationshipToProperty.
debugger
function RelationshipToProperty() {
    var selectedValue = $("#relationshipId1").val();
    if (selectedValue == "Wholesaler") {
        $('#divOriginalTargetPrice').removeClass('d-none');
    }
    else {
        $('#divOriginalTargetPrice').addClass('d-none');
    }
}

//function for show Land Details section when clicking "land" property type *********start
function ShowLandDetails() {
    debugger
    var selectedValue = $("#propertyType").val();
    if (selectedValue === '2') {
        $('.showProperty').hide(); // Hide Property Details
        $('.residential-property').removeClass("d-none"); // Show Residential Property Details   
        $('.land-Detail').addClass("d-none");//Hide Land Details 
    } else if (selectedValue === '11') {
        $('.showProperty').hide(); // Hide Property Details
        $('.land-Detail').removeClass("d-none"); // Show Land  Details 
        $('.residential-property').addClass("d-none"); // Hide Residential Property Details
    }
    else {
        $('.showProperty').show(); // Show Property Details
        $('.residential-property').addClass("d-none"); // Hide Residential Property Details
        $('.land-Detail').addClass("d-none"); // Hide Land  Details
    }
}
//function for show Land Details section when clicking "land" property type *********end

function OtherGovernance() {
    var selectedValue = $("#governanceField").val();
    if (selectedValue.includes("6")) {
        $('#divOtherGovernance').removeClass('d-none');
    }
    else {
        $('#divOtherGovernance').addClass('d-none');
    }
}

//Method for Add and Remove Seller Financing
$('#isSellerOffered').change(function () {
    debugger;
    var selectedValue = $("#isSellerOffered").val();
    if (selectedValue == 1) {
        /* $('.removeAddedSellerFinancingOption').hide();*/
        $('.removeAddedSellerFinancingOption').removeClass('d-none');
    }
    else
        $('.removeAddedSellerFinancingOption').addClass('d-none');
})

//Method for Add and Remove Subject-To-Assumption
$('#subAssup').change(function () {
    debugger;
    var selectedValue = $("#subAssup").val();

    if (selectedValue == 1) {
        $('.AddOrRemoveSubjectToAssumption').removeClass('d-none');
    }
    else
        $('.AddOrRemoveSubjectToAssumption').addClass('d-none');

})


//Method for Add new row after Clicking + button for Unit Mix section
function MakeNewRow() {
    debugger
    if ($('#getAllHtml').children().length < 20) {
        var htmlContent = $('#getAllHtmldNone div').html();
        $('#getAllHtml').append(htmlContent);
    }

}

//Method for Add new row after Clicking + button for Link section
function MakeNewLinkRow() {
    debugger
    if ($('#getAllHtmlForLink').children().length < 8) {
        var htmlContent = $('#getAllHtmlForLinkhdn div').html();
        $('#getAllHtmlForLink').append(htmlContent);
    }

}
//Delete function for Add Link
$("#getAllHtmlForLink").on('click', '.deleteMe', function () {
    debugger
    if ($(this).closest('div#parentDiv').next().find('.idAddDiv').length == 0 && $(this).closest('div#parentDiv').prev().find('.idAddDiv').length != 0) {
        $(this).closest('div#parentDiv').prev().find('.idAddDiv').removeAttr("style");
        debugger
        $(this).closest('div#parentDiv').remove();
    } else if ($(this).closest('div#parentDiv').next().find('.idAddDiv').length == 0 && $(this).closest('div#parentDiv').prev().find('.idAddDiv').length == 0) {
        /*    $(this).closest('div#parentDiv').remove();*/
    } else if ($(this).closest('div#parentDiv').next().find('.idAddDiv').length == 1) {
        $(this).closest('div#parentDiv').remove();
    }
});

$("#getAllHtmlForLink").on('click', '.deleteMe1', function () {
    debugger
    if ($('#getAllHtmlForLink').children().length != 1) {
        $(this).closest('div#mainDiv').remove();
    }

});
$("#getAllHtml").on('click', '.deleteMe2', function () {
    debugger
    if ($('#getAllHtml').children().length != 1) {
        $(this).closest('div#mainDiv2').remove();
    }

});


//Delete function for Unit Mix

$("#getAllHtml").on('click', '.deleteMeUnitMix', function () {
    debugger
    if ($(this).closest('div#parentDiv2').next().find('.idAddUnitDiv').length == 0 && $(this).closest('div#parentDiv2').prev().find('.idAddUnitDiv').length != 0) {
        $(this).closest('div#parentDiv2').prev().find('.idAddUnitDiv').removeAttr("style");
        debugger
        $(this).closest('div#parentDiv2').remove();
    } else if ($(this).closest('div#parentDiv2').next().find('.idAddUnitDiv').length == 0 && $(this).closest('div#parentDiv2').prev().find('.idAddUnitDiv').length == 0) {
        /*    $(this).closest('div#parentDiv').remove();*/
    } else if ($(this).closest('div#parentDiv2').next().find('.idAddUnitDiv').length == 1) {
        $(this).closest('div#parentDiv2').remove();
    }
});



//method for remove % on backspace start
$('#downPayment').keyup(function (event) {
    debugger
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '8') {

    }
    else {
        downPaymentPlaceholder();
    }
});
$('#interestOffered').keyup(function (event) {
    debugger
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '8') {

    }
    else {
        InterestWithPlaceholder();
    }
});
//method for remove % on backspace end
function CashToCloseOnKeyup() {
    RemoveAashToCloseNeeded();
    CashToCloseWithPlaceholder();
}

//apply placeholder for % and $ start
function downPaymentPlaceholder() {
    debugger
    var displayValue = "";
    var checkValueISPresentt = $('#downPayment').val();


    if (checkValueISPresentt != "") {
        displayValue = checkValueISPresentt.replace('%', '');
    }
    var num = displayValue + '%'
    if (num == '%') {
        $('#downPayment').val('')
    }
    else {
        $('#downPayment').val(num)
    }

}
function InterestWithPlaceholder() {
    debugger
    var interestValue = "";
    var checkValueISPresentt = $('#interestOffered').val();
    if (checkValueISPresentt != "") {
        interestValue = checkValueISPresentt.replace('%', '');
    }
    var num = interestValue + '%';
    if (num == '%') {
        $('#interestOffered').val('')
    }
    else {
        $('#interestOffered').val(num)
    }

}
//Method for add placeholder for doller on Price value
function CashToCloseWithPlaceholder() {
    debugger
    var cashToCloseValue = "";
    var checkValueISPresentt = $('#cashToCLoseNeeded').val();



    if (checkValueISPresentt != "") {
        cashToCloseValue = checkValueISPresentt.replace('$', '');
    }
    var num = '$' + cashToCloseValue;
    $('#cashToCLoseNeeded').val(num)
}
//apply placeholder for % and $ end

function TwoOnChange() {
    RelationshipToProperty();
    RemoveRelationship();
}


// Remove Original Target Price 
function RemoveOriginalTargetPrice() {
    $('#erroriginaltargetPrice').text('');
}

function ValidatePropertyType() {
    ShowLandDetails();
    RemovePropertyType();
}

//Function for AddProperty page Validation
function ValidateAddListing() {
    debugger;
    var IsEmtpty = true;
    if ($('#propertyType').val() === '2') {
        debugger;
        // Residential
        $('#errResBuildingStatus').text('Please select building Status');
        if ($('#residentialBuildingStatus').val() == 0) {
            IsEmtpty = false;
        }
        else {
            $('#errResBuildingStatus').text('');
        }

        $('#errResAfterRepair').text('Please select After repair value.');
        if ($('#afterRepair').val() == 0) {
            IsEmtpty = false;
        }
        else {
            $('#errResAfterRepair').text('');
        }

        $('#errResBedrooms').text('Please select bedrooms');
        if ($('#bedroomsId').val() == 0) {
            IsEmtpty = false;
        }
        else {
            $('#errResBedrooms').text('');
        }

        $('#errResBathrooms').text('Please select bathrooms');
        if ($('#bathroomId').val() == 0) {
            IsEmtpty = false;
        }
        else {
            $('#errResBathrooms').text('');
        }

        $('#errResBuiltSquareFootage').text('Please select built Square Footage.');
        if ($('#builtSquareId').val() == 0) {
            IsEmtpty = false;
        }
        else {
            $('#errResBuiltSquareFootage').text('');
        }

        $('#errResLotSizeSquareFootage').text('Please select Lot size  square footage.');
        if ($('#lotSizeFootage').val() == 0) {
            IsEmtpty = false;
        }
        else {
            $('#errResLotSizeSquareFootage').text('');
        }

        $('#errResParking').text('Please select parking value.');
        if ($('#parkingResidential').val() == 0) {
            IsEmtpty = false;
        }
        else {
            $('#errResParking').text('');
        }

        $('#errResParkingSpaces').text('Please select parking spaces.');
        if ($('#parkingSpaces').val() == 0) {
            IsEmtpty = false;
        }
        else {
            $('#errResParkingSpaces').text('');
        }

        $('#errResOccupancy').text('Please select Occupancy.');
        if ($('#occupiedField1').val() == 0) {
            IsEmtpty = false;
        }
        else {
            $('#errResOccupancy').text('');
        }

        $('#errResWillOccupantAfterSale').text('Please select WillOccupantAfterSale ');
        if ($('#willOccupantStayAfterSale1').val() == 0) {
            IsEmtpty = false;
        }
        else {
            $('#errResWillOccupantAfterSale').text('');
        }

    } if ($('#relationshipId1').val() == "Wholesaler") {
        var OriginalTargetPrice = $("#originaltargetPrice").val().trim();
        if (OriginalTargetPrice == "") {
            $('#erroriginaltargetPrice').text("Please enter original target price").css("color", "Red");
            IsEmtpty = false;
        }
        else if (OriginalTargetPrice != "") {
            $('#erroriginaltargetPrice').text(" ");
        }
    } if ($('#propertyType').val() == '11') {
        // validation on Land Details section

        debugger
        var landSquareFootage = $("#landSquareFootage").val().trim();
        if (landSquareFootage == "") {
            $('#errLandSquareFootage').text("Please enter land square footage").css("color", "Red");
            IsEmtpty = false;
        }
        else if (landSquareFootage != "") {
            $('#errLandSquareFootage').text(" ");
        }

        var lotStatus = $("#lotStatus").val().trim();
        if (lotStatus == "Select") {
            $('#errLotStatus').text("Please select LotStatus").css("color", "Red");
            IsEmtpty = false;
        }
        else if (lotStatus != "") {
            $('#errLotStatus').text(" ");
        }

        var lotUse = $("#lotUse").val().trim();
        if (lotUse == "Select") {
            $('#errLotUse').text("Please select LotUse").css("color", "Red");
            IsEmtpty = false;
        }
        else if (lotUse != "") {
            $('#errLotUse').text(" ");
        }

        var electricField = $("#electricField").val().trim();
        if (electricField == "Select") {
            $('#errElectricField').text("Please select ElectricField").css("color", "Red");
            IsEmtpty = false;
        }
        else if (electricField != "") {
            $('#errElectricField').text(" ");
        }

        var garField = $("#gasField").val().trim();
        if (garField == "Select") {
            $('#errGasField').text("Please select GasField").css("color", "Red");
            IsEmtpty = false;
        }
        else if (garField != "") {
            $('#errGasField').text(" ");
        }

        var waterType = $("#waterrequirement").val();
        if (waterType.length == " ") {
            $('#errWaterrequirement').text("Please select Water").css("color", "Red");
            IsEmtpty = false;
        } else if (waterType != "") {
            $('#errWaterrequirement').text(" ");
        }


        var openToBuilders = $("#opentoBuilders").val().trim();
        if (openToBuilders == "Select") {
            $('#errOpenToBuilders').text("Please select Open to partnering with builders").css("color", "Red");
            IsEmtpty = false;
        }
        else if (openToBuilders != "") {
            $('#errOpenToBuilders').text(" ");
        }

        var surveyAvail = $("#surveyavail").val().trim();
        if (surveyAvail == "Select") {
            $('#errSurveyavail').text("Please select Survey available ").css("color", "Red");
            IsEmtpty = false;
        }
        else if (surveyAvail != "") {
            $('#errSurveyavail').text(" ");
        }

        var enironmentalAvail = $("#enironmentalAvail").val().trim();
        if (enironmentalAvail == "Select") {
            $('#errEnironmentalAvail').text("Please select Environmental available ").css("color", "Red");
            IsEmtpty = false;
        }
        else if (enironmentalAvail != "") {
            $('#errEnironmentalAvail').text(" ");
        }



    }
    if ($('#propertyType').val() != ' ' && $('#propertyType').val() != '2' && $('#propertyType').val() != '11') {
        //Property Details
        debugger
        var BuildingStatus = $("#buildingStatus").val().trim();
        if (BuildingStatus == "Select") {
            $('#errbuildingStatus').text("Please select building status").css("color", "Red");
            IsEmtpty = false;
        }
        else if (BuildingStatus != "") {
            $('#errbuildingStatus').text(" ");
        }


        var BuildingCount = $("#buildings").val().trim();
        if (BuildingCount == "") {
            $('#errbuildings').text("Please enter building count").css("color", "Red");
            IsEmtpty = false;
        }
        else if (BuildingCount != "") {
            $('#errbuildings').text(" ");
        }


        var BuiltSquareFootage = $("#squareFootage").val().trim();
        if (BuiltSquareFootage == "") {
            $('#errsquareFootage').text("Please enter square footage").css("color", "Red");
            IsEmtpty = false;
        }
        else if (BuiltSquareFootage != "") {
            $('#errsquareFootage').text(" ");
        }


        var YearBuilt = $("#yearBuilt").val().trim();
        if (YearBuilt == "") {
            $('#erryearBuilt').text("Please enter year built").css("color", "Red");
            IsEmtpty = false;
        }
        else if (YearBuilt != "") {
            $('#erryearBuilt').text(" ");
        }


        var LandArea = $("#landArea").val().trim();
        if (LandArea == "") {
            $('#errlandArea').text("Please enter land area").css("color", "Red");
            IsEmtpty = false;
        }
        else if (LandArea != "") {
            $('#errlandArea').text(" ");
        }


        var Occupancy = $("#occupiedField").val().trim();
        if (Occupancy == "Select") {
            $('#erroccupiedField').text("Please select occupancy").css("color", "Red");
            IsEmtpty = false;
        }
        else if (Occupancy != "") {
            $('#erroccupiedField').text(" ");
        }

        var constructionMaterials = $("#constructionmaterial").val().trim();
        if (constructionMaterials == "Select") {
            $('#errConstructionMaterial').text("Please select construction material").css("color", "Red");
            IsEmtpty = false;
        }
        else if (constructionMaterials != "") {
            $('#errConstructionMaterial').text(" ");
        }

        var ParkingCount = $("#parking").val().trim();
        if (ParkingCount == "") {
            $('#errparking').text("Please enter parking count").css("color", "Red");
            IsEmtpty = false;
        }
        else if (ParkingCount != "") {
            $('#errparking').text(" ");
        }

        //validate Unit Mix for equality start

        debugger
        var units = new Array();

        var arrLength = $("#getAllHtml").children().length;

        for (var i = 1; i <= arrLength; i++) {
            units.push($("#getAllHtml").children("div:nth-child(" + i + ")").find("#units").val());
        }
        debugger
        var totalUnitMixUnits = 0;
        for (var i = 0; i < arrLength; i++) {
            debugger
            //totalUnitMixUnits += parseInt(units[i]); 
            totalUnitMixUnits += parseInt(units[i] || 0);

        }
        // Get the value of Units from the Property table
        //var propertyUnits = parseInt($('#units1').val());
        var propertyUnits = parseInt($('#units1').val() || 0);


        if (totalUnitMixUnits === propertyUnits) {
            RemoveUnitMixValidation();

            /* $('#errunits').addClass('d-none');*/

        } else {
            /* $('#errunits').text("Unit Mix`s total units  should be equal to Property detail`s Units.").css("color", "Red");*/
            toastr.warning("Unit Mix`s total units  should be equal to Property detail`s Units.");

            /*  $('#errunits').removeClass('d-none');*/

            IsEmtpty = false;
        }
    }
    if ($('#isSellerOffered').val() == '1') {
        var DownPayment = $("#downPayment").val().trim();

        if (DownPayment == '%' || DownPayment == '') {
            $('#errisdownPayment').text("Please enter down payment").css("color", "Red");
            IsEmtpty = false;
        }
        else if (DownPayment != "") {
            $('#errisdownPayment').text(" ");
        }

        var InterestOffered = $("#interestOffered").val().trim();
        if (InterestOffered == "") {
            $('#errinterestOffered').text("Please enter interest offered").css("color", "Red");
            IsEmtpty = false;
        }
        else if (InterestOffered != "") {
            $('#errinterestOffered').text(" ");
        }

        var Amortized = $("#amortizedId").val().trim();
        if (Amortized == "Select") {
            $('#erramortizedId').text("Please select amortized").css("color", "Red");
            IsEmtpty = false;
        }
        else if (Amortized != "") {
            $('#erramortizedId').text(" ");
        }

    }
    if ($('#subAssup').val() == '1') {
        var CashToCloseNeeded = $("#cashToCLoseNeeded").val().trim();
        if (CashToCloseNeeded == "") {
            $('#errcashToCLoseNeeded').text("Please enter cash to close needed").css("color", "Red");
            IsEmtpty = false;
        }
        else if (CashToCloseNeeded != "") {
            $('#errcashToCLoseNeeded').text(" ");
        }

        var Mortgagebalance = $("#mortgageBalance").val().trim();
        if (Mortgagebalance == "") {
            $('#errmortgageBalance').text("Please enter mortgage balance").css("color", "Red");
            IsEmtpty = false;
        }
        else if (Mortgagebalance != "") {
            $('#errmortgageBalance').text(" ");
        }


        var MonthlyPaymentAssumed = $("#monthlyPaymentAssumed").val().trim();
        if (MonthlyPaymentAssumed == "") {
            $('#errmonthlyPaymentAssumed').text("Please enter monthly payment assumed").css("color", "Red");
            IsEmtpty = false;
        }
        else if (MonthlyPaymentAssumed != "") {
            $('#errmonthlyPaymentAssumed').text(" ");
        }


        var escrowsField = $("#escrowsField").val();
        if (escrowsField.length == " ") {
            $('#errEscrowsField').text("Please select Escrows included in monthly payment ").css("color", "Red");
            IsEmtpty = false;
        } else if (escrowsField != "") {
            $('#errEscrowsField').text(" ");
        }

        var TermLeftOnMortgage = $("#yearLoan1").val().trim();
        if (TermLeftOnMortgage == "") {
            $('#errTermLeftOnMortgage').text("Please enter TermLeftOnMortgage").css("color", "Red");
            IsEmtpty = false;
        }
        else if (TermLeftOnMortgage != "") {
            $('#errTermLeftOnMortgage').text(" ");
        }
    }

    //common AddProperty fields
    debugger;
    if ($('#propertyType').val() == 0) {
        $('#errpropertytype').text('Please select property type');
        IsEmtpty = false;
    }
    else {
        $('#errpropertytype').text('');
    }

    var RelationshiptoProperty = $("#relationshipId1").val().trim();
    if (RelationshiptoProperty == "Select") {
        $('#errRelationshipId1').text("Please select relationship to property").css("color", "Red");
        IsEmtpty = false;
    }
    else if (RelationshiptoProperty != "") {
        $('#errRelationshipId1').text(" ");
    }


    var TargetPrice = $("#targetPrice").val().trim();
    if (TargetPrice == "") {
        $('#errtargetPrice').text("Please enter target price").css("color", "Red");
        IsEmtpty = false;
    }
    else if (TargetPrice != "") {
        $('#errtargetPrice').text(" ");
    }


    var Address = $("#address1").val().trim();
    if (Address == "") {
        $('#erraddress1').text("Please enter address 1").css("color", "Red");
        IsEmtpty = false;
    }
    else if (Address != "") {
        $('#erraddress1').text(" ");
    }


    var City = $("#CityField").val().trim();
    if (City == "") {
        $('#errCityField').text("Please enter city").css("color", "Red");
        IsEmtpty = false;
    }
    else if (City != "") {
        $('#errCityField').text(" ");
    }


    var State = $("#stateField").val().trim();
    if ($('#stateField').val() == 0) {
        $('#errstateField').text('State is required');
        IsEmtpty = false;
    }
    else {
        debugger
        $('#errstateField').text('');
    }

    //var ZipCode = $("#zipCode").val().trim();
    //if (ZipCode == "") {
    //    $('#errzipCode').text("Please enter zip code").css("color", "Red");
    //    IsEmtpty = false;
    //}
    //else if (ZipCode != "") {
    //    if (ZipCode.length >= 5) {
    //        $('#errzipCode').text(" ");
    //    } else {
    //        $('#errzipCode').text("Please enter minnimum 5 dijit").css("color", "Red");
    //    }

    //}


    var DueDiligenceAvail = $("#dueDiligenceAvail").val().trim();
    if (DueDiligenceAvail == "Select") {
        $('#errdueDiligenceAvail').text("Please select due diligence avail").css("color", "Red");
        IsEmtpty = false;
    }
    else if (DueDiligenceAvail != "") {
        $('#errdueDiligenceAvail').text(" ");
    }

    var PropertyDescription = $("#descTextarea").val().trim();
    if (PropertyDescription == "") {
        $('#errdescTextarea').text("Please enter property description").css("color", "Red");
        IsEmtpty = false;
    }
    else if (PropertyDescription != "") {
        $('#errdescTextarea').text(" ");
    }


    var IdentificationVerificationType = $("#identificationform").val().trim();
    if (IdentificationVerificationType == "Select") {
        $('#erridentificationform').text("Please select identification verification").css("color", "Red");
        IsEmtpty = false;
    }
    else if (IdentificationVerificationType != "") {
        $('#erridentificationform').text(" ");
    }

    var UploadIdentification = $("#stateIssuedId").val().trim();
    if (UploadIdentification == "") {
        $('#errstateIssuedId').text("Pleas upload identification").css("color", "Red");
        IsEmtpty = false;
    }
    else if (UploadIdentification != "") {
        $('#errstateIssuedId').text(" ");
    }

    var status = $("#chkbx2").prop('checked');
    if (status == false) {
        $('#txtAcceptUser').css('color', '#DC3545');
        IsEmtpty = false;
    }
    else {
        $('#txtAcceptUser').css('color', 'black');
    }

    //var zipCodeLimit = $("#zipCode").val().length;//min
    //if (zipCodeLimit ==" ") {
    //    /*  $('#errzipCode').text("Enter 5 digit only.").css("color", "Red");*/
    //    $('#errzipCode').text("Please enter zip code").css("color", "Red");
    //    IsEmtpty = false;
    //} else {
    //    $('#errzipCode').text('');
    //}
    var ZipCode = $("#zipCode").val().trim();
    var zipCodeLimit = $("#zipCode").val().length;
    if (ZipCode == "") {
        $('#errzipCode').text("Please enter zip code").css("color", "Red");
        IsEmtpty = false;
    }
    else if (ZipCode != "") {
        if (ZipCode.length >= 5) {
            $('#errzipCode').text(" ");
        } else {
            $('#errzipCode').text("Please enter 5 digit").css("color", "Red");
            IsEmtpty = false;
        }

    }
    return IsEmtpty;
}
// Remove Validation

function RemovePropertyType() {
    $('#errpropertytype').text('');
}

function RemoveRelationship() {
    $('#errRelationshipId1').text('');
}

function RemoveTargetPrice() {
    $('#errtargetPrice').text('');
}

function RemoveAddress() {
    $('#erraddress1').text('');
}

function RemoveCity() {
    $('#errCityField').text('');
}

$('#stateField').change(function () {

    var data = $(this).val();
    RemoveState(data)
})

function RemoveState(data) {

    $('#errstateField').text('');
}

function RemoveZipCode() {
    $('#errzipCode').text('');
}

function RemoveBuildingStatus() {
    $('#errbuildingStatus').text('');
}

function RemoveBuildingCount() {
    $('#errbuildings').text('');
}

function RemoveBuiltSquareFootage() {
    $('#errsquareFootage').text('');
}

function RemoveYearBuilt() {
    $('#erryearBuilt').text('');
}

function RemoveLandArea() {
    $('#errlandArea').text('');
}

function RemoveOccupancy() {
    $('#erroccupiedField').text('');
}

function RemoveConstructionMaterial() {
    $('#errConstructionMaterial').text('');
}

function RemoveParkingCount() {
    $('#errparking').text('');
}

function RemoveIsSellerOffered() {

    $('#errisSellerOffered').text('');
}

function RemoveDownPayment() {
    $('#errisdownPayment').text('');
}

function RemoveInterestOffered() {
    $('#errinterestOffered').text('');
}

function RemoveAmortized() {
    $('#erramortizedId').text('');
}

function RemoveAssumption() {
    $('#errsubAssup').text('');
}

function RemoveAashToCloseNeeded() {
    $('#errcashToCLoseNeeded').text('');
}

function RemoveMortgageBalance() {
    $('#errmortgageBalance').text('');
}

function RemoveMonthlyPaymentAssumed() {
    $('#errmonthlyPaymentAssumed').text('');
}

function RemoveEscrowsField() {
    $('#errEscrowsField').text('');
}

function RemoveTermLeftOnMortgage() {
    $('#errTermLeftOnMortgage').text('');
}

function RemoveDueDiligenceAvail() {
    $('#errdueDiligenceAvail').text('');
}

function RemovePropertyDescription() {
    $('#errdescTextarea').text('');
}

function RemoveDueDiligenceAvail() {
    $('#errdueDiligenceAvail').text('');
}

function RemovePropertyDescription() {
    $('#errdescTextarea').text('');
}

function RemoveidentificationForm() {
    $('#erridentificationform').text('');
}

function RemoveUploadIdentification() {
    $('#errstateIssuedId').text('');
}

function RemoveUploadIdentification() {
    $('#errstateIssuedId').text('');
}
//Remove Residential Validation
function RemoveResBuildingStatus() {
    $('#errResBuildingStatus').text('');

}
function RemoveResRepairValue() {
    $('#errResAfterRepair').text('');

}
function RemoveResBedrooms() {
    $('#errResBedrooms').text('');

}

function RemoveResBathrooms() {
    $('#errResBathrooms').text('');

}
function RemoveResBuiltSquareFootage() {
    $('#errResBuiltSquareFootage').text('');
}
function RemoveResLotSizeSquare() {
    $('#errResLotSizeSquareFootage').text('');

}
function RemoveResParking() {
    $('#errResParking').text('');

}
function RemoveResParkingSpaces() {
    $('#errResParkingSpaces').text('');

}
function RemoveResOccupancy() {
    $('#errResOccupancy').text('');

}
function RemoveResWillOccupant() {
    $('#errResWillOccupantAfterSale').text('');

}
//Remove Land Details Validation
function RemoveLandSquareFootage() {
    $('#errLandSquareFootage').text('');

}
function RemoveLotStatus() {
    $('#errLotStatus').text('');

}
function RemoveLotUse() {
    $('#errLotUse').text('');

}
function RemoveElectric() {
    $('#errElectricField').text('');

}
function RemoveGas() {
    $('#errGasField').text('');

}
function RemoveWater() {
    $('#errWaterrequirement').text('');

}
function RemoveOpenToPartneringWithBuilders() {
    $('#errOpenToBuilders').text('');

}
function RemoveUnitMixValidation() {
    $('#errunits').text('');
}
function RemoveSurveyAvailable() {
    var waterType = $("#waterrequirement").val();
    if (waterType.length == " ") {
        $('#errWaterrequirement').text("Please select Water").css("color", "Red");
        IsEmtpty = false;
    } else if (waterType != "") {
        $('#errWaterrequirement').text(" ");
    }
    $('#errSurveyavail').text('');

}
function RemoveEnvironmentalAvailable() {
    $('#errEnironmentalAvail').text('');

}

function CalculateUnitArea(value) {
    debugger
    var value1 = $(value).val();

    var dollervalue1 = value1.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    $(value).val(dollervalue1);
}
function CalculateAskingRent(data) {
    var vali2 = $(data).val();
    var dollervakue = vali2.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    var doolerwith = '$' + dollervakue;
    $(data).val(doolerwith);
}


//Format All numeric fields into comma seperated 
function FormatNumericValues() {
    debugger
    var targetP = document.querySelector('input.CommaSeperateTargetPrice');
    targetP.addEventListener('keyup', function (event) {
        if (event.which >= 37 && event.which <= 40) return;

        var targetPrice = this.value = this.value.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        var num = '$' + targetPrice;
        $('#targetPrice').val(num);
    });
    var contractTargetP = document.querySelector('input.commaSeperateContractPrice');
    contractTargetP.addEventListener('keyup', function (event) {
        if (event.which >= 37 && event.which <= 40) return;

        var contractPrice = this.value = this.value.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        var num = '$' + contractPrice;
        $('#originaltargetPrice').val(num);
    });
    var builtS = document.querySelector('input.commaSeperateBuiltSquare');
    builtS.addEventListener('keyup', function (event) {
        if (event.which >= 37 && event.which <= 40) return;

        this.value = this.value.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });
    var landA = document.querySelector('input.commaSeperateLandArea');
    landA.addEventListener('keyup', function (event) {
        if (event.which >= 37 && event.which <= 40) return;

        this.value = this.value.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });

    debugger

    var cashToC = document.querySelector('input.commaSeperateCashToClose');
    debugger;
    cashToC.addEventListener('keyup', function (event) {
        if (event.which >= 37 && event.which <= 40) return;

        var doller = this.value = this.value.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        var num = '$' + doller;
        $('#cashToCLoseNeeded').val(num)
    });
    var Mortgage = document.querySelector('input.commaSeperateMortgage');
    Mortgage.addEventListener('keyup', function (event) {
        debugger
        if (event.which >= 37 && event.which <= 40) return;

        var doller2 = this.value = this.value.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        var num2 = '$' + doller2;
        $('#mortgageBalance').val(num2);
    });
    var monthlyPayment = document.querySelector('input.commaSeperateMonthlyPayment');
    monthlyPayment.addEventListener('keyup', function (event) {
        if (event.which >= 37 && event.which <= 40) return;

        var doller3 = this.value = this.value.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        var num3 = '$' + doller3;
        $('#monthlyPaymentAssumed').val(num3);
    });

    var resRepair = document.querySelector('input.commaResidentialAfterRepairValue');
    resRepair.addEventListener('keyup', function (event) {
        if (event.which >= 37 && event.which <= 40) return;

        var afterRepairValue = this.value = this.value.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        var num = '$' + afterRepairValue;
        $('#afterRepair').val(num);
    });
    var resBuiltSquare = document.querySelector('input.commaResidentialBuiltSquareFootage');
    resBuiltSquare.addEventListener('keyup', function (event) {
        if (event.which >= 37 && event.which <= 40) return;

        this.value = this.value.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });
    var resLopSize = document.querySelector('input.commaResidentialLotSizeFootage');
    resLopSize.addEventListener('keyup', function (event) {
        if (event.which >= 37 && event.which <= 40) return;

        this.value = this.value.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });

    var resLopSize = document.querySelector('input.commaResidentialPriceOfRenovatedNeeded');
    resLopSize.addEventListener('keyup', function (event) {
        if (event.which >= 37 && event.which <= 40) return;

        var priceOfRenovatedNeeded = this.value = this.value.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        var num = '$' + priceOfRenovatedNeeded;
        $('#renovated').val(num);
    });

    //Format Land Details fields into comma seperated 
    var resLopSize = document.querySelector('input.commaLandSquareFootage');
    resLopSize.addEventListener('keyup', function (event) {
        if (event.which >= 37 && event.which <= 40) return;

        this.value = this.value.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });

}
//Function for Validate File Formate/extention
function CheckAppraisalFileFormat() {
    debugger
    var ext = $('#fileForm').val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['pdf', 'gif', 'png', 'jpg', 'jpeg', 'tiff', 'tif', 'bmp', 'eps', 'svg', 'webp']) == -1) {
        ShowValidationForAppraisal("Please upload valid file format.");
        /* $('#spanUploadAppraisalFile').text("Invalid file format");*/
    } else {
        $('#spanUploadAppraisalFile').text('');
    }
}

function CheckInspectionFileFormat() {

    var ext = $('#fileForm1').val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['pdf', 'gif', 'png', 'jpg', 'jpeg', 'tiff', 'tif', 'bmp', 'eps', 'svg', 'webp']) == -1) {
        ShowValidationForInspection("Please upload valid file format.");
        //$('#spanUploadInspectionFile').text("Invalid file format");
    } else {
        $('#spanUploadInspectionFile').text('');
    }
}

// in another js file, far, far away

//var imgWrap = "";
////var imgArray = [];
//var imgArrayApp = [];
//var imgArrayIns = [];
//var imgArraySur = [];
//var imgArrayEnv = [];
//var imgArrayProPc = [];
//var demo;
//var demo2;
//$('.upload__inputfile').on('change', function (e) {
//    // do stuff
//    debugger
//    var elementId = $(this)[0].id;
//    var ext = $('#' + elementId).val().split('.').pop().toLowerCase();
//    if ($.inArray(ext, ['pdf', 'gif', 'png', 'jpg', 'jpeg', 'tiff', 'tif', 'bmp', 'eps', 'svg', 'webp']) == -1) {
//        toastrErrorMessage("Invalid file format");
//        $('#' + elementId).val("");
//    }
//    else {
//        debugger
//        demo = $(this).closest('.upload__box').find('.demoClass');
//        demo2 = $(this).closest('.upload__box').find('.demoClass2');
//        imgWrap = $(this).closest('.upload__box').find('.upload__img-wrap');
//        var maxLength = $(this).attr('data-max_length');
//        const maxAllowedSize = 5 * maxLength;
//        var files = e.target.files;
//        var filesArr = Array.prototype.slice.call(files);

//        filesArr.forEach(function (f, index) {
//            if (!f.type.match('image.*')) {
//                return;
//            }
//            if (elementId == "fileForm") {
//                if (imgArrayApp.length < maxAllowedSize) {
//                    imgArrayApp.push(f);
//                    var reader = new FileReader();
//                    reader.onload = function (e) {
//                        var html = "<div class='upload__img-box'><div style='background-image: url(" + e.target.result + ")' data-file='" + f.name + "' class='img-bg'><div class='upload__img-close'></div></div></div>";
//                        imgWrap.append(html);
//                        updateCount(imgArrayApp);
//                    };
//                    reader.readAsDataURL(f);
//                }
//            }
//            else if (elementId == "fileForm1") {
//                if (imgArrayIns.length < maxAllowedSize) {
//                    imgArrayIns.push(f);
//                    var reader = new FileReader();
//                    reader.onload = function (e) {
//                        var html = "<div class='upload__img-box'><div style='background-image: url(" + e.target.result + ")' data-file='" + f.name + "' class='img-bg'><div class='upload__img-close'></div></div></div>";
//                        imgWrap.append(html);
//                        updateCount(imgArrayIns);
//                    };
//                    reader.readAsDataURL(f);
//                }
//            }
//            else if (elementId == "fileForm2") {
//                if (imgArraySur.length < maxAllowedSize) {
//                    imgArraySur.push(f);
//                    var reader = new FileReader();
//                    reader.onload = function (e) {
//                        var html = "<div class='upload__img-box'><div style='background-image: url(" + e.target.result + ")' data-file='" + f.name + "' class='img-bg'><div class='upload__img-close'></div></div></div>";
//                        imgWrap.append(html);
//                        updateCount(imgArraySur);
//                    };
//                    reader.readAsDataURL(f);
//                }
//            }
//            else if (elementId == "fileForm3") {
//                if (imgArrayEnv.length < maxAllowedSize) {
//                    imgArrayEnv.push(f);
//                    var reader = new FileReader();
//                    reader.onload = function (e) {
//                        var html = "<div class='upload__img-box'><div style='background-image: url(" + e.target.result + ")' data-file='" + f.name + "' class='img-bg'><div class='upload__img-close'></div></div></div>";
//                        imgWrap.append(html);
//                        updateCount(imgArrayEnv);
//                    };
//                    reader.readAsDataURL(f);
//                }
//            }
//            else if (elementId == "upload-img") {
//                if (imgArrayProPc.length < maxAllowedSize) {
//                    imgArrayProPc.push(f);
//                    var reader = new FileReader();
//                    reader.onload = function (e) {
//                        var html = "<div class='upload__img-box'><div style='background-image: url(" + e.target.result + ")' data-file='" + f.name + "' class='img-bg'><div class='upload__img-close'></div></div></div>";
//                        imgWrap.append(html);
//                        updateCount(imgArrayProPc);
//                    };
//                    reader.readAsDataURL(f);
//                }
//            }
//        });
//    }
//});

function CheckSurveyFileFormat() {

    var ext = $('#fileForm2').val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['pdf', 'gif', 'png', 'jpg', 'jpeg', 'tiff', 'tif', 'bmp', 'eps', 'svg', 'webp']) == -1) {
        ShowValidationForSurvey("Please upload valid file format.");
        // $('#spanUploadSurveyFile').text("Invalid file format");
    } else {
        $('#spanUploadSurveyFile').text('');
    }
}

function CheckEnvironmentalFileFormat() {

    var ext = $('#fileForm3').val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['pdf', 'gif', 'png', 'jpg', 'jpeg', 'tiff', 'tif', 'bmp', 'eps', 'svg', 'webp']) == -1) {
        ShowValidationForEnvironmental("Please upload valid file format.");
        /* $('#spanUploadEnvironmentalFile').text("Invalid file format");*/
    } else {
        $('#spanUploadEnvironmentalFile').text('');
    }
}

// Check Property Pictures File Formate

function CheckPropertyPicturesFileFormat() {
    debugger
    var ext = $('#upload-img').val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg', 'tiff', 'tif', 'bmp', 'eps', 'svg', 'webp', 'heif', 'avif', 'heic',]) == -1) {

        ShowValidationForImage("Please upload valid file format.");
        /*  $('#spanUploadPropertyImage').text("Invalid file format");*/
    }
    else {
        $('#spanUploadPropertyImage').text('');
    }
}

// Check Property Videos File Formate

function CheckPropertyVideoFormat() {

    var ext = $('#upload-video').val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['mp4', 'mov', 'wmv', 'avi', 'avchd', 'flv', 'mkv', 'webm', 'mpeg']) == -1) {
        $('#spanUploadPropertyVideo').text("Invalid file format");
    } else {
        $('#spanUploadPropertyVideo').text('');
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

function CancelPropertyData() {
    // Navigate to the index page
    window.location.href = '/Home/Index';
}

/*********** Method for Contract price <Target Paice Start    **********/
$('#originaltargetPrice,#targetPrice').on("keyup", function () {
    debugger;
    var originalTargetPrice = $("#originaltargetPrice").val();//min
    originalTargetPrice = originalTargetPrice.replace('$', '');
    originalTargetPrice = originalTargetPrice.replace(/,/g, '');
    originalTargetPrice = parseInt(originalTargetPrice);

    var TargetPrice = $("#targetPrice").val();//min
    TargetPrice = TargetPrice.replace('$', '');
    TargetPrice = TargetPrice.replace(/,/g, '');
    TargetPrice = parseInt(TargetPrice);

    if (originalTargetPrice > TargetPrice) {
        $('#erroriginaltargetPriceMaxLimit').text("Original Contract Price should be less than or equal to Target Price.").css("color", "Red");
    } else {
        $('#erroriginaltargetPriceMaxLimit').text('');
    }
});
$('#zipCode').on("keyup", function () {
    debugger;
    var zipCode = $("#zipCode").val().length;//min
    if (zipCode < 5) {
        $('#errzipCode').text("Enter 5 digit only.").css("color", "Red");

    } else {
        $('#errzipCode').text('');
    }
});

/***********Validate Year built and Year Renovated (Year built should be greater than Year renovated)**********/

//$('#yearRenovated').on("keyup", function () {
//    debugger;
//    var yearRenovated = $("#yearRenovated").val();

//    var yearBuilt = $("#yearBuilt").val();
//    if ($("#yearRenovated").val() != " ") {
//        if (yearRenovated < yearBuilt) {
//            $('#erryearRenovated').text("YearRenovated should be less than Year Built.").css("color", "Red");
//        } else {
//            $('#erryearRenovated').text('');
//        }
//    }   
//});





/***********Validate key feature length   **********/

$('#feature1').on("keyup", function () {
    debugger
    var feature1 = $("#feature1").val();
    if (feature1.length > 100) {
        $('#errFeature1').text("feature 1 have max limit 100 character.").css("color", "Red");
    } else {
        $('#errFeature1').text('');
    }
});
$('#feature2').on("keyup", function () {
    debugger
    var feature1 = $("#feature2").val();
    if (feature1.length > 100) {
        $('#errFeature2').text("feature 2 have max limit 100 character.").css("color", "Red");
    } else {
        $('#errFeature2').text('');
    }
});
$('#feature3').on("keyup", function () {
    debugger
    var feature1 = $("#feature3").val();
    if (feature1.length > 100) {
        $('#errFeature3').text("feature 3 have max limit 100 character.").css("color", "Red");
    } else {
        $('#errFeature3').text('');
    }
});
$('#feature4').on("keyup", function () {
    debugger
    var feature1 = $("#feature4").val();
    if (feature1.length > 100) {
        $('#errFeature4').text("feature 4 have max limit 100 character.").css("color", "Red");
    } else {
        $('#errFeature4').text('');
    }
});

/*-------------------Remove '+' on click '+' in Link Field------------------------*/
$('#divLinkMain').on('click', function () {
    debugger
    $(this).closest('#divLinkMain').css("visibility", "hidden");
});
$("#deleteMeCopy").on('click', function () {
    debugger
    $("#deleteMeCopy").hide();
});
$("#getAllHtmlForLink").on('click', '.idAddDiv', function () {
    debugger
    if ($(this).closest('div#parentDiv').next().find('.idAddDiv').length == 0 && $(this).closest('div#parentDiv').prev().find('.idAddDiv').length != 0) {
        $(this).closest('#deleteMeCopy').css("visibility", "show");

        toastr.warning('You can add only 8 links');

    }
    else {
        $(this).closest('#deleteMeCopy').css("visibility", "hidden");
    }


});

/*-------------------Remove '+' on click '+' in Unit Mix Field------------------------*/
$('#divUnitMain').on('click', function () {
    debugger
    $(this).closest('#divUnitMain').css("visibility", "hidden");
});

$("#getAllHtml").on('click', '.idAddUnitDiv', function () {
    debugger
    if ($(this).closest('div#parentDiv2').next().find('.idAddUnitDiv').length == 0 && $(this).closest('div#parentDiv2').prev().find('.idAddUnitDiv').length != 0) {
        $(this).closest('#AddIcon').css("visibility", "show");
        toastr.warning('You can add only 20 unit mixs');

    }
    else {
        $(this).closest('#AddIcon').css("visibility", "hidden");
    }

});

//Method for count value allow decimal value(0,2) range and not allow '-' from keyboard start---------
$('#parking').on('keydown', function (e) {
    if (e.key === '-') {
        e.preventDefault();
    }
});
$('#parking').on('input', function () {
    var value = $(this).val();
    var parts = value.split('.');
    if (parts.length > 1) {
        parts[1] = parts[1].slice(0, 2); // Keep only two decimal places
        value = parts.join('.');
        $(this).val(value);
    }
});
$('#buildings').on('keydown', function (e) {
    if (e.key === '-') {
        e.preventDefault();
    }
});
$('#buildings').on('input', function () {
    var value = $(this).val();
    var parts = value.split('.');
    if (parts.length > 1) {
        parts[1] = parts[1].slice(0, 2); // Keep only two decimal places
        value = parts.join('.');
        $(this).val(value);
    }
});


function downPaymentPlaceholder() {
    var displayValue = "";
    var inputValue = $('#buildings').val();

    // Remove '%' symbol if present
    displayValue = inputValue.replace('%', '');

    // Add '%' symbol if input is not empty
    var num = displayValue.trim() === '' ? '' : displayValue + '%';

    $('#buildings').val(num);
}




$('#chkbx2').click(function () {
    debugger;
    var status = $("#chkbx2").prop('checked');
    if (status == false) {
        $('#txtAcceptUser').css('color', '#DC3545');
    }
    else {
        $('#txtAcceptUser').css('color', 'black');
    }
});



//New code for preview 

jQuery(document).ready(function () {
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
/* ======================================================================================================*/

// Function to show the validation message
function ShowValidationForImage(message) {

    $('#spanUploadPropertyImage').text(message);
    /* $('#spanUploadPropertyImage').show();*/
    $('#spanUploadPropertyImage').fadeIn();

    // Set a timer to hide the validation message after 3 seconds (3000 milliseconds)
    setTimeout(function () {
        /*    $('#spanUploadPropertyImage').hide();*/
        $('#spanUploadPropertyImage').fadeOut();
    }, 3000);

}
function ShowValidationForAppraisal(message) {

    $('#spanUploadAppraisalFile').text(message);
    $('#spanUploadAppraisalFile').fadeIn();
    // Set a timer to hide the validation message after 3 seconds (3000 milliseconds)
    setTimeout(function () {
        $('#spanUploadAppraisalFile').fadeOut();
    }, 3000);
}
function ShowValidationForInspection(message) {

    $('#spanUploadInspectionFile').text(message);
    $('#spanUploadInspectionFile').fadeIn();
    // Set a timer to hide the validation message after 3 seconds (3000 milliseconds)
    setTimeout(function () {
        $('#spanUploadInspectionFile').fadeOut();
    }, 3000);
}
function ShowValidationForSurvey(message) {

    $('#spanUploadSurveyFile').text(message);
    $('#spanUploadSurveyFile').fadeIn();
    // Set a timer to hide the validation message after 3 seconds (3000 milliseconds)
    setTimeout(function () {
        $('#spanUploadSurveyFile').fadeOut();
    }, 3000);
}
function ShowValidationForEnvironmental(message) {

    $('#spanUploadEnvironmentalFile').text(message);
    $('#spanUploadEnvironmentalFile').fadeIn();
    // Set a timer to hide the validation message after 3 seconds (3000 milliseconds)
    setTimeout(function () {
        $('#spanUploadEnvironmentalFile').fadeOut();
    }, 3000);
}
function ShowValidationForIdentification(message) {

    $('#spanUploadIdentityFile').text(message);
    $('#spanUploadIdentityFile').fadeIn();
    // Set a timer to hide the validation message after 3 seconds (3000 milliseconds)
    setTimeout(function () {
        $('#spanUploadIdentityFile').fadeOut();
    }, 3000);
}

//function for close addlisting page
//function CloseAddListing() {
//    window.location.href = '/Home/Index';
//}



