
$(document).ready(function () {

    var down = document.querySelectorAll('.select2-selection--multiple');
    down.forEach((e) => {
        e.classList.add('form-select');
    });
    GetPropertyStateList();
    /*SelectWillYouCollectEscrows();*/
    SelectPaymentPenality();
    changecounties();
    changeLendingCity();
    changeLendingStae();
});

$("#txtConformModel").click(function () {
    debugger
    AddLendinProduct();
})

function getUserIdFromUrl() {
    var urlParts = window.location.href.split('/');
    var userId = urlParts[urlParts.length - 1];
    return userId;
}
function AddLendingProduct() {
    debugger
    var IsEmtpty = ValidateAddListing();
    if (IsEmtpty == true) {
        $("#WarningCreateLending").modal("show");
    }
    else {
        return false;
    }
}

function AddLendinProduct() {
    debugger

    var userId = getUserIdFromUrl();
    var fees = new Array();
    var amount = new Array();
    var arrLength = $("#getAllHtml").children().length;
    for (var i = 1; i <= arrLength; i++) {
        fees.push($("#getAllHtml div:nth-child(" + i + ") #AdditionalFees").val());
        amount.push($("#getAllHtml").children("div:nth-child(" + i + ")").find("#AdditionalAmount").val());
    }
    ////Save Other requirement table
    var linkName = new Array();
    var linkLength = $("#getAllHtmlForLink").children().length;
    for (var i = 1; i <= linkLength; i++) {
        linkName.push($("#getAllHtmlForLink div:nth-child(" + i + ") #OtherDocs").val());
    }
    var linkNameValue = linkName.join(",")

    var formData = new FormData();
    for (var i = 0; i < arrLength; i++) {
        formData.append('LenderProgramAmount[' + i + '].AdditionalFees', fees[i]);
        formData.append('LenderProgramAmount[' + i + '].Amount', amount[i]);
    }
    //Append Other Requirement field
    for (var i = 0; i < linkName.length; i++) {
        formData.append('OtherRequirementProduct[' + i + '].RequirementDesc', linkName[i]);
    }

    formData.append('LoanProduct', $('#propertyType').val());
    formData.append('FixedOrAdjustableRate', $('#RateSelect').val());
    if ($('#RateSelect').val() === 1) {
        formData.append('AdjustableStructureDesc', $('#Adjuststrctr').val());
    }
    formData.append('TermValue', $('#inputTerm').val());
    formData.append('TermType', $('#selectTerm').val());


    formData.append('Amortization', $('#amortization').val());
    if ($('#amortization').val() === 'Other') {
        formData.append('OtherAmortization', $('#amortizationother').val());
    }

    var interestRate = $('#InterestRate').val();
    var finalInterestRate = interestRate.replace('%', ''); // remove the '%' symbol from the value
    formData.append('InterestRate', finalInterestRate); // Append the modified value to the FormData


    var minLoan = $('#minLoan').val();
    var finalMinLoan = minLoan.replace('$', ''); // remove the '$' symbol from the value
    formData.append('LoanAmountRangeMin', finalMinLoan.replace(/,/g, '')); // Append the modified value to the FormData


    var maxLoan = $('#maxLoan').val();
    var finalMaxLoan = maxLoan.replace('$', ''); // remove the '$' symbol from the value
    formData.append('LoanAmountRangeMax', finalMaxLoan.replace(/,/g, '')); // Append the modified value to the FormData

    formData.append('LenderOrigination', $('#LenderOrigin').val());
    formData.append('StateId', $('#StateFeilds :selected').map(function () {
        return $(this).val();
    }).get().join(','));   
    formData.append('Counties', $('#LendingCounties :selected').map(function () {
        return $(this).val();
    }).get().join(','));
    formData.append('City', $('#LendingCity :selected').map(function () {
        return $(this).val();
    }).get().join(','));
    //property details section fields append
    formData.append('TypeOfAssets', $('#assetTypeId :selected').map(function () {
        return $(this).val();
    }).get().join(','));
    if ($('#assetTypeId').val().includes('1')) {
        formData.append('MinMultifamilyUnit', $('#MinUnitCount').val());
        formData.append('MaxMultifamilyUnit', $('#MaxUnitCount').val());
    }
    var purchasePercent = $('#PurchasePercent').val();
    var finalPurchasePercent = purchasePercent.replace('%', '');
    formData.append('PercentOfPurchaseToLend', finalPurchasePercent.replace(/,/g, '')); 

    formData.append('PercentOfRehabToLend', $('#RehabPercent').val().replace('%', ''));

    formData.append('LTVMax', $('#LTVmax').val().replace('%', ''));
    formData.append('LTCMax', $('#LTCmax').val().replace('%', '')); 

    formData.append('MinAcceptableDSCR', $('#DSCRAccept').val());  
    formData.append('DoesLoanHavePrepaymentPenalty', $('#quespenalty').val());
    if ($('#quespenalty').val() == '1') {
        formData.append('TypeOfPrepaymentStructure', $('#structure').val());
        formData.append('Description', $('#FeeCharged').val());
    }
    formData.append('InspectionRequired', $('#Inspection').val());
    formData.append('PropertyIncomeDocsRequired', $('#IncomeDocs :selected').map(function () {
        return $(this).val();
    }).get().join(', '));
    formData.append('EnvironmentalRequired', $('#environmental').val());
    formData.append('AppraisalRequired', $('#AppraisalReq').val());

    //formData.append('SurveyRequired', $('input[name=inlineRadioOptions]:checked').val());
    var isOtherRealEstate = $("#surveyYes").prop('checked');
    formData.append('SurveyRequired', isOtherRealEstate);

    var isOtherRealEstate = $("#surveyYNo").prop('checked');
    formData.append('SurveyRequired', isOtherRealEstate);

    formData.append('InsuranceLevelRequirement', $('#InsuranceLevel').val());
    /*  formData.append('TypeOfInsurance', $('#chkbx2').is(':checked'));*/
    formData.append('WillYouCollectEscrows', $('#CollectEscrows').val());
    if ($('#CollectEscrows').val() == '5') {
        formData.append('OtherCollectEscrows', $('#other_escrows').val());
    }
    formData.append('CreditScoreRequirement', $('#CreditRequirement').val());
    formData.append('LiquidityRequirement', $('#LiquidityRequirement').val());
    formData.append('TaxReturnRequirement', $('#TaxReturn').val());
    formData.append('ExperienceRequirement', $('#experience').val());
    formData.append('NetWorthRequirement', $('#NetWorth').val());
    formData.append('USCitizenshipStatusRequirement', $('#USCitizen :selected').map(function () {
        return $(this).val();
    }).get().join(','));

    formData.append('TOIGeneralLiability', $('#GeneralLiability').is(':checked'));
    formData.append('TOIHazard', $('#Hazard').is(':checked'));
    formData.append('TOIFlood', $('#Flood').is(':checked'));
    formData.append('TOIWindAndHail', $('#WindHail').is(':checked'));
    formData.append('TOIBuilderRisk', $('#BuilderRisk').is(':checked'));
    formData.append('NickName', $('#nick_name_product').val());

    formData.append('MonthlyPayment', $('#Monthlypayment').val());
    if ($('#Monthlypayment').val() == '3') {
   
        var closingValue = $("#closingPayments").prop('checked');
        formData.append('ClosingPayment', closingValue);
        var exitValue = $("#exitPayments").prop('checked');
        formData.append('ExitPayment', exitValue);
    }

    formData.append('UserAgreement', $('#chkbx1').is(':checked'));
    formData.append('Id', userId);
    formData.append('IsLenderProductCompleted', '1');
    formData.append('CheckMultiProductAdd', 'TrueData');

    document.getElementById("divLoader").style.visibility = "visible";
    debugger
    $.ajax({
        url: '/Lender/CreateLenderProduct',
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

function ValidateAddListing() {
    debugger
    var IsEmtpty = true;

    var loanProduct = $("#propertyType").val().trim();
    if ($('#propertyType').val() == "0") {
        $('#errLaonProduct').text("Please select loan product").css("color", "Red");
        IsEmtpty = false;
    }
    else if (loanProduct != "") {
        $('#errLaonProduct').text(" ");
    }

    var fixRate = $("#RateSelect").val().trim();
    if ($('#RateSelect').val() == "0") {
        $('#errFixRate').text("Please select fix rate").css("color", "Red");
        IsEmtpty = false;
    }
    else if (fixRate != "") {
        $('#errFixRate').text(" ");
    }

    var terms = $("#inputTerm").val().trim();
    if (terms.length == " ") {
        $('#errTerms').text("Please enter Terms").css("color", "Red");
        IsEmtpty = false;
    } else if (terms != "") {
        $('#errTerms').text(" ");
    }

    var mortization = $("#amortization").val().trim();
    if ($('#amortization').val() == "0") {
        $('#errAmortization').text("Please select amortization").css("color", "Red");
        IsEmtpty = false;
    }
    else if (mortization != "") {
        $('#errAmortization').text(" ");
    }

    var interestRate = $("#InterestRate").val().trim();
    if (interestRate == "") {
        $('#errInterestRate').text("Please enter interest rate").css("color", "Red");
        IsEmtpty = false;
    }
    else if (interestRate != "") {
        $('#errInterestRate').text(" ");
    }

    var minLoan = $("#minLoan").val().trim();
    if (minLoan == "" || minLoan == "$") {
        $('#errMinLoan').text("Please enter min loan").css("color", "Red");
        IsEmtpty = false;
    }
    else if (minLoan != "") {
        $('#errMinLoan').text(" ");
    }

    var state = $("#StateFeilds").val();
    if (state.length == " ") {
        $('#errStateField').text("Please select state").css("color", "Red");
        IsEmtpty = false;
    } else if (state != "") {
        $('#errStateField').text(" ");
    }
    var assetsType = $("#assetTypeId").val();
    if (assetsType.length == " ") {
        $('#errAssetType').text("Please select assets type").css("color", "Red");
        IsEmtpty = false;
    } else if (assetsType != "") {
        $('#errAssetType').text(" ");
    }

    if ($('#assetTypeId').val() == '1') {
        var multiUnit1 = $("#MinUnitCount").val().trim();
        var multiUnit2 = $("#MaxUnitCount").val().trim();
        if ((multiUnit1 == "" || multiUnit2 == "")) {
            $('#errMultifamilyUnit').text("Please enter multifamily unit range ").css("color", "Red");
            IsEmtpty = false;
        }
        else if (multiUnit1 != "" || multiUnit2 != "") {
            $('#errMultifamilyUnit').text(" ");
        }
    }

    var purchasePercent = $("#PurchasePercent").val().trim();
    if (purchasePercent == "") {
        $('#errPurchasePercent').text("Please enter percent of purchase").css("color", "Red");
        IsEmtpty = false;
    }
    else if (purchasePercent != "") {
        $('#errPurchasePercent').text(" ");
    }

    var LTVmax = $("#LTVmax").val().trim();
    if (LTVmax == "") {
        $('#errLTVmax').text("Please enter LTVmax").css("color", "Red");
        IsEmtpty = false;
    }
    else if (LTVmax != "") {
        $('#errLTVmax').text(" ");
    }

    var inspection = $("#Inspection").val().trim();
    if (inspection == "0") {
        $('#errInspection').text("Please select inspection").css("color", "Red");
        IsEmtpty = false;
    }
    else if (inspection != "") {
        $('#errInspection').text(" ");
    }

    var incomeDocs = $("#IncomeDocs").val();
    if (incomeDocs.length == " ") {
        $('#errIncomeDocs').text("Please select income docs.").css("color", "Red");
        IsEmtpty = false;
    } else if (incomeDocs != "") {
        $('#errIncomeDocs').text(" ");
    }

    var environmental = $("#environmental").val().trim();
    if (environmental == "0") {
        $('#errEnvironmental').text("Please select environmental").css("color", "Red");
        IsEmtpty = false;
    }
    else if (environmental != "") {
        $('#errEnvironmental').text(" ");
    }

    var appraisalReq = $("#AppraisalReq").val().trim();
    if (appraisalReq == "0") {
        $('#errAppraisalReq').text("Please select appraisal").css("color", "Red");
        IsEmtpty = false;
    }
    else if (appraisalReq != "") {
        $('#errAppraisalReq').text(" ");
    }

    var insuranceLevel = $("#InsuranceLevel").val().trim();
    if (insuranceLevel == "0") {
        $('#errInsuranceLevel').text("Please select insurance level").css("color", "Red");
        IsEmtpty = false;
    }
    else if (insuranceLevel != "") {
        $('#errInsuranceLevel').text(" ");
    }

    var creditRequirement = $("#CreditRequirement").val().trim();
    if (creditRequirement == "0") {
        $('#errCreditRequirement').text("Please select credit score").css("color", "Red");
        IsEmtpty = false;
    }
    else if (creditRequirement != "") {
        $('#errCreditRequirement').text(" ");
    }

    var liquidityRequirement = $("#LiquidityRequirement").val().trim();
    if (liquidityRequirement == "0") {
        $('#errLiquidityRequirement').text("Please select liquidity ").css("color", "Red");
        IsEmtpty = false;
    }
    else if (liquidityRequirement != "") {
        $('#errLiquidityRequirement').text(" ");
    }

    var taxReturn = $("#TaxReturn").val().trim();
    if (taxReturn == "0") {
        $('#errTaxReturn').text("Please select tax return ").css("color", "Red");
        IsEmtpty = false;
    }
    else if (taxReturn != "") {
        $('#errTaxReturn').text(" ");
    }

    var experience = $("#experience").val().trim();
    if (experience == "") {
        $('#errExperience').text("Please enter experience").css("color", "Red");
        IsEmtpty = false;
    }
    else if (experience != "") {
        $('#errExperience').text(" ");
    }

    var netWorth = $("#NetWorth").val().trim();
    if (netWorth == "0") {
        $('#errNetWorth').text("Please select net worth ").css("color", "Red");
        IsEmtpty = false;
    }
    else if (netWorth != "") {
        $('#errNetWorth').text(" ");
    }

    var citizen = $("#USCitizen").val();
    debugger
    if (citizen.length == " ") {
        $('#errUSCitizen').text("Please select US citizenship status").css("color", "Red");
        IsEmtpty = false;
    } else if (citizen != "") {
        $('#errUSCitizen').text(" ");
    }

    var terms = $("#nick_name_product").val().trim();
    if (terms.length == " ") {
        $('#errNickname').text("Please enter Nickname").css("color", "Red");
        IsEmtpty = false;
    } else if (terms != "") {
        $('#errNickname').text(" ");
    }

    var status = $("#chkbx1").prop('checked');
    if (status == false) {
        $('#txtAcceptUser').css('color', '#DC3545');
        IsEmtpty = false;
    }
    else {
        $('#txtAcceptUser').css('color', 'black');
    }

    var radioValue = $('input[name=inlineRadioOptions]:checked').val();
    if (radioValue == undefined) {
        $('#errSurveyRequired').text("Please select survey required ").css("color", "Red");
        IsEmtpty = false;
    }
    else {
        $(".error-remove").text("");
    }


    return IsEmtpty;
}

//remove radio button validation

$("input[name='inlineRadioOptions']").change(function () {
    debugger
    $(".error-remove").text("");
    IsEmtpty = true;
})

/*************** function for remove validation ******************/
function RemoveLoanProduct() {
    $('#errLaonProduct').text('');
}
function RemoveFixedRate() {
    $('#errFixRate').text('');
}
function RemoveTerms() {
    $('#errTerms').text('');
}

function RemoveAmortization() {
    $('#errAmortization').text('');
}
function RemoveInterestRate() {
    $('#errInterestRate').text('');
}
function RemoveMinLoan() {
    $('#errMinLoan').text('');
}
function RemoveMaxLoan() {
    $('#errMaxLoan').text('');
}
function RemoveState() {
    $('#errStateField').text('');
}

function RemoveAssetType() {
    $('#errAssetType').text('');
}
function RemoveMultiUnitRange() {
    $('#errMultifamilyUnit').text('');
}

function RemovePurchasePercent() {
    $('#errPurchasePercent').text('');
}
function RemoveLTVmax() {
    $('#errLTVmax').text('');
}
function RemoveInspection() {
    $('#errInspection').text('');
}

function RemoveIncomeDocs() {
    $('#errIncomeDocs').text('');
}
function RemoveEnvironmental() {
    $('#errEnvironmental').text('');
}
function RemoveAppraisal() {
    $('#errAppraisalReq').text('');
}
function RemoveInsuranceLevel() {
    $('#errInsuranceLevel').text('');
}

function RemoveCreditRequirement() {
    $('#errCreditRequirement').text('');
}

function RemoveLiquidityRequirement() {
    $('#errLiquidityRequirement').text('');
}
function RemoveTaxReturn() {
    $('#errTaxReturn').text('');
}

function RemoveExperience() {
    $('#errExperience').text('');
}

function RemoveNetWorth() {
    $('#errNetWorth').text('');
}

function RemoveUSCitizen() {
    $('#errUSCitizen').text('');
}
function RemoveNickname() {
    $('#errNickname').text('');
}




/************************** function for onchange value************************** */

function LoanOnchange() {
    AdjustableRateOption();
    RemoveLoanProduct();
}
function FixedRateOnchange() {
    AdjustableRateOption();
    RemoveFixedRate();
}

function AssetsTypeOnChange() {
    RemoveAssetType();
    SelectMultifamily();
}

function AmortizationOnChange() {
    RemoveAmortization();
    OtherAmortization();
}
$('#chkbx1').click(function () {
    debugger;
    var status = $("#chkbx1").prop('checked');
    if (status == false) {
        $('#txtAcceptUser').css('color', '#DC3545');
    }
    else {
        $('#txtAcceptUser').css('color', 'black');
    }
});

//method for remove % on backspace start
$('#InterestRate').keyup(function (event) {
    debugger
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '8') {

    }
    else {
        InterestRatePlaceholder();
    }
});

////apply placeholder for % start
function InterestRatePlaceholder() {
    debugger
    var displayValue = "";
    var checkValueISPresentt = $('#InterestRate').val();

    if (checkValueISPresentt != "") {
        displayValue = checkValueISPresentt.replace('%', '');
    }
    var num = displayValue + '%'
    if (num == '%') {
        $('#InterestRate').val('')
    }
    else {
        $('#InterestRate').val(num)
    }

}

//function for allow two decimal places in input field
$('#InterestRate').on('input', function () {
    debugger
    var value = $(this).val();
    var parts = value.split('.');

    if (parts.length > 1) {
        parts[1] = parts[1].slice(0, 3); // Keep only two decimal places
        value = parts.join('.');
        $(this).val(value);
    }
});

function CalculateAmount(data) {
    debugger
    var vali2 = $(data).val();
    var dollervakue = vali2.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    var doolerwith = '$' + dollervakue;
    $(data).val(doolerwith);
}
/*******************"Percent of purchase to lend up to" input validation with only number+%+decimal*********************/

$('#PurchasePercent').keyup(function (event) {
    debugger
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '8') {

    }
    else {
        PurchasePercentPlaceholder();
    }
});

function PurchasePercentPlaceholder() {
    debugger
    var displayValue = "";
    var checkValueISPresentt = $('#PurchasePercent').val();

    if (checkValueISPresentt != "") {
        displayValue = checkValueISPresentt.replace('%', '');
    }
    var num = displayValue + '%'
    if (num == '%') {
        $('#PurchasePercent').val('')
    }
    else {
        $('#PurchasePercent').val(num)
    }
}
$('#PurchasePercent').keypress(function (e) {
    var regex = new RegExp("^[0-9_\. ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
});

$('#PurchasePercent').on('input', function () {
    var value = $(this).val();
    var parts = value.split('.');
    if (parts.length > 1) {
        parts[1] = parts[1].slice(0, 3);
        value = parts.join('.');
        $(this).val(value);
    }
});

/*******************"Percent of rehab to lend up to" input validation with only number+%+decimal*********************/
$('#RehabPercent').keyup(function (event) {
    debugger
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '8') {

    }
    else {
        RehabPercentPlaceholder();
    }
});

function RehabPercentPlaceholder() {
    debugger
    var displayValue = "";
    var checkValueISPresentt = $('#RehabPercent').val();

    if (checkValueISPresentt != "") {
        displayValue = checkValueISPresentt.replace('%', '');
    }
    var num = displayValue + '%'
    if (num == '%') {
        $('#RehabPercent').val('')
    }
    else {
        $('#RehabPercent').val(num)
    }
}
$('#RehabPercent').keypress(function (e) {
    var regex = new RegExp("^[0-9_\. ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
});

$('#RehabPercent').on('input', function () {
    var value = $(this).val();
    var parts = value.split('.');
    if (parts.length > 1) {
        parts[1] = parts[1].slice(0, 3);
        value = parts.join('.');
        $(this).val(value);
    }
});

/*******************"LTV max" input validation with only number+%+decimal*********************/
$('#LTVmax').keyup(function (event) {
    debugger
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '8') {

    }
    else {
        LTVMaxPercentPlaceholder();
    }
});

function LTVMaxPercentPlaceholder() {
    debugger
    var displayValue = "";
    var checkValueISPresentt = $('#LTVmax').val();

    if (checkValueISPresentt != "") {
        displayValue = checkValueISPresentt.replace('%', '');
    }
    var num = displayValue + '%'
    if (num == '%') {
        $('#LTVmax').val('')
    }
    else {
        $('#LTVmax').val(num)
    }
}
$('#LTVmax').keypress(function (e) {
    var regex = new RegExp("^[0-9_\. ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
});

$('#LTVmax').on('input', function () {
    var value = $(this).val();
    var parts = value.split('.');
    if (parts.length > 1) {
        parts[1] = parts[1].slice(0, 3);
        value = parts.join('.');
        $(this).val(value);
    }
});

/*******************"LTC max" input validation with only number+%+decimal*********************/
$('#LTCmax').keyup(function (event) {
    debugger
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '8') {

    }
    else {
        LTCMaxPercentPlaceholder();
    }
});

function LTCMaxPercentPlaceholder() {
    debugger
    var displayValue = "";
    var checkValueISPresentt = $('#LTCmax').val();

    if (checkValueISPresentt != "") {
        displayValue = checkValueISPresentt.replace('%', '');
    }
    var num = displayValue + '%'
    if (num == '%') {
        $('#LTCmax').val('')
    }
    else {
        $('#LTCmax').val(num)
    }
}
$('#LTCmax').keypress(function (e) {
    var regex = new RegExp("^[0-9_\. ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
});

$('#LTCmax').on('input', function () {
    var value = $(this).val();
    var parts = value.split('.');
    if (parts.length > 1) {
        parts[1] = parts[1].slice(0, 3);
        value = parts.join('.');
        $(this).val(value);
    }
});

$('#DSCRAccept').on('input', function () {
    var value = $(this).val();
    var parts = value.split('.');
    if (parts.length > 1) {
        parts[1] = parts[1].slice(0, 3);
        value = parts.join('.');
        $(this).val(value);
    }
});



/*** doller with comma seperate  ***/
function CalculateMinLoanAmount(data) {
    debugger
    RemoveMinLoan();
    var vali2 = $(data).val();
    var dollervakue = vali2.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    var doolerwith = '$' + dollervakue;
    $(data).val(doolerwith);
}

function CalculateMaxLoanAmount(data) {
    RemoveMaxLoan();
    var vali2 = $(data).val();
    var dollervakue = vali2.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    var doolerwith = '$' + dollervakue;
    $(data).val(doolerwith);
}

/*  Below section is hidden and will show on select of Adjustable Rate option*/
function AdjustableRateOption() {
    debugger
    var selectedValue = $("#RateSelect").val();
    if (selectedValue == 1) {
        $('#AdjustValue').removeClass('d-none');
    }
    else {
        $('#AdjustValue').addClass('d-none');
    }
}


//Below section will show if the Multifamily option is selected on "Type of assets this product applies to"

function OtherAmortization() {
    debugger
    var selectedValue = $("#amortization").val();
    if (selectedValue == "9") {
        $('#OtherAmortization').removeClass('d-none');
    }
    else {
        $('#OtherAmortization').addClass('d-none');
    }
}

function SelectMultifamily() {
    var selectedValue = $("#assetTypeId").val();
    if (selectedValue.includes("1")) {
        $('#divMultifamily').removeClass('d-none');
    }
    else {
        $('#divMultifamily').addClass('d-none');
    }
}

function SelectPaymentPenality() {
    debugger
    var selectedValue = $("#quespenalty").val();
    if (selectedValue == "1") {
        $('.quespenaltyyes').removeClass('d-none');
    }
    else {
        $('.quespenaltyyes').addClass('d-none');
    }
}

function SelectWillYouCollectEscrows() {
    debugger
    var selectedValue = $("#CollectEscrows").val();
    if (selectedValue == "4") {
        $('#other_escrows').removeClass('d-none');
    }
    else {
        $('#other_escrows').addClass('d-none');
    }
}

function MakeNewRow() {
    debugger
    if ($('#getAllHtml').children().length < 5) {
        var htmlContent = $('#getAllHtmldNone').html();
        $('#getAllHtml').append(htmlContent);
    }
}
/*-------------------Remove '+' on click '+' in AmountProduct Field------------------------*/
$('#divAddMain').on('click', function () {
    debugger
    $(this).closest('#divAddMain').css("visibility", "hidden");
    $('#divDelete').removeClass('d-none');

});
$("#getAllHtml").on('click', '.idAddUnitDiv', function () {
    debugger
    if ($(this).closest('div#parentDiv2').next().find('.idAddUnitDiv').length == 0 && $(this).closest('div#parentDiv2').prev().find('.idAddUnitDiv').length != 0) {
        $(this).closest('#AddIcon').css("visibility", "show");
        toastr.warning('You can add only 5 fields');

    }
    else {
        $(this).closest('#AddIcon').css("visibility", "hidden");
    }

});
$("#getAllHtml").on('click', '.deleteMe2', function () {
    debugger
    if ($('#getAllHtml').children().length != 1) {
        $(this).closest('div#mainDiv2').remove();
    }
});
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

/*******************  function for other requirement  ************************* */
function MakeNewLinkRow() {
    debugger
    if ($('#getAllHtmlForLink').children().length < 5) {
        var htmlContent = $('#getAllHtmlForLinkhdn div').html();
        $('#getAllHtmlForLink').append(htmlContent);
    }
}
$('#divLinkMain').on('click', function () {
    debugger
    $(this).closest('#divLinkMain').css("visibility", "hidden");
    $('#divOtherDelete').removeClass('d-none');
});

$("#getAllHtmlForLink").on('click', '.idAddDiv', function () {
    debugger
    if ($(this).closest('div#parentDiv').next().find('.idAddDiv').length == 0 && $(this).closest('div#parentDiv').prev().find('.idAddDiv').length != 0) {
        $(this).closest('#deleteMeCopy').css("visibility", "show");

        toastr.warning('You can add maximum 5 fields');

    }
    else {
        $(this).closest('#deleteMeCopy').css("visibility", "hidden");
    }
});

$("#getAllHtmlForLink").on('click', '.deleteMe1', function () {
    debugger
    if ($('#getAllHtmlForLink').children().length != 1) {
        $(this).closest('div#mainDiv').remove();
    }

});

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

//Delete function for Other requirements

$("#getAllHtmlForLink").on('click', '.deleteMe1', function () {
    debugger
    if ($('#getAllHtmlForLink').children().length != 1) {
        $(this).closest('div#mainDiv').remove();
    }

});

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


//Validation for Multifamily units lending range
$('#MaxUnitCount').on("keyup", function () {
    debugger;

    var maxUnitCount = $("#MaxUnitCount").val();
    var minUnitCount = $("#MinUnitCount").val();//min
    if (minUnitCount > maxUnitCount) {
        $('#errMaxUnitCount').text("Max. unit count should be greater than or equal to Min. unit count.").css("color", "Red");
    } else {
        $('#errMaxUnitCount').text('');
    }
});
//Validation for Multifamily units lending range
$('#MinUnitCount,#MaxUnitCount').on("keyup", function () {
    debugger;

    var maxUnitCount = $("#MaxUnitCount").val();
    var minUnitCount = $("#MinUnitCount").val();//min
    if (minUnitCount > maxUnitCount) {
        $('#errMaxUnitCount').text("Max. unit count should be greater than or equal to Min. unit count.").css("color", "Red");
    } else {
        $('#errMaxUnitCount').text('');
    }
});

//Validation for Loan amount range 
$('#maxLoan,#minLoan').on("keyup", function () {
    debugger;
    var minLoan = $("#minLoan").val();//min
    minLoan = minLoan.replace('$', '');
    minLoan = minLoan.replace(/,/g, '');
    minLoan = parseInt(minLoan);

    var maxLoan = $("#maxLoan").val();//min
    maxLoan = maxLoan.replace('$', '');
    maxLoan = maxLoan.replace(/,/g, '');
    maxLoan = parseInt(maxLoan);

    if (minLoan > maxLoan) {
        $('#errMinLoan').text("Max Loan should be greater than Min loan amount").css("color", "Red");
    } else {
        $('#errMinLoan').text('');
    }
});
$('#DSCRAccept').on('keydown', function (e) {
    if (e.key === '-') {
        e.preventDefault();
    }
});
/************************* Update Lender Product *******************************/
function UpdateLenderProduct() {
    debugger
    //var IsEmtpty = ValidateAddListing();
    //if (IsEmtpty == true) {
       

        formData.append('LoanProduct', $('#propertyType :selected').text());
        formData.append('FixedOrAdjustableRate', $('#RateSelect :selected').text());
        if ($('#RateSelect').val() === 'Adjustable') {
            formData.append('AdjustableStructureDesc', $('#Adjuststrctr').val());
        }
        //formData.append('Terms', $('#termField :selected').map(function () {
        //    return $(this).text();
        //}).get().join(', '));

        formData.append('TermValue', $('#inputTerm').val());
        formData.append('TermType', $('#selectTerm :selected').text());


        formData.append('Amortization', $('#amortization :selected').text());
        if ($('#amortization').val() === 'Other') {
            formData.append('OtherAmortization', $('#amortizationother').val());
        }

        var interestRate = $('#InterestRate').val();
        var finalInterestRate = interestRate.replace('%', ''); // remove the '%' symbol from the value
        formData.append('InterestRate', finalInterestRate); // Append the modified value to the FormData


        var minLoan = $('#minLoan').val();
        var finalMinLoan = minLoan.replace('$', ''); // remove the '$' symbol from the value
        formData.append('LoanAmountRangeMin', finalMinLoan.replace(/,/g, '')); // Append the modified value to the FormData


        var maxLoan = $('#maxLoan').val();
        var finalMaxLoan = maxLoan.replace('$', ''); // remove the '$' symbol from the value
        formData.append('LoanAmountRangeMax', finalMaxLoan.replace(/,/g, '')); // Append the modified value to the FormData

        formData.append('LenderOrigination', $('#LenderOrigin').val());
        formData.append('StateId', $('#StateFeilds :selected').map(function () {
            return $(this).text();
        }).get().join(', '));
        formData.append('Counties', $('#LendingCounties :selected').map(function () {
            return $(this).text();
        }).get().join(', '));
        formData.append('City', $('#LendingCity :selected').map(function () {
            return $(this).text();
        }).get().join(', '));
        //property details section fields append
        formData.append('TypeOfAssets', $('#assetTypeId :selected').map(function () {
            return $(this).text();
        }).get().join(', '));


        if ($('#assetTypeId').val().includes('1')) {
            formData.append('MinMultifamilyUnit', $('#MinUnitCount').val());
            formData.append('MaxMultifamilyUnit', $('#MaxUnitCount').val());
        }


        var purchasePercent = $('#PurchasePercent').val();
        var finalPurchasePercent = purchasePercent.replace('%', ''); // remove the '%' symbol from the value
        formData.append('PercentOfPurchaseToLend', finalPurchasePercent.replace(/,/g, '')); // Append the modified value to the FormData

        formData.append('PercentOfRehabToLend', $('#RehabPercent').val().replace('%', '')); // Append the modified value to the FormData

        formData.append('LTVMax', $('#LTVmax').val().replace('%', '')); // Append the modified value to the FormData
        formData.append('LTCMax', $('#LTCmax').val().replace('%', '')); // Append the modified value to the FormData

        /*formData.append('MinAcceptableDSCR', $('#DSCRAccept').val().replace('%', '')); */// Append the modified value to the FormData
        formData.append('MinAcceptableDSCR', $('#DSCRAccept').val());
        formData.append('DoesLoanHavePrepaymentPenalty', $('#quespenalty :selected').text());
        if ($('#quespenalty').val() == '2') {
            formData.append('TypeOfPrepaymentStructure', $('#structure :selected').text());
            formData.append('Description', $('#FeeCharged').val());
        }
        formData.append('InspectionRequired', $('#Inspection :selected').text());
        formData.append('PropertyIncomeDocsRequired', $('#IncomeDocs :selected').map(function () {
            return $(this).text();
        }).get().join(', '));
        formData.append('EnvironmentalRequired', $('#environmental :selected').text());
        formData.append('AppraisalRequired', $('#AppraisalReq :selected').text());

        formData.append('SurveyRequired', $('input[name=inlineRadioOptions]:checked').val());

        formData.append('InsuranceLevelRequirement', $('#InsuranceLevel :selected').text());
        /*  formData.append('TypeOfInsurance', $('#chkbx2').is(':checked'));*/
        formData.append('WillYouCollectEscrows', $('#CollectEscrows :selected').text());
        if ($('#CollectEscrows').val() == '5') {
            formData.append('OtherCollectEscrows', $('#other_escrows').val());
        }
        formData.append('CreditScoreRequirement', $('#CreditRequirement :selected').text());
        formData.append('LiquidityRequirement', $('#LiquidityRequirement :selected').text());
        formData.append('TaxReturnRequirement', $('#TaxReturn :selected').text());
        formData.append('ExperienceRequirement', $('#experience').val());
        formData.append('NetWorthRequirement', $('#NetWorth :selected').text());
        formData.append('USCitizenshipStatusRequirement', $('#USCitizen :selected').map(function () {
            return $(this).text();
        }).get().join(', '));

        formData.append('TOIGeneralLiability', $('#GeneralLiability').is(':checked'));
        formData.append('TOIHazard', $('#Hazard').is(':checked'));
        formData.append('TOIFlood', $('#Flood').is(':checked'));
        formData.append('TOIWindAndHail', $('#WindHail').is(':checked'));
        formData.append('TOIBuilderRisk', $('#BuilderRisk').is(':checked'));
        formData.append('UserAgreement', $('#chkbx1').is(':checked'));
        formData.append('Id', userId);
        formData.append('IsLenderProductCompleted', '0');
        document.getElementById("divLoader").style.visibility = "visible";
        debugger
        $.ajax({
            url: '/Lender/',  // Update with your server endpoint
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                document.getElementById("divLoader").style.visibility = "hidden";
            },
            error: function (error) {
                // Handle error
                console.error(error);
            }
        });
    //}
    //else {
    //    return false;
    //}
}

$('.selectall').click(function () {
    if ($(this).is(':checked')) {
        $('div input').attr('checked', true);
    } else {
        $('div input').attr('checked', false);
    }
});

function GetPropertyStateList() {
    debugger
    $.ajax({
        url: "/Property/GetPropertyStateList",
        success: function (response) {
            var data = '<option value="0">All states</option>';
            response.forEach(function (item) {

                data += '<option value= ' + item.stateId + '>' + item.longName + '</option>'
            });
            $('#StateFeilds').html(data);
        }
    });

}




//function changecounties() {
//    debugger
//    $('#LendingCounties').change(function () {
//        if ($(this).val() == '') {
//            $(this).find('option').not(this).prop('selected', true);
//        }
//    });
//}

//function changeLendingCity() {
//    debugger

//    $('#LendingCity').change(function () {
//        if ($(this).val() == '') {
//            $(this).find('option').not(this).prop('selected', true);
//        }
//    });
//}



//$('.select2-results ul li.select2-results__option').click(function () {
//    debugger;
//    $(this).parent().children().attr('aria-selected', false);

//})
function MonthlyPayment() {
    debugger
    var selectedValue = $("#Monthlypayment").val();
    if (selectedValue != "3") {
        $('#textClosingPayment').hide();
    }
    else {
        $('#textClosingPayment').show();
    }
}