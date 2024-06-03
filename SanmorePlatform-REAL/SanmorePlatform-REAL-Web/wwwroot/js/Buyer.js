/*********************************** Pre Defined Arrays*****************************************/

//these array is used for save Fasttrack buyer Work Exp section in WorkExperience table
var companyName = [];
var fromDate = [];
var toDate = [];
var description = [];
var WorkExperienceID = [];

//these array is used for save Fasttrack buyer Real Estate Owned section in RealEstate table
var Addressline1 = [];
var Addressline2 = [];
var City = [];
var State = [];
var ZipCode = [];
var TypeOfProperty = [];
var PropertyWorth = [];
var DebtOnProperty = [];
var MonthYearAcquired = [];
var MonthYearAcquired = [];
var PropertyPercentageOwned = [];
var arrayRealEstateID = [];

//this cide is used for save Fasttrack buyer Loand and Note section in RealEstate table
var LoanID = [];
var NoteDescrptn = [];
var IsCollateral = [];
var collateral = [];
var noteValue = [];
var collateralValue = [];

//This is part of Business Owned Section
var businessId = [];
var businessType = [];
var businessPercent = [];
var businessValue = [];

//This is part of Other Assets Owned Section
var assetsId = [];
var otherTotal = [];
var otherAssetDebts = [];

//This is part of Other Debts Section
var debtsID = [];
var debtType = [];
var debtAmount = [];

//These arrays are defined to store deleted data primary id
var ArrayDeleteWorkExperienceRow = [];
var ArrayDeleteRealEstateRow = [];
var ArrayDeleteLoanAndNoteRow = [];
var ArrayDeleteMeBuisnessOwnedRow = [];
var ArrayDeleteAssetsRow = [];
var ArrayDeleteOtherDebtsRow = [];
var ArrayDeleteBankDocuments = [];
var ArrayDeleteCreditDocuments = [];
var ArrayDeletePassportDocuments = [];

var imgArrayPropPic = [];


/****************************************************************************
    Function: document.ready function()
    Purpose:  Auto load function on page loading 
    Developer: Wasim Raja
****************************************************************************/
$(document).ready(function () {
    $(".ProgressBarPersentage").css("width", "7%");
    $(".ProgressBarPersentage").text("7%");
    $('input[type="text"]').blur(function () {
        let value = $(this).val();
        let value2 = $.trim($(this).val());

        if ($.trim($(this).val()) == '') {
            $(this).addClass('error');
        } else {
            $(this).removeClass('error');
        }
    });
    GetPropertyStateList();
    CommaSeperatedNumericValues();
    BuyDefoultSelectedButton();
    ShowHideDeleteButton("dvWorkExpSection", "deleteMeWorkExp");
    ShowHideDeleteButton("dvRealEstateShowHide", "deleteMeRealEstateDiv");
    ShowHideDeleteButton("divLoanAndNotesShowHide", "deleteMe1");
    ShowHideDeleteButton("divBuisnessOwnedShowHide", "deleteMeBuisnessOwnedDiv");
    ShowHideDeleteButton("divAssetsShowHide", "deleteMeAssetsOwned");
    ShowHideDeleteButton("divOtherDebtsShowHide", "deleteMeOtherDebts");

    let SectionId = $("#hdnSectionNameSavedUpto").val();
    GetOpenDiv(SectionId);

    $(".clsHdnBankDocumentFiles").each(function () {
        UpdateCount(imgArrayPropPic, "upload-img");
    });
});

/****************************************************************************
    Function: FastTrackBuyerRegistar()
    Purpose:  Add Register FastTrack Buyer 
    Developer: Wasim Raja
****************************************************************************/


function FastTrackBuyerRegistar() {
    //document.getElementById("divLoader").style.visibility = "visible";
    InsertDatainWorkExperienceArray();
    InsertDatainRealEstateArray();
    InsertDatainLoanAndNoteArray();
    InsertbuisnessOwnedDataArray();
    InsertAssetsDataArray();
    InsertOtherDebtsDataArray();

    var formData = new FormData();  //send value View to controller
    for (var i = 0; i < companyName.length; i++) {
        formData.append('WorkExpModel[' + i + '].WorkExperienceID', WorkExperienceID[i]);
        formData.append('WorkExpModel[' + i + '].CompanyName', companyName[i]);
        formData.append('WorkExpModel[' + i + '].FromDate', fromDate[i]);
        formData.append('WorkExpModel[' + i + '].ToDate', toDate[i]);
        formData.append('WorkExpModel[' + i + '].Description', description[i]);
    }
    for (var i = 0; i < ArrayDeleteWorkExperienceRow.length; i++) {
        formData.append('DeleteWorkExperience[' + i + ']', ArrayDeleteWorkExperienceRow[i]);
    }
    for (var i = 0; i < Addressline1.length; i++) {
        formData.append('RealEstateVM[' + i + '].RealEstateID', arrayRealEstateID[i]);
        formData.append('RealEstateVM[' + i + '].OtherAddressLine1', Addressline1[i]);
        formData.append('RealEstateVM[' + i + '].OtherAddressLine2', Addressline2[i]);
        formData.append('RealEstateVM[' + i + '].City', City[i]);
        formData.append('RealEstateVM[' + i + '].State', State[i]);
        formData.append('RealEstateVM[' + i + '].ZipCode', ZipCode[i]);
        formData.append('RealEstateVM[' + i + '].PropertyTypeID', TypeOfProperty[i]);
        formData.append('RealEstateVM[' + i + '].PropertyWorth', PropertyWorth[i]);
        formData.append('RealEstateVM[' + i + '].DebtOnProperty', DebtOnProperty[i]);
        formData.append('RealEstateVM[' + i + '].AcquiredDate', MonthYearAcquired[i]);
        formData.append('RealEstateVM[' + i + '].PercentageOfOwnedProperty', PropertyPercentageOwned[i]);
    }
    for (var i = 0; i < ArrayDeleteRealEstateRow.length; i++) {
        formData.append('DeleteRealEstate[' + i + ']', ArrayDeleteRealEstateRow[i]);
    }
    //Append collateral value
    for (var i = 0; i < collateralValue.length; i++) {
        var collateralizedTruePrFalseValue = IsCollateral[i] == true ? "1" : "0";
        formData.append('LoanViewModel[' + i + '].LoanID', LoanID[i]);
        formData.append('LoanViewModel[' + i + '].DescriptionsNote', NoteDescrptn[i]);
        formData.append('LoanViewModel[' + i + '].IsCollateralized', IsCollateral[i]);
        formData.append('LoanViewModel[' + i + '].CollateralValue', collateralValue[i]);
        formData.append('LoanViewModel[' + i + '].Collateral', collateral[i]);
        formData.append('LoanViewModel[' + i + '].NoteValue', noteValue[i]);
    }
    for (var i = 0; i < ArrayDeleteLoanAndNoteRow.length; i++) {
        formData.append('DeleteLoanAndNote[' + i + ']', ArrayDeleteLoanAndNoteRow[i]);
    }
    //Append Busines Owned section value
    for (var i = 0; i < businessPercent.length; i++) {
        formData.append('BusinessViewModel[' + i + '].BusinessID', businessId[i]);
        formData.append('BusinessViewModel[' + i + '].BusinessType', businessType[i]);
        formData.append('BusinessViewModel[' + i + '].OwnedBusinessPercentage', businessPercent[i]);
        formData.append('BusinessViewModel[' + i + '].BusinessValue', businessValue[i]);
    }
    for (var i = 0; i < ArrayDeleteMeBuisnessOwnedRow.length; i++) {
        formData.append('DeleteBuisnessOwned[' + i + ']', ArrayDeleteMeBuisnessOwnedRow[i]);
    }

    //Append Other Assets Owned value
    for (var i = 0; i < otherAssetDebts.length; i++) {
        formData.append('AssetsViewModel[' + i + '].AssetsID', assetsId[i]);
        formData.append('AssetsViewModel[' + i + '].OtherAssetsWorth', otherTotal[i]);
        formData.append('AssetsViewModel[' + i + '].DebtOnAssetsOwned', otherAssetDebts[i]);
    }
    for (var i = 0; i < ArrayDeleteAssetsRow.length; i++) {
        formData.append('DeleteAssets[' + i + ']', ArrayDeleteAssetsRow[i]);
    }
    for (var i = 0; i < ArrayDeleteBankDocuments.length; i++) {
        formData.append('DeleteBankDocuments[' + i + ']', ArrayDeleteBankDocuments[i]);
    }
    for (var i = 0; i < ArrayDeleteCreditDocuments.length; i++) {
        formData.append('DeleteCreditDocuments[' + i + ']', ArrayDeleteCreditDocuments[i]);
    }
    for (var i = 0; i < ArrayDeletePassportDocuments.length; i++) {
        formData.append('DeletePassportDocuments[' + i + ']', ArrayDeletePassportDocuments[i]);
    }

    //Append Other Debts value
    for (var i = 0; i < debtAmount.length; i++) {
        formData.append('OtherDebtsViewModel[' + i + '].DebtsID', debtsID[i]);
        formData.append('OtherDebtsViewModel[' + i + '].DebtType', debtType[i]);
        formData.append('OtherDebtsViewModel[' + i + '].DebtAmount', debtAmount[i]);
    }
    for (var i = 0; i < ArrayDeleteOtherDebtsRow.length; i++) {
        formData.append('DeleteOtherDebts[' + i + ']', ArrayDeleteOtherDebtsRow[i]);
    }

    var hiddenSectionId2 = $(".step:visible").attr("id");
    formData.append('SectionID', hiddenSectionId2);
    formData.append('UserID', $('#hdnUserId').val());
    formData.append('AddressLine1', $('#txtAddress1').val());
    formData.append('AddressLine2', $('#txtAddress2').val());
    formData.append('City', $('#txtCity').val());
    formData.append('StateId', $('#stateField').val());
    formData.append('ZipCode', $('#txtZipCode').val());
    formData.append('CompanyName', $('#txtCompanyNameFst').val());
    formData.append('Description', $('#txtWorkDesc').val());
    formData.append('DealsDescription', $('#txtDealsDescription').val());
    var CashOnHandValues = $('#txtCashOnHand').val();
    CashOnHandValues = CashOnHandValues.replace('$', '');
    CashOnHandValues = CashOnHandValues.replace(/,/g, '');
    formData.append('Liquidity', CashOnHandValues);
    var isOtherRealEstate = $("#OtherYes").prop('checked');
    formData.append('IsOtherRealEstate', isOtherRealEstate);
    var isDueLoans = $("#LoansYes").prop('checked');
    formData.append('IsDueLoans', isDueLoans);
    formData.append('InsurancePolicyValue', $('#Insurancevalue').val().replace('$', '').replace(/,/g, ''));
    formData.append('StocksAndBondsValue', $('#StocksBonds').val().replace('$', '').replace(/,/g, ''));
    var isBondsownyes = $("#Bondsownyes").prop('checked');
    formData.append('IsStocksOrBonds', isBondsownyes);
    var IsLoansdueyesTrue = $("#Loansdueyes").prop('checked');
    formData.append('IslifeInsurance', IsLoansdueyesTrue);
    formData.append('SSN1', $("#socialsecuritynumberFirst").val());
    formData.append('SSN2', $("#socialsecuritynumberSecond").val());
    formData.append('SSN3', $("#socialsecuritynumberThird").val());
    var SSN1 = $("#socialsecuritynumberFirst").val();
    var SSN2 = $("#socialsecuritynumberSecond").val();
    var SSN3 = $("#socialsecuritynumberThird").val();
    var TotalCardValue = SSN1 + '-' + SSN2 + '-' + SSN3;
    formData.append('SocialSecurityNumber', TotalCardValue);
    formData.append('DateOfBirth', $('#otherDetailsDOB').val());
    formData.append('MaritalStatusValue', $('#maritalStatus').val());
    formData.append('iSfiledtaxreturns', $('#Taxfiled').val());
    formData.append('AcquiringpropertyType', $('#acquiring').val());
    var iscriminalYes = $("#criminalYes").prop('checked');
    formData.append('IsCriminalBackground', iscriminalYes);
    formData.append('OtherDetailsDescription1', $('#detailcriminalYes').val());
    formData.append('OtherDetailsDescription2', $('#othercitizen').val());
    formData.append('CitizenshipStatus', $('#citizenstatus').val());
    var Isanybusinessesyes = $("#businessesyes").prop('checked');
    formData.append('IsOwnedBusiness', Isanybusinessesyes);
    formData.append('OwnedAutomobilesWorth', $('#Automobiles').val().replace('$', '').replace(/,/g, ''));
    formData.append('DebtAutosOwned', $('#DebtOnautos').val().replace('$', '').replace(/,/g, ''));
    var IsAnyOtherDebts = $("#OtherDebtsYes").prop('checked');
    formData.append('IsOtherDebts', IsAnyOtherDebts);
    // Handle multiple Imagefile uploads
    var filesInput = document.getElementById('upload-img');
    for (var i = 0; i < filesInput.files.length; i++) {
        var file = filesInput.files[i];
        if (/\.(gif|jpe?g|tiff?|png|jfif|webp|bmp|heic|pdf|avif|heif)$/i.test(file.name)) {
            formData.append('UploadBankDocumnet', file);
        } else {
            $('#bindBankStatementDocument').html('All File should be in image or pdf format');
            filesInput.value = '';// Clear the file input to remove the invalid file
            return; // Exit the loop if an invalid file is found
        }
    }
    // Handle multiple Surveyfile uploads
    var filesInput = document.getElementById('fileForm2');
    for (var i = 0; i < filesInput.files.length; i++) {
        formData.append('UploadCreditReport', filesInput.files[i]);
    }
    var filesInput = document.getElementById('fileForm3');
    for (var i = 0; i < filesInput.files.length; i++) {
        formData.append('UploadIdsAndPassport', filesInput.files[i]);
    }
    $.ajax({
        url: '/Buyer/BuyerRegistration',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            console.log(response);
            location.href = '/Home/Index';
        },
        error: function (error) {
            // Handle error
            console.error(error);
        }
    });
    //document.getElementById("divLoader").style.visibility = "hidden";
}

/****************************************************************************
    Function: InsertDatainWorkExperienceArray()
    Purpose:  to insert WorkExperience in array
    Developer: Wasim Raja
****************************************************************************/
function InsertDatainWorkExperienceArray() {
    companyName = [];
    fromDate = [];
    toDate = [];
    description = [];
    WorkExperienceID = [];
    $(".clsWorkExperienceId").each(function () {
        WorkExperienceID.push($(this).val());
    });
    $(".clsWorkExpFromDate").each(function () {
        fromDate.push($(this).val());
    });
    $(".clsWorkExpCompanyName").each(function () {
        companyName.push($(this).val());
    });
    $(".clsWorkExpToDate").each(function () {
        toDate.push($(this).val());
    });
    $(".clsWorkExpDescription").each(function () {
        description.push($(this).val());
    });
}

/****************************************************************************
    Function: InsertDatainRealEstateArray()
    Purpose:  to insert RealEstate in array
    Developer: Wasim Raja
****************************************************************************/
function InsertDatainRealEstateArray() {
    Addressline1 = [];
    Addressline2 = [];
    City = [];
    State = [];
    ZipCode = [];
    TypeOfProperty = [];
    PropertyWorth = [];
    DebtOnProperty = [];
    MonthYearAcquired = [];
    MonthYearAcquired = [];
    PropertyPercentageOwned = [];
    arrayRealEstateID = [];

    $(".clsEstateAddress1").each(function () {
        Addressline1.push($(this).val());
    });
    $(".clsEstateAddress2").each(function () {
        Addressline2.push($(this).val());
    });
    $(".clsRealEstateCity").each(function () {
        City.push($(this).val());
    });
    $(".ddlStateDropDown").each(function () {
        State.push($(this).val());
    });
    $(".clsEstateZipCode").each(function () {
        ZipCode.push($(this).val());
    });
    $(".ddlPropTypeDropDown").each(function () {
        TypeOfProperty.push($(this).val());
    });
    $(".clsRealEstatePropertyWorth").each(function () {
        PropertyWorth.push($(this).val().replace('$', '').replace(/,/g, ''));
    });
    $(".clsRealEstatePropertyDebt").each(function () {
        DebtOnProperty.push($(this).val().replace('$', '').replace(/,/g, ''));
    });
    $(".clsRealEstateAcquiredDate").each(function () {
        MonthYearAcquired.push($(this).val());
    });
    $(".addPresentage").each(function () {
        PropertyPercentageOwned.push($(this).val().replace('%', ''));
    });
    $(".clsRealEstateId").each(function () {
        arrayRealEstateID.push($(this).val().replace('%', ''));
    });
}


/****************************************************************************
    Function: InsertDatainLoanAndNoteArray()
    Purpose:  to insert LoanAndNote in array
    Developer: Wasim Raja
****************************************************************************/
function InsertDatainLoanAndNoteArray() {
    LoanID = [];
    NoteDescrptn = [];
    IsCollateral = [];
    collateral = [];
    noteValue = [];
    collateralValue = [];
    $(".clsLoanId").each(function () {
        LoanID.push($(this).val());
    });
    $(".clsLoanNoteDescription").each(function () {
        NoteDescrptn.push($(this).val());
    });
    $(".clsLNCollateralizedYes").each(function () {
        IsCollateral.push($(this).prop('checked'));
    });
    $(".clsCollateral").each(function () {
        collateral.push($(this).val());
    });
    $(".clsCollateralNote").each(function () {
        noteValue.push($(this).val().replace('$', '').replace(/,/g, ''));
    });
    $(".clsCollateralValue").each(function () {
        collateralValue.push($(this).val().replace('$', '').replace(/,/g, ''));
    });
}

/****************************************************************************
    Function: InsertDatainLoanAndNoteArray()
    Purpose:  to insert buisnessOwned in array
    Developer: Wasim Raja
****************************************************************************/
function InsertbuisnessOwnedDataArray() {
    businessId = [];
    businessType = [];
    businessPercent = [];
    businessValue = [];

    $(".clsBuisnessId").each(function () {
        businessId.push($(this).val());
    });
    $(".clsBuisnessType").each(function () {
        businessType.push($(this).val());
    });
    $(".clsBuisnessOwnPercentage").each(function () {
        businessPercent.push($(this).val().replace('%', ''));
    });
    $(".clsBuisnessvalue").each(function () {
        businessValue.push($(this).val().replace('$', '').replace(/,/g, ''));
    });

}

/****************************************************************************
    Function: InsertAssetsDataArray()
    Purpose:  to insert Assets in array
    Developer: Wasim Raja
****************************************************************************/
function InsertAssetsDataArray() {
    assetsId = [];
    otherTotal = [];
    otherAssetDebts = [];

    $(".clsAssetsId").each(function () {
        assetsId.push($(this).val());
    });
    $(".clsOtherTotal").each(function () {
        otherTotal.push($(this).val().replace('$', '').replace(/,/g, ''));
    });
    $(".clsOtherAssetsDebts").each(function () {
        otherAssetDebts.push($(this).val().replace('$', '').replace(/,/g, ''));
    });

}


