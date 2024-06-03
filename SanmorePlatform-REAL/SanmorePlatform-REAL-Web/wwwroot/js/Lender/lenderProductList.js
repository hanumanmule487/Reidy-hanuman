
//function ShowLendingProductList() {
//    debugger
//    $.ajax({

//        url: "Lender/LenderProductList",
//        type: "GET",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",
//        success: function (result) {
//            debugger;

//                $.each(result, function (key, val) {
//                    /*alert(key + ": " + val);*/
//                    $("#txtLoanProduct").append(key + ": " + val + '<br>');
//                });

//        },
//        error: function (response) {
//            debugger;
//            alert('Error occur');
//        }
//    });
//}

//$(document).ready(function () {

//    var down = document.querySelectorAll('.select2-selection--multiple');
//    down.forEach((e) => {
//        e.classList.add('form-select');
//    });
//});

function getUserIdFromUrl() {
    var urlParts = window.location.href.split('/');
    var userId = urlParts[urlParts.length - 1];
    return userId;
}

function UpdateLoanStatus(productId) {
    debugger;
    var userId = getUserIdFromUrl();
    //ar productId = $(this).prev().val();
    var formData = new FormData();
    var isChecked = $(this).is(':checked');
    formData.append('Id', userId);
    formData.append('ProductId', productId);
    formData.append('Status', isChecked);
    $.ajax({
        url: '/Lender/UpdateStatus',  // Update with your server endpoint
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {     
            toastr.success('Status updated');
        },
        error: function (error) {
            // Handle error
            console.error(error);
        }
    });
};


function EditLenderProductList() {
    debugger
    var userId = $("#hdnUserId").val();
    $('#myModal').modal('show'); 
    $.ajax({

        url: "/Lender/EditLenderProductList/" + userId, 
        type: "GET",
        data: { productId: userId },
        success: function (result) {
            debugger;
            /*$('#StateFeilds').append('<option value="' + result.termValue + '">' + result.termValue + '</option>');*/

            if (result.stateId != null) {

                var propertyTypeArray = result.stateId.trim().split(',');
                for (var propertyId = 0; propertyId < propertyTypeArray.length; propertyId++) {
                    $('.areaServed_' + propertyTypeArray[propertyId]).attr('checked', true);
                }
            }



            $('#propertyType').val(result.loanProduct);

            $('#RateSelect').val(result.fixedOrAdjustableRate);
            if ($('#RateSelect').val(result.fixedOrAdjustableRate)!=0) {
                $('#Adjuststrctr').val(result.adjustableStructureDesc);
            }
           
           
            $('#inputTerm').val(result.termValue);
            $('#selectTerm').val(result.termType);
            $('#amortization').val(result.amortization);
            if ($('#amortization').val(result.amortization)!=0) {
                $('#amortizationother').val(result.amortizationother);
            }
            $('#InterestRate').val(result.interestRate + ".00" + "%");
            $('#minLoan').val("$" + " "+ result.loanAmountRangeMin + ".00");
            $('#maxLoan').val("$" + " " + result.loanAmountRangeMax + ".00");
            $('#LenderOrigin').val(result.lenderOrigination);
            $('#PurchasePercent').val(result.percentOfPurchaseToLend + ".00" + "%");
            $('#RehabPercent').val(result.percentOfRehabToLend + "%");
            $('#LTVmax').val(result.ltvMax+".00"+"%");
            $('#LTCmax').val(result.ltcMax + "%");
            $('#DSCRAccept').val(result.minAcceptableDSCR);
            $('#quespenalty').val(result.doesLoanHavePrepaymentPenalty);
            if ($('#quespenalty').val(result.doesLoanHavePrepaymentPenalty).val()==1) {
                $('#structure').val(result.typeOfPrepaymentStructure);
                $('#FeeCharged').val(result.description);
            }
            $('#Inspection').val(result.inspectionRequired);
            $('#environmental').val(result.environmentalRequired);
            $('#AppraisalReq').val(result.appraisalRequired);
            $('#InsuranceLevel').val(result.insuranceLevelRequirement);
            $('#CollectEscrows').val(result.willYouCollectEscrows);
            if ($('#CollectEscrows').val(result.willYouCollectEscrows).val() == 4) {
                $('#otherescrows').val(result.otherCollectEscrows);               
            }
            $('#CreditRequirement').val(result.creditScoreRequirement); 
            $('#LiquidityRequirement').val(result.liquidityRequirement);
            $('#TaxReturn').val(result.taxReturnRequirement);
            $('#experience').val(result.experienceRequirement);
            $('#NetWorth').val(result.netWorthRequirement);
            $('#surveyYes').prop('checked', true);

            var OtherYesOrNo = $("#surveyYes").prop('checked');
            var OtherYesOrNoValue = OtherYesOrNo == true ? "yes" : "No";
            $('#bindIsAnyRealOtherEstate').text(OtherYesOrNoValue);
            if (result.toiGeneralLiability == true) {
                $("#GeneralLiability").prop("checked", true);
            }
            if (result.toiHazard == true) {
                $("#Hazard").prop("checked", true);
            }
            if (result.toiFlood == true) {
                $("#Flood").prop("checked", true);
            }
            if (result.toiWindAndHail == true) {
                $("#WindHail").prop("checked", true);
            }
            if (result.toiBuilderRisk == true) {
                $("#BuilderRisk").prop("checked", true);
            }

     
        },
        error: function (errormessage) {
            alert("Data not found.");
        }
    });
    return false;
}

