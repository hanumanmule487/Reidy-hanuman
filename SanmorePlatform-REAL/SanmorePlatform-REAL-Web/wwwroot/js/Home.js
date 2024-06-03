$(document).ready(function () {  /****for date picker**/
    $('#date-range').daterangepicker({
        opens: 'left',
        drops: 'down',
        autoApply: true,
        locale: {
            format: 'YYYY/MM/DD',
            separator: ' - ',
            applyLabel: 'Apply',
            cancelLabel: 'Cancel',
            fromLabel: 'From',
            toLabel: 'To',
            customRangeLabel: 'Custom',
            daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            firstDay: 0
        }
    });
});

var markers = [];       //Properties markers to show on google map.

$(document).ready(function () {
    InitializeMap();

    GetfilterProperty();  //bind home page data with property list
    GetPropertyStateList(); //bind Region dropdown in All search filter page
    DesableButtons()//for desable button

    //slider
    $('.carousel .carousel-item').each(function () {
        var minPerSlide = 4;
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));
        for (var i = 0; i < minPerSlide; i++) { next = next.next(); if (!next.length) { next = $(this).siblings(':first'); } next.children(':first-child').clone().appendTo($(this)); }
    });


    // Newsfeeds-carousel
    $('.owl-carousel1').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        autoplay: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    });

    // Testimonial owlCarousel
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 12,
        nav: false,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1920: {
                items: 3
            }
        }
    });



    //Format all numeric fields into comma separated
    FormatNumericValues();
});

$("#customRadio, #timePeriodId").click(function () {
    var TimePeriodValue = $("#timePeriodId").prop('checked');
    var CustomValue = $("#timePeriodId").prop('checked');
    if (TimePeriodValue == true) {
        $("#dateId").show();
        //$("#txtCustomDiv").AddClass("d-none");
        $("#txtCustomDiv").hide();
    }
    else {
        $("#dateId").hide();
        $("#txtCustomDiv").removeClass("d-none");
        $("#txtCustomDiv").show();
    }

})


/***************Calling filter function on click **********************/
$('#RangeTotal,#searchBarPrice,#acre-field,#unitinput').change(function () {
    GetfilterProperty();
});
/*********************12-1-2024**********************/
$('#txtSquareFeet').click(function () {
    GetfilterProperty();
    //$("#squareMeterRadio").prop("checked", false);
});

$("#txtSquareMeters").click(function () {
    $("#squareMeterRadio").prop("checked", true);
    GetfilterProperty();
    $("#squareMeterRadio").prop("checked", false);

});
/******************************************/
$('#btnSearch').click(function () {
    GetfilterProperty();
});

//************************** */
$('.me-3').change(function () {

    //Allclear();
    $('#txtSelectAll').prop('checked', false);
    //---------------------------------------------
    var checkBoxvalue1 = new Array();
    $("#ddlPropertyType input[type=checkbox]:checked").each(function () {
        checkBoxvalue1.push(($(this).val()));
    });
    $('#SearchType input[type="checkbox"]').each(function (i, v) {
        $(this).prop("checked", false);

    });
    $.each(checkBoxvalue1, function (index, value) {
        $('#SearchType input[type="checkbox"]').each(function (i, v) {
            if (value == this.value) {
                $(this).prop("checked", true);
            }
        });
    });
    if (checkBoxvalue1.length >= 12) {
        $('#txtSelectAll2').prop('checked', true);
        $('#txtSelectAll').prop('checked', true);
    }
    else {
        $('#txtSelectAll2').prop('checked', false);
        $('#txtSelectAll').prop('checked', false);
    }
    //---------------------------------------------
    GetfilterProperty();
});

$('.me-4').change(function () {

    $('#txtSelectAll2').prop('checked', false);

    var checkBoxvalue2 = new Array();
    $("#SearchType input[type=checkbox]:checked").each(function () {
        checkBoxvalue2.push(($(this).val()));
    });
    $('#ddlPropertyType input[type="checkbox"]').each(function (i, v) {
        $(this).prop("checked", false);

    });
    $.each(checkBoxvalue2, function (index, value) {
        $('#ddlPropertyType input[type="checkbox"]').each(function (i, v) {
            if (value == this.value) {
                $(this).prop("checked", true);
            }
        });
    });
    if (checkBoxvalue2.length >= 12) {
        $('#txtSelectAll2').prop('checked', true);
        $('#txtSelectAll').prop('checked', true);
    }
    else {
        $('#txtSelectAll2').prop('checked', false);
        $('#txtSelectAll').prop('checked', false);
    }
});
//===================================
$('#txtSelectAll').click(function () {
    $('.me-3').prop('checked', this.checked);
    GetfilterProperty();
});