/****************************************************************************
    Function: InsertOtherDebtsDataArray()
    Purpose:  to insert OtherDebts in array
    Developer: Wasim Raja
****************************************************************************/
function InsertOtherDebtsDataArray() {
    debtsID = [];
    debtType = [];
    debtAmount = [];

    $(".clsOtherDebtsId").each(function () {
        debtsID.push($(this).val());
    });
    $(".clsDebtType").each(function () {
        debtType.push($(this).val());
    });
    $(".clsDebtAmount").each(function () {
        debtAmount.push($(this).val().replace('$', '').replace(/,/g, ''));
    });

}
/****************************************************************************
    Function: GetPropertyStateList()
    Purpose:  Get All State List from table and bind it in state DropDown
    Developer: Wasim Raja
****************************************************************************/
function GetPropertyStateList() {
    var value = $("#ValueStateName").val();
    $.ajax({
        url: "/Property/GetPropertyStateList",
        success: function (response) {
            var data = '<option value="0">Select State</option>';
            response.forEach(function (item) {
                if (item.stateId == value) {
                    data += '<option selected value= ' + item.stateId + '>' + item.longName + '</option>'
                } else {
                    data += '<option value= ' + item.stateId + '>' + item.longName + '</option>'
                }

            });
            $('#stateField').html(data);

        }
    });
}

/****************************************************************************
    Function: GetStateforRealEstateSection()
    Purpose:  Get All State List from table and bind it in state DropDown
    Developer: Wasim Raja
****************************************************************************/
function GetStateforRealEstateSection(index) {
    var value = $("#ValueRealEstateState_" + index).val();
    $.ajax({
        url: "/Buyer/GetPropertyStateList",
        success: function (response) {
            console.log(response);
            var data = '<option value="0">Select State</option>';
            response.forEach(function (item) {

                if (item.stateId == value) {
                    data += '<option selected value= ' + item.stateId + '>' + item.longName + '</option>'
                } else {
                    data += '<option value= ' + item.stateId + '>' + item.longName + '</option>'
                }
            });
            $('#estatestateField_' + index).html(data);

        }
    });
}


/****************************************************************************
    Function: OnClick function
    Purpose:  Show Hide Real Estate Owned div using Yes or No radio button 
    Developer: Wasim Raja
****************************************************************************/
$("#OtherYes, #OtherNo").click(function () {
    var ownRealEstateYes = $("#OtherYes").prop('checked');
    if (ownRealEstateYes == true) {
        $(".realEstateShowHidiDiv").show();
        $("#btnAddMore").show();
    }
    else {
        $(".realEstateShowHidiDiv").hide();
        $("#btnAddMore").hide();
    }
})


/****************************************************************************
   Function: OnClick function
   Purpose:  Show Hide Loans And Notes div using Yes or No radio button 
   Developer: Wasim Raja
****************************************************************************/
$("#LoansYes, #LoansNo").click(function () {
    var IsLoansYes = $("#LoansYes").prop('checked');
    if (IsLoansYes == true) {
        $("#Descnote").show();
    }
    else {
        $("#Descnote").hide();
    }
})

/****************************************************************************
   Function: OnClick function
   Purpose:  Show Buisness Owned div using Yes or No radio button 
   Developer: Wasim Raja
****************************************************************************/
$("#businessesyes, #businessesno").click(function () {
    var Isbusinessesyes = $("#businessesyes").prop('checked');
    if (Isbusinessesyes == true) {
        $(".buisnessOwnedShowHide").show();
    }
    else {
        $(".buisnessOwnedShowHide").hide();
    }
})

/****************************************************************************
   Function: OnClick function
   Purpose:  Show Hide Life Insurance div using Yes or No radio button 
   Developer: Wasim Raja
****************************************************************************/
$("#Loansdueyes, #Loansdueno").click(function () {
    var IsLoansdueyes = $("#Loansdueyes").prop('checked');
    if (IsLoansdueyes == true) {
        $("#InsurPolicy").show();
    }
    else {
        $("#InsurPolicy").hide();
    }
})

/****************************************************************************
   Function: OnClick function
   Purpose:  Show Hide Stocks and Bonds div using Yes or No radio button 
   Developer: Wasim Raja
****************************************************************************/
$("#Bondsownyes, #Bondsownno").click(function () {
    var IsBondsownyes = $("#Bondsownyes").prop('checked');
    if (IsBondsownyes == true) {
        $("#StocksNBonds").show();
    }
    else {
        $("#StocksNBonds").hide();
    }
})

/****************************************************************************
   Function: OnClick function
   Purpose:  Show Hide Other Debts div using Yes or No radio button 
   Developer: Wasim Raja
****************************************************************************/
$("#OtherDebtsYes, #OtherDebtsNo").click(function () {
    var IsOtherDebtsYes = $("#OtherDebtsYes").prop('checked');
    if (IsOtherDebtsYes == true) {
        $(".classDebtsQues").show();
    }
    else {
        $(".classDebtsQues").hide();
    }
})

/****************************************************************************
   Function: OnClick function
   Purpose:  Show Hide Other Debts div using Yes or No radio button 
   Developer: Wasim Raja
****************************************************************************/
$("#criminalYes, #criminalNo").click(function () {
    var IscriminalYes = $("#criminalYes").prop('checked');
    if (IscriminalYes == true) {
        $("#criminalDetailDiv").show();
    }
    else {
        $("#criminalDetailDiv").hide();
    }
})


/****************************************************************************
   Function: PersonalInformation()
   Purpose:  Show review page before submit F.Track buyer SignUp
   Developer: Wasim Raja
****************************************************************************/
function PersonalInformation() {
    var hiddenSectionNextValue = $(".step:visible").attr("id");
    $('#bindFName').text($("#txtFName").val());
    $('#bindLName').text($("#txtLName").val());
    $('#bindPhoneNumber').text($("#txtMobilePhoneId").val());
    $('#bindAddressLine1').text($("#txtAddress1").val());
    $('#bindAddressLine2').text($("#txtAddress2").val());
    $('#bindCity').text($("#txtCity").val());
    var stateId = $('#stateField option:selected').text();
    $('#bindState').text(stateId);
    $('#bindZipCode').text($("#txtZipCode").val());

    BindWorkExperiencePersonameInformation();
    BindRealEstatePersonameInformation();
    LoanAndNotePersonameInformation();
    BusinessOwnedPersonameInformation();
    AssetsPersonameInformation();
    OtherDebtsPersonameInformation();
    $('#bindDeal').text($("#txtDealsDescription").val());
    $('#bindCashOnHand').text($("#txtCashOnHand").val());

    var loansdueyesOrNo = $("#Loansdueyes").prop('checked');
    var loansdueyesOrNoValue = loansdueyesOrNo == true ? "yes" : "No";
    $('#bindIsAnyLifeInsurance').text(loansdueyesOrNoValue);

    var bondsownyesOrNo = $("#Bondsownyes").prop('checked');
    var bondsownyesOrNoValue = bondsownyesOrNo == true ? "yes" : "No";

    $('#bindInsuranceValue').text($("#Insurancevalue").val());
    $('#bindIsAnyStockOrBond').text(bondsownyesOrNoValue);
    $('#bindStockOrBondsValue').text($("#StocksBonds").val());

    //Other Details section
    var SSN1 = $("#socialsecuritynumberFirst").val();
    var SSN2 = $("#socialsecuritynumberSecond").val();
    var SSN3 = $("#socialsecuritynumberThird").val();
    var TotalCardValue = SSN1 + '-' + SSN2 + '-' + SSN3;
    $('#bindSSNumber').text(TotalCardValue);
    var selectedDate = $('#otherDetailsDOB').val();
    //alert(selectedDate);
    $('#bindDateOfBirth').text(selectedDate);
    $('#bindMaritalStatus').text($('#maritalStatus option:selected').text());
    $('#bindTaxReturnAllPriorYear').text($('#Taxfiled option:selected').text());
    $('#bindAcquiringProperty').text($('#acquiring option:selected').text());
    var IsCriminalbgr = $("#criminalYes").prop('checked');
    var IsCriminalbgryesOrNoValue = IsCriminalbgr == true ? "yes" : "No";
    $('#bindHaveYouCriminalBgr').text(IsCriminalbgryesOrNoValue);
    $('#bindDescription').text($("#detailcriminalYes").val());
    $('#bindCitizenshipStatus').text($('#citizenstatus option:selected').text());
    $('#bindCitizenshipStatusDesc').text($("#othercitizen").val());
}

/****************************************************************************
   Function: BindRealEstatePersonameInformation()
   Purpose:  show RealEstate data on summary page
   Developer: Wasim Raja
****************************************************************************/
function BindRealEstatePersonameInformation() {
    var OtherYesOrNo = $("#OtherYes").prop('checked');
    var OtherYesOrNoValue = OtherYesOrNo == true ? "yes" : "No";
    $('#bindIsAnyRealOtherEstate').text(OtherYesOrNoValue);
    $('#dvPersonalInfoRealEstate').html("");
    if (OtherYesOrNo) {
        let bindRealEstateAddressline1 = []; //thic cide is used for save Fasttrack buyer Real Estate Owned in RealEstate table
        let bindRealEstateAddressline2 = [];
        let bindRealEstateCity = [];
        let bindRealEstateState = [];
        let bindRealEstateZipCode = [];
        let bindRealEstateTypeOfProperty = [];
        let bindRealEstatePropertyWorth = [];
        let bindRealEstateDebtOnProperty = [];
        let bindRealEstateMonthYearAcquired = [];
        let bindRealEstatePropertyPercentageOwned = [];
        let bindRealEstateRealStateArrLength = $("#dvRealEstateShowHide").children().length;
        $(".clsEstateAddress1").each(function () {
            bindRealEstateAddressline1.push($(this).val());
        });
        $(".clsEstateAddress2").each(function () {
            bindRealEstateAddressline2.push($(this).val());
        });
        $(".clsRealEstateCity").each(function () {
            bindRealEstateCity.push($(this).val());
        });
        $(".ddlStateDropDown").each(function () {
            bindRealEstateState.push($(this).find('option:selected').text());
        });
        $(".clsEstateZipCode").each(function () {
            bindRealEstateZipCode.push($(this).val());
        });
        $(".ddlPropTypeDropDown").each(function () {
            bindRealEstateTypeOfProperty.push($(this).find('option:selected').text());
        });
        $(".clsRealEstatePropertyWorth").each(function () {
            bindRealEstatePropertyWorth.push($(this).val());
        });
        $(".clsRealEstatePropertyDebt").each(function () {
            bindRealEstateDebtOnProperty.push($(this).val());
        });
        $(".clsRealEstateAcquiredDate").each(function () {
            bindRealEstateMonthYearAcquired.push($(this).val());
        });
        $(".addPresentage").each(function () {
            bindRealEstatePropertyPercentageOwned.push($(this).val());
        });
        for (var i = 0; i < bindRealEstateRealStateArrLength; i++) {
            let count = i + 1;
            let RealEstatedata = '<div class="row line-bottom-dasshed">';
            RealEstatedata += '<h5 class="mb-2 mt-1">Real Estate Owned ' + count + '</h5>';
            RealEstatedata += '<div class="col-12"><div class="row"><div class="col-xxl-3 col-xl-3 col-md-6"><div>';
            RealEstatedata += '<h6 class="h6 fw-bold mb-0">Address line 1</h6><p>' + bindRealEstateAddressline1[i] + '</p></div></div>';
            RealEstatedata += '<div class="col-xxl-3 col-xl-3 col-md-6"><div><h6 class="h6 fw-bold mb-0">Address line 2</h6><p>' + bindRealEstateAddressline2[i] + '</p></div></div>';
            RealEstatedata += '<div class="col-xxl-2 col-xl-3 col-md-4"><div><h6 class="h6 fw-bold mb-0">City</h6><p>' + bindRealEstateCity[i] + '</p></div></div>';
            RealEstatedata += '<div class="col-xxl-2 col-xl-3 col-md-4"><div><h6 class="h6 fw-bold mb-0">State</h6><p>' + bindRealEstateState[i] + '</p></div></div>';
            RealEstatedata += '<div class="col-xxl-2 col-xl-3 col-md-4"><div><h6 class="h6 fw-bold mb-0">Zip code</h6><p>' + bindRealEstateZipCode[i] + '</p></div></div></div>';
            RealEstatedata += '<div class="row"><div class="col-xxl-3 col-xl-3 col-md-6"><div><h6 class="h6 fw-bold mb-0">Type of property</h6><p>' + bindRealEstateTypeOfProperty[i] + '</p></div></div>';
            RealEstatedata += '<div class="col-xxl-3 col-xl-3 col-md-6"><div><h6 class="h6 fw-bold mb-0">What is the property worth</h6><p>' + bindRealEstatePropertyWorth[i] + '</p></div></div>';
            RealEstatedata += '<div class="col-xxl-2 col-xl-3 col-md-6"><div><h6 class="h6 fw-bold mb-0">How much debt on property?</h6><p>' + bindRealEstateDebtOnProperty[i] + '</p></div></div>';
            RealEstatedata += '<div class="col-xxl-2 col-xl-3 col-md-6"><div><h6 class="h6 fw-bold mb-0">Month/year acquired</h6><p>' + bindRealEstateMonthYearAcquired[i] + '</p></div></div>';
            RealEstatedata += '<div class="col-xxl-2 col-xl-3 col-md-6"><div><h6 class="h6 fw-bold mb-0">Percentage of property owned</h6><p>' + bindRealEstatePropertyPercentageOwned[i] + '</p></div></div></div>';
            RealEstatedata += '</div></div>';
            $('#dvPersonalInfoRealEstate').append(RealEstatedata);
        }

    }
    else {

    }
}

/****************************************************************************
   Function: BindWorkExperiencePersonameInformation()
   Purpose:  show WorkExperience data on summary page
   Developer: Wasim Raja
****************************************************************************/
function BindWorkExperiencePersonameInformation() {
    $('#dvPersonalInfoWorkExperience').html("");
    let bindCompanyName = [];
    let bindfromDate = [];
    let bindtoDate = [];
    let binddescription = [];
    let bindWorkExperienceArrLength = $("#dvWorkExpSection").children().length;

    $(".clsWorkExpCompanyName").each(function () {
        bindCompanyName.push($(this).val());
    });
    $(".clsWorkExpFromDate").each(function () {
        bindfromDate.push($(this).val());
    });
    $(".clsWorkExpToDate").each(function () {
        bindtoDate.push($(this).val());
    });
    $(".clsWorkExpDescription").each(function () {
        binddescription.push($(this).val());
    });

    for (var i = 0; i < bindWorkExperienceArrLength; i++) {
        let count = i + 1;
        let WorkExperiencedata = '<div class="row line-bottom-dasshed">';
        WorkExperiencedata += '<h5 class="mb-2 mt-2">Work Experience ' + count + '</h5>';
        WorkExperiencedata += '<div class="col-xxl-3 col-xl-3 col-md-6"><div class="">';
        WorkExperiencedata += '<h6 class="h6 fw-bold mb-0">Company name</h6><p>' + bindCompanyName[i] + '</p></div></div>';
        WorkExperiencedata += '<div class="col-xxl-3 col-xl-3 col-md-6"><div class=""><h6 class="h6 fw-bold mb-0">Work date</h6><p>' + bindfromDate[i] + ' To ' + bindtoDate[i] + '</p></div></div>';
        WorkExperiencedata += '<div class="col-xxl-6 col-xl-6 col-md-12"><div class=""><h6 class="h6 fw-bold mb-0">Work Description</h6><p>' + binddescription[i] + '</p></div></div>';
        WorkExperiencedata += '</div></div>';
        $('#dvPersonalInfoWorkExperience').append(WorkExperiencedata);
    }

}

/****************************************************************************
   Function: LoanAndNotePersonameInformation()
   Purpose:  show LoanAndNote data on summary page
   Developer: Wasim Raja
****************************************************************************/
function LoanAndNotePersonameInformation() {

    var loanYesOrNo = $("#LoansYes").prop('checked');
    var loanYesOrNoValue = loanYesOrNo == true ? "yes" : "No";
    $('#bindIsAnyLoneDue').text(loanYesOrNoValue);
    $('#dvPersonalInfoLoanAndNote').html("");
    if (loanYesOrNo) {

        let bindLoanAndNoteDescrptn = [];
        let bindLoanAndIsCollateral = [];
        let bindLoanAndcollateral = [];
        let bindLoanAndnoteValue = [];
        let bindLoanAndcollateralValue = [];
        let bindLoanAndNoteArrLength = $("#divLoanAndNotesShowHide").children().length;

        $(".clsLoanNoteDescription").each(function () {
            bindLoanAndNoteDescrptn.push($(this).val());
        });
        $(".clsLNCollateralizedYes").each(function () {
            bindLoanAndIsCollateral.push($(this).prop('checked'));
        });
        $(".clsCollateral").each(function () {
            bindLoanAndcollateral.push($(this).val());
        });
        $(".clsCollateralNote").each(function () {
            bindLoanAndnoteValue.push($(this).val());
        });
        $(".clsCollateralValue").each(function () {
            bindLoanAndcollateralValue.push($(this).val());
        });

        for (var i = 0; i < bindLoanAndNoteArrLength; i++) {
            let count = i + 1;
            let WorkExperiencedata = '<div class="row line-bottom-dasshed">';
            WorkExperiencedata += '<div class="col-12">';
            WorkExperiencedata += '<h5 class="mb-2 mt-2">Loans And Notes Details ' + count + '</h5>';
            WorkExperiencedata += '<div class="row">';
            WorkExperiencedata += '<div class="col-xxl-6 col-xl-6 col-12"><div class="">';
            WorkExperiencedata += '<h6 class="h6 fw-bold mb-0">Description of note</h6><p>' + bindLoanAndNoteDescrptn[i] + '</p></div></div>';
            WorkExperiencedata += '<div class="col-xxl-3 col-xl-3 col-md-4 col-12"><div class="">';
            WorkExperiencedata += '<h6 class="h6 fw-bold mb-0">Collateralized?</h6><p>' + bindLoanAndIsCollateral[i] + '</p></div></div>';
            WorkExperiencedata += '<div class="col-xxl-3 col-xl-3 col-md-4 col-12"><div class=""><h6 class="h6 fw-bold mb-0">What collateral?</h6><p>' + bindLoanAndcollateral[i] + '</p></div></div>';
            WorkExperiencedata += '</div>';
            WorkExperiencedata += '<div class="row">';
            WorkExperiencedata += '<div class="col-xxl-4 col-xl-4 col-md-4 col-12"><div class=""><h6 class="h6 fw-bold mb-0">Note value</h6><p>' + bindLoanAndnoteValue[i] + '</p></div></div>';
            WorkExperiencedata += '<div class="col-xxl-3 col-xl-3 col-md-4 col-6 col-12"><div class=""><h6 class="h6 fw-bold mb-0">Value of collateral</h6><p>' + bindLoanAndcollateralValue[i] + '</p></div></div>';
            WorkExperiencedata += '</div></div></div>';
            $('#dvPersonalInfoLoanAndNote').append(WorkExperiencedata);
        }
        //thic cide is used for save Fasttrack buyer Real Estate Owned in RealEstate tabl

    }
    else {

    }
}