//function UpdateLenderProduct() {
//    debugger
//    //var IsEmtpty = ValidateAddListing();
//    //if (IsEmtpty == true) {
//        //var userId = getUserIdFromUrl();

//        //var fees = new Array();
//        //var amount = new Array();
//        //var arrLength = $("#getAllHtml").children().length;
//        //for (var i = 1; i <= arrLength; i++) {
//        //    fees.push($("#getAllHtml div:nth-child(" + i + ") #AdditionalFees").val());
//        //    amount.push($("#getAllHtml").children("div:nth-child(" + i + ")").find("#AdditionalAmount").val());
//        //}
//        //////Save Other requirement table
//        //var linkName = new Array();
//        //var linkLength = $("#getAllHtmlForLink").children().length;
//        //for (var i = 1; i <= linkLength; i++) {
//        //    linkName.push($("#getAllHtmlForLink div:nth-child(" + i + ") #OtherDocs").val());
//        //}
//        //var linkNameValue = linkName.join(",")

//        var formData = new FormData();
//        //for (var i = 0; i < arrLength; i++) {
//        //    formData.append('LenderProgramAmount[' + i + '].AdditionalFees', fees[i]);
//        //    formData.append('LenderProgramAmount[' + i + '].Amount', amount[i]);
//        //}
//        ////Append Other Requirement field
//        //for (var i = 0; i < linkName.length; i++) {
//        //    formData.append('OtherRequirementProduct[' + i + '].RequirementDesc', linkName[i]);
//        //}

//        formData.append('LoanProduct', $('#propertyType').val());

//        formData.append('FixedOrAdjustableRate', $('#RateSelect').val());
//        if ($('#RateSelect').val() === 'Adjustable') {
//            formData.append('AdjustableStructureDesc', $('#Adjuststrctr').val());
//        }
//        ////formData.append('Terms', $('#termField :selected').map(function () {
//        ////    return $(this).text();
//        ////}).get().join(', '));

//        formData.append('TermValue', $('#inputTerm').val());
//        formData.append('TermType', $('#inputTermType').val());


//        formData.append('Amortization', $('#amortization').val());
//        if ($('#amortization').val() === '10') {
//            formData.append('OtherAmortization', $('#inputAmortizationOther').val());
//        }

//         var interestRate = $('#inputInterestRate').val();
//        var finalInterestRate = interestRate.replace('%', ''); // remove the '%' symbol from the value
//        formData.append('InterestRate', finalInterestRate); // Append the modified value to the FormData


//        var minLoan = $('#minLoan').val();
//        var finalMinLoan = minLoan.replace('$', ''); // remove the '$' symbol from the value
//        formData.append('LoanAmountRangeMin', finalMinLoan.replace(/,/g, '')); // Append the modified value to the FormData


//        var maxLoan = $('#maxLoan').val();
//        var finalMaxLoan = maxLoan.replace('$', ''); // remove the '$' symbol from the value
//        formData.append('LoanAmountRangeMax', finalMaxLoan.replace(/,/g, '')); // Append the modified value to the FormData

//        formData.append('LenderOrigination', $('#LenderOrigin').val());
//        //formData.append('StateId', $('#StateFeilds :selected').map(function () {
//        //   return $(this).text();
//        //}).get().join(', '));
//        //formData.append('Counties', $('#LendingCounties :selected').map(function () {
//        //    return $(this).text();
//        //}).get().join(', '));
//        //formData.append('City', $('#LendingCity :selected').map(function () {
//        //    return $(this).text();
//        //}).get().join(', '));
//        ////property details section fields append
//        //formData.append('TypeOfAssets', $('#assetTypeId :selected').map(function () {
//        //    return $(this).text();
//        //}).get().join(', '));