$('#txtSelectAll2').click(function () {
    $('.me-4').prop('checked', this.checked);
});
//=============================================================OnKeyUp function for Min & Max Target Price
var minTargetPrice = null;
var maxTargetPrice = null;
$("#MinTargetPrice,#MaxTargetPrice").on("keyup", function () {//Home

    minTargetPrice = $("#MinTargetPrice").val();
    maxTargetPrice = $("#MaxTargetPrice").val();
    //----------------------------------------
    var minimumPrice = minTargetPrice.replace(/,/g, '');
    minimumPrice = minimumPrice.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    var maximumPrice = maxTargetPrice.replace(/,/g, '');
    maximumPrice = maximumPrice.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    //----------------------------------------
    if (minTargetPrice != '' && maxTargetPrice == '') {
        $("#MaxTargetPrice").css("border", "1px solid #C5C5C5");
        $("#Af_maxPrice").css("border", "1px solid #C5C5C5");
        $('#Af_minPrice').val(minimumPrice);
        $('#Af_maxPrice').val(maximumPrice);
        GetfilterProperty();
    }
    else {
        var minPrice = minTargetPrice.replace(/,/g, '');
        var maxPrice = maxTargetPrice.replace(/,/g, '');
        minPrice = parseInt(minPrice);
        maxPrice = parseInt(maxPrice);

        if (minPrice > maxPrice) {
            $("#MaxTargetPrice").css("border", "2px solid red");
            $("#Af_maxPrice").css("border", "2px solid red");
            $('#Af_minPrice').val(minimumPrice);
            $('#Af_maxPrice').val(maximumPrice);
            return false;
        }
        else {
            $("#MaxTargetPrice").css("border", "1px solid #C5C5C5");
            $("#Af_maxPrice").css("border", "1px solid #C5C5C5");
            $('#Af_minPrice').val(minimumPrice);
            $('#Af_maxPrice').val(maximumPrice);
            GetfilterProperty()
        }
    }
});
//=============================================================OnKeyUp function for Min & Max BuildSF
var builtMinSF = null;
var builtMaxSF = null;
$("#txtMinBuildSF,#txtMaxBuildSF").on("keyup", function () {

    builtMinSF = $("#txtMinBuildSF").val();
    builtMaxSF = $("#txtMaxBuildSF").val();
    //----------------------------------------
    var minimumBuildSF = builtMinSF.replace(/,/g, '');
    minimumBuildSF = minimumBuildSF.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    var maximumBuildSF = builtMaxSF.replace(/,/g, '');
    maximumBuildSF = maximumBuildSF.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    //----------------------------------------

    if (builtMinSF != '' && builtMaxSF == '') {
        $("#txtMaxBuildSF").css("border", "1px solid #C5C5C5");
        $("#Af_BuildingMaxSF").css("border", "1px solid #C5C5C5");
        $('#Af_BuildingMinSF').val(minimumBuildSF);
        $('#Af_BuildingMaxSF').val(maximumBuildSF);
        GetfilterProperty();
    }
    else {
        var buildingMinSF = builtMinSF.replace(/,/g, '');
        var buildingMaxSF = builtMaxSF.replace(/,/g, '');
        buildingMinSF = parseInt(buildingMinSF);
        buildingMaxSF = parseInt(buildingMaxSF);

        if (buildingMinSF > buildingMaxSF) {
            $("#txtMaxBuildSF").css("border", "2px solid red");
            $("#Af_BuildingMaxSF").css("border", "2px solid red");
            $('#Af_BuildingMinSF').val(minimumBuildSF);
            $('#Af_BuildingMaxSF').val(maximumBuildSF);
            return false;
        }
        else {
            $("#txtMaxBuildSF").css("border", "1px solid #C5C5C5");
            $("#Af_BuildingMaxSF").css("border", "1px solid #C5C5C5");
            $('#Af_BuildingMinSF').val(minimumBuildSF);
            $('#Af_BuildingMaxSF').val(maximumBuildSF);
            GetfilterProperty()
        }
    }
});
//=============================================================OnKeyUp function for Min & Max FundToClose
var fromfundToClose = 0;
var tofundToClose = 0;
$("#mintext,#maxtext").on("keyup", function () {
    fromfundToClose = $("#mintext").val();
    tofundToClose = $("#maxtext").val();
    fromfundToClose = fromfundToClose.replace(/,/g, '');
    tofundToClose = tofundToClose.replace(/,/g, '');

    if (fromfundToClose != '' && tofundToClose == '') {
        $("#maxtext").css("border", "1px solid #C5C5C5");
        GetfilterProperty()
    }
    else {
        fromfundToClose = parseInt(fromfundToClose);
        tofundToClose = parseInt(tofundToClose);

        if (fromfundToClose > tofundToClose) {
            $("#maxtext").css("border", "2px solid red");
            return false;
        }
        else {
            $("#maxtext").css("border", "1px solid #C5C5C5");
            GetfilterProperty()
        }
    }
});
//=============================================================END
$('.txtUnits').change(function () {
    var UCategory1;
    var data1 = $('input[type=radio].txtUnits:checked');
    $(data1).each(function (i) {
        UCategory1 = $(this).val();
    });

    if (UCategory1 == "1") {
        $('#RangeTotal').prop('checked', true);
    }
    if (UCategory1 == "2") {
        $('#searchBarPrice').prop('checked', true);
    }
    if (UCategory1 == "3") {
        $('#acre-field').prop('checked', true);
    }
    if (UCategory1 == "4") {
        $('#unitinput').prop('checked', true);
    }
});

$('.txtUnits1').change(function () {
    var UCategory2;
    var data2 = $('input[type=radio].txtUnits1:checked');
    $(data2).each(function (i) {
        UCategory2 = $(this).val();
    });

    if (UCategory2 == "1") {
        $('#totalradio').prop('checked', true);
    }
    if (UCategory2 == "2") {
        $('#sfFieldradio').prop('checked', true);
    }
    if (UCategory2 == "3") {
        $('#acrefield').prop('checked', true);
    }
    if (UCategory2 == "4") {
        $('#unitRadio').prop('checked', true);
    }
});
/******************************** */
/*var propertKeyword = 0;*/
//$("#txtSearchProperty").on("keyup", function () {
//    var propertKeyword = $("#txtSearchProperty").val();
//    GetfilterProperty();
//})