/****************************************************************************
   Function: BusinessOwnedPersonameInformation()
   Purpose:  show BusinessOwned data on summary page
   Developer: Wasim Raja
****************************************************************************/
function BusinessOwnedPersonameInformation() {
    var businessesyesOrNo = $("#businessesyes").prop('checked');
    var businessesyesOrNoValue = businessesyesOrNo == true ? "yes" : "No";
    $('#bindIsAnyOwnBuisness').text(businessesyesOrNoValue);
    $('#BuisnessOwnedDiv').html("");

    if (businessesyesOrNo) {

        let bindBusinessOwnedbusinessType = [];
        let bindBusinessOwnedbusinessPercent = [];
        let bindBusinessOwnedbusinessValue = [];
        let bindBusinessOwnedArrLength = $("#divBuisnessOwnedShowHide").children().length;


        $(".clsBuisnessType").each(function () {
            bindBusinessOwnedbusinessType.push($(this).val());
        });
        $(".clsBuisnessOwnPercentage").each(function () {
            bindBusinessOwnedbusinessPercent.push($(this).val());
        });
        $(".clsBuisnessvalue").each(function () {
            bindBusinessOwnedbusinessValue.push($(this).val());
        });

        for (var i = 0; i < bindBusinessOwnedArrLength; i++) {
            let count = i + 1;
            let BusinessOwnedData = '<div class="row line-bottom-dasshed">';
            BusinessOwnedData += '<h5 class="mb-2 mt-2">Business ' + count + '</h5>';
            BusinessOwnedData += '<div class="col-xxl-3 col-xl-4 col-md-3 col-12"><div class="">';
            BusinessOwnedData += '<h6 class="h6 fw-bold mb-0">Type of business</h6><p>' + bindBusinessOwnedbusinessType[i] + '</p></div></div>';
            BusinessOwnedData += '<div class="col-xxl-3 col-xl-4 col-md-6 col-12"><div class="">';
            BusinessOwnedData += '<h6 class="h6 fw-bold mb-0">Percentage of business owned</h6><p>' + bindBusinessOwnedbusinessPercent[i] + '</p></div></div>';
            BusinessOwnedData += '<div class="col-xxl-3 col-xl-4 col-md-3 col-12"><div class="">';
            BusinessOwnedData += '<h6 class="h6 fw-bold mb-0">Value of business</h6><p>' + bindBusinessOwnedbusinessValue[i] + '</p></div></div>';
            BusinessOwnedData += '</div>';
            $('#BuisnessOwnedDiv').append(BusinessOwnedData);
        }

    }
    else {

    }
}

/****************************************************************************
   Function: AssetsPersonameInformation()
   Purpose:  show AssetsPersoname data on summary page
   Developer: Wasim Raja
****************************************************************************/
var totalAssatsValue = 0;
var totalDebtsValue = 0;
function AssetsPersonameInformation() {

    $('#bindAutomobileTotalWorth').text($("#Automobiles").val());
    $('#bindAutosOwnedDebt').text($("#DebtOnautos").val());
    $('#OtherAssetsOwned').html("");

    let bindAssetOtherTotal = [];
    let bindAssetOtherAssetDebts = [];
    let bindAssetsArrLength = $("#divAssetsShowHide").children().length;

    $(".clsOtherTotal").each(function () {
        bindAssetOtherTotal.push($(this).val());
    });
    $(".clsOtherAssetsDebts").each(function () {
        bindAssetOtherAssetDebts.push($(this).val());
    });

    for (var i = 0; i < bindAssetsArrLength; i++) {
        var AssatsValue = bindAssetOtherTotal[i].replace('$', '').replace(/,/g, '')
        totalAssatsValue += parseInt(AssatsValue || 0);
        let count = i + 1;
        let AssetsOwnedData = '<div class="row line-bottom-dasshed">';
        AssetsOwnedData += '<h5 class="mb-2 mt-2">Other assets details ' + count + '</h5>';
        AssetsOwnedData += '<div class="col-xxl-4 col-xl-6 col-12"><div class="">';
        AssetsOwnedData += '<h6 class="h6 fw-bold mb-0">Other assets total worth(Jewelry,Furniture, Art and others)</h6><p>' + bindAssetOtherTotal[i] + '</p></div></div>';
        AssetsOwnedData += '<div class="col-xxl-4 col-xl-6 col-12"><div class="">';
        AssetsOwnedData += '<h6 class="h6 fw-bold mb-0">Debt on assets owned(Jewelry,Furniture, Art and others)</h6><p>' + bindAssetOtherAssetDebts[i] + '</p></div></div>';
        AssetsOwnedData += '</div>';
        $('#OtherAssetsOwned').append(AssetsOwnedData);
    }
    $('#bindAssets').text('$' + '' + totalAssatsValue);

}

/****************************************************************************
   Function: OtherDebtsPersonameInformation()
   Purpose:  show OtherDebts data on summary page
   Developer: Wasim Raja
****************************************************************************/
function OtherDebtsPersonameInformation() {

    $('#OtherDebtsDiv').html("");
    let bindOtherDebtsDebtType = [];
    let bindOtherDebtsDebtAmount = [];
    let bindOtherDebtsArrLength = $("#divOtherDebtsShowHide").children().length;


    $(".clsDebtType").each(function () {
        bindOtherDebtsDebtType.push($(this).find('option:selected').text());
    });
    $(".clsDebtAmount").each(function () {
        bindOtherDebtsDebtAmount.push($(this).val());
    });
    for (var i = 0; i < bindOtherDebtsArrLength; i++) {
        var DebtsValue = bindOtherDebtsDebtAmount[i].replace('$', '').replace(/,/g, '');
        totalDebtsValue += parseInt(DebtsValue);
        let count = i + 1;
        let OtherdebtsData = '<div class="row line-bottom-dasshed">';
        OtherdebtsData += '<h5 class="mb-2 mt-2">Other debts details ' + count + '</h5>';
        OtherdebtsData += '<div class="col-xxl-4 col-xl-6 col-md-4 col-12"><div class="">';
        OtherdebtsData += '<h6 class="h6 fw-bold mb-0">Type of Debt</h6><p>' + bindOtherDebtsDebtType[i] + '</p></div></div>';
        OtherdebtsData += '<div class="col-xxl-4 col-xl-6 col-md-3 col-12"><div class="">';
        OtherdebtsData += '<h6 class="h6 fw-bold mb-0">Debt amount</h6><p>' + bindOtherDebtsDebtAmount[i] + '</p></div></div>';
        OtherdebtsData += '</div>';
        $('#OtherDebtsDiv').append(OtherdebtsData);
    }
    $('#bindLiquidity').text('$' + '' + parseInt(totalDebtsValue));
    var netWorth = totalAssatsValue - totalDebtsValue;
    $('#bindNetWorth').text('$' + '' + netWorth);

}

/****************************************************************************
   Function: OnClick function
   Purpose:  Remove '+' on click '+' in Collateral Field
   Developer: Wasim Raja
****************************************************************************/
$('#divCollateralMain').on('click', function () {
    $(this).closest('#divCollateralMain').css("visibility", "hidden");
});
$("#deleteMeCopy").on('click', function () {
    $("#deleteMeCopy").hide();
});


/****************************************************************************
   Function: BuyDefoultSelectedButton()
   Purpose:  Clear FastTrackBuyer Registration Form
   Developer: Wasim Raja
****************************************************************************/
function BuyDefoultSelectedButton() {
    $('#LoansYes').prop('checked', true);
    $('#OtherYes').prop('checked', true);
    $('#OtherDebtsYes').prop('checked', true);
    $('#businessesyes').prop('checked', true);
    $('#Bondsownyes').prop('checked', true);
    $('#Loansdueyes').prop('checked', true);
    $('#IsCollateralizedYes').prop('checked', true);
    $('#criminalYes').prop('checked', true);
}

/****************************************************************************
   Function: ClearFastTrackBuyerForm()
   Purpose:  Clear FastTrackBuyer Registration Form
   Developer: Wasim Raja
****************************************************************************/
function ClearFastTrackBuyerForm() {

}

/****************************************************************************
   Function: MakeNewRow() 
   Purpose:  Method for Add new row after Clicking + button for Work Experience section
   Developer: Wasim Raja
****************************************************************************/
function MakeNewRow(index) {
    let previousIndex = index;
    if ($('#getAllHtml').children().length < 20) {
        index++;
        var htmlContent = '<div class="row" id="getAllHtml">';
        htmlContent += '<div class="row p-0 m-0 custom-row">';
        htmlContent += '<div class="row p-0 m-0 custom-row" id="mainDiv2">';
        htmlContent += '<div class="col-xl-3 col-md-6 mb-3" id="formGroupCompanyNameFst">';
        htmlContent += '<label for="CompanyNameFst" class="form-label text-start">Company name<span class="red-txt">*</span></label>';
        htmlContent += '<input type="hidden" class="input-field clsWorkExperienceId" id="txtWorkExperienceID_' + index + '">';
        htmlContent += '<input type="text" class="input-field clsWorkExpCompanyName" id="txtCompanyNameFst_' + index + '" onkeyup="SectionSecondCompanyName()" placeholder="Company name">';
        htmlContent += '<span class="text-danger" id="errCompanyName_' + index + '"></span></div>';
        htmlContent += '<div class="col-xl-4 col-md-6 mb-2">';
        htmlContent += '<div class="mb-3">';
        htmlContent += '<label class="form-label">Work Date<span class="red-txt">*</span></label>';
        htmlContent += '<div class="d-flex align-items-center">';
        htmlContent += '<input type="date" class="input-field clsWorkExpFromDate" id="txtFromDate_' + index + '" onchange="SectionSecondFromDate()">';
        htmlContent += '<span class="mx-2">to</span>';
        htmlContent += '<input type="date" class="input-field clsWorkExpToDate" id="txtToDate_' + index + '" onchange="SectionSecondToDate()">';
        htmlContent += '</div>';
        htmlContent += '<span class="text-danger" id="errFromDate_' + index + '"></span>';
        htmlContent += '<span class="text-danger" id="errToDate_' + index + '"></span>';
        htmlContent += '<span class="text-danger" id="errWorkDate_' + index + '"></span>';
        htmlContent += '</div>';
        htmlContent += '</div>';
        htmlContent += '<div class="col-xl-4 col-md-6 mb-3">';
        htmlContent += '<label for="WorkDesc" class="form-label text-start">Description<span class="red-txt">*</span></label>';
        htmlContent += '<input type="text" class="input-field clsWorkExpDescription" id="txtWorkDesc_' + index + '" placeholder="Description" onkeyup="SectionSecondDescription()">';
        htmlContent += '<span class="text-danger" id="errWorkDesc_' + index + '"></span>';
        htmlContent += '</div>';
        htmlContent += '<div class="col-xl-1 col-md-1 mt-6 sm-mt-0"><span class="ms-3"><svg class="deleteMeWorkExp" onclick="DeleteMeWorkExp(this,0)" xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">';
        htmlContent += '<path d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z" fill="#DC3545" />';
        htmlContent += '</svg></span>';
        htmlContent += '<span class="ms-2" id="addmore">';
        htmlContent += '<svg onclick="MakeNewRow(' + index + ')" xmlns="http://www.w3.org/2000/svg" width="20" class="idAddWorkExp" id="btnAddWorkExp_' + index + '" height="20" viewBox="0 0 20 20" fill="none">';
        htmlContent += '<path d="M10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0ZM15 11H11V15H9V11H5V9H9V5H11V9H15V11Z" fill="#002A7B" /></svg></span>';
        htmlContent += '</div>';
        htmlContent += '</div>';
        htmlContent += '</div>';
        htmlContent += '</div>';
        $("#btnAddWorkExp_" + previousIndex).hide();
        $('#dvWorkExpSection').append(htmlContent);
    }
    ShowHideDeleteButton("dvWorkExpSection", "deleteMeWorkExp");
}

/****************************************************************************
   Function: DeleteMeWorkExp function
   Purpose:  Delete function for Work Experience
   Developer: Wasim Raja
****************************************************************************/
function DeleteMeWorkExp(event, WorkExperienceId) {
    if ($(event).closest('div#getAllHtml').next().find('.idAddWorkExp').length == 0 && $(event).closest('div#getAllHtml').prev().find('.idAddWorkExp').length != 0) {
        $(event).closest('div#getAllHtml').prev().find('.idAddWorkExp').removeAttr("style");
        $(event).closest('div#getAllHtml').remove();
        ArrayDeleteWorkExperienceRow.push(WorkExperienceId);
    }
    else if ($(event).closest('div#getAllHtml').next().find('.idAddWorkExp').length == 0 && $(event).closest('div#getAllHtml').prev().find('.idAddWorkExp').length == 0) {
    }
    else if ($(event).closest('div#getAllHtml').next().find('.idAddWorkExp').length == 1) {
        $(event).closest('div#getAllHtml').remove();
        ArrayDeleteWorkExperienceRow.push(WorkExperienceId);
    }
    ShowHideDeleteButton("dvWorkExpSection", "deleteMeWorkExp");

}

/****************************************************************************
   Function: DeleteMeRealEstate function
   Purpose:  Delete function for Real Estate
   Developer: Wasim Raja
****************************************************************************/
function DeleteMeRealEstate(event, RealEstateId) {
    if ($(event).closest('div#getRealEstate').next().find('.idAddRealEstateDiv').length == 0 && $(event).closest('div#getRealEstate').prev().find('.idAddRealEstateDiv').length != 0) {
        $(event).closest('div#getRealEstate').prev().find('.idAddRealEstateDiv').removeAttr("style");
        $(event).closest('div#getRealEstate').remove();
        ArrayDeleteRealEstateRow.push(RealEstateId);
    }
    else if ($(event).closest('div#getRealEstate').next().find('.idAddRealEstateDiv').length == 0 && $(event).closest('div#getRealEstate').prev().find('.idAddRealEstateDiv').length == 0) {
    }
    else if ($(event).closest('div#getRealEstate').next().find('.idAddRealEstateDiv').length == 1) {
        $(event).closest('div#getRealEstate').remove();
        ArrayDeleteRealEstateRow.push(RealEstateId);
    }
    ShowHideDeleteButton("dvRealEstateShowHide", "deleteMeRealEstateDiv");
}


/****************************************************************************
   Function: OnClick function
   Purpose:  Delete Div to Other Assets Owned Field
   Developer: Wasim Raja
****************************************************************************/
$("#getAssetsOwned").on('click', '.deleteMeAssetsOwned', function () {
    if ($('#getAssetsOwned').children().length != 1) {
        $(this).closest('div#AssetsOwnedMainDiv').remove();
    }

});

/****************************************************************************
   Function: AddMoreRealEstateNewRow()
   Purpose:  Delete Div to Personal Financial Statement Section
   Developer: Wasim Raja
****************************************************************************/
function AddMoreRealEstateNewRow(index) {
    let previousIndex = index;
    index++
    var htmlContent = '<div class="col-12" id="getRealEstate">';
    htmlContent += '<div><div class="row mb-2" id="RealEstateDiv2"><div class="col-xl-6">';
    htmlContent += '<div class="row"><div class="col-xl-6 col-md-6 mb-2"><label for="estateaddress1" class="form-label">Address line 1<span class="red-txt">*</span></label>';
    htmlContent += '<input type="hidden" class="input-field" id="hdnRealEstateID_' + index + '">';
    htmlContent += '<input type="text" class="input-field clsEstateAddress1" id="estateaddress1_' + index + '" onkeyup="SectionFourthAddress1()" placeholder="Address l">';
    htmlContent += '<span id="errestateaddress1_' + index + '" class="text-danger"></span><input type="hidden" class="input-field" id="hdnUserId1_' + index + '" placeholder="First Name" disabled>';
    htmlContent += '</div>';
    htmlContent += '<div class="col-xl-6 col-md-6 mb-2"><label for="estateaddress2" class="form-label">Address line 2</label><input type="text" class="input-field clsEstateAddress2" id="estateaddress2_' + index + '" placeholder="Address 2" ></div>';
    htmlContent += '</div>';
    htmlContent += '</div>';
    htmlContent += '<div class="col-xl-6 ps-xl-0"><div class="row"><div class="col-xl-4 col-md-6 mb-2">';
    htmlContent += '<label for="estateCityField" class="form-label">City<span class="red-txt">*</span></label>';
    htmlContent += '<input type="text" class="input-field clsRealEstateCity" id="estateCityField_' + index + '" placeholder="City" onkeyup="SectionFourthCity()"><span id="errestateCityField_' + index + '" class="text-danger"></span></div>';
    htmlContent += '<div class="col-xl-4 col-md-6 mb-2"><label for="stateField" class="form-label">State <span class="red-txt">*</span></label>';
    htmlContent += '<input type="hidden" class="clsValueRealEstateState" id="ValueRealEstateState_' + index + '" />';
    htmlContent += '<select class="form-select ddlStateDropDown" aria-label="Default select example" id="estatestateField_' + index + '" placeholder="SelectState" onchange="SectionFourthState()"></select><span id="errEstatestateField_' + index + '" class="text-danger"></span></div>';
    htmlContent += '<div class="col-xl-4 col-md-6 mb-2"><label for="estatezipCode" class="form-label">Zip Code<span class="red-txt">*</span></label>';
    htmlContent += '<input type="text" class="input-field clsEstateZipCode" id="txtestatezipCode_' + index + '" onkeypress="if(this.value.length==5) return false;" placeholder="Zip code" onkeyup="SectionFourthZipCode()">';
    htmlContent += '<span id="errestatezipCode_' + index + '" class="text-danger"></span>';
    htmlContent += '</div>';
    htmlContent += '</div>';
    htmlContent += '</div>';
    htmlContent += '<div class="row Descnote" id="ownState"><div class="col-xxl-3 col-xl-3 col-md-6 mb-2">';
    htmlContent += '<label for="fixAdjustRate" class="form-label">Type of Property<span class="red-txt">*</span></label>';
    htmlContent += '<input type="hidden" class="clsValueRealEstatePropTypeId" id="ValueRealEstatePropTypeId_' + index + '" />';
    htmlContent += '<select class="form-select ddlPropTypeDropDown" aria-label="Default select example" id="assetTypeId_' + index + '" onchange="SectionFourthPropertyType()"></select>';
    htmlContent += '<span id="errassetTypeId_' + index + '" class="text-danger"></span></div>';
    htmlContent += '<div class="col-xxl-3 col-xl-3 col-md-6 mb-2">';
    htmlContent += '<label for="PropertyWorth" class="form-label">What is the property worth?<span class="red-txt">*</span></label>';
    htmlContent += '<input type="text" class="input-field commaandDollaer1 clsRealEstatePropertyWorth" data-type="currency" onkeyup="commaAndDollarPropertyWorth(this)" onblur="formatCurrency(this,' + "'blur'" + ');" id="PropertyWorth_' + index + '" placeholder="Property worth">';
    htmlContent += '<span id="errPropertyWorth_' + index + '" class="text-danger"></span></div><div class="col-xxl-3 col-xl-3 col-md-6 mb-2">';
    htmlContent += '<label for="PropertyDebt" class="form-label">How much debt on property?<span class="red-txt">*</span></label>';
    htmlContent += '<input type="tel" class="input-field clsRealEstatePropertyDebt" data-type="currency" id="PropertyDebt_' + index + '" placeholder="Debt on property" onkeyup="commaAndDollarPropertyDebt(this)" onblur="formatCurrency(this,' + "'blur'" + ');">';
    htmlContent += '<span id="errPropertyDebt_' + index + '" class="text-danger"></span>';
    htmlContent += '</div>';
    htmlContent += '<div class="col-xxl-2 col-xl-3 col-md-6 mb-2"><label for="acquiredtime" class="form-label">Month/year acquired<span class="red-txt">*</span></label>';
    htmlContent += '<input type="date" class="input-field clsRealEstateAcquiredDate" onchange="SectionFourthMonthYearRequared()" id="acquiredtime_' + index + '"><span id="erracquiredtime_' + index + '" class="text-danger"></span></div>';
    htmlContent += '<div class="col-xxl-3 col-xl-3 col-md-6 mb-2"><label for="percentowned" class="form-label">Percentage of property owned<span class="red-txt">*</span></label>';
    htmlContent += '<input type="text" class="input-field addPresentage" data-type="percentage" onblur="formatPercentage(this,' + "'blur'" + ');" id="percentowned_' + index + '" placeholder="% Percentage owned" ><span id="errapercentowned_' + index + '" class="text-danger"></span></div>';
    htmlContent += '<div class="col-xxl-2 col-xl-3 col-md-4 d-flex align-items-center pt-3"><span class="ms-3"><svg class="deleteMeRealEstateDiv" onclick="DeleteMeRealEstate(this,0)" xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">';
    htmlContent += '<path d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z" fill="#DC3545" /></svg></span>';
    htmlContent += '<span class="ms-2" id="addRealEstate"><svg onclick="AddMoreRealEstateNewRow(' + index + ')" xmlns="http://www.w3.org/2000/svg" width="20" class="idAddRealEstateDiv" id="divRealEstateMainIcon_' + index + '" height="20" viewBox="0 0 20 20" fill="none">';
    htmlContent += '<path d="M10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0ZM15 11H11V15H9V11H5V9H9V5H11V9H15V11Z" fill="#002A7B" /></svg></span>';
    htmlContent += '</div>';
    htmlContent += '</div>';
    htmlContent += '</div>';
    htmlContent += '</div>';
    htmlContent += '</div>';
    $('#dvRealEstateShowHide').append(htmlContent);
    GetStateforRealEstateSection(index);
    GetPropertyTypeList(index);
    ShowHideDeleteButton("dvRealEstateShowHide", "deleteMeRealEstateDiv");
    $("#divRealEstateMainIcon_" + previousIndex).hide();
}