//        //if ($('#assetTypeId').val().includes('1')) {
//        //    formData.append('MinMultifamilyUnit', $('#MinUnitCount').val());
//        //    formData.append('MaxMultifamilyUnit', $('#MaxUnitCount').val());
//        //}


//        var purchasePercent = $('#PurchasePercent').val();
//        var finalPurchasePercent = purchasePercent.replace('%', ''); // remove the '%' symbol from the value
//        formData.append('PercentOfPurchaseToLend', finalPurchasePercent.replace(/,/g, '')); // Append the modified value to the FormData

//        formData.append('PercentOfRehabToLend', $('#RehabPercent').val().replace('%', '')); // Append the modified value to the FormData

//        formData.append('LTVMax', $('#LTVmax').val().replace('%', '')); // Append the modified value to the FormData
//        formData.append('LTCMax', $('#LTCmax').val().replace('%', '')); // Append the modified value to the FormData

//        formData.append('MinAcceptableDSCR', $('#DSCRAccept').val().replace('%', '')); // Append the modified value to the FormData
//        formData.append('MinAcceptableDSCR', $('#DSCRAccept').val());
//        formData.append('DoesLoanHavePrepaymentPenalty', $('#quespenalty :selected').text());
//        if ($('#quespenalty').val() == '2') {
//            formData.append('TypeOfPrepaymentStructure', $('#structure :selected').text());
//            formData.append('Description', $('#FeeCharged').val());
//        }
//        formData.append('InspectionRequired', $('#Inspection :selected').text());
//        //formData.append('PropertyIncomeDocsRequired', $('#IncomeDocs :selected').map(function () {
//        //    return $(this).text();
//        //}).get().join(', '));
//        formData.append('EnvironmentalRequired', $('#environmental :selected').text());
//        formData.append('AppraisalRequired', $('#AppraisalReq :selected').text());

//        formData.append('SurveyRequired', $('input[name=inlineRadioOptions]:checked').val());

//        formData.append('InsuranceLevelRequirement', $('#InsuranceLevel :selected').text());
//        formData.append('TypeOfInsurance', $('#chkbx2').is(':checked'));
//        formData.append('WillYouCollectEscrows', $('#CollectEscrows :selected').text());
//        if ($('#CollectEscrows').val() == '5') {
//            formData.append('OtherCollectEscrows', $('#other_escrows').val());
//        }
//        formData.append('CreditScoreRequirement', $('#CreditRequirement :selected').text());
//        formData.append('LiquidityRequirement', $('#LiquidityRequirement :selected').text());
//        formData.append('TaxReturnRequirement', $('#TaxReturn :selected').text());
//        formData.append('ExperienceRequirement', $('#experience').val());
//        formData.append('NetWorthRequirement', $('#NetWorth :selected').text());
//        //formData.append('USCitizenshipStatusRequirement', $('#USCitizen :selected').map(function () {
//        //    return $(this).text();
//        //}).get().join(', '));

//        formData.append('TOIGeneralLiability', $('#GeneralLiability').is(':checked'));
//        formData.append('TOIHazard', $('#Hazard').is(':checked'));
//        formData.append('TOIFlood', $('#Flood').is(':checked'));
//        formData.append('TOIWindAndHail', $('#WindHail').is(':checked'));
//        formData.append('TOIBuilderRisk', $('#BuilderRisk').is(':checked'));
//        //formData.append('UserAgreement', $('#chkbx1').is(':checked'));
//        //formData.append('Id', userId);
//        //formData.append('IsLenderProductCompleted', '0');
//        document.getElementById("divLoader").style.visibility = "visible";
//        debugger
//        $.ajax({
//            url: '/Lender/UpdateLenderProduct',  // Update with your server endpoint
//            type: 'POST',
//            data: formData,
//            contentType: false,
//            processData: false,
//            success: function (response) {
//                document.getElementById("divLoader").style.visibility = "hidden";
//                toastr.success('Lender Product updated successfully.');
//            },
//            error: function (error) {
//                // Handle error
//                console.error(error);
//            }
//        });
//    //}
//    //else {
//    //    return false;
//    //}
//}


