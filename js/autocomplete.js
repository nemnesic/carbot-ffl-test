$(document).ready(function () {
    //$('#pickupTime').datetimepicker({format: 'LT'});
    //$('.datepicker').datetimepicker({format: 'MM/DD/YYYY'});




    $("#submit").on('click', function () {
        console.log("click");
        $.ajax({
            url: 'https://account.carservicebot.com/webhook/v3/web-lead/save', // url where to submit the request
            type: "POST", // type of action POST || GET
            dataType: 'json', // data type
            data: $("#carbot_main_form").serialize(), // post data || get data
            success: function (result) {
                // you can see the result from the console
                // tab of the developer tools
                console.log(result);
                $("#message").toggle('slow');
                $("#carbot_main_form").toggle('slow');
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        })
    });
});

function initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    var pickupAddress = new google.maps.places.Autocomplete(document.getElementById('pickUpLocation'), {types: ['geocode']});

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    pickupAddress.setFields(['address_component']);

    var destination = new google.maps.places.Autocomplete(document.getElementById('dropOffLocation'), {types: ['geocode']});
    destination.setFields(['address_component']);


    var pickupAddressHourly = new google.maps.places.Autocomplete(document.getElementById('pickUpLocationHourly'), {types: ['geocode']});
    pickupAddressHourly.setFields(['address_component']);


}

function initialize() {
    var pickupAddress = document.getElementById('pickUpLocation');
    var pickupAddressAutoComplete = new google.maps.places.Autocomplete(pickupAddress);
    pickupAddressAutoComplete.setFields(['address_component']);

    var destination = document.getElementById('dropOffLocation');
    var destinationAutoComplete = new google.maps.places.Autocomplete(destination);
    destinationAutoComplete.setFields(['address_component']);

    var pickupAddressHourly = document.getElementById('pickUpLocationHourly');
    var pickupAddressHourlyAutoComplete = new google.maps.places.Autocomplete(pickupAddressHourly);
    pickupAddressHourlyAutoComplete.setFields(['address_component']);
}