/****************************************************************************
   Function: MakeNewCollateralRow() 
   Purpose:  Method for Add new row after Clicking + button for Loan And Note section
   Developer: Wasim Raja
****************************************************************************/
function MakeNewCollateralRow(index) {
    let previousIndex = index;
    //if ($('#divLoanAndNotesShowHide').children().length < 5) {

    index++;
    var htmlContent = '<div class="row" id="getAllHtmlForCollateral">';
    htmlContent += '<div class="d-flex" id="mainDiv">';
    htmlContent += '<div class="col-xl-6 col-md-6 mb-2">';
    htmlContent += '<label for="NoteDescrptn" class="form-label">Description of note<span class="red-txt">*</span></label>';
    htmlContent += '<input type="hidden" class="input-field clsLoanId" id="hdnLoan_' + index + '">';
    htmlContent += '<input type="text" class="input-field clsLoanNoteDescription" id="txtNoteDescrptn_' + index + '" onkeyup="SectionFifthDescription()" placeholder="Note description">';
    htmlContent += '<span id="errNoteDescrptn_' + index + '" class="text-danger"></span></div>';
    htmlContent += '<div class="col-xl-4 col-md-6 mb-3 px-3 colateraliz_radio">';
    htmlContent += '<label class="form-label">Collateralized?<span class="red-txt">*</span></label>';
    htmlContent += '<div class="mt-2 mb-3">';
    htmlContent += '<div class="form-check form-check-inline">';
    htmlContent += '<input class="form-check-input clsLNCollateralizedYes" onclick="CheckCollaterizedRadio(this)" type="radio"name="Collateralized_' + index + '" id="IsCollateralizedYes_' + index + '" checked>';
    htmlContent += '<label class="form-check-label"for="collateralizedYes">Yes</label>';
    htmlContent += '</div>';
    htmlContent += '<div class="form-check form-check-inline">';
    htmlContent += '<input class="form-check-input clsLNCollateralizedNo" onclick="CheckCollaterizedRadio(this)" type="radio"name="Collateralized_' + index + '" id="collateralizedYNo_' + index + '">';
    htmlContent += '<label class="form-check-label"for="collateralizedYNo">No</label>';
    htmlContent += '</div>';
    htmlContent += '</div>';
    htmlContent += '<span id="errcollateralizedYesOrNo_' + index + '" class="text-danger"></span>';
    htmlContent += '</div>';
    htmlContent += '<div class="col-xxl-3 col-xl-3 col-md-6 mb-2 me-2 collateralDiv" id="dvFirstCollateralDiv_' + index + '">';
    htmlContent += '<label for="collateral" class="form-label">What collateral?<span class="red-txt">*</span></label>';
    htmlContent += '<input type="text" class="input-field clsCollateral" id="txtcollateral_' + index + '" onkeyup="SectionFifthCollateral(this)" placeholder="Collateral">';
    htmlContent += '<span id="errcollateral_' + index + '" class="text-danger"></span>';
    htmlContent += '</div>';
    htmlContent += '<div class="col-xxl-3 col-xl-3 col-md-6 mb-2 me-2 collateralDiv" id="dvSecondCollateralDiv_' + index + '">';
    htmlContent += '<label for="Notevalue" class="form-label">Note value<span class="red-txt">*</span></label>';
    htmlContent += '<input type="tel" class="input-field clsCollateralNote" data-type="currency" id="txtNotevalue_' + index + '" onkeyup="commaAndDollarNoteValue(this)" onblur="formatCurrency(this,' + "'blur'" + ');" placeholder="Note value">';
    htmlContent += '<span id="errNotevalue_' + index + '" class="text-danger"></span>';
    htmlContent += '</div>';
    htmlContent += '<div class="col-xxl-3 col-xl-3 col-md-6 me-2 mb-2 collateralDiv" id="dvthirdCollateralDiv_' + index + '">';
    htmlContent += '<label for="collateralvalue" class="form-label">Value of collateral<span class="red-txt">*</span></label>';
    htmlContent += '<input type="text" class="input-field clsCollateralValue" data-type="currency" id="Collateralform_' + index + '" onkeyup="commaAndDollarCollateralValue(this)" onblur="formatCurrency(this,' + "'blur'" + ');" placeholder="Collateral value">';
    htmlContent += '<span id="errCollateralform_' + index + '" class="text-danger"></span>';
    htmlContent += '</div>';
    htmlContent += '<div class="col-xl-2 col-md-1 mt-6 collateralDiv"><span class="ms-3"><svg class="deleteMe1" onclick="DeleteMeLoanAndNote(this,0)" xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">';
    htmlContent += '<path d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"fill="#DC3545" />';
    htmlContent += '</svg></span>';
    htmlContent += '<span class="ms-2">';
    htmlContent += '<svg onclick="MakeNewCollateralRow(' + index + ')" xmlns="http://www.w3.org/2000/svg" class="idAddDiv" width="20" height="20" id="divCollateralMain_' + index + '" viewBox="0 0 20 20" fill="none">';
    htmlContent += '<path d="M10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0ZM15 11H11V15H9V11H5V9H9V5H11V9H15V11Z"fill="#002A7B" /></svg></span>';
    htmlContent += '</div>';
    htmlContent += '</div>';
    htmlContent += '</div>';
    htmlContent += '</div>';
    $('#divLoanAndNotesShowHide').append(htmlContent);
    $("#divCollateralMain_" + previousIndex).hide();
    //}
    //else {
    //    toastr.error('You can add only 5 Loan And Notes');
    //}
    ShowHideDeleteButton("divLoanAndNotesShowHide", "deleteMe1");
}

/****************************************************************************
   Function: DeleteMeLoanAndNote() 
   Purpose:  Method for delete row after Clicking + delete for Loan And Note section
   Developer: Wasim Raja
****************************************************************************/
function DeleteMeLoanAndNote(event, LoanId) {
    if ($(event).closest('div#getAllHtmlForCollateral').next().find('.idAddDiv').length == 0 && $(event).closest('div#getAllHtmlForCollateral').prev().find('.idAddDiv').length != 0) {
        $(event).closest('div#getAllHtmlForCollateral').prev().find('.idAddDiv').removeAttr("style");
        $(event).closest('div#getAllHtmlForCollateral').remove();
        ArrayDeleteLoanAndNoteRow.push(LoanId);
    }
    else if ($(event).closest('div#getAllHtmlForCollateral').next().find('.idAddDiv').length == 0 && $(event).closest('div#getAllHtmlForCollateral').prev().find('.idAddDiv').length == 0) {
    }
    else if ($(event).closest('div#getAllHtmlForCollateral').next().find('.idAddDiv').length == 1) {
        $(event).closest('div#getAllHtmlForCollateral').remove();
        ArrayDeleteLoanAndNoteRow.push(LoanId);
    }
    ShowHideDeleteButton("dvWorkExpSection", "deleteMeWorkExp");

}


/****************************************************************************
   Function: AddBuisnessOwnedDiv() 
   Purpose:  Method for Add new row after Clicking + button for Loan And Note section
   Developer: Wasim Raja
****************************************************************************/
function AddBuisnessOwnedDiv(index) {
    let previousIndex = index;
    if ($('#divBuisnessOwnedShowHide').children().length < 5) {
        index++;
        var htmlContent = '<div class="row" id="getAllHidden">';
        htmlContent += '<div class="test1">';
        htmlContent += '<div class="row mt-2 mb-3" id="BuisnessOwnedDiv2">';
        htmlContent += '<div class="col-xxl-3 col-xl-4 col-md-6 mb-2">';
        htmlContent += '<label for="BusinessType" class="form-label">Type of business<span class="red-txt">*</span></label>';
        htmlContent += '<input type="hidden" class="input-field clsBuisnessId" id="hdnBuisnessId_' + index + '">';
        htmlContent += '<input type="text" class="input-field clsBuisnessType" id="txtBusinessType_' + index + '" onkeyup="SectionEighthBuisnessType()"placeholder="Business type">';
        htmlContent += '<span id="errBusinessType_' + index + '" class="text-danger"></span></div>';
        htmlContent += '<div class="col-xxl-3 col-xl-4 col-md-6 mb-2">';
        htmlContent += '<label for="businessPercent" class="form-label">Percentage of business owned<span class="red-txt">*</span></label>';
        htmlContent += '<input type="text" class="input-field clsBuisnessOwnPercentage" data-type="percentage" onblur="formatPercentage(this,' + "'blur'" + ');" id="businessPercent_' + index + '" onkeyup="commaAndDollarBuisnessOwnedValue(this)"placeholder="Percentage of business">';
        htmlContent += '<span id="errbusinessPercent_' + index + '" class="text-danger"></span>';
        htmlContent += '</div>';
        htmlContent += '<div class="col-xxl-3 col-xl-3 col-md-6 mb-2">';
        htmlContent += '<label for="businessValue" class="form-label">Value of business<span class="red-txt">*</span></label>';
        htmlContent += '<input type="tel" data-type="currency" class="input-field clsBuisnessvalue" id="businessValue_' + index + '" onkeyup="commaAndDollarBuisnessValue(this)"placeholder="Business value" onblur="formatCurrency(this,' + "'blur'" + ');">';
        htmlContent += '<span id="errbusinessValue_' + index + '" class="text-danger"></span>';
        htmlContent += ' </div>';

        htmlContent += '<div class="col-xl-1 col-md-1 mt-6"><span class="ms-3"><svg class="deleteMeBuisnessOwnedDiv" onclick="DeleteMeBuisnessOwned(this,0)" xmlns="http://www.w3.org/2000/svg" width="16" height="18"viewBox="0 0 16 18" fill="none">';
        htmlContent += '<path d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"fill="#DC3545" />';
        htmlContent += '</svg></span>';
        htmlContent += '<span class="ms-2" id="addBuisnessOwned">';
        htmlContent += '<svg onclick="AddBuisnessOwnedDiv(' + index + ')" xmlns="http://www.w3.org/2000/svg" width="20" class="idAddBuisnessOwnedDiv" id="divBuisnessOwnedMain_' + index + '" height="20" viewBox="0 0 20 20" fill="none">';
        htmlContent += '<path d="M10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0ZM15 11H11V15H9V11H5V9H9V5H11V9H15V11Z"fill="#002A7B" /></svg></span>';
        htmlContent += '</div>';
        htmlContent += '</div>';
        htmlContent += '</div>';
        htmlContent += '</div>';
        $('#divBuisnessOwnedShowHide').append(htmlContent);
        $("#divBuisnessOwnedMain_" + previousIndex).hide();
    }
    else {
        //toastr.error('You can add only 5 Loan And Notes');
    }
    ShowHideDeleteButton("divBuisnessOwnedShowHide", "deleteMeBuisnessOwnedDiv");
}

/****************************************************************************
   Function: DeleteMeBuisnessOwned function
   Purpose:  Delete function for Buisness Owned section
   Developer: Wasim Raja
****************************************************************************/
function DeleteMeBuisnessOwned(event, RealEstateId) {
    if ($(event).closest('div#getAllHidden').next().find('.idAddBuisnessOwnedDiv').length == 0 && $(event).closest('div#getAllHidden').prev().find('.idAddBuisnessOwnedDiv').length != 0) {
        $(event).closest('div#getAllHidden').prev().find('.idAddBuisnessOwnedDiv').removeAttr("style");
        $(event).closest('div#getAllHidden').remove();
        ArrayDeleteMeBuisnessOwnedRow.push(RealEstateId);
    }
    else if ($(event).closest('div#getAllHidden').next().find('.idAddBuisnessOwnedDiv').length == 0 && $(event).closest('div#getAllHidden').prev().find('.idAddBuisnessOwnedDiv').length == 0) {
    }
    else if ($(event).closest('div#getAllHidden').next().find('.idAddBuisnessOwnedDiv').length == 1) {
        $(event).closest('div#getAllHidden').remove();
        ArrayDeleteMeBuisnessOwnedRow.push(RealEstateId);
    }
    ShowHideDeleteButton("divBuisnessOwnedShowHide", "deleteMeBuisnessOwnedDiv");
}

/****************************************************************************
   Function: AddAssetsDiv() 
   Purpose:  Method for Add new row after Clicking + button for Assets section
   Developer: Wasim Raja
****************************************************************************/
function AddAssetsDiv(index) {
    let previousIndex = index;
    if ($('#divAssetsShowHide').children().length < 20) {
        index++;
        var htmlContent = '<div class="row" id="getAssetsOwned">';
        htmlContent += '<div class="col-12">';
        htmlContent += '<div class="row custom-row" id="AssetsOwnedMainDiv">';
        htmlContent += '<div class="col-xxl-3 col-xl-4 col-md-6 mb-2">';
        htmlContent += '<label for="OtherTotal" class="form-label">Other assets total worth<span class="red-txt">*</span></label>';
        htmlContent += '<input type="hidden" class="input-field clsAssetsId" id="hdnAssetsId_' + index + '">';
        htmlContent += '<input type="tel" class="input-field clsOtherTotal" id="OtherTotal_' + index + '" onkeyup="commaAndDollarOtherAssetSTotalWorth(this)"placeholder="Jewelry, Furniture, Art and others">';
        htmlContent += '<span id="errOtherTotal_' + index + '" class="text-danger"></span>';
        htmlContent += '</div>';
        htmlContent += '<div class="col-xxl-3 col-xl-4 col-md-5 mb-2">';
        htmlContent += '<label for="otherAssetDebts" class="form-label">Debt on assets owned<span class="red-txt">*</span></label>';
        htmlContent += '<input type="tel" class="input-field clsOtherAssetsDebts" id="otherAssetDebts_' + index + '" onkeyup="commaAndDollarDebtOnAssetsOwned(this)"placeholder="Jewelry, Furniture, Art and others">';
        htmlContent += '<span id="errotherAssetDebts_' + index + '" class="text-danger"></span>';
        htmlContent += '</div>';

        htmlContent += '<div class="col-xl-1 col-md-1 mt-6"><span class="ms-3"><svg class="deleteMeAssetsOwned" onclick="DeleteMeAssets(this,0)" xmlns="http://www.w3.org/2000/svg" width="16" height="18"viewBox="0 0 16 18" fill="none">';
        htmlContent += '<path d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"fill="#DC3545" />';
        htmlContent += '</svg></span>';
        htmlContent += '<span class="ms-2" id="addMoreAssets">';
        htmlContent += '<svg onclick="AddAssetsDiv(' + index + ')" xmlns="http://www.w3.org/2000/svg" width="20" class="idAddAssetsOwned" id="AssetsOwnedMainDiv2_' + index + '" height="20" viewBox="0 0 20 20" fill="none">';
        htmlContent += '<path d="M10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0ZM15 11H11V15H9V11H5V9H9V5H11V9H15V11Z"fill="#002A7B" /></svg></span>';
        htmlContent += '</div>';
        htmlContent += '</div>';
        htmlContent += '</div>';
        htmlContent += '</div>';
        $('#divAssetsShowHide').append(htmlContent);
        $("#AssetsOwnedMainDiv2_" + previousIndex).hide();
    }
    ShowHideDeleteButton("divAssetsShowHide", "deleteMeAssetsOwned");
}

