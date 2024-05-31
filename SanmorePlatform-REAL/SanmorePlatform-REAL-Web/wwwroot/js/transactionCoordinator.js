///Multi select arrow script
var down = document.querySelectorAll('.select2-selection--multiple');

down.forEach((e) => {
    e.classList.add('form-select');
});

var select_status = document.querySelectorAll(".select_status");
var select_status_option = document.querySelectorAll(".select_status option");
select_status.forEach((sel_status) => {
    sel_status.addEventListener("change", (eeee) => {
        if (eeee.target.value === "Cancelled/Rejected") {
            sel_status.style.backgroundColor = "#DC3545"
            sel_status.style.color = "#fff"
        } else if (eeee.target.value === "Active/Approved") {
            sel_status.style.backgroundColor = "#198754"
            sel_status.style.color = "#fff"
        } else if (eeee.target.value === "Offer received") {
            sel_status.style.backgroundColor = "#b15f44"
            sel_status.style.color = "#fff"
        } else if (eeee.target.value === "Under contract") {
            sel_status.style.backgroundColor = "#DC7B35"
            sel_status.style.color = "#fff"
        } else if (eeee.target.value === "Need changes") {
            sel_status.style.backgroundColor = "#8c31ff"
            sel_status.style.color = "#fff"
        } else if (eeee.target.value === "Closed/Completed/Sold") {
            sel_status.style.backgroundColor = "#216dff"
            sel_status.style.color = "#fff"
        } else if (eeee.target.value === "Select status") {
            sel_status.style.backgroundColor = "#fff"
            sel_status.style.color = "#000"
        }
    })
})

// Function to update color based on selected value
debugger
function updateColor(select) {
    var value = select.value;
    if (value === "Cancelled/Rejected") {
        select.style.backgroundColor = "#DC3545";
        select.style.color = "#fff";
    } else if (value === "Active/Approved") {
        select.style.backgroundColor = "#198754";
        select.style.color = "#fff";
    } else if (value === "Offer received") {
        select.style.backgroundColor = "#b15f44";
        select.style.color = "#fff";
    }else if (value === "Under contract") {
        select.style.backgroundColor = "#DC7B35";
        select.style.color = "#fff";
    } else if (value === "Need changes") {
        select.style.backgroundColor = "#8c31ff";
        select.style.color = "#fff";
    } else if (value === "Closed/Completed/Sold") {
        select.style.backgroundColor = "#216dff";
        select.style.color = "#fff";
    } else if (value === "Select status") {
        select.style.backgroundColor = "#fff";
        select.style.color = "#000";
    }
}

// Apply color change logic to each select element
select_status.forEach((sel_status) => {
    // Initially update color for each select element
    updateColor(sel_status);

    // Add event listener for change event
    sel_status.addEventListener("change", (event) => {
        // Update color when value changes
        updateColor(event.target);
    });
});

//This Ajax is used to change the property status by the TC
debugger
$(document).ready(function () {
    $('.select_status').change(function () {
        var propertyId = $(this).attr('id').split('_')[1]; // Extract PropertyId from the dropdown's ID
        var status = $(this).val(); // Get the selected status

        // AJAX call to update property status
        $.ajax({
            type: "POST",
            url: "/TransactionCoordinator/UpdatePropertyStatus",
            data: { propertyId: propertyId, status: status },
            success: function (response) {
                // Handle success response
                toastrSuccessMessage("Status updated");
                console.log("Property status updated successfully");
            },
            error: function (xhr, status, error) {
                // Handle error
                toastrErrorMessage("Status not updated due to some error")
                console.error(error);
            }
        });
    });
});

debugger
// Function to handle property search filtering
function filterProperties() {
    var input, filter, propertyCards, property, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    propertyCards = document.querySelectorAll('.col-12.col-md-12.col-lg-12.col-xxl-12'); // Select all property cards

    // Loop through each property card and hide/show based on the search query
    propertyCards.forEach(function (card) {
        property = card.querySelector('.address_details h5'); // Get the property address details
        txtValue = property.textContent || property.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            card.style.display = ""; // Show the property card
        } else {
            card.style.display = "none"; // Hide the property card
        }
    });
}
// Add event listener to the search input for filtering
document.getElementById('searchInput').addEventListener('input', filterProperties);
