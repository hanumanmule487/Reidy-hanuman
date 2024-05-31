//Load Property Details from database
var getProptyId;
$(document).ready(function () {
    var Build;
    var propId = getParameterValues('propertyId');
    getProptyId = propId;
    //Ajax call to get property list data
    $.ajax({
        url: "/Property/GetPropertyById",
        data: { propertyId: propId },
        method: 'GET',
        dataType: 'json',
        cache: true,
        success: function (data) {
            var Address1 = data.address1 != null ? data.address1 : ' ';
            var Address2 = data.address2 != null ? data.address2 + ',' : '';
            var City = data.city != null ? data.city : '';
            var State = data.state != null ? data.state : '';
            var ZipCode = data.zipCode != null ? data.zipCode : '';

            var perSqrFeet = 200;//TODO : real data
            var perMonth = 200; //TODO : real data
 

            //$("#inspectionImg  nth - child(1)  img").attr("src", data.dueDiligenceDocuments[0].filePath);
            /* $("#inspectionImg  nth - child(1)  a").attr("src", "/DueDiligenceFiles/8f7da394-de3e-4441-81bd-cbb5355c2c07.txt");*/
            //$('#inspectionImg').append("<a href='/DueDiligenceFiles/8f7da394-de3e-4441-81bd-cbb5355c2c07.txt' download>hgfvgh</a>");
            $('#propertyTitle').text(data.title);
            $('#targetPrice').text("$" + data.targetPrice);
            //$('#spnAddress').text(data.address1 + ', ' + data.address2 + ', ' + data.city + ', ' + data.state + ' ' + data.zipCode);
            $('#spnAddress').text(Address1 + ', ' + Address2 + ' ' + City + ', ' + State + ' ' + ZipCode);

            //------------
            var details = data.units + " units | " + data.builtSquareFootage + " sqrft";
            $('#spnTopDetails').text(details);
            //------------
            $('#txtDescription').text(data.description);
            //$('#txtDescriptionModelPopup').text(data.description);
            $('#spnBuildingType').text(data.propertyTypeName);
            $('#spnYearBuilt').text(data.yearBuilt);
            //------------
            $('#spnPerSqrFeet').text("$"+perSqrFeet+"/sqrft"); //TODO : real data
            $('#spnPerMonth').text("$"+perMonth+"/mo HOA"); //TODO : real data
            

            //------------
            $('#spnBuildingSize').text(data.builtSquareFootage);
            var Build = $('#spnBuildingSize').text();
            var commaNum = numberWithCommas(Build);
            $("#spnBuildingSize").text(commaNum);
            $('#txtDescription').text(data.description);

            $('#keyfeatureid1').text(data.keyFeature1);
            $('#keyfeatureid2').text(data.keyFeature2);
            $('#keyfeatureid3').text(data.keyFeature3);
            $('#keyfeatureid4').text(data.keyFeature4);

            $('#spnParking').text(data.parkingCount);

            $.each(data.dueDiligenceDocuments, function (index, document) {
                var doc = data.dueDiligenceDocuments[index].filePath;
                var finaldocpath = doc.split('\\').pop();
                var Path = "/DueDiligenceFiles/" + finaldocpath;
                if (data.dueDiligenceDocuments[index].fileType == 1) {

                    $('#AppraisalImg').append("<a href='" + Path + "' download>'" + data.dueDiligenceDocuments[index].fileName + "'</a></br>");
                }
                else if (data.dueDiligenceDocuments[index].fileType == 2) {
                    $('#inspectionImg').append("<a href='" + Path + "' download>'" + data.dueDiligenceDocuments[index].fileName + "'</a></br>");

                }
                else if (data.dueDiligenceDocuments[index].fileType == 3) {
                    $('#SurveyImg').append("<a href='" + Path + "' download>'" + data.dueDiligenceDocuments[index].fileName + "'</a></br>");

                }
                else if (data.dueDiligenceDocuments[index].fileType == 4) {
                    $('#EnvironmentalImg').append("<a href='" + Path + "' download>'" + data.dueDiligenceDocuments[index].fileName + "'</a></br>");

                }
            });
            ////--------------------------------------
            // get search query and format the back button and thing

            ////--------------------------------------
            var FinalHtml = '';
            $.each(data.propertyImages, function (index, image) {
                debugger
                index = index + 1;
                var path = image.imagePath;
                var imgFullPath;

                if (path != null) {
                    var finalPath = path.split('\\').pop();
                    var imgFullPath = "/PropertyImages/" + finalPath;

                    //$('#divImageSlider .owl-item:nth-child(' + index + ') div img').attr("src", imgFullPath);

                    if (index == 1) {
                        FinalHtml = FinalHtml + '<div class="item" id="imgParent">';
                    }
                    else {
                        FinalHtml = FinalHtml + '<div class="item">';
                    }

                    var alt = "slider-bg" + index;
                    FinalHtml = FinalHtml + '<img src="' + imgFullPath + '" alt="' + alt + '"  class="rounded-3">';
                    FinalHtml = FinalHtml + '</div>';
                }
                else {
                    var img = 'no-imge-1.jpg';
                    imgFullPath = "/PropertyImages/" + img;
                }

                if (index == 1) {
                    $('#txtBannner2').attr("src", imgFullPath);
                }
                if (index == 2) {
                    $('#txtBannner3').attr("src", imgFullPath);
                }
                if (index == 3) {
                    $('#txtBannner4').attr("src", imgFullPath);
                }
            });

            AddReadMore();
            if (data.propertyImages != null && data.propertyImages.length > 0) {
                $("#divImageSlider").html(FinalHtml);
            }
            debugger

            $('.banner-images').owlCarousel({
                items: 1,
                margin: 2,
                nav: true,
                navText: ['<img alt="pre" src="../images/pre.png">', '<img alt="next" src="../images/next.png">'],
                dots: false,
                autoplay: true,
                loop: true,
                rewind: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    1000: {
                        items: 1,
                    }
                }
            });

            $.each(data.propertyVideo, function (index, video) {
                debugger
                index = index + 1;
                var path = video.videoPath;
                if (path != null) {
                    var finalPath = path.split('\\').pop();
                    var videoFullPath = "/PropertyVideos/" + finalPath;
                    var videoFile = videoFullPath;
                    var video = $('#virtualVideoId video')[0];
                    video.src = videoFile;
                    video.load();
                    video.play();
                }
            });
            debugger
            if (data.propertyVideo.length <= 0) {
                var imageFile = "/PropertyVideos/no-video1.jpg";
                var imgElement = $('<img>').attr('src', imageFile).addClass('img-fluid rounded w-100');
                $('#virtualVideoId').empty().append(imgElement);
            }


            //Show location on Map
            var markers = [];       //Properties markers to show on google map.

            var feed = { id: data.propertyId, title: data.title, description: data.description, lat: data.latitude, lng: data.longitude, propertyType: data.propertyTypeId }
            markers.push(feed);

            //Initialize map and load markers, function defined on Map.js
            InitializeMapBasic();
            LoadMap(markers);
        },
        error: function (err) {
        }
    });

    // update search bar with search query


    //debugger
    // property-slider
    //$('.banner-images').owlCarousel({
    //    items: 1,
    //    margin: 2,
    //    nav: true,
    //    navText: ['<img alt="pre" src="../images/pre.png">', '<img alt="next" src="../images/next.png">'],
    //    dots: false,
    //    autoplay: true,
    //    loop: true,
    //    rewind: true,
    //    responsive: {
    //        0: {
    //            items: 1,
    //        },
    //        1000: {
    //            items: 1,
    //        }
    //    }
    //});
});