/****************************************************************************
   Function: DeleteMeAssets function
   Purpose:  Delete function for Assets
   Developer: Wasim Raja
****************************************************************************/
function DeleteMeAssets(event, AssetsId) {
    if ($(event).closest('div#getAssetsOwned').next().find('.idAddAssetsOwned').length == 0 && $(event).closest('div#getAssetsOwned').prev().find('.idAddAssetsOwned').length != 0) {
        $(event).closest('div#getAssetsOwned').prev().find('.idAddAssetsOwned').removeAttr("style");
        $(event).closest('div#getAssetsOwned').remove();
        ArrayDeleteAssetsRow.push(AssetsId);
    }
    else if ($(event).closest('div#getAssetsOwned').next().find('.idAddAssetsOwned').length == 0 && $(event).closest('div#getAssetsOwned').prev().find('.idAddAssetsOwned').length == 0) {
    }
    else if ($(event).closest('div#getAssetsOwned').next().find('.idAddAssetsOwned').length == 1) {
        $(event).closest('div#getAssetsOwned').remove();
        ArrayDeleteAssetsRow.push(AssetsId);
    }
    ShowHideDeleteButton("divAssetsShowHide", "deleteMeAssetsOwned");
}

/****************************************************************************
   Function: AddOtherDebtsDiv() 
   Purpose:  Method for Add new row after Clicking + button for OtherDebts
   Developer: Wasim Raja
****************************************************************************/
function AddOtherDebtsDiv(index) {
    let previousIndex = index;
    if ($('#divOtherDebtsShowHide').children().length < 20) {
        index++;
        var htmlContent = '<div class="row" id="getOtherDebts">';
        htmlContent += '<div class="col-12">';
        htmlContent += '<div class="row custom-row" id="OtherDebtsMainDiv">';
        htmlContent += '<div class="col-xl-3 col-md-6 mb-2">';
        htmlContent += '<label for="DebtType" class="form-label">Type of debt<span class="red-txt">*</span></label>';
        htmlContent += '<input type="hidden" class="input-field clsOtherDebtsId" id="hdnOtherDebtsId_' + index + '">';
        htmlContent += '<select class="form-select clsDebtType"aria-label="Default select example" id="DebtType_' + index + '" onchange="SectionTenthDebtType()">';
        htmlContent += '<<option value="0"selected>Select</option>';
        htmlContent += '<option value="1">Secured Loan</option>';
        htmlContent += '<option value="2">Unsecured Loan</option>';
        htmlContent += '<option value="3">Notes Payable To Others</option>';
        htmlContent += '<option value="4">Taxes Due</option>';
        htmlContent += '<option value="5">Other</option>';
        htmlContent += '</select>';
        htmlContent += '<span id="errDebtType_' + index + '" class="text-danger"></span>';
        htmlContent += '</div>';
        htmlContent += '<div class="col-xl-3 col-md-5 mb-2">';
        htmlContent += '<label for="DebtAmount" class="form-label">Debt amount<span class="red-txt">*</span></label>';
        htmlContent += '<input type="tel" class="input-field clsDebtAmount" id="DebtAmount_' + index + '" onkeyup="commaAndDollarDebtAmountValue(this)"placeholder="Amount of debt">';
        htmlContent += '<span id="errDebtAmount_' + index + '" class="text-danger"></span>';
        htmlContent += '</div>';

        htmlContent += '<div class="col-xl-1 col-md-1 mt-6"><span class="ms-3"><svg class="deleteMeOtherDebts" onclick="DeleteMeOtherDebts(this,0)" xmlns="http://www.w3.org/2000/svg" width="16" height="18"viewBox="0 0 16 18" fill="none">';
        htmlContent += '<path d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z" fill="#DC3545" />';
        htmlContent += '</svg></span>';
        htmlContent += '<span class="ms-2" id="addmMreOtherDebts_' + index + '">';
        htmlContent += '<svg onclick="AddOtherDebtsDiv(' + index + ')" xmlns="http://www.w3.org/2000/svg" width="20" class="idAddOtherDebts" id="AddOtherDebtsIcon_' + index + '"height="20" viewBox="0 0 20 20" fill="none">';
        htmlContent += '<path d="M10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0ZM15 11H11V15H9V11H5V9H9V5H11V9H15V11Z"fill="#002A7B" /></svg></span>';
        htmlContent += '</div>';
        htmlContent += '</div>';
        htmlContent += '</div>';
        htmlContent += '</div>';
        $('#divOtherDebtsShowHide').append(htmlContent);
        $("#AddOtherDebtsIcon_" + previousIndex).hide();
    }
    ShowHideDeleteButton("divOtherDebtsShowHide", "deleteMeOtherDebts");
}

/****************************************************************************
   Function: DeleteMeOtherDebts function
   Purpose:  Delete function for OtherDebts
   Developer: Wasim Raja
****************************************************************************/
function DeleteMeOtherDebts(event, debtsId) {
    if ($(event).closest('div#getOtherDebts').next().find('.idAddOtherDebts').length == 0 && $(event).closest('div#getOtherDebts').prev().find('.idAddOtherDebts').length != 0) {
        $(event).closest('div#getOtherDebts').prev().find('.idAddOtherDebts').removeAttr("style");
        $(event).closest('div#getOtherDebts').remove();
        ArrayDeleteOtherDebtsRow.push(debtsId);
    }
    else if ($(event).closest('div#getOtherDebts').next().find('.idAddOtherDebts').length == 0 && $(event).closest('div#getOtherDebts').prev().find('.idAddOtherDebts').length == 0) {
    }
    else if ($(event).closest('div#getOtherDebts').next().find('.idAddOtherDebts').length == 1) {
        $(event).closest('div#getOtherDebts').remove();
        ArrayDeleteOtherDebtsRow.push(debtsId);
    }
    ShowHideDeleteButton("divOtherDebtsShowHide", "deleteMeOtherDebts");
}

/****************************************************************************
   Function: OnClick function
   Purpose:  Show Hide functionality for next and Preview button 
   Developer: Wasim Raja
****************************************************************************/
$("#nextBtn").click(function () {
    var hiddenSectionNextValue = $(".step:visible").attr("id");

    var nextDiv = $(".step:visible").next(".step");
    if (nextDiv.length == 0) { // wrap around to beginning
        nextDiv = $(".step:first");
    }
    /*$(".step").hide();*/
    if (hiddenSectionNextValue == "tab1") {

        if (SectionFirstValidateForm() == true) {

            $(".ProgressBarPersentage").css("width", "14%");
            $(".ProgressBarPersentage").text("14%");
            $(".step").hide();
            nextDiv.show();
        }
    }
    if (hiddenSectionNextValue == "tab2") {
        if (SectionSecondValidateForm() == true) {
            $(".ProgressBarPersentage").css("width", "20%");
            $(".ProgressBarPersentage").text("20%");
            $(".step").hide();
            nextDiv.show();
        }
    }
    if (hiddenSectionNextValue == "tab3") {
        if (SectionThirdValidateForm() == true) {
            $(".ProgressBarPersentage").css("width", "27%");
            $(".ProgressBarPersentage").text("27%");
            $(".step").hide();
            nextDiv.show();
        }
    }
    if (hiddenSectionNextValue == "tab4") {
        if (SectionFourthValidateForm() == true) {
            $(".ProgressBarPersentage").css("width", "35%");
            $(".ProgressBarPersentage").text("35%");
            $(".step").hide();
            nextDiv.show();
        }
    }
    if (hiddenSectionNextValue == "tab5") {
        if (SectionFifthValidateForm() == true) {
            $(".ProgressBarPersentage").css("width", "42%");
            $(".ProgressBarPersentage").text("42%");
            $(".step").hide();
            nextDiv.show();
        }
    }
    if (hiddenSectionNextValue == "tab6") {
        if (SectionSixthValidateForm() == true) {
            $(".ProgressBarPersentage").css("width", "50%");
            $(".ProgressBarPersentage").text("50%");
            $(".step").hide();
            nextDiv.show();
        }
    }
    if (hiddenSectionNextValue == "tab7") {
        if (SectionSeventhValidateForm() == true) {
            $(".ProgressBarPersentage").css("width", "57%");
            $(".ProgressBarPersentage").text("57%");
            $(".step").hide();
            nextDiv.show();
        }
    }
    if (hiddenSectionNextValue == "tab8") {
        if (SectionEighthValidateForm() == true) {
            $(".ProgressBarPersentage").css("width", "62%");
            $(".ProgressBarPersentage").text("62%");
            $(".step").hide();
            nextDiv.show();
        }
    }
    if (hiddenSectionNextValue == "tab9") {
        if (SectionNinthValidateForm() == true) {
            $(".ProgressBarPersentage").css("width", "70%");
            $(".ProgressBarPersentage").text("70%");
            $(".step").hide();
            nextDiv.show();
        }
    }
    if (hiddenSectionNextValue == "tab10") {
        if (SectionTenthValidateForm() == true) {
            $(".ProgressBarPersentage").css("width", "77%");
            $(".ProgressBarPersentage").text("77%");
            $(".step").hide();
            nextDiv.show();
        }
    }
    if (hiddenSectionNextValue == "tab11") {
        if (SectionEleventhValidateForm() == true) {
            $(".ProgressBarPersentage").css("width", "85%");
            $(".ProgressBarPersentage").text("85%");
            $(".step").hide();
            nextDiv.show();

        }
    }
    if (hiddenSectionNextValue == "tab12") {
        if (SectionTwelvethValidateForm() == true) {
            $(".ProgressBarPersentage").css("width", "92%");
            $(".ProgressBarPersentage").text("92%");
            $(".step").hide();
            nextDiv.show();
            EmptyImageDivValueSection1();
            EmptyImageDivValueSection2();
            EmptyImageDivValueSection3();
            AppendImagePriview()
            PersonalInformation();
            //$("#nextBtn").addClass('d-none');
            //$("#btnSubmit").removeClass('d-none');
            $('#nextBtn').text('submit');
        }
    }
    if (hiddenSectionNextValue == "tab13") {
        // if (SectionThirteenthValidateForm() == true) {
        FastTrackBuyerRegistar();
        $("#btnSaveAndClose").css("display", "none");
        $("#prevBtn").css("display", "none");
        $("#nextBtn").css("display", "none");
        $(".ProgressBarPersentage").css("width", "100%");
        $(".ProgressBarPersentage").text("100%");
        $(".step").hide();
        nextDiv.show();
        //}

    }
    if (hiddenSectionNextValue == "tab14") {
        $("#btnSaveAndClose").css("display", "none");
        $("#prevBtn").css("display", "none");
        $("#nextBtn").css("display", "none");
        $(".ProgressBarPersentage").css("width", "100%");
        $(".ProgressBarPersentage").text("100%");
        //$(".step").hide();
        //nextDiv.show();

    }
    else {
    //    $(".step").hide();
    //    nextDiv.show();
    }

});

$("#prevBtn").click(function () {
    var prevDiv = $(".step:visible").prev(".step");
    var hiddenSectionPrevValue = $(".step:visible").attr("id");
    $("#nextBtn").removeClass('d-none');
    if (!$("#btnSubmit").hasClass('d-none')) {
        $("#btnSubmit").addClass('d-none');
    }
    if (prevDiv.length == 0) { // wrap around to end
        prevDiv = $(".step:last");
    } else {
        if (hiddenSectionPrevValue == "tab1") {
            $(".ProgressBarPersentage").css("width", "7%");
            $(".ProgressBarPersentage").text("7%");
            $(".step").hide();
            prevDiv.show();
        }
        if (hiddenSectionPrevValue == "tab2") {
            $(".ProgressBarPersentage").css("width", "7%");
            $(".ProgressBarPersentage").text("7%");
            $(".step").hide();
            prevDiv.show();
        }
        if (hiddenSectionPrevValue == "tab3") {
            $(".ProgressBarPersentage").css("width", "14%");
            $(".ProgressBarPersentage").text("14%");
            $(".step").hide();
            prevDiv.show();
        }
        if (hiddenSectionPrevValue == "tab4") {
            $(".ProgressBarPersentage").css("width", "20%");
            $(".ProgressBarPersentage").text("20%");
            $(".step").hide();
            prevDiv.show();
        }
        if (hiddenSectionPrevValue == "tab5") {
            $(".ProgressBarPersentage").css("width", "27%");
            $(".ProgressBarPersentage").text("27%");
            $(".step").hide();
            prevDiv.show();
        }
        if (hiddenSectionPrevValue == "tab6") {
            $(".ProgressBarPersentage").css("width", "35%");
            $(".ProgressBarPersentage").text("35%");
            $(".step").hide();
            prevDiv.show();
        }
        if (hiddenSectionPrevValue == "tab7") {
            $(".ProgressBarPersentage").css("width", "42%");
            $(".ProgressBarPersentage").text("42%");
            $(".step").hide();
            prevDiv.show();
        }
        if (hiddenSectionPrevValue == "tab8") {
            $(".ProgressBarPersentage").css("width", "50%");
            $(".ProgressBarPersentage").text("50%");
            $(".step").hide();
            prevDiv.show();
        }
        if (hiddenSectionPrevValue == "tab9") {
            $(".ProgressBarPersentage").css("width", "57%");
            $(".ProgressBarPersentage").text("57%");
            $(".step").hide();
            prevDiv.show();
        }
        if (hiddenSectionPrevValue == "tab10") {
            $(".ProgressBarPersentage").css("width", "62%");
            $(".ProgressBarPersentage").text("62%");
            $(".step").hide();
            prevDiv.show();
        }
        if (hiddenSectionPrevValue == "tab11") {
            $(".ProgressBarPersentage").css("width", "70%");
            $(".ProgressBarPersentage").text("70%");
            //$('#nextBtn').text('Next');
            $(".step").hide();
            prevDiv.show();
        }
        if (hiddenSectionPrevValue == "tab12") {
            $(".ProgressBarPersentage").css("width", "77%");
            $(".ProgressBarPersentage").text("77%");
            $(".step").hide();
            prevDiv.show();

        }
        if (hiddenSectionPrevValue == "tab13") {
            $(".ProgressBarPersentage").css("width", "85%");
            $(".ProgressBarPersentage").text("85%");
            $(".step").hide();
            prevDiv.show();
            $('#nextBtn').text('Next');
        }
        //$(".step").hide();
        //prevDiv.show();
    }
});

/****************************************************************************
   Function: OnClick function
   Purpose:  this method is used for btn save and close functionality 
   Developer: Wasim Raja
****************************************************************************/
$("#btnSaveAndClose").click(function () {
    var hiddenSectionValue = $(".step:visible").attr("id");
    if (hiddenSectionValue == "tab1") {
        if (SectionFirstValidateForm() == true) {
            FastTrackBuyerRegistar()
        }
    }
    if (hiddenSectionValue == "tab2") {
        if (SectionSecondValidateForm() == true) {
            FastTrackBuyerRegistar()
        }
    }

    if (hiddenSectionValue == "tab3") {
        if (SectionThirdValidateForm() == true) {
            FastTrackBuyerRegistar()
        }
    }
    if (hiddenSectionValue == "tab4") {
        if (SectionFourthValidateForm() == true) {
            FastTrackBuyerRegistar()
        }
    }
    if (hiddenSectionValue == "tab5") {
        if (SectionFifthValidateForm() == true) {
            FastTrackBuyerRegistar()
        }
    }
    if (hiddenSectionValue == "tab6") {
        if (SectionSixthValidateForm() == true) {
            FastTrackBuyerRegistar()
        }
    }
    if (hiddenSectionValue == "tab7") {
        if (SectionSeventhValidateForm() == true) {
            FastTrackBuyerRegistar()
        }
    }
    if (hiddenSectionValue == "tab8") {
        if (SectionEighthValidateForm() == true) {
            FastTrackBuyerRegistar()
        }
    }
    if (hiddenSectionValue == "tab9") {
        if (SectionNinthValidateForm() == true) {
            FastTrackBuyerRegistar()
        }
    }
    if (hiddenSectionValue == "tab10") {
        if (SectionTenthValidateForm() == true) {
            FastTrackBuyerRegistar()
        }
    }
    if (hiddenSectionValue == "tab11") {
        if (SectionEleventhValidateForm() == true) {
            FastTrackBuyerRegistar()
        }
    }
    if (hiddenSectionValue == "tab12") {
        if (SectionTwelvethValidateForm() == true) {
            FastTrackBuyerRegistar()
            $("#nextBtn").addClass('d-none');
            $("#btnSubmit").removeClass('d-none');
        }
    }
    //if (hiddenSectionValue == "tab13") {
    //    if (SectionThirteenthValidateForm() == true) {
    //        FastTrackBuyerRegistar()
    //    }
    //}
    //FastTrackBuyerRegistar();
})

/****************************************************************************
   Function: SectionFirstValidateForm()
   Purpose:  Validate First Section of F.T buyer
   Developer: Wasim Raja
****************************************************************************/
function SectionFirstValidateForm() {
    isValid = true
    var IsEmtpty = true;
    isValid = requiredTextField("Address1", " address1", "all")
    if (!isValid) {
        IsEmtpty = false;
    }
    isValid = requiredTextField("City", " city", "all")
    if (!isValid) {
        IsEmtpty = false;
    }

    isValid = requiredTextField("ZipCode", " zip code", "numeric")
    if (!isValid) {
        IsEmtpty = false;
    }
    var State = $("#stateField").val().trim();
    if ($('#stateField').val() == 0 || $('#stateField').val() == 'Select') {
        $('#errstateField').text('State is required');
        IsEmtpty = false;
    }
    else {

        $('#errstateField').text('');
    }

    return IsEmtpty;
}
$("#txtAddress1").keyup(function () {

    isValid = requiredTextField("Address1", " address1", "all")
    if (!isValid) { return isValid }
})
$("#txtCity").keyup(function () {

    isValid = requiredTextField("City", " city", "all")
    if (!isValid) { return isValid }
})
$("#txtZipCode").keyup(function () {
    isValid = requiredTextField("ZipCode", " zip code", "numeric")
    if (!isValid) { return isValid }
})