/**********this function used for get All property list and filter property list*****************/
var LandMinAcres
var LandMaxAcres
function GetfilterProperty(mapData) {

    debugger
   // document.getElementById("divLoader").style.visibility = "visible";
    deleteMarkers();
    //var status = $("#hdnReceiving").val();
    //var city = $("#txtPartNo").val();
    //var maxYearBuilt = $("#txtlocation").val();
    //var minYearBuilt = $("#txtNote").val();
    var TimePeriodValue = $("#timePeriodId").prop('checked');
    var DateRangePickerValue = $("#date-range").val().split('-');
    var customStartDate = null;
    var customEndDate = null;
    if (TimePeriodValue == false) {
        customStartDate = DateRangePickerValue[0];
        customEndDate = DateRangePickerValue[1];
    }

    //Assing Draw area lat and lang in model
    if (mapData != undefined && mapData != '') {
        var MinLat = mapData.minLat;
        var MinLng = mapData.minLng;
        var MaxLat = mapData.maxLat;
        var MaxLng = mapData.maxLng;
    }
    //========================================================================
    var propertKeyword = $("#txtSearchProperty").val();
    var checkBoxvalue1 = new Array();
    $("#ddlPropertyType input[type=checkbox]:checked").each(function () {
        checkBoxvalue1.push(($(this).val()));
    });
    var propertyTypeName = checkBoxvalue1.join(",");
    var checkBoxvalue = new Array();
    $("#SearchType input[type=checkbox]:checked").each(function () {
        checkBoxvalue.push(($(this).val()));
    });
    var filterCheckboxvalues = checkBoxvalue.join(",");

    var PropertyListSelectedValue = propertyTypeName != null ? propertyTypeName : filterCheckboxvalues;//
    var Af_cityName = $("#marketName").val();
    var Af_zipCode = $("#zipName").val();
    var Af_LandMinAcres = $("#Af_LandMinAcres").val();
    var Af_LandMaxAcres = $("#Af_LandMaxAcres").val();
    var Af_UnitBedsMin = $("#Af_UnitBedsMin").val();
    var Af_UnitBedsMax = $("#Af_UnitBedsMax").val();
    var Af_YearBuiltMin = $("#Af_YearBuiltMin").val();
    var Af_YearBuiltMax = $("#Af_YearBuiltMax").val();
    var Af_Keyword = $("#keywordId").val();
    var Af_EnteredDate = $("#dateId").val();
    var Af_reidyId = $("#reidyId").val();
    var Region = $("#regionName").val();
    var ReidyId = $("#reidyId").val();
    var UCategory;
    var data = $('input[type=radio].txtUnits:checked');
    $(data).each(function (j) {
        UCategory = $(this).val();
    });
    var UCategory1;
    var data1 = $('input[type=radio].txtUnits1:checked');
    $(data1).each(function (i) {
        UCategory1 = $(this).val();
    });
    var UnitValue = UCategory1 != null ? UCategory1 : UCategory;//
    var Af_minPrice = $('#Af_minPrice').val();
    var minTargetPrice1 = $("#MinTargetPrice").val();
    var minPriceValue = minTargetPrice1 != null ? minTargetPrice1 : Af_minPrice;
    Af_minPrice = minPriceValue.replace(/,/g, '');
    var Af_maxPrice = $('#Af_maxPrice').val();
    var maxTargetPrice1 = $("#MaxTargetPrice").val();
    var maxPriceValue = maxTargetPrice1 != null ? maxTargetPrice1 : Af_maxPrice;
    Af_maxPrice = maxPriceValue.replace(/,/g, '');
    var Af_BuildingMinSF = $("#Af_BuildingMinSF").val();
    var BuiltMinSF = $("#txtMinBuildSF").val();
    var BuildingMinSF = BuiltMinSF != null ? BuiltMinSF : Af_BuildingMinSF;
    Af_BuildingMinSF = BuildingMinSF.replace(/,/g, '');

    var Af_BuildingMaxSF = $("#Af_BuildingMaxSF").val();
    var BuiltMaxSF = $("#txtMaxBuildSF").val();
    var BuildingMaxSF = BuiltMaxSF != null ? BuiltMaxSF : Af_BuildingMaxSF;

    Af_BuildingMaxSF = BuildingMaxSF.replace(/,/g, '');
    var SquareFeet = $("#chkbx1").prop('checked');
    var SquareMeter1 = $("#squareMeterRadio").prop('checked');
    if (SquareMeter1 == true) {
        Af_BuildingMinSF = Af_BuildingMinSF * 0.092903;
        Af_BuildingMaxSF = Af_BuildingMaxSF * 0.092903;
    }
    Af_LandMinAcres = Af_LandMinAcres.replace(/,/g, '');
    Af_LandMaxAcres = Af_LandMaxAcres.replace(/,/g, '');
    CalculateSquareFeet(Af_LandMinAcres, Af_LandMaxAcres);
    Af_LandMinAcres = LandMinAcres;
    Af_LandMaxAcres = LandMaxAcres;
    Af_UnitBedsMin = Af_UnitBedsMin.replace(/,/g, '');
    Af_UnitBedsMax = Af_UnitBedsMax.replace(/,/g, '');
    //---------------------------------
    var DueDiligenceValue = new Array();
    $("#txtDueDiligenceDocument input[type=checkbox]:checked").each(function () {
        DueDiligenceValue.push(($(this).val()));
    });
    var DiliganceInputValue = DueDiligenceValue.join(",");
    //-----------------------------------
    /*************************************************************/
    $.ajax({
        type: "GET",
        url: "/Property/Index",
        caches: false,
        data: {
            FromfundToClose: fromfundToClose,
            TofundToClose: tofundToClose,
            PropertKeyword: propertKeyword,
            City: Af_cityName,
            ZipCode: Af_zipCode,
            MinPrice: Af_minPrice,
            MaxPrice: Af_maxPrice,
            BuildingMinSF: Af_BuildingMinSF,
            BuildingMaxSF: Af_BuildingMaxSF,
            LandMinAcres: Af_LandMinAcres,
            LandMaxAcres: Af_LandMaxAcres,
            UnitBedsMin: Af_UnitBedsMin,
            UnitBedsMax: Af_UnitBedsMax,
            YearBuiltMin: Af_YearBuiltMin,
            YearBuiltMax: Af_YearBuiltMax,
            Keyword: Af_Keyword,
            EnteredDate: Af_EnteredDate,
            StartDate: customStartDate,
            EndDate: customEndDate,
            ReidyId: Af_reidyId,
            PropertyTypeList: PropertyListSelectedValue,
            RegionName: Region,
            ReidyId: ReidyId,
            UnitCategory: UnitValue,
            DueDiligenceValue: DiliganceInputValue,
            MinLat: MinLat,
            MinLng: MinLng,
            MaxLat: MaxLat,
            MaxLng: MaxLng
        },
        success: function (data) {

            markers.length = 0;

            $('.mapviewdetails').empty();

            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var feed = { id: data[i].propertyId, title: data[i].title, description: data[i].description, lat: data[i].latitude, lng: data[i].longitude, propertyType: data[i].propertyTypeId }
                    var TargetPrices = numberWithCommas(data[i].targetPrice);
                    markers.push(feed);
                    var Unit = data[i].units;
                    var unit1 = '(' + Unit + ' Units' + ')';
                    var Address = data[i].address1 + ', ' + data[i].city + ', ' + data[i].zipCode + ', ' + unit1;

                    $("#main").append(`<div class="mapviewdetails"> 
                                    <a href="../Home/PropertyDetails?propertyId=${data[i].propertyId}" class="card">
                                        <img src="../PropertyImages/${data[i].imageName}" alt="propertyimg1">
                                    </a>

                                    <h5 class="heading">${data[i].title}</h5>
                                    <div class="subtext">${Address}</div>
                                    <div class="pricetext">Bring to Closing $${TargetPrices}</div>
                                    <hr>
                                </div>`
                    );
                }
            }
            else {
                var feed = { id: 0, title: 'title', description: 'description', lat: 36.188110, lng: - 115.176468 }

                markers.push(feed);

                $("#main").append(`<div class="mapviewdetails" id="not_found_property"> 
                                   <p> <strong>Your search did not match any properties.</strong>
                                   </br>
                                    Try modifying your search criteria to see more properties.
                                </div></p>`
                );
            }
            LoadMap(markers);      //Initialize map and load markers, function defined on Map.js
        },
        error: function (response) {
            alert("Some exception occurred!!");
        }
    });
    $("#squareFeetId").prop("checked", true);
}


$('#btnClear,#btnClear1').click(function () {
    Allclear();
    GetfilterProperty();
})