//Function to get parmater value from URL
function getParameterValues(key) {
    var pageURL = window.location.search.substring(1);
    var urlQS = pageURL.split('&');
    for (var i = 0; i < urlQS.length; i++) {
        var paramName = urlQS[i].split('=');
        if (paramName[0] == key) {
            //replace the special char like "+","&" etc from value
            var value = paramName[1].replace('%20', ' ').replace('%26', '&').replace('+', ' ');
            return value;
        }
    }
}

function numberWithCommas(number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function DocumentPreview() {
    //$("#id").css("display", "none");
    $("#AppraisalImg").css("display", "block");
    $("#inspectionImg").css("display", "none");
    $("#EnvironmentalImg").css("display", "none");
    $("#SurveyImg").css("display", "none");
    $("#exampleModal").modal('show');
}

function InspectionPreview() {
    //$("#id").css("display", "none");
    $("#inspectionImg").css("display", "block");
    $("#AppraisalImg").css("display", "none");
    $("#EnvironmentalImg").css("display", "none");
    $("#SurveyImg").css("display", "none");
    $("#exampleModal").modal('show');
}

function SurveyPreview() {
    //$("#id").css("display", "none");
    $("#SurveyImg").css("display", "block");
    $("#AppraisalImg").css("display", "none");
    $("#inspectionImg").css("display", "none");
    $("#EnvironmentalImg").css("display", "none");
    $("#exampleModal").modal('show');
}

function EnvironmentalPreview() {
    //$("#id").css("display", "none");
    $("#EnvironmentalImg").css("display", "block");
    $("#SurveyImg").css("display", "none");
    $("#AppraisalImg").css("display", "none");
    $("#inspectionImg").css("display", "none");
    $("#exampleModal").modal('show');
}

$("#btnDismiss").click(function () {
    $("#exampleModal").modal('hide');
});
var favStatus = false;
$("#favBtn").click( function () {
    if ($(this).attr('aria-pressed') === "true") {
        favStatus = true;
       // $("#favIcon").css("text-shadow", "var(--cl-primray)");
        $("#favIcon").css('fill', 'var(--clr-primary)');
    }
    else {
        favStatus = false;
       // $("#favIcon").css("text-shadow", "var(--cl-primray)");
        $("#favIcon").css('fill', 'none');
    }
});

function AddReadMore() {
    var description = $('#txtDescription').text();
    var charCount = description.length;

    if (charCount > 500) {

        var shortDescription = description.substring(0, 736);
        var remainingContent = description.substring(736);
        $('#txtDescription').text(shortDescription);
        $('#btnReadMore').html();


    } else {
        $('#btnReadMore').empty();
    }
}


function OwnFinancing() {
    debugger
    window.location.href = "/Property/OwnFinancing?propertyId=" + getProptyId;
}

// Function to show validation message
function showValidationMessage(element, message) {
    element.innerHTML = message;
}

// Function to hide validation message
function hideValidationMessage(element) {
    element.innerHTML = "";
}

/*document.getElementById("strategyId").addEventListener("change", function () {
    var refinanceField = document.getElementById("refinanceField");
    var otherField = document.getElementById("otherField");
    var strategyValidation = document.getElementById("strategyValidation");

    // Hide all validation messages
    hideValidationMessage(strategyValidation);
    hideValidationMessage(document.getElementById("refinanceValidation"));
    hideValidationMessage(document.getElementById("otherValidation"));

    if (this.value === "2") { // Refinance
        refinanceField.style.display = "block";
        otherField.style.display = "none";
        // Show validation message for refinance field
    } else if (this.value === "4") { // Other
        otherField.style.display = "block";
        refinanceField.style.display = "none";
        // Show validation message for other field
    } else {
        refinanceField.style.display = "none";
        otherField.style.display = "none";
    }
});*/

// Manually trigger validation when form is submitted for 3rd financing have cash on hand
/*document.querySelector('form').addEventListener('submit', function (e) {
    if (!document.getElementById('strategyId').value) {
        e.preventDefault();
        showValidationMessage(document.getElementById('strategyValidation'), 'Please select a loan exit strategy.');
    } else if (document.getElementById('strategyId').value === "2" && !document.getElementById('Refinancefield').value.trim()) {
        e.preventDefault();
        showValidationMessage(document.getElementById('refinanceValidation'), 'Please enter refi lender name.');
    } else if (document.getElementById('strategyId').value === "4" && !document.getElementById('otherfield').value.trim()) {
        e.preventDefault();
        showValidationMessage(document.getElementById('otherValidation'), 'Please provide a description.');
    }
});*/