$('#stateField').change(function () {

    var data = $(this).val();
    RemoveState(data)
})
/****************************************************************************
   Function: RemoveState()
   Purpose:  Clear State value on First section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function RemoveState(data) {

    $('#errstateField').text('');
}

/****************************************************************************
   Function: onKeyUpValidationForCompanyName
   Purpose:  Oo KeyUp Validate of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function onKeyUpValidationForCompanyName(value) {
    var IsEmtpty = true;
    var companyName = []; //thic cide is used for save Fasttrack buyer Work Exp in WorkExperience table
    var fromDate = [];
    var toDate = [];
    var description = [];
    var arrLength = $("#getAllHtml").children().length;
    for (var i = 1; i <= arrLength; i++) {
        companyName.push($("#getAllHtml").children("div:nth-child(" + i + ")").find("#txtCompanyNameFst").val());
        fromDate.push($("#getAllHtml").children("div:nth-child(" + i + ")").find("#txtFromDate").val());
        toDate.push($("#getAllHtml").children("div:nth-child(" + i + ")").find("#txtToDate").val());
        description.push($("#getAllHtml").children("div:nth-child(" + i + ")").find("#txtWorkDesc").val());
    }//


    for (var i = 0; i < arrLength; i++) {
        var j = i + 1;

        if (companyName[i] == "") {
            $("#getAllHtml").children("div:nth-child(" + j + ")").find('#errCompanyName').text("Please enter company name").css("color", "Red");
            IsEmtpty = false;
        }
        else if (companyName[i] != "") {
            $("#getAllHtml").children("div:nth-child(" + j + ")").find('#errCompanyName').text("");

        }


        //if (fromDate[i] == "" || toDate[i] == "") {
        //    $("#getAllHtml").children("div:nth-child(" + j + ")").find('#errWorkDate').text("Please select work date").css("color", "Red");
        //    IsEmtpty = false;
        //}
        //else if (fromDate[i] != "" || toDate[i] != "") {
        //    $("#getAllHtml").children("div:nth-child(" + j + ")").find('#errWorkDate').text("");

        //}
        if (fromDate[i] == "") {
            $("#getAllHtml").children("div:nth-child(" + j + ")").find('#errFromDate').text("Please select date").css("color", "Red");
            IsEmtpty = false;

        } else if (fromDate[i] != "") {
            $("#getAllHtml").children("div:nth-child(" + j + ")").find('#errFromDate').text("");
        }

        if (toDate[i] == "") {
            $("#getAllHtml").children("div:nth-child(" + j + ")").find('#errToDate').text("Please select date").css("color", "Red");
            IsEmtpty = false;
        } else if (toDate[i] != "") {
            $("#getAllHtml").children("div:nth-child(" + j + ")").find('#errToDate').text("");
        }

        if (description[i] == "") {
            $("#getAllHtml").children("div:nth-child(" + j + ")").find('#errWorkDesc').text("Please enter description").css("color", "Red");
            IsEmtpty = false;
        } else if (description[i] != "") {
            $("#getAllHtml").children("div:nth-child(" + j + ")").find('#errWorkDesc').text("");

        }

        var dealsDescription = $("#txtDealsDescription").val().trim();
        if (dealsDescription == "") {
            $('#errDealsDescription').text("Please enter real estate experience").css("color", "Red");
            IsEmtpty = false;
        }
        else if (dealsDescription != "") {
            $('#errDealsDescription').text(" ");
        }


    }


    return IsEmtpty;
}

$("#txtDealsDescription").on("keyup", function () {
    var companyValue = $("#txtDealsDescription").val();
    if (companyValue == "") {
        $('#errDealsDescription').text("Please enter real estate experience").css("color", "Red");

    }
    else if (companyValue != "") {
        $('#errDealsDescription').text(" ");
    }
})

/****************************************************************************
   Function: RemoveCompanyName()
   Purpose:  Clear Company Name of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function RemoveCompanyName() {
    $('#errCompanyName').text('');
}

/****************************************************************************
   Function: SectionSecondValidateForm()
   Purpose:  Validate Second Section of F.T buyer Signup
   Developer: Wasim Raja
*********************************************************xcsc*******************/
function SectionSecondValidateForm() {
    let IsCompanyEmtpty = SectionSecondCompanyName();
    let IsDescEmtpty = SectionSecondDescription();
    let IsFromDateEmtpty = SectionSecondFromDate();
    let IsToDateEmtpty = SectionSecondToDate();
    let IsDEalsDescriptionEmpty = ($("#txtDealsDescription").val()).trim() != "" ? true : false;
    if (!IsDEalsDescriptionEmpty) {
        $('#errDealsDescription').text("Please enter real estate experience").css("color", "Red");
    }
    else {
        $('#errDealsDescription').text("");
    }
    if (IsCompanyEmtpty && IsDescEmtpty && IsFromDateEmtpty && IsToDateEmtpty && IsDEalsDescriptionEmpty) {
        return true;
    }
    else {
        return false
    }
}

