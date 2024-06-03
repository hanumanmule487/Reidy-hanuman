function requiredTextField(ControlId, ErrorMessage, validationType) {
    var Id = "#txt" + ControlId
    var formGroup = "#formGroup" + ControlId
    var errorId = "#err" + ControlId

    var val = $(Id).val().trim();
    if (val == "" || val == undefined) {
        $(formGroup).addClass("error-control")
        $(errorId).addClass("error-message")
        $(errorId).html("Please enter " + ErrorMessage)
        $(Id).focus()
        return false;

    }
    else {
        if (getValidationType(validationType).test(val)) {
            $(formGroup).removeClass("error-control")
            $(errorId).removeClass("error-message")
            $(errorId).html("")
            return true;
        }
        else {
            $(formGroup).addClass("error-control")
            $(errorId).addClass("error-message")
            $(errorId).html("Please enter valid " + ErrorMessage)
            $(Id).focus()
            return false;


        }
    }
}
function getValidationType(type) {
    var regx = ''
    switch (type) {
        case "email":
            regx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            break;
        case "mobile":
            regx = /^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/
            break;
        case "numeric":
            regx = /^\d+$/
            break;
        default:
            regx = /^.{1,500}$/
            break;
    }
    return regx
}