function Allclear() {
    $('.me-4').prop('checked', false);
    $('.term').prop('checked', false);
    $('#metersquareRadio').prop('checked', false);
    $('#hectaresRadio').prop('checked', false);
    $('#sfRadio').prop('checked', true);
    $('#acresId').prop('checked', false);
    $('.ddDocumrnt').prop('checked', false);
    $("#Af_maxPrice").css("border", "1px solid #C5C5C5");
    $("#Af_BuildingMaxSF").css("border", "1px solid #C5C5C5");
    $("#Af_LandMaxAcres").css("border", "1px solid #C5C5C5");
    $("#Af_YearBuiltMax").css("border", "1px solid #C5C5C5");
    $("#Af_UnitBedsMax").css("border", "1px solid #C5C5C5");
    $("#marketName").val('');
    $("#zipName").val('');
    $("#Af_minPrice").val('');
    $("#Af_maxPrice").val('');
    $("#Af_BuildingMinSF").val('');
    $("#Af_BuildingMaxSF").val('');
    $("#Af_LandMinAcres").val('');
    $("#Af_LandMaxAcres").val('');
    $("#Af_UnitBedsMin").val('');
    $("#Af_UnitBedsMax").val('');

    $("#Af_YearBuiltMin").val('');
    $("#Af_YearBuiltMax").val('');

    $("#keywordId").val('');
    $("#dateId").val('');
    DateEnteredResetValue();
    RegionName();
    ProgramType();
    TermsValue();
    $("#reidyId").val('');
    $("#countyName").val('');
    $("#submarketName").val('');
    $("#interestMin").val('');
    $("#interestMax").val('');
    $("#txtminFtC").val('');
    $("#txtmaxFtC").val('');
    /********Clear Landing Page*******************/
    $('#timePeriodId').prop('checked', true);
    $('.me-3').prop('checked', false);
    $('.me-4').prop('checked', false);
    $("#MaxTargetPrice").css("border", "1px solid #C5C5C5");
    $("#Af_maxPrice").css("border", "1px solid #C5C5C5");
    $("#txtMaxBuildSF").css("border", "1px solid #C5C5C5");
    $("#Af_BuildingMaxSF").css("border", "1px solid #C5C5C5");
    $("#txtSearchProperty").val('');
    $("#MinTargetPrice").val('');
    $("#MaxTargetPrice").val('');
    $("#txtMinBuildSF").val('');
    $("#txtMaxBuildSF").val('');
    $('#searchBarPrice').prop('checked', false);
    $('#RangeTotal').prop('checked', true);
    $('#acre-field').prop('checked', false);
    $('#unitinput').prop('checked', false);
    $('#sfFieldradio').prop('checked', false);
    $('#totalradio').prop('checked', true);
    $('#acrefield').prop('checked', false);
    $('#unitRadio').prop('checked', false);
    $("#Af_minPrice").val('');
    $("#Af_maxPrice").val('');
    $("#Af_BuildingMinSF").val('');
    $("#Af_BuildingMaxSF").val('');
    $("#dateId").show();
    $("#txtCustomDiv").hide();
    $('#btnfilter').text('All Filters');
    $("#btnClear1").addClass("d-none");

}

function DateEnteredResetValue() {// return defaultSelected DateEnteredResetValue of the option
    $("#dateId option").prop("selected", function () {
        return this.defaultSelected;
    });
}
function RegionName() {    // return defaultSelected RegionName of the option
    $("#regionName option").prop("selected", function () {
        return this.defaultSelected;
    });
}
function ProgramType() {    // return defaultSelected ProgramType of the option
    $("#selectprograms option").prop("selected", function () {
        return this.defaultSelected;
    });
}
function TermsValue() {    // return defaultSelected ProgramType of the option
    $("#multiSelectDropdown option").prop("selected", function () {
        return this.defaultSelected;
    });
}
function FormatNumericValues() {
    var el = document.querySelector('input.number1');
    el.addEventListener('keyup', function (event) {
        if (event.which >= 37 && event.which <= 40) return;

        this.value = this.value.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });

    var el1 = document.querySelector('input.number2');
    el1.addEventListener('keyup', function (event) {
        if (event.which >= 37 && event.which <= 40) return;

        this.value = this.value.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });

    var el2 = document.querySelector('input.number3');
    el2.addEventListener('keyup', function (event) {
        if (event.which >= 37 && event.which <= 40) return;

        this.value = this.value.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });

    var el3 = document.querySelector('input.number4');
    el3.addEventListener('keyup', function (event) {
        if (event.which >= 37 && event.which <= 40) return;

        this.value = this.value.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });

    var el4 = document.querySelector('input.number5');
    el4.addEventListener('keyup', function (event) {
        if (event.which >= 37 && event.which <= 40) return;

        this.value = this.value.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });

    var el5 = document.querySelector('input.number6');
    el5.addEventListener('keyup', function (event) {
        if (event.which >= 37 && event.which <= 40) return;

        this.value = this.value.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });

    var el6 = document.querySelector('input.number7');
    el6.addEventListener('keyup', function (event) {
        if (event.which >= 37 && event.which <= 40) return;

        this.value = this.value.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });
    var el7 = document.querySelector('input.number8');
    el7.addEventListener('keyup', function (event) {
        if (event.which >= 37 && event.which <= 40) return;

        this.value = this.value.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    })

    //var el6 = document.querySelector('input.number7');
    //el6.addEventListener('keyup', function (event) {
    //    if (event.which >= 37 && event.which <= 40) return;
    //    var doller1 = this.value = this.value.replace(/\D/g, '')
    //        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    //    var num2 = '$' + doller1;
    //    $('#Af_minPrice').val(num2);

    //});


    //var el7 = document.querySelector('input.number8');
    //el7.addEventListener('keyup', function (event) {
    //    if (event.which >= 37 && event.which <= 40) return;
    //    var doller2 = this.value = this.value.replace(/\D/g, '')
    //        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    //    var num2 = '$' + doller2;
    //    $('#Af_maxPrice').val(num2);

    //});


    var el8 = document.querySelector('input.number9');
    el8.addEventListener('keyup', function (event) {
        if (event.which >= 37 && event.which <= 40) return;

        this.value = this.value.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });

    var el9 = document.querySelector('input.number10');
    el9.addEventListener('keyup', function (event) {
        if (event.which >= 37 && event.which <= 40) return;

        this.value = this.value.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });

    var el10 = document.querySelector('input.number11');
    el10.addEventListener('keyup', function (event) {
        if (event.which >= 37 && event.which <= 40) return;

        this.value = this.value.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });

    var el11 = document.querySelector('input.number12');
    el11.addEventListener('keyup', function (event) {
        if (event.which >= 37 && event.which <= 40) return;

        this.value = this.value.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });

    var el12 = document.querySelector('input.number13');
    el12.addEventListener('keyup', function (event) {
        if (event.which >= 37 && event.which <= 40) return;

        this.value = this.value.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });

    var el13 = document.querySelector('input.number14');
    el13.addEventListener('keyup', function (event) {
        if (event.which >= 37 && event.which <= 40) return;

        this.value = this.value.replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });

}