/****************************************************************************
   Function: SectionSecondCompanyName()
   Purpose:  Validate Second Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionSecondCompanyName() {
    var IsEmtpty = true;
    $(".clsWorkExpCompanyName").each(function () {
        let index = this.id.split("_")[1];
        if (($(this).val()).trim() == "") {
            $("#errCompanyName_" + index).text("Please enter company name").css("color", "Red");
            IsEmtpty = false;
        }
        else {
            $("#errCompanyName_" + index).text("");
        }
    });
    return IsEmtpty;
}

/****************************************************************************
   Function: SectionSecondFromDate()
   Purpose:  Validate Second Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionSecondFromDate() {
    var IsEmtpty = true;
    $(".clsWorkExpFromDate").each(function () {
        let index = this.id.split("_")[1];
        if (($(this).val()).trim() == "") {
            $("#errFromDate_" + index).text("Please select date").css("color", "Red");
            IsEmtpty = false;
        }
        else {
            $("#errFromDate_" + index).text("");
        }
    });
    return IsEmtpty;
}


/****************************************************************************
   Function: SectionSecondToDate()
   Purpose:  Validate Second Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionSecondToDate() {
    var IsEmtpty = true;
    $(".clsWorkExpToDate").each(function () {
        let index = this.id.split("_")[1];
        if (($(this).val()).trim() == "") {
            $("#errToDate_" + index).text("Please select date").css("color", "Red");
            IsEmtpty = false;
        }
        else {
            $("#errToDate_" + index).text("");
        }
    });
    return IsEmtpty;
}

/****************************************************************************
   Function: SectionSecondDescription()
   Purpose:  Validate Second Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionSecondDescription() {
    var IsEmtpty = true;
    $(".clsWorkExpDescription").each(function () {
        let index = this.id.split("_")[1];
        if (($(this).val()).trim() == "") {
            $("#errWorkDesc_" + index).text("Please enter description").css("color", "Red");
            IsEmtpty = false;
        }
        else {
            $("#errWorkDesc_" + index).text("");
        }
    });
    return IsEmtpty;
}

/****************************************************************************
   Function: SectionThirdValidateForm()
   Purpose:  Validate Third Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionThirdValidateForm() {
    var IsEmtpty = true;

    var CashOnHandValue = $("#txtCashOnHand").val();
    CashOnHandValue = CashOnHandValue.replace('$', '');
    if (CashOnHandValue == "") {
        $('#errCashOnHand').text("Please enter liquidity").css("color", "Red");
        IsEmtpty = false;
    }
    else if (CashOnHandValue != "") {
        $('#errCashOnHand').text("");
    }
    return IsEmtpty;
}
$("#txtCashOnHand").on("keyup", function () {
    var CashOnHandValue1 = $("#txtCashOnHand").val().trim();
    CashOnHandValue1 = CashOnHandValue1.replace('$', '');
    if (CashOnHandValue1 == "") {
        $('#errCashOnHand').text("Please enter liquidity").css("color", "Red");
        IsEmtpty = false;
    }
    else if (CashOnHandValue1 != "") {
        $('#errCashOnHand').text("");
    }
})

/****************************************************************************
   Function: SectionFourthValidateForm()
   Purpose:  Validate Fourth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionFourthValidateForm() {
    var OtherYes = $("#OtherYes").prop('checked');
    var OtherNo = $("#OtherNo").prop('checked');
    if (OtherYes == false && OtherNo == false) {
        $('#errOtherYesNo').text("Please select option").css("color", "Red");
        IsEmtpty = false;
    } else if ((OtherYes == true && OtherNo == false) || (OtherYes == false && OtherNo == true)) {
        $('#errOtherYesNo').text('');
    }
    if (OtherYes == true) {
        let isAddressOneEmpty = SectionFourthAddress1();
        let isCityEmpty = SectionFourthCity();
        let isStateEmpty = SectionFourthState();
        let isZipCodeEmpty = SectionFourthZipCode();
        let isPropertyTypeEmpty = SectionFourthPropertyType();
        let isPropertyWorthEmpty = SectionFourthPropertyWorth();
        let isPropertyDebtEmpty = SectionFourthDebtOnProperty();
        let isMonthYearEmpty = SectionFourthMonthYearRequared();
        let isPercentOwnedEmpty = SectionFourthPropertyOwned();
        if (isAddressOneEmpty && isCityEmpty && isStateEmpty && isZipCodeEmpty && isPropertyTypeEmpty && isPropertyWorthEmpty && isPropertyDebtEmpty && isMonthYearEmpty && isPercentOwnedEmpty) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return true;
    }
}


/****************************************************************************
   Function: SectionFourthAddress1()
   Purpose:  Validate Fourth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionFourthAddress1() {
    let IsEmtpty = true;
    let OtherYes = $("#OtherYes").prop('checked');
    let OtherNo = $("#OtherNo").prop('checked');
    if (OtherYes == false && OtherNo == false) {
        $('#errOtherYesNo').text("Please select option").css("color", "Red");
        IsEmtpty = false;
    } else if ((OtherYes == true && OtherNo == false) || (OtherYes == false && OtherNo == true)) {
        $('#errOtherYesNo').text('');
    }
    if (OtherYes == true) {
        $(".clsEstateAddress1").each(function () {
            let index = this.id.split("_")[1];
            if (($(this).val()).trim() == "") {
                $("#errestateaddress1_" + index).text("Please enter address line 1").css("color", "Red");
                IsEmtpty = false;
            }
            else {
                $("#errestateaddress1_" + index).text("");
            }
        });
    }
    return IsEmtpty;
}

/****************************************************************************
   Function: SectionFourthCity()
   Purpose:  Validate Fourth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionFourthCity() {
    let IsEmtpty = true;
    let OtherYes = $("#OtherYes").prop('checked');
    let OtherNo = $("#OtherNo").prop('checked');
    if (OtherYes == false && OtherNo == false) {
        $('#errOtherYesNo').text("Please select option").css("color", "Red");
        IsEmtpty = false;
    } else if ((OtherYes == true && OtherNo == false) || (OtherYes == false && OtherNo == true)) {
        $('#errOtherYesNo').text('');
    }
    if (OtherYes == true) {
        $(".clsRealEstateCity").each(function () {
            let index = this.id.split("_")[1];
            if (($(this).val()).trim() == "") {
                $("#errestateCityField_" + index).text("Please enter city").css("color", "Red");
                IsEmtpty = false;
            }
            else {
                $("#errestateCityField_" + index).text("");
            }
        });
    }
    return IsEmtpty;
}

/****************************************************************************
   Function: SectionFourthState()
   Purpose:  Validate Fourth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionFourthState() {
    let IsEmtpty = true;
    let OtherYes = $("#OtherYes").prop('checked');
    let OtherNo = $("#OtherNo").prop('checked');
    if (OtherYes == false && OtherNo == false) {
        $('#errOtherYesNo').text("Please select option").css("color", "Red");
        IsEmtpty = false;
    } else if ((OtherYes == true && OtherNo == false) || (OtherYes == false && OtherNo == true)) {
        $('#errOtherYesNo').text('');
    }
    if (OtherYes == true) {
        $(".ddlStateDropDown").each(function () {
            let index = this.id.split("_")[1];
            if ($(this).val() == 0 || $(this).val() == 'Select') {
                $("#errEstatestateField_" + index).text("Please enter state").css("color", "Red");
                IsEmtpty = false;
            }
            else {
                $("#errEstatestateField_" + index).text("");
            }
        });
    }
    return IsEmtpty;
}


/****************************************************************************
   Function: SectionFourthZipCode()
   Purpose:  Validate Fourth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionFourthZipCode() {
    let IsEmtpty = true;
    let OtherYes = $("#OtherYes").prop('checked');
    let OtherNo = $("#OtherNo").prop('checked');
    if (OtherYes == false && OtherNo == false) {
        $('#errOtherYesNo').text("Please select option").css("color", "Red");
        IsEmtpty = false;
    } else if ((OtherYes == true && OtherNo == false) || (OtherYes == false && OtherNo == true)) {
        $('#errOtherYesNo').text('');
    }
    if (OtherYes == true) {
        $(".clsEstateZipCode").each(function () {
            let ZipId = this.id.replace("txt", "");
            if (requiredTextField(ZipId, " zip code", "numeric") == false) {
                IsEmtpty = false;
            }
            else {
            }
        });
    }
    return IsEmtpty;
}


/****************************************************************************
   Function: SectionFourthPropertyType()
   Purpose:  Validate Fourth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionFourthPropertyType() {
    let IsEmtpty = true;
    let OtherYes = $("#OtherYes").prop('checked');
    let OtherNo = $("#OtherNo").prop('checked');
    if (OtherYes == false && OtherNo == false) {
        $('#errOtherYesNo').text("Please select option").css("color", "Red");
        IsEmtpty = false;
    } else if ((OtherYes == true && OtherNo == false) || (OtherYes == false && OtherNo == true)) {
        $('#errOtherYesNo').text('');
    }
    if (OtherYes == true) {
        $(".ddlPropTypeDropDown").each(function () {
            let index = this.id.split("_")[1];
            if ($(this).val() == 0 || $(this).val() == 'Select') {
                $("#errassetTypeId_" + index).text("Please select property type").css("color", "Red");
                IsEmtpty = false;
            }
            else {
                $("#errassetTypeId_" + index).text("");
            }
        });
    }
    return IsEmtpty;
}

/****************************************************************************
   Function: SectionFourthPropertyWorth()
   Purpose:  Validate Fourth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionFourthPropertyWorth() {
    let IsEmtpty = true;
    let OtherYes = $("#OtherYes").prop('checked');
    let OtherNo = $("#OtherNo").prop('checked');
    if (OtherYes == false && OtherNo == false) {
        $('#errOtherYesNo').text("Please select option").css("color", "Red");
        IsEmtpty = false;
    } else if ((OtherYes == true && OtherNo == false) || (OtherYes == false && OtherNo == true)) {
        $('#errOtherYesNo').text('');
    }
    if (OtherYes == true) {
        $(".clsRealEstatePropertyWorth").each(function () {
            let index = this.id.split("_")[1];
            if (($(this).val()).trim() == "") {
                $("#errPropertyWorth_" + index).text("Please enter property worth").css("color", "Red");
                IsEmtpty = false;
            }
            else {
                $("#errPropertyWorth_" + index).text("");
            }
        });
    }
    return IsEmtpty;
}

/****************************************************************************
   Function: SectionFourthDebtOnProperty()
   Purpose:  Validate Fourth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionFourthDebtOnProperty() {
    var IsEmtpty = true;
    var OtherYes = $("#OtherYes").prop('checked');
    var OtherNo = $("#OtherNo").prop('checked');
    if (OtherYes == false && OtherNo == false) {
        $('#errOtherYesNo').text("Please select option").css("color", "Red");
        IsEmtpty = false;
    } else if ((OtherYes == true && OtherNo == false) || (OtherYes == false && OtherNo == true)) {
        $('#errOtherYesNo').text('');
    }
    if (OtherYes == true) {
        $(".clsRealEstatePropertyDebt").each(function () {
            let index = this.id.split("_")[1];
            if (($(this).val()).trim().replace('$', '') === "") {
                $("#errPropertyDebt_" + index).text("Please enter property debt").css("color", "Red");
                IsEmtpty = false;
            }
            else {
                $("#errPropertyDebt_" + index).text("");
            }
        });
    }
    return IsEmtpty;
}

/****************************************************************************
   Function: SectionFourthMonthYearRequared()
   Purpose:  Validate Fourth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionFourthMonthYearRequared() {
    var IsEmtpty = true;
    var OtherYes = $("#OtherYes").prop('checked');
    var OtherNo = $("#OtherNo").prop('checked');
    if (OtherYes == false && OtherNo == false) {

        $('#errOtherYesNo').text("Please select option").css("color", "Red");
        IsEmtpty = false;
    } else if ((OtherYes == true && OtherNo == false) || (OtherYes == false && OtherNo == true)) {
        $('#errOtherYesNo').text('');
    }
    if (OtherYes == true) {
        $(".clsRealEstateAcquiredDate").each(function () {
            let index = this.id.split("_")[1];
            if (($(this).val()).trim() == "") {
                $("#erracquiredtime_" + index).text("Please enter month year acquired").css("color", "Red");
                IsEmtpty = false;
            }
            else {
                $("#erracquiredtime_" + index).text("");
            }
        });
    }
    return IsEmtpty;
}

/****************************************************************************
   Function: SectionFourthPropertyOwned()
   Purpose:  Validate Fourth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionFourthPropertyOwned() {
    var IsEmtpty = true;
    var OtherYes = $("#OtherYes").prop('checked');
    var OtherNo = $("#OtherNo").prop('checked');
    if (OtherYes == false && OtherNo == false) {
        $('#errOtherYesNo').text("Please select option").css("color", "Red");
        IsEmtpty = false;
    } else if ((OtherYes == true && OtherNo == false) || (OtherYes == false && OtherNo == true)) {
        $('#errOtherYesNo').text('');
    }
    if (OtherYes == true) {
        $(".addPresentage").each(function () {

            let index = this.id.split("_")[1];
            if (($(this).val()).trim() == "") {
                $("#errapercentowned_" + index).text("Please enter percentage owned").css("color", "Red");
                IsEmtpty = false;
            }
            else {
                $("#errapercentowned_" + index).text("");
            }
        });
    }
    return IsEmtpty;
}



function SectionFifthValidateForm() {
    var IsEmtpty = true;
    var LoansYesOrNoValue = $("#LoansYes").prop('checked');
    if (LoansYesOrNoValue == true) {
        let isDescriptionEmpty = SectionFifthDescription();
        let isCollateralEmpty = SectionFifthCollateral();
        let isNoteEmpty = SectionFifthNoteValue();
        let isZipCollateralValueEmpty = SectionFifthValueOfCollateral();

        if (isDescriptionEmpty && isCollateralEmpty && isNoteEmpty && isZipCollateralValueEmpty) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return true;
    }
}


/****************************************************************************
   Function: SectionFifthDescription()
   Purpose:  Validate Fifth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionFifthDescription() {
    var IsEmtpty = true;
    var LoansYesOrNoValue = $("#LoansYes").prop('checked');
    if (LoansYesOrNoValue == true) {
        //var collateralizedTrueOrFalse = $("#IsCollateralizedYes").prop('checked');
        $(".clsLoanNoteDescription").each(function () {
            let index = this.id.split("_")[1];
            if (($(this).val()).trim() == "") {
                $("#errNoteDescrptn_" + index).text("Please enter note description").css("color", "Red");
                IsEmtpty = false;
            }
            else {
                $("#errNoteDescrptn_" + index).text("");
            }
        });
    }
    return IsEmtpty;
}

/****************************************************************************
   Function: SectionFifthCollateral()
   Purpose:  Validate Fifth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionFifthCollateral() {
    var IsEmtpty = true;

    var LoansYesOrNoValue = $("#LoansYes").prop('checked');
    if (LoansYesOrNoValue == true) {

        $(".clsCollateral ").each(function () {
            let index = this.id.split("_")[1];
            let IscollateralizedYes = $("#IsCollateralizedYes_" + index).prop('checked');
            if (IscollateralizedYes == true) {
                if (($(this).val()).trim() == "") {
                    $("#errcollateral_" + index).text("Please enter collateral").css("color", "Red");
                    IsEmtpty = false;
                }
                else {
                    $("#errcollateral_" + index).text("");
                }
            }
            else {
                $("#errcollateral_" + index).text("");
            }
        });

    }
    return IsEmtpty;
}


/****************************************************************************
   Function: SectionFifthNoteValue()
   Purpose:  Validate Fifth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionFifthNoteValue() {
    var IsEmtpty = true;
    var LoansYesOrNoValue = $("#LoansYes").prop('checked');
    if (LoansYesOrNoValue == true) {
        $(".clsCollateralNote").each(function () {
            let index = this.id.split("_")[1];
            let collateralizedTrueOrFalse = $("#IsCollateralizedYes_" + index).prop('checked');
            if (collateralizedTrueOrFalse == true) {
                if (($(this).val()).trim().replace('$', '') === "") {
                    $("#errNotevalue_" + index).text("Please enter note value").css("color", "Red");
                    IsEmtpty = false;
                }
                else {
                    $("#errNotevalue_" + index).text("");
                }
            }
            else {
                $("#errNotevalue_" + index).text("");
            }
        });

    }
    return IsEmtpty;
}

/****************************************************************************
   Function: SectionFifthValueOfCollateral()
   Purpose:  Validate Fifth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionFifthValueOfCollateral() {
    var IsEmtpty = true;
    var LoansYesOrNoValue = $("#LoansYes").prop('checked');
    if (LoansYesOrNoValue == true) {
        $(".clsCollateralValue").each(function () {
            let index = this.id.split("_")[1];
            var collateralizedTrueOrFalse = $("#IsCollateralizedYes_" + index).prop('checked');
            if (collateralizedTrueOrFalse == true) {
                if (($(this).val()).trim().replace('$', '') === "") {
                    $("#errCollateralform_" + index).text("Please enter collateral value").css("color", "Red");
                    IsEmtpty = false;
                }
                else {
                    $("#errCollateralform_" + index).text("");
                }
            }
            else {
                $("#errCollateralform_" + index).text("");
            }
        });

    }
    return IsEmtpty;
}

/****************************************************************************
   Function: SectionEighthValidateForm()
   Purpose:  Validate Fifth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionEighthValidateForm() {
    var IsEmtpty = true;
    var businessesyesOrNoValue = $("#businessesyes").prop('checked');
    if (businessesyesOrNoValue == true) {
        let isBuisnessTypeEmpty = SectionEighthBuisnessType();
        let isBuisnessPercentageEmpty = SectionEighthBuisnessPercentage();
        let isBuisnessValueEmpty = SectionEighthBuisnessValue();

        if (isBuisnessTypeEmpty && isBuisnessPercentageEmpty && isBuisnessValueEmpty) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return true;
    }


    return IsEmtpty;
}

/****************************************************************************
   Function: SectionEighthBuisnessType()
   Purpose:  Validate Fifth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/


function SectionEighthBuisnessType() {
    var IsEmtpty = true;
    var businessesyesOrNoValue = $("#businessesyes").prop('checked');

    if (businessesyesOrNoValue == true) {

        $(".clsBuisnessType").each(function () {
            let index = this.id.split("_")[1];
            if (($(this).val()).trim() == "") {
                $("#errBusinessType_" + index).text("Please enter business type").css("color", "Red");
                IsEmtpty = false;
            }
            else {
                $("#errBusinessType_" + index).text("");
            }
        });

    }
    return IsEmtpty;
}

/****************************************************************************
   Function: SectionEighthBuisnessPercentage()
   Purpose:  Validate Fifth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionEighthBuisnessPercentage() {
    var IsEmtpty = true;
    var businessesyesOrNoValue = $("#businessesyes").prop('checked');

    if (businessesyesOrNoValue == true) {

        $(".clsBuisnessOwnPercentage").each(function () {
            //===========================
            var data1 = $(this).val().trim().replace('%', '');
            data1.split('.');
            var datas = data1[1]
            var data = $(this).val();
            data = data.substring(0, 2);

            //====================================
            let index = this.id.split("_")[1];
            if (($(this).val()).trim().replace('%', '') == "")
            {

                $("#errbusinessPercent_" + index).text("Please enter business owned percentage").css("color", "Red");

                IsEmtpty = false;
            }
            else {
                $("#errbusinessPercent_" + index).text("");
            }
        });

    }
    return IsEmtpty;
}

/****************************************************************************
   Function: SectionEighthBuisnessValue()
   Purpose:  Validate Fifth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionEighthBuisnessValue() {
    var IsEmtpty = true;
    var businessesyesOrNoValue = $("#businessesyes").prop('checked');

    if (businessesyesOrNoValue == true) {

        $(".clsBuisnessvalue").each(function () {

            let index = this.id.split("_")[1];

            if (($(this).val()).trim().replace('$', '') === "") {
                $("#errbusinessValue_" + index).text("Please enter business value").css("color", "Red");
                IsEmtpty = false;
            }
            else {
                $("#errbusinessValue_" + index).text("");
            }
        });

    }
    return IsEmtpty;
}


/****************************************************************************
   Function: SectionNinthValidateForm()
   Purpose:  Validate Fifth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionNinthValidateForm() {
    var IsEmtpty = true;
    let isOwnedTotalWorthEmpty = SectionNinthOwnedTotalWorth();
    let isDebtOwnedValueEmpty = SectionNinthDebtOwnedValue();
    let isOtherTotalEmpty = SectionNinthOtherTotal();
    let isOtherAssetDebtsEmpty = SectionNinthotherAssetDebts();
    if (isOwnedTotalWorthEmpty && isDebtOwnedValueEmpty && isOtherTotalEmpty && isOtherAssetDebtsEmpty) {
        return true;
    }
    else {
        return false;
    }

    return IsEmtpty;
}


/****************************************************************************
   Function: SectionNinthOwnedTotalWorth()
   Purpose:  Validate Fifth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionNinthOwnedTotalWorth() {
    var IsEmtpty = true;
    var Automobiles1 = $("#Automobiles").val().trim().replace('$', '');
    if (Automobiles1 == "" || Automobiles1 == "$") {
        $('#errAutomobiles').text("Please enter owned automobiles worth").css("color", "Red");
        IsEmtpty = false;
    }
    else if (Automobiles1 != "") {
        $('#errAutomobiles').text(" ");
    }

    return IsEmtpty;
}
/****************************************************************************
   Function: SectionNinthDebtOwnedValue()
   Purpose:  Validate Fifth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionNinthDebtOwnedValue() {
    var IsEmtpty = true;
    var DebtOnautos1 = $("#DebtOnautos").val().trim().replace('$', '');
    if (DebtOnautos1 == "" || DebtOnautos1 == "$") {
        $('#errDebtOnautos').text("Please enter debt owned value").css("color", "Red");
        IsEmtpty = false;
    }
    else if (DebtOnautos1 != "") {
        $('#errDebtOnautos').text(" ");
    }
    return IsEmtpty;
}
/****************************************************************************
   Function: SectionNinthOtherTotal()
   Purpose:  Validate Fifth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionNinthOtherTotal() {
    var IsEmtpty = true;
    $(".clsOtherTotal").each(function () {

        let index = this.id.split("_")[1];

        if (($(this).val()).trim().replace('$', '') === "") {
            $("#errOtherTotal_" + index).text("Please enter assets total worth").css("color", "Red");
            IsEmtpty = false;
        }
        else {
            $("#errOtherTotal_" + index).text("");
        }
    });
    return IsEmtpty;
}

/****************************************************************************
   Function: SectionNinthotherAssetDebts()
   Purpose:  Validate Fifth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionNinthotherAssetDebts() {
    var IsEmtpty = true;

    $(".clsOtherAssetsDebts").each(function () {

        let index = this.id.split("_")[1];

        if (($(this).val()).trim().replace('$', '') === "") {
            $("#errotherAssetDebts_" + index).text("Please enter assets owned").css("color", "Red");
            IsEmtpty = false;
        }
        else {
            $("#errotherAssetDebts_" + index).text("");
        }
    });
    return IsEmtpty;
}
/****************************************************************************
   Function: SectionTenthValidateForm()
   Purpose:  Validate Fifth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionTenthValidateForm() {
    var IsEmtpty = true;
    //This is part of Other Debts Section
    var OtherDebtsYesOrNoValue = $("#OtherDebtsYes").prop('checked');

    if (OtherDebtsYesOrNoValue == true) {
        let isDebtTypeEmpty = SectionTenthDebtType();
        let isDebtAmountEmpty = SectionTenthDebtAmount();

        if (isDebtTypeEmpty && isDebtAmountEmpty) {
            return true;
        }
        else {
            return false;
        }
    }
    return IsEmtpty;
}
/****************************************************************************
   Function: SectionTenthDebtType()
   Purpose:  Validate Fifth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionTenthDebtType() {
    var IsEmtpty = true;
    //This is part of Other Debts Section
    var OtherDebtsYesOrNoValue = $("#OtherDebtsYes").prop('checked');

    if (OtherDebtsYesOrNoValue == true) {
        $(".clsDebtType").each(function () {
            let index = this.id.split("_")[1];
            if ($(this).val() == 0 || $(this).val() == 'Select') {
                $("#errDebtType_" + index).text("Please select debt type").css("color", "Red");
                IsEmtpty = false;
            }
            else {
                $("#errDebtType_" + index).text("");
            }
        });

    }
    return IsEmtpty;
}

/****************************************************************************
   Function: SectionTenthDebtAmount()
   Purpose:  Validate Fifth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionTenthDebtAmount() {
    var IsEmtpty = true;
    var OtherDebtsYesOrNoValue = $("#OtherDebtsYes").prop('checked');

    if (OtherDebtsYesOrNoValue == true) {
        $(".clsDebtAmount").each(function () {

            let index = this.id.split("_")[1];

            if (($(this).val()).trim().replace('$', '') === "") {
                $("#errDebtAmount_" + index).text("Please enter debt amount").css("color", "Red");
                IsEmtpty = false;
            }
            else {
                $("#errDebtAmount_" + index).text("");
            }
        });

    }
    return IsEmtpty;
}
/****************************************************************************
   Function: SectionSixthValidateForm()
   Purpose:  Validate Fifth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionSixthValidateForm() {
    var IsEmtpty = true;
    var LoansdueyesOrNoValue = $("#Loansdueyes").prop('checked');

    if (LoansdueyesOrNoValue == true) {
        var Insurancevalue = $("#Insurancevalue").val().trim();
        if (Insurancevalue == "" || Insurancevalue == "$") {
            $('#errInsurancevalue').text("Please enter Life insurance policy value").css("color", "Red");
            IsEmtpty = false;
        }
        else if (Insurancevalue != "" || Insurancevalue != "$") {
            $('#errInsurancevalue').text(" ");
        }
    }
    return IsEmtpty;
}
$("#Insurancevalue").on("keyup", function () {
    var Insurancevalue1 = $("#Insurancevalue").val().trim();
    if (Insurancevalue1 == "" || Insurancevalue1 == "$") {
        $('#errInsurancevalue').text("Please enter Life insurance policy value").css("color", "Red");
        IsEmtpty = false;
    }
    else if (Insurancevalue1 != "" || Insurancevalue1 != "$") {
        $('#errInsurancevalue').text(" ");
    }
});

/****************************************************************************
   Function: SectionSeventhValidateForm()
   Purpose:  Validate Fifth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionSeventhValidateForm() {
    var IsEmtpty = true;
    var BondsownyesOrNoValue = $("#Bondsownyes").prop('checked');

    if (BondsownyesOrNoValue == true) {
        var StocksBonds = $("#StocksBonds").val().trim();
        if (StocksBonds == "" || StocksBonds == "$") {
            $('#errStocksBonds').text("Please enter Stocks and bonds value").css("color", "Red");
            IsEmtpty = false;
        }
        else if (StocksBonds != "" || StocksBonds == "$") {
            $('#errStocksBonds').text(" ");
        }
    }
    return IsEmtpty;
}
$("#StocksBonds").on("keyup", function () {
    var StocksBonds1 = $("#StocksBonds").val().trim();
    if (StocksBonds1 == "" || StocksBonds == "$") {
        $('#errStocksBonds').text("Please enter Stocks and bonds value").css("color", "Red");
        IsEmtpty = false;
    }
    else if (StocksBonds1 != "" || StocksBonds == "$") {
        $('#errStocksBonds').text(" ");
    }
});


/****************************************************************************
   Function: SectionEleventhValidateForm()
   Purpose:  Validate Fifth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionEleventhValidateForm() {
    var IsEmtpty = true;
    var SSN1 = $("#socialsecuritynumberFirst").val().trim();
    var SSN2 = $("#socialsecuritynumberSecond").val().trim();
    var SSN3 = $("#socialsecuritynumberThird").val().trim();
    if (SSN1 == "" || SSN2 == "" || SSN3 == "") {
        $('#errSocialsecuritynumber').text("Please enter Social security number").css("color", "Red");
        IsEmtpty = false;
    }
    else if (SSN1 != "" || SSN2 != "" || SSN3 != "") {
        $('#errSocialsecuritynumber').text(" ");
    }
    var otherDetailsDOB = $("#otherDetailsDOB").val().trim();
    if (otherDetailsDOB == "") {
        $('#errotherDetailsDOB').text("Dob is required").css("color", "Red");
        IsEmtpty = false;
    }
    else if (otherDetailsDOB != "") {
        $('#errotherDetailsDOB').text(" ");
    }

    if ($('#maritalStatus').val() == 0 || $('#maritalStatus').val() == 'Select' || $('#maritalStatus').val() == null) {
        $('#errmaritalStatus').text('Please select marital status');
        IsEmtpty = false;
    }
    else {
        $('#errmaritalStatus').text('');
    }

    if ($('#Taxfiled').val() == 0 || $('#Taxfiled').val() == 'Select' || $('#Taxfiled').val() == null) {
        $('#errTaxfiled').text('Please select option');
        IsEmtpty = false;
    }
    else {
        $('#errTaxfiled').text('');
    }

    if ($('#acquiring').val() == 0 || $('#acquiring').val() == 'Select' || $('#acquiring').val() == null) {
        $('#erracquiring').text('Please select option');
        IsEmtpty = false;
    }
    else {
        $('#erracquiring').text('');
    }

    var IscriminalYes = $("#criminalYes").prop('checked');
    var IscriminalNo = $("#criminalNo").prop('checked');
    if (IscriminalYes == false && IscriminalNo == false) {

        $('#errIsCriminalBackground').text("Please select option").css("color", "Red");
        IsEmtpty = false;
    } else if ((IscriminalYes == true && IscriminalNo == false) || (IscriminalYes == false && IscriminalNo == true)) {
        $('#errIsCriminalBackground').text('');
    }

    var IscriminalYes = $("#criminalYes").prop('checked');
    if (IscriminalYes == true) {
        var detailcriminalYes = $("#detailcriminalYes").val().trim();
        if (detailcriminalYes == "") {
            $('#errdetailcriminalYes').text("Please enter description").css("color", "Red");
            IsEmtpty = false;
        }
        else if (detailcriminalYes != "") {
            $('#errdetailcriminalYes').text(" ");
        }
    }

    if ($('#citizenstatus').val() == 0 || $('#citizenstatus').val() == 'Select' || $('#citizenstatus').val() == null) {
        $('#errcitizenstatus').text('Please select citizenship status');
        IsEmtpty = false;
    }
    else {
        $('#errcitizenstatus').text('');
    }
    var citizenStatus = $('#citizenstatus option:selected').val();
    if (citizenStatus == '4') {
        var othercitizen = $("#othercitizen").val().trim();
        if (othercitizen == "") {
            $('#errothercitizen').text("Please enter description").css("color", "Red");
            IsEmtpty = false;
        }
        else if (othercitizen != "") {
            $('#errothercitizen').text(" ");
        }
    }


    return IsEmtpty;
}

$('#citizenstatus').change(function () {
    var citizenStatus = $('#citizenstatus option:selected').val();
    if (citizenStatus == '4') {
        //$("#divOtherCtznStatus").show();
        $("#divOtherCtznStatus").removeClass("d-none");
    }
    else {
        //$("#divOtherCtznStatus").hide();
        $("#divOtherCtznStatus").addClass("d-none");
    }


})


$("#othercitizen").on("keyup", function () {
    var othercitizen1 = $("#othercitizen").val().trim();
    if (othercitizen1 == "") {
        $('#errothercitizen').text("Please enter description").css("color", "Red");
        IsEmtpty = false;
    }
    else if (othercitizen1 != "") {
        $('#errothercitizen').text(" ");
    }
});

$("#citizenstatus").on("change", function () {
    if ($('#citizenstatus').val() == 0 || $('#citizenstatus').val() == 'Select' || $('#citizenstatus').val() == null) {
        $('#errcitizenstatus').text('Please select citizenship status');
        IsEmtpty = false;
    }
    else {
        $('#errcitizenstatus').text('');
    }
});

$("#acquiring").on("change", function () {
    if ($('#acquiring').val() == 0 || $('#acquiring').val() == 'Select' || $('#acquiring').val() == null) {
        $('#erracquiring').text('Please select option');
        IsEmtpty = false;
    }
    else {
        $('#erracquiring').text('');
    }
});

$("#Taxfiled").on("change", function () {
    if ($('#Taxfiled').val() == 0 || $('#Taxfiled').val() == 'Select' || $('#Taxfiled').val() == null) {
        $('#errTaxfiled').text('Please select option');
        IsEmtpty = false;
    }
    else {
        $('#errTaxfiled').text('');
    }
});

$("#maritalStatus").on("change", function () {
    if ($('#maritalStatus').val() == 0 || $('#maritalStatus').val() == 'Select' || $('#maritalStatus').val() == null) {
        $('#errmaritalStatus').text('Please select marital status');
        IsEmtpty = false;
    }
    else {
        $('#errmaritalStatus').text('');
    }
});



/****************************************************************************
   Function: SectionTwelvethValidateForm()
   Purpose:  Validate Fifth Section of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function SectionTwelvethValidateForm() {
    var IsEmtpty = true;

    let IsEmptyBankDocument = CheckPropertyPicturesFileFormat();
    let IsEmptyCreditDocument = CheckSurveyFileFormat();
    let IsEmptyPassportDocument = CheckIdsOrPassport();

    if (IsEmptyBankDocument && IsEmptyCreditDocument && IsEmptyPassportDocument) {
        IsEmtpty = true;
    }
    else {
        IsEmtpty = false;
    }

    return IsEmtpty;
}

$('#chkbx1').change(function () {
    var status = $("#chkbx1").prop('checked');
    if (status == false) {
        $('#chkAcceptTerm').css('color', '#DC3545');
    }
    else {
        $('#chkAcceptTerm').css('color', 'black');
    }
});

/****************************************************************************
   Function: CheckIdsOrPassport()
   Purpose:  Validate Id and Passport on KeyUp
   Developer: Wasim Raja
****************************************************************************/
function CheckIdsOrPassport() {
    let isEmpty = true;
    //let uploadIdsOrPaasport = $(".imgSection3").children().length;
    var uploadIdsOrPaasport = $("#fileForm3").val().trim();
    if (uploadIdsOrPaasport == 0) {
        $('#errIdPassport').text("Please upload Credit Report").css("color", "Red");
        isEmpty = false;
    }
    else if (uploadIdsOrPaasport != 0) {
        $('#errIdPassport').text(" ");
        isEmpty = true;
    }
    return isEmpty;
}
/****************************************************************************
   Function: CheckPropertyPicturesFileFormat()
   Purpose:  Validate Bank statement document on KeyUp
   Developer: Wasim Raja
****************************************************************************/
function CheckPropertyPicturesFileFormat() {
    let IsEmtpty = true;
    //let uploadBankStatement = $(".imgSection1").children().length;
    var uploadBankStatement = $("#upload-img").val().trim();
    if (uploadBankStatement == 0) {
        $('#errBankDocument').text("Please upload bank statements").css("color", "Red");
        IsEmtpty = false;
    }
    else if (uploadBankStatement != 0) {
        $('#errBankDocument').text(" ");
        IsEmtpty = true;
    }
    return IsEmtpty;
}

/****************************************************************************
   Function: CheckSurveyFileFormat()
   Purpose:  Validate Credit report document on KeyUp
   Developer: Wasim Raja
****************************************************************************/
function CheckSurveyFileFormat() {
    let IsEmtpty = true;
    //let uploadCreditReport = $(".imgSection2").children().length;
    var uploadCreditReport = $("#fileForm2").val().trim();
    if (uploadCreditReport == 0) {
        $('#errCreditReport').text("Please upload Credit Report").css("color", "Red");
        IsEmtpty = false;
    }
    else if (uploadCreditReport != 0) {
        $('#errCreditReport').text(" ");
        IsEmtpty = true;
    }
    return IsEmtpty;
}

/****************************************************************************
   Function: liquidityOnKeyup()
   Purpose:  Validate Liquidity of F.T buyer Signup
   Developer: Wasim Raja
****************************************************************************/
function liquidityOnKeyup() {
    AddDollorSymbol();
    RemoveAashToCloseNeeded();
}

/****************************************************************************
   Function: AddDollorSymbol()
   Purpose:  Method for add placeholder for doller with Liquidity
   Developer: Wasim Raja
****************************************************************************/
function AddDollorSymbol() {
    var liquidityValues = "";
    var checkCurrentValue = $('#txtCashOnHand').val();

    if (checkCurrentValue != "") {
        liquidityValues = checkCurrentValue.replace('$', '');
    }
    var number = '$' + liquidityValues;
    $('#txtCashOnHand').val(number)
}

/****************************************************************************
   Function: RemoveAashToCloseNeeded()
   Purpose:  Clear Liquidity value
   Developer: Wasim Raja
****************************************************************************/
function RemoveAashToCloseNeeded() {
    $('#errCashOnHand').text('');
}

/****************************************************************************
   Function: CommaSeperatedNumericValues()
   Purpose:  Make Comma seperate 
   Developer: Wasim Raja
****************************************************************************/
function CommaSeperatedNumericValues() {
    
}


function commaAndDollarPropertyDebt(value) {
    SectionFourthDebtOnProperty();
    formatCurrency(value);
}
function commaAndDollarInsuranceValue(value) {  
    formatCurrency(value);
}
function commaAndDollarStockAndBondValue(value) {
    formatCurrency(value);
}
function commaAndDollarPropertyWorth(value) {
    SectionFourthPropertyWorth();
    formatCurrency(value);
}
function commaAndDollarOwnedAutoMobileWorthvalue(value) {
    SectionNinthOwnedTotalWorth();
    formatCurrency(value);
}
function commaAndDollarDebtAutoOwnedValue(value) {
    SectionNinthDebtOwnedValue();
    formatCurrency(value);
}
function commaAndDollarNoteValue(value) {
    SectionFifthNoteValue();
    formatCurrency(value);

}
function commaAndDollarCollateralValue(value) {
    debugger
    SectionFifthValueOfCollateral();
    formatCurrency(value);
}
function commaAndDollarBuisnessValue(value) {
    SectionEighthBuisnessValue();
    formatCurrency(value);
}
function RemoveDownPayment() {
    $('#errisdownPayment').text('');
}

//apply placeholder for % and $ start
function commaAndDollarBuisnessOwnedValue(value) {
    SectionEighthBuisnessPercentage();

}
function commaAndDollarOtherAssetSTotalWorth(value) {
    var value1 = $(value).val();

    var dollervalue9 = value1.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    var withDollar = '$' + dollervalue9;
    $(value).val(withDollar);
    SectionNinthOtherTotal();

}
function commaAndDollarDebtAmountValue(value) {
    var value1 = $(value).val();

    var dollervalue10 = value1.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    var withDollar = '$' + dollervalue10;
    $(value).val(withDollar);
    SectionTenthDebtAmount();
}
function commaAndDollarDebtOnAssetsOwned(value) {
    var value1 = $(value).val();

    var dollervalue9 = value1.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    var withDollar = '$' + dollervalue9;
    $(value).val(withDollar);

    SectionNinthotherAssetDebts();

}
//New code for preview
/****************************************************************************
   Function: ImgUpload()
   Purpose:  for Image preview
   Developer: Wasim Raja
****************************************************************************/

jQuery(document).ready(function () {
    ImgUpload();
});
function ImgUpload() {
    var imgWrap = "";
    var imgArrayApp = [];
    var imgArrayIns = [];
    var imgArraySur = [];
    var imgArrayEnv = [];
    imgArrayPropPic = [];
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
                UpdateCount(imgArrayIdent, fileControlId);
            }
        });


    });

    $('body').on('click', ".upload__img-close", function (e) {
        /* EmptyImageDivValueSection1();*/

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

            EmptyImageDivValueSection2();
            for (var i = 0; i < imgArraySur.length; i++) {
                totalFiles = imgArraySur.length - 1;
                if (imgArraySur[i].name === file) {
                    imgArraySur.splice(i, 1);
                    break;
                }
            }
            let FindDiv = $(this).parent();
            let Index = FindDiv[0].id.split("_")[1];
            let DeleteValue = $("#hdnCreditDocumentFiles_" + Index).val();
            if (DeleteValue != undefined && DeleteValue != 0 && DeleteValue != "undefined") {
                ArrayDeleteCreditDocuments.push(DeleteValue);
            }

            UpdateCount(imgArraySur, fileControlId);
            CheckSurveyFileFormat();
        }
        else if (fileControlId == "fileForm3") {
            EmptyImageDivValueSection3();
            for (var i = 0; i < imgArrayEnv.length; i++) {
                totalFiles = imgArrayEnv.length - 1;
                if (imgArrayEnv[i].name === file) {
                    imgArrayEnv.splice(i, 1);
                    break;
                }
            }
            let FindDiv = $(this).parent();
            let Index = FindDiv[0].id.split("_")[1];
            let DeleteValue = $("#hdnPassportDocumentFiles_" + Index).val();
            if (DeleteValue != undefined && DeleteValue != 0 && DeleteValue != "undefined") {
                ArrayDeletePassportDocuments.push(DeleteValue);
            }

            UpdateCount(imgArrayEnv, fileControlId);
            CheckIdsOrPassport();
        }
        else if (fileControlId == "upload-img") {
            EmptyImageDivValueSection1();
            for (var i = 0; i < imgArrayPropPic.length; i++) {
                totalFiles = imgArrayPropPic.length - 1;
                if (imgArrayPropPic[i].name === file) {
                    imgArrayPropPic.splice(i, 1);
                    break;
                }
            }
            let FindDiv = $(this).parent();
            let Index = FindDiv[0].id.split("_")[1];
            let DeleteValue = $("#hdnBankDocumentFiles_" + Index).val();
            if (DeleteValue != undefined && DeleteValue != 0 && DeleteValue != "undefined") {
                ArrayDeleteBankDocuments.push(DeleteValue);
            }

            UpdateCount(imgArrayPropPic, fileControlId);
            CheckPropertyPicturesFileFormat();

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
        /*fun(html);*/

    })
}
/****************************************************************************
   Function: UpdateCount()
   Purpose:  for Image preview Count
   Developer: Wasim Raja
****************************************************************************/
function UpdateCount(imgArray, fileControlId) {
    const dt = new DataTransfer()
    for (var i = 0; i < imgArray.length; i++) {
        dt.items.add(imgArray[i])
    }
    if (fileControlId != null && fileControlId != undefined) {
        $("#" + fileControlId)[0].files = dt.files;
    }
}

/****************************************************************************
   Function: ShowValidationForImage()
   Purpose:  Function to show the validation message
   Developer: Wasim Raja
****************************************************************************/
function ShowValidationForImage(message) {

    $('#bindBankStatementDocument').text(message);
    $('#bindBankStatementDocument').fadeIn();

    // Set a timer to hide the validation message after 3 seconds (3000 milliseconds)
    setTimeout(function () {
        $('#bindBankStatementDocument').fadeOut();
    }, 3000);

}

/****************************************************************************
   Function: UpdateCount()
   Purpose:  Update count of Image priview
   Developer: Wasim Raja
****************************************************************************/
function UpdateCount(imgArray, fileControlId) {
    const dt = new DataTransfer()
    for (var i = 0; i < imgArray.length; i++) {
        dt.items.add(imgArray[i])
    }
    if (fileControlId != null && fileControlId != undefined) {
        $("#" + fileControlId)[0].files = dt.files;
    }
}

/****************************************************************************
   Function: UpdateCount()
   Purpose:  Update count of Image priview
   Developer: Wasim Raja
****************************************************************************/

function AppendImagePriview() {
    EmptyImageDivValueSection1();
    EmptyImageDivValueSection2();
    EmptyImageDivValueSection3();
    var imgSection1 = $('.imgSection1').html();
    $("#bindBankStatementDoc").append(imgSection1);

    var imgSection2 = $('.imgSection2').html();
    $("#bindCreditReport").append(imgSection2)

    var imgSection3 = $('.imgSection3').html();
    $("#bindIdOrPassport").append(imgSection3)
}
function EmptyImageDivValueSection1() {
    $('#bindBankStatementDoc').html("");
}
function EmptyImageDivValueSection2() {
    $('#bindCreditReport').html("");
}
function EmptyImageDivValueSection3() {
    $('#bindIdOrPassport').html("");
}

function GetPropertyTypeList(index) {
    $.ajax({
        url: "/Property/GetPropertyTypeList",
        success: function (response) {
            var data = '<option value="0">Property Type</option>';
            response.forEach(function (item) {
                data += '<option value= ' + item.propertyTypeId + '>' + item.propertyTypeName + '</option>'
            });
            $('#assetTypeId_' + index).html(data);
        }
    });
}

function ShowHideDeleteButton(divId, DeleteBtnId) {
    let length = $("#" + divId).children().length;
    if (length > 1) {
        $("." + DeleteBtnId).show();
    }
    else {
        $("." + DeleteBtnId).hide();
    }
}
//************************************************** */

$("input[data-type='currency']").on({
    keyup: function () {
        formatCurrency(this);
    },
    blur: function () {
        formatCurrency(this, 'blur');
    }
});
function formatNumber(n) {
    // format number 1000000 to 1,234,567
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
function formatCurrency(input, blur) {
    var input_val = $(input).val();

    if (input_val === "") { return; }

    // original length
    var original_len = input_val.length;

    // initial caret position 
    var caret_pos = $(input).prop("selectionStart");

    // check for decimal
    if (input_val.indexOf(".") >= 0) {

        // get position of first decimal
        // this prevents multiple decimals from
        // being entered
        var decimal_pos = input_val.indexOf(".");

        // split number by decimal point
        var left_side = input_val.substring(0, decimal_pos);
        var right_side = input_val.substring(decimal_pos);

        // add commas to left side of number
        left_side = formatNumber(left_side);

        // validate right side
        right_side = formatNumber(right_side);

        // On blur make sure 2 numbers after decimal
        if (blur === 'blur') {
            right_side += "00";
        }

        // Limit decimal to only 2 digits
        right_side = right_side.substring(0, 2);

        // join number by .
        input_val = "$" + left_side + "." + right_side;

    }
    else {
        // no decimal entered
        // add commas to number
        // remove all non-digits
        input_val = formatNumber(input_val);
        input_val = "$" + input_val;

        // final formatting
        if (blur === "blur") {
            input_val += ".00";
        }
    }
    // send updated string to input
    $(input).val(input_val);
    // put caret back in the right position
    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    $(input)[0].setSelectionRange(caret_pos, caret_pos);
}

/****************************************************************************
   Function: GetOpenDiv()
   Purpose:  this function is used for open next section of FB registration form.
   Developer: Wasim Raja
****************************************************************************/
function GetOpenDiv(SectionName) {

    let nextDiv = $("#" + SectionName).next(".step");
    if (nextDiv.length == 0) {
        nextDiv = $(".step:first");
    }

    switch (SectionName) {
        case "tab1":
            $(".ProgressBarPersentage").css("width", "14%");
            $(".ProgressBarPersentage").text("14%");
            $(".step").hide();
            nextDiv.show();
            break;

        case "tab2":
            $(".ProgressBarPersentage").css("width", "20%");
            $(".ProgressBarPersentage").text("20%");
            $(".step").hide();
            nextDiv.show();
            break;

        case "tab3":
            $(".ProgressBarPersentage").css("width", "27%");
            $(".ProgressBarPersentage").text("27%");
            $(".step").hide();
            nextDiv.show();
            break;

        case "tab4":
            $(".ProgressBarPersentage").css("width", "35%");
            $(".ProgressBarPersentage").text("35%");
            $(".step").hide();
            nextDiv.show();
            break;

        case "tab5":
            $(".ProgressBarPersentage").css("width", "42%");
            $(".ProgressBarPersentage").text("42%");
            $(".step").hide();
            nextDiv.show();
            break;

        case "tab6":
            $(".ProgressBarPersentage").css("width", "50%");
            $(".ProgressBarPersentage").text("50%");
            $(".step").hide();
            nextDiv.show();
            break;

        case "tab7":
            $(".ProgressBarPersentage").css("width", "57%");
            $(".ProgressBarPersentage").text("57%");
            $(".step").hide();
            nextDiv.show();
            break;

        case "tab8":
            $(".ProgressBarPersentage").css("width", "62%");
            $(".ProgressBarPersentage").text("62%");
            $(".step").hide();
            nextDiv.show();
            break;

        case "tab9":
            $(".ProgressBarPersentage").css("width", "70%");
            $(".ProgressBarPersentage").text("70%");
            $(".step").hide();
            nextDiv.show();
            break;

        case "tab10":
            $(".ProgressBarPersentage").css("width", "77%");
            $(".ProgressBarPersentage").text("77%");
            $(".step").hide();
            nextDiv.show();
            break;

        case "tab11":
            $(".ProgressBarPersentage").css("width", "85%");
            $(".ProgressBarPersentage").text("85%");
            $(".step").hide();
            nextDiv.show();
            break;

        case "tab12":
            $(".ProgressBarPersentage").css("width", "92%");
            $(".ProgressBarPersentage").text("92%");
            $(".step").hide();
            EmptyImageDivValueSection1();
            EmptyImageDivValueSection2();
            EmptyImageDivValueSection3();
            AppendImagePriview()
            PersonalInformation();
            nextDiv.show();
            break;

        case "tab13":
            $(".ProgressBarPersentage").css("width", "100%");
            $(".ProgressBarPersentage").text("100%");
            $(".step").hide();
            nextDiv.show();
            break;

        case "tab14":
            $(".ProgressBarPersentage").css("width", "100%");
            $(".ProgressBarPersentage").text("100%");
            $(".step").hide();
            nextDiv.show();
            break;

    }
}

/****************************************************************************
Function: CheckCollaterizedRadio function
Purpose:  Show Hide Collateralized div using Yes or No radio button 
Developer: Wasim Raja
****************************************************************************/
function CheckCollaterizedRadio(event) {
    let index = event.id.split("_")[1];
    let IscollateralizedYes = $("#IsCollateralizedYes_" + index).prop('checked');
    if (IscollateralizedYes) {
        $("#dvFirstCollateralDiv_" + index).show();
        $("#dvSecondCollateralDiv_" + index).show();
        $("#dvthirdCollateralDiv_" + index).show();
    }
    else {
        $("#dvFirstCollateralDiv_" + index).hide();
        $("#dvSecondCollateralDiv_" + index).hide();
        $("#dvthirdCollateralDiv_" + index).hide();

        $("#txtcollateral_" + index).val("");
        $("#txtNotevalue_" + index).val("");
        $("#Collateralform_" + index).val("");
    }
}

/****************************************************************************
Function: PercentageOfPropertyOwned()
Purpose:  Add % symbol 
Developer: Wasim Raja
****************************************************************************/
function PercentageOfPropertyOwned(event) {
    SectionFourthPropertyOwned();
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '8') {
    }
    else {
        var displayValue = "";
        var checkValueISPresentt = $(event).val();


        if (checkValueISPresentt != "") {
            displayValue = checkValueISPresentt.replace('%', '');
        }
        var num = displayValue + '%'
        if (num == '%') {
            $(event).val('')
        }
        else {
            $(event).val(num)
        }
    }
};

$("input[data-type='percentage']").on({
 
    keyup: function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '8') {

        }
        else {
            formatPercentage(this);
        }
    },
    blur: function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '8') {

        }
        else {
            formatPercentage(this, 'blur');
        }
    }
});
function formatPercentage(input, blur) {
    var input_val = $(input).val();

    if (input_val === "") { return; }

    // original length
    var original_len = input_val.length;

    // initial caret position 
    var caret_pos = $(input).prop("selectionStart");

    // check for decimal
    if (input_val.indexOf(".") >= 0) {

        // get position of first decimal
        // this prevents multiple decimals from
        // being entered
        var decimal_pos = input_val.indexOf(".");

        // split number by decimal point
        var left_side = input_val.substring(0, decimal_pos);
        var right_side = input_val.substring(decimal_pos);

        // add commas to left side of number
        left_side = formatNumber(left_side);

        // validate right side
        right_side = formatNumber(right_side);

        // On blur make sure 2 numbers after decimal
        if (blur === 'blur') {
            right_side += "00";
        }

        // Limit decimal to only 2 digits
        right_side = right_side.substring(0, 2);

        // join number by .
        input_val = left_side + "." + right_side + "%";

    }
    else {
        //input_val = formatNumber(input_val);
        //input_val = input_val + "%";

        if (blur === "blur") {
            input_val = formatNumber(input_val);
            input_val += ".00";
            input_val = input_val + "%";
        }
        else {
            
        }

        // final formatting
    }
    // send updated string to input
    $(input).val(input_val);
    // put caret back in the right position
    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    $(input)[0].setSelectionRange(caret_pos, caret_pos);
}