function GetPropertyStateList() {

    $.ajax({
        url: "/Property/GetPropertyStateList",
        success: function (response) {
            var data = '<option value="0">Select State</option>';
            response.forEach(function (item) {

                data += '<option value= ' + item.longName + '>' + item.longName + '</option>'
            });
            $('#regionName').html(data);
        }
    });
}
$("#Af_maxPrice,#Af_minPrice").on("keyup", function () { //min & max price validation for All Filter page
    var MinPrice = $("#Af_minPrice").val();
    var MaxPrice = $("#Af_maxPrice").val();
    //----------------------------------------
    var minimumPrice1 = MinPrice.replace(/,/g, '');
    minimumPrice1 = minimumPrice1.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    var maximumPrice1 = MaxPrice.replace(/,/g, '');
    maximumPrice1 = maximumPrice1.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    //----------------------------------------
    $("#MinTargetPrice").val(minimumPrice1);
    $("#MaxTargetPrice").val(maximumPrice1);

    var MinPrice1 = MinPrice.replace(/,/g, '');
    var MaxPrice1 = MaxPrice.replace(/,/g, '');

    MinPrice1 = parseInt(MinPrice1);
    MaxPrice1 = parseInt(MaxPrice1);

    if (MinPrice1 > MaxPrice1) {
        $("#Af_maxPrice").css("border", "2px solid red");
        $("#MaxTargetPrice").css("border", "2px solid red");
    } else {
        $("#Af_maxPrice").css("border", "1px solid #C5C5C5");
        $("#MaxTargetPrice").css("border", "1px solid #C5C5C5");
    }
});


$("#Af_BuildingMaxSF,#Af_BuildingMinSF").on("keyup", function () { //min & max BuildingSF validation for All Filter page
    var BuildingMinSF = $("#Af_BuildingMinSF").val();
    var BuildingMaxSF = $("#Af_BuildingMaxSF").val();
    //----------------------------------------
    var minimumBuildSF1 = BuildingMinSF.replace(/,/g, '');
    minimumBuildSF1 = minimumBuildSF1.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    var maximumBuildSF1 = BuildingMaxSF.replace(/,/g, '');
    maximumBuildSF1 = maximumBuildSF1.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    //----------------------------------------
    $("#txtMinBuildSF").val(minimumBuildSF1);
    $("#txtMaxBuildSF").val(maximumBuildSF1);



    var MinSF_Value = BuildingMinSF.replace(/,/g, '');
    var MinSF_Value = BuildingMaxSF.replace(/,/g, '');

    MinSF_Value = parseInt(MinSF_Value);
    MinSF_Value = parseInt(MinSF_Value);

    if (MinSF_Value > MinSF_Value) {
        $("#Af_BuildingMaxSF").css("border", "2px solid red");
        $("#txtMaxBuildSF").css("border", "2px solid red");
    } else {
        $("#Af_BuildingMaxSF").css("border", "1px solid #C5C5C5");
        $("#txtMaxBuildSF").css("border", "1px solid #C5C5C5");
    }
});


$("#Af_LandMaxAcres,#Af_LandMinAcres").on("keyup", function () { //min & max Land Acres validation for All Filter page
    var LandMinAcres = $("#Af_LandMinAcres").val();
    var LandMaxAcres = $("#Af_LandMaxAcres").val();
    LandMinAcres = LandMinAcres.replace(/,/g, '');
    LandMaxAcres = LandMaxAcres.replace(/,/g, '');

    LandMinAcres = parseInt(LandMinAcres);
    LandMaxAcres = parseInt(LandMaxAcres);

    if (LandMinAcres > LandMaxAcres) {
        $("#Af_LandMaxAcres").css("border", "2px solid red");

    } else {
        $("#Af_LandMaxAcres").css("border", "1px solid #C5C5C5");
    }
});

/********************Calculation function***************************************/
function CalculateSquareFeet(Af_LandMinAcres, Af_LandMaxAcres) {
    var UnitCategory;


    var data1 = $('input[type=radio].LandMInMaxSF:checked');
    $(data1).each(function (i) {
        UnitCategory = $(this).val();
    });
    if (UnitCategory == "1") {  //1 ACRE = 43560 SF 
        LandMinAcres = Af_LandMinAcres * 43560.0;//Af_LandMinAcres*1/43560;
        LandMaxAcres = Af_LandMaxAcres * 43560.0;
        Af_LandMinAcres = LandMinAcres,
            Af_LandMaxAcres = LandMaxAcres
    }
    else if (UnitCategory == "2") {// for Sqare feet
        LandMinAcres = Af_LandMinAcres;
        LandMaxAcres = Af_LandMaxAcres;
        Af_LandMinAcres = LandMinAcres,
            Af_LandMaxAcres = LandMaxAcres
    }
    else if (UnitCategory == "3") { // 1 hectare = 107639 SF 
        LandMinAcres = Af_LandMinAcres * 107639.0;
        LandMaxAcres = Af_LandMaxAcres * 107639.0;
        Af_LandMinAcres = LandMinAcres,
            Af_LandMaxAcres = LandMaxAcres
    }
    else if (UnitCategory == "4") {  //1 Square metere = 0.092903 SF
        LandMinAcres = Af_LandMinAcres * 0.092903;
        LandMaxAcres = Af_LandMaxAcres * 0.092903;
        Af_LandMinAcres = LandMinAcres,
            Af_LandMaxAcres = LandMaxAcres
    }


}

$("#Af_UnitBedsMax,#Af_UnitBedsMin").on("keyup", function () { //min & max Unit beds validation for All Filter page
    var UnitBedsMin = $("#Af_UnitBedsMin").val();
    var UnitBedsMax = $("#Af_UnitBedsMax").val();
    UnitBedsMin = UnitBedsMin.replace(/,/g, '');
    UnitBedsMax = UnitBedsMax.replace(/,/g, '');

    UnitBedsMin = parseInt(UnitBedsMin);
    UnitBedsMax = parseInt(UnitBedsMax);

    if (UnitBedsMin > UnitBedsMax) {
        $("#Af_UnitBedsMax").css("border", "2px solid red");

    } else {
        $("#Af_UnitBedsMax").css("border", "1px solid #C5C5C5");
    }
});

$("#Af_YearBuiltMax,#Af_YearBuiltMin").on("keyup", function () { //min & max year built validation for All Filter page
    var YearBuiltMin = $("#Af_YearBuiltMin").val();
    var YearBuiltMax = $("#Af_YearBuiltMax").val();

    YearBuiltMin = parseInt(YearBuiltMin);
    YearBuiltMax = parseInt(YearBuiltMax);

    if (YearBuiltMin > YearBuiltMax) {
        $("#Af_YearBuiltMax").css("border", "2px solid red");

    } else {
        $("#Af_YearBuiltMax").css("border", "1px solid #C5C5C5");
    }
});

function DesableButtons() {
    // ("#searchBarPrice").disabled = true;
    //$("#searchBarPrice").attr('disabled', true);
    //$("#acre-field").attr('disabled', true);
    //$("#unitinput").attr('disabled', true);
    //$("#txtSquareMeters").attr('disabled', true);
    //$("#acrefield").attr('disabled', true);
    //$("#sfFieldradio").attr('disabled', true);
    //$("#unitRadio").attr('disabled', true);
    // $("#squareMeterRadio").attr('disabled', true);
    //$("#acresId").attr('disabled', true);
    //$("#hectaresRadio").attr('disabled', true);
    //$("#metersquareRadio").attr('disabled', true);
    $("#ddlCounty").attr('disabled', true);
    $("#ddlSubMarket").attr('disabled', true);
    //$("#customRadio").attr('disabled', true);
    $("#mintext").attr('disabled', true);
    $("#maxtext").attr('disabled', true);
    $("#submarketName").attr('disabled', true);
    $("#countyName").attr('disabled', true);
    //$("#txtInspection").attr('disabled', true);
    //$("#txtEnvironmental").attr('disabled', true);
    //$("#txtSurvey").attr('disabled', true);
    //$("#txtAppraisal").attr('disabled', true);

}

function numberWithCommas(number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
/************************section for show filter count************************************/
var inputCount = 0;
var dropdownCount = 0;
var checkboxcount = 0;
var DateEnteredCount = 0;
$('#Af_minPrice,#Af_maxPrice,#Af_BuildingMinSF,#Af_BuildingMaxSF,.ddDocumrnt,#txtSearchProperty,.min_max_price,.min_max_BuildSF,#marketName,#zipName,#keywordId,#Af_LandMinAcres,#Af_LandMaxAcres,#Af_UnitBedsMin,#Af_UnitBedsMax,#Af_YearBuiltMin,#Af_YearBuiltMax,#reidyId').on('input change', function () {
    debugger
    inputCount = $('.ddDocumrnt,#txtSearchProperty,.min_max_price,.min_max_BuildSF,#marketName,#zipName,#keywordId,#Af_LandMinAcres,#Af_LandMaxAcres,#Af_UnitBedsMin,#Af_UnitBedsMax,#Af_YearBuiltMin,#Af_YearBuiltMax,#reidyId').filter(function () {
        return ($(this).is(':text') && !!this.value.trim()) || ($(this).is('select') && !!this.value.trim()) || ($(this).is(':checkbox') && $(this).is(':checked'));
    }).length;
    var TotalCount = inputCount + dropdownCount + checkboxcount + DateEnteredCount;
    if (TotalCount == 0) {
        $('#btnfilter').text('All Filters');
        $("#btnClear1").addClass("d-none");
    } else {
        $('#btnfilter').text('All Filters(' + TotalCount + ')');
        $("#btnClear1").removeClass("d-none");
    }


});
$('#regionName').on('input', function () {
    debugger;
    dropdownCount = $('#regionName').filter(function () {
        return ($(this).val() != 0);
    }).length;
    var TotalCount = inputCount + dropdownCount + checkboxcount + DateEnteredCount;
    if (TotalCount == 0) {
        $('#btnfilter').text('All Filters');
        $("#btnClear1").addClass("d-none");
    } else {
        $('#btnfilter').text('All Filters(' + TotalCount + ')');
        $("#btnClear1").removeClass("d-none");
    }
});

$('.me-3').on('input', function () {
    debugger;
    var selectedValue = new Array();
    $("#ddlPropertyType input[type=checkbox]:checked").each(function () {
        selectedValue.push(($(this).val()));
    });
    if (selectedValue.length > 0) {
        checkboxcount = 1;
    } else {
        checkboxcount = 0;
    }
    var TotalCount = inputCount + dropdownCount + checkboxcount + DateEnteredCount;
    if (TotalCount == 0) {
        $('#btnfilter').text('All Filters');
        $("#btnClear1").addClass("d-none");
    } else {
        $('#btnfilter').text('All Filters(' + TotalCount + ')');
        $("#btnClear1").removeClass("d-none");
    }
});

$('.me-4').on('input', function () {
    debugger;
    var selectedValue1 = new Array();
    $("#SearchType input[type=checkbox]:checked").each(function () {
        selectedValue1.push(($(this).val()));
    });
    if (selectedValue1.length > 0) {
        checkboxcount = 1;
    } else {
        checkboxcount = 0;
    }
    var TotalCount = inputCount + dropdownCount + checkboxcount + DateEnteredCount;
    if (TotalCount == 0) {
        $('#btnfilter').text('All Filters');
        $("#btnClear1").addClass("d-none");
    } else {
        $('#btnfilter').text('All Filters(' + TotalCount + ')');
        $("#btnClear1").removeClass("d-none");
    }
});

$('#dateId,#timePeriodId').on('input', function () {
    debugger;
    DateEnteredCount = 0;
    var DateEnteredValue = $('#dateId').filter(function () {
        return ($(this).val() != 0);
    }).length;
    var CustomValue = $("#customRadio").prop('checked');
    if (DateEnteredValue > 0) {
        DateEnteredCount = 1;
    }
    else {
        DateEnteredCount = 0;
    }
    TotalCount = inputCount + dropdownCount + checkboxcount + DateEnteredCount;
    if (TotalCount == 0) {
        $('#btnfilter').text('All Filters');
        $("#btnClear1").addClass("d-none");
    } else {
        $('#btnfilter').text('All Filters(' + TotalCount + ')');
        $("#btnClear1").removeClass("d-none");
    }
});
$('.cstm_radio').click(function () {
    debugger
    DateEnteredCount = 0;
    var CustomValue = $("#customRadio").prop('checked');
    if (CustomValue == true) {
        DateEnteredCount = 1;
        //$('#date-range').val('');
    }
    else {
        DateEnteredCount = 0;
    }
    TotalCount = inputCount + dropdownCount + checkboxcount + DateEnteredCount;
    if (TotalCount == 0) {
        $('#btnfilter').text('All Filters');
        $("#btnClear1").addClass("d-none");
    } else {
        $('#btnfilter').text('All Filters(' + TotalCount + ')');
        $("#btnClear1").removeClass("d-none");
    }
});
/****************************************************************************
    Function: FastTrackBuyerRegistar()
    Purpose:  Add Register FastTrack Buyer 
    Developer: Wasim Raja
****************************************************************************/

function SaveSearchedInputValue() {
    debugger;
    var UserId = $("#txtUserID").val();
    var nemeOfsearchKey = $("#saved_property").val();
    var TimePeriodValue = $("#timePeriodId").prop('checked');
    var DateRangePickerValue = $("#date-range").val().split('-');
    var customStartDate = null;
    var customEndDate = null;
    if (TimePeriodValue == false) {
        customStartDate = DateRangePickerValue[0];
        customEndDate = DateRangePickerValue[1];
    }
    var propertKeyword = $("#txtSearchProperty").val();
    var checkBoxvalue1 = new Array();
    $("#ddlPropertyType input[type=checkbox]:checked").each(function () {
        checkBoxvalue1.push(($(this).val()));
    });
    var propertyTypeName = checkBoxvalue1.join(",");
    var checkBoxvalue = new Array();
    $("#SearchType input[type=checkbox]:checked").each(function () {
        checkBoxvalue.push(($(this).val()));
    });
    var filterCheckboxvalues = checkBoxvalue.join(",");
    var PropertyListSelectedValue = propertyTypeName != null ? propertyTypeName : filterCheckboxvalues;//
    var Af_cityName = $("#marketName").val();
    var Af_zipCode = $("#zipName").val();
    var Af_LandMinAcres = $("#Af_LandMinAcres").val();
    var Af_LandMaxAcres = $("#Af_LandMaxAcres").val();
    var Af_UnitBedsMin = $("#Af_UnitBedsMin").val();
    var Af_UnitBedsMax = $("#Af_UnitBedsMax").val();
    var Af_YearBuiltMin = $("#Af_YearBuiltMin").val();
    var Af_YearBuiltMax = $("#Af_YearBuiltMax").val();
    var Af_Keyword = $("#keywordId").val();
    var Af_EnteredDate = $("#dateId").val();
    var Af_reidyId = $("#reidyId").val();
    var Region = $("#regionName").val();
    var ReidyId = $("#reidyId").val();
    var UCategory;
    var data = $('input[type=radio].txtUnits:checked');
    $(data).each(function (j) {
        UCategory = $(this).val();
    });
    var UCategory1;
    var data1 = $('input[type=radio].txtUnits1:checked');
    $(data1).each(function (i) {
        UCategory1 = $(this).val();
    });
    var UnitValue = UCategory1 != null ? UCategory1 : UCategory;//
    var Af_minPrice = $('#Af_minPrice').val();
    var minTargetPrice1 = $("#MinTargetPrice").val();
    var minPriceValue = minTargetPrice1 != null ? minTargetPrice1 : Af_minPrice;
    Af_minPrice = minPriceValue.replace(/,/g, '');
    var Af_maxPrice = $('#Af_maxPrice').val();
    var maxTargetPrice1 = $("#MaxTargetPrice").val();
    var maxPriceValue = maxTargetPrice1 != null ? maxTargetPrice1 : Af_maxPrice;
    Af_maxPrice = maxPriceValue.replace(/,/g, '');
    var Af_BuildingMinSF = $("#Af_BuildingMinSF").val();
    var BuiltMinSF = $("#txtMinBuildSF").val();
    var BuildingMinSF = BuiltMinSF != null ? BuiltMinSF : Af_BuildingMinSF;
    Af_BuildingMinSF = BuildingMinSF.replace(/,/g, '');

    var Af_BuildingMaxSF = $("#Af_BuildingMaxSF").val();
    var BuiltMaxSF = $("#txtMaxBuildSF").val();
    var BuildingMaxSF = BuiltMaxSF != null ? BuiltMaxSF : Af_BuildingMaxSF;

    Af_BuildingMaxSF = BuildingMaxSF.replace(/,/g, '');
    var SquareFeet = $("#chkbx1").prop('checked');
    var SquareMeter1 = $("#squareMeterRadio").prop('checked');
    if (SquareMeter1 == true) {
        Af_BuildingMinSF = Af_BuildingMinSF * 0.092903;
        Af_BuildingMaxSF = Af_BuildingMaxSF * 0.092903;
    }
    Af_LandMinAcres = Af_LandMinAcres.replace(/,/g, '');
    Af_LandMaxAcres = Af_LandMaxAcres.replace(/,/g, '');
    CalculateSquareFeet(Af_LandMinAcres, Af_LandMaxAcres);
    Af_LandMinAcres = LandMinAcres;
    Af_LandMaxAcres = LandMaxAcres;
    Af_UnitBedsMin = Af_UnitBedsMin.replace(/,/g, '');
    Af_UnitBedsMax = Af_UnitBedsMax.replace(/,/g, '');
    //---------------------------------
    var DueDiligenceValue = new Array();
    $("#txtDueDiligenceDocument input[type=checkbox]:checked").each(function () {
        DueDiligenceValue.push(($(this).val()));
    });
    var DiliganceInputValue = DueDiligenceValue.join(",");
    var appraisal = $("#txtAppraisal").prop('checked');
    var survey = $("#txtSurvey").prop('checked');
    var environmental = $("#txtEnvironmental").prop('checked');
    var inspection = $("#txtInspection").prop('checked');
    var totalPrice = $("#totalradio").prop('checked');
    var priceSF = $("#sfFieldradio").prop('checked');
    var priceAcr = $("#acrefield").prop('checked');
    var priceUnit = $("#unitRadio").prop('checked');
    var buildingSF = $("#squareFeetId").prop('checked');
    var buildingSM = $("#squareMeterRadio").prop('checked');

    var landAcre = $("#acresId").prop('checked');
    var landSF = $("#sfRadio").prop('checked');
    var landHectares = $("#hectaresRadio").prop('checked');
    var landMS = $("#metersquareRadio").prop('checked');
    
    //-----------------------------------
    /*************************************************************/
    $.ajax({
        type: "POST",
        url: "/Property/SaveSearchValue",
        caches: false,
        data: {
            UserId:UserId,
            FromfundToClose: fromfundToClose,
            TofundToClose: tofundToClose,
            PropertKeyword: propertKeyword,
            City: Af_cityName,
            ZipCode: Af_zipCode,
            MinPrice: Af_minPrice,
            MaxPrice: Af_maxPrice,
            BuildingMinSF: Af_BuildingMinSF,
            BuildingMaxSF: Af_BuildingMaxSF,
            LandMinAcres: Af_LandMinAcres,
            LandMaxAcres: Af_LandMaxAcres,
            UnitBedsMin: Af_UnitBedsMin,
            UnitBedsMax: Af_UnitBedsMax,
            YearBuiltMin: Af_YearBuiltMin,
            YearBuiltMax: Af_YearBuiltMax,
            Keyword: Af_Keyword,
            EnteredDate: Af_EnteredDate,
            StartDate: customStartDate,
            EndDate: customEndDate,
            ReidyId: Af_reidyId,
            PropertyTypeList: PropertyListSelectedValue,
            RegionName: Region,
            ReidyId: ReidyId,
            UnitCategory: UnitValue,
            DueDiligenceValue: DiliganceInputValue,
            SearchName: nemeOfsearchKey,
            IsAppraisal: appraisal,
            IsSurvey: survey,
            IsEnvironmental: environmental,
            IsInspection: inspection,
            IsTotalPrice: totalPrice,
            IsPriceSF: priceSF,
            IsPriceAcr: priceAcr,
            IsPriceUnit: priceUnit,
            IsBuildingSF: buildingSF,
            IsBuildingSM: buildingSM,
            IsLandAcre: landAcre,
            IsLandSF: landSF,
            IsLandHectares: landHectares,
            IsLandMS: landMS,


            
        },
        success: function (response) {


        },
        error: function (response) {
            alert("Some exception occurred!!");
        }
    });

    $('#savesearch').modal('hide');
    $("#saved_property").val("");
  
}

$("#btnLoadSearch").click(function () {
    debugger
    var id = $("#txtUserID").val();
    window.location.href = '/Property/GetSaveSearchesList?id=' + id;
})
$("#btnLoadSearchList").click(function () {
    debugger
    LoadSaveSearchesList();
})


btnLoadSearchList

function LoadSaveSearchesList() {
    debugger
    document.getElementById("divLoader").style.visibility = "visible";
    $('#LoadSearchDiv').html("");
    //var userId = $("#hdnUserId").val();
    var id = $("#txtUserID").val();
    $('#loadsearches').modal('show');
    $.ajax({
        url: "/Property/GetSearchesList/",
        type: "GET",
        data: { id: id },
        success: function (data) {
            debugger;
            console.log(data);
            
            let ArraysearchId = [];
            let ArraysearchName = [];
            let ArrayPropertyTypeName = [];
            let ArrayyearBuiltMin = [];
            let ArrayyearBuiltMax = [];
            let ArraybuildingSizeMin = [];
            let ArraybuildingSizeMax = [];

            data.forEach(function (item) {

                ArraysearchId.push(item.searchId);
                ArraysearchName.push(item.searchName);
                ArrayPropertyTypeName.push(item.propTypeNames);
                ArrayyearBuiltMin.push(item.yearBuiltMin);
                ArrayyearBuiltMax.push(item.yearBuiltMax);
                ArraybuildingSizeMin.push(item.buildingMinSF);
                ArraybuildingSizeMax.push(item.buildingMaxSF);
            });
            let saveSearchList = data.length;

            for (var i = 0; i < saveSearchList; i++) {
                let count = i + 1;
                let LoadSearchData = '<div class="modal-body p-4 pt-0 bg-seconsary">';
                LoadSearchData += '<div class="addlistingform pb-0 mt-0 py-0">';
                LoadSearchData += '<div class="container-fluid">';
                LoadSearchData += '<div class="lending-list userlist mt-3 pb-2">';
                LoadSearchData += '<div class="list-header row align-items-center py-2">';
                LoadSearchData += '<div class="row row-detail px-0 align-items-center">';
                LoadSearchData += '<div class="col-12 col-md-12 col-xl-3 col-xxl-4 lending-list-title">';
                LoadSearchData += '<input type="hidden" id="hdnSearchId" value="' + ArraysearchId[i] + '">';
                LoadSearchData += '<p class="mb-xxl-0 fs-15-responsive txtellipsis">Name :<span class="fs-15-responsive fw-bold ms-2">' + ArraysearchName[i] + '</span></p>';
                LoadSearchData += '</div>';
                LoadSearchData += '<div class="col-12 col-md-12 col-xl-6 col-xxl-5 d-flex align-items-center">';
                LoadSearchData += '<span class="me-2 fw-semibold lending-list-title ps-2 ms-1">Search via region</span>';
                LoadSearchData += '</div>';
                LoadSearchData += '<div class="col-12 col-md-12 col-xl-4 col-xxl-3 text-end"><button type="button" onclick="GetSearchListByIds(' + ArraysearchId[i] + ')" class="btn-login btn-headerlist me-0">Load search</button></div>';
                LoadSearchData += '</div></div>';
                LoadSearchData += '<div class="container-fluid">';
                LoadSearchData += '<div class="row mt-3 mb-3 row-detail">';
                LoadSearchData += '<div class="col-xxl-4 colxl-4 col-lg-3 col-md-4 property_info col-12 ">';
                LoadSearchData += '<p class="mb-0"><span class="fw-bold">Property type : </span><span>' + ArrayPropertyTypeName[i] + '</span></p>';
                LoadSearchData += '</div>';
                LoadSearchData += '<div class="col-xxl-4 colxl-4 col-lg-3 col-md-4 property_info col-12">';
                LoadSearchData += '<p class="mb-0"><span class="fw-bold">Year built : </span> <span>' + ArrayyearBuiltMin[i] + '-' + ArrayyearBuiltMax[i]+ '</span></p>';
                LoadSearchData += '</div>';
                LoadSearchData += '<div class="col-xxl-4 colxl-4 col-lg-3 col-md-4 property_info col-12">';
                LoadSearchData += '<p class="mb-0"><span class="fw-bold">Bulding Size : </span> <span>' + ArraybuildingSizeMin[i] + ' Sqft' + '-' + ArraybuildingSizeMax[i] +' Sqft'+ '</span></p>';
                LoadSearchData += '</div></div></div>';
                LoadSearchData += '</div></div></div></div>';
                $('#LoadSearchDiv').append(LoadSearchData);
            }
        },
        error: function (errormessage) {
            alert("Data not found.");
        }
    });
    document.getElementById("divLoader").style.visibility = "hidden";
    return false;
}

function GetSearchListByIds(id) {
    debugger
    document.getElementById("divLoader").style.visibility = "visible";
    $.ajax({
        url: '/Property/GetSaveSearchById?id=' + id,
        type: "GET",
        success: function (data) {
            debugger;
            console.log(data);
            $("#txtSearchProperty").val(data.propertKeyword);
            $("#zipName").val(data.zipCode);
            $("#keywordId").val(data.keyword);
            $('#Af_minPrice').val(data.minPrice);
            $('#Af_maxPrice').val(data.maxPrice);
            $("#Af_BuildingMinSF").val(data.buildingMinSF);
            $("#Af_BuildingMaxSF").val(data.buildingMaxSF);
            $("#Af_LandMinAcres").val(data.landMinAcres);
            $("#Af_LandMaxAcres").val(data.landMaxAcres);
            $("#marketName").val(data.city);
            

            
        },
        error: function (errormessage) {
            alert("Data not found.");
        }
    });
    document.getElementById("divLoader").style.visibility = "hidden";
    return false;
}